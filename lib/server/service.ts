import { randomBytes, createHash } from "node:crypto"
import { db } from "./db"
import { getTopicById, calculateScore } from "../quiz-data"
import { courseLessons } from "../courses"
import type { Profile, QuizResult, HubData } from "../contracts"

export class ApiError extends Error {
  constructor(message: string, public status = 400) { super(message) }
}

export function identify(token?: string) {
  const valid = token && /^[a-f0-9]{64}$/.test(token)
  const existingId = valid ? createHash("sha256").update(token).digest("hex") : undefined
  if (existingId && db().prepare("SELECT id FROM profiles WHERE id = ?").get(existingId)) {
    return { id: existingId, token: token!, fresh: false }
  }
  const freshToken = randomBytes(32).toString("hex")
  const id = createHash("sha256").update(freshToken).digest("hex")
  db().prepare("INSERT INTO profiles (id) VALUES (?)").run(id)
  return { id, token: freshToken, fresh: true }
}

export function profile(id: string): Profile {
  const row = db().prepare("SELECT * FROM profiles WHERE id = ?").get(id)!
  const courseProgress: Record<string, string[]> = {}
  for (const lesson of db().prepare("SELECT course_id, lesson_id FROM lessons WHERE profile_id = ?").all(id)) {
    (courseProgress[String(lesson.course_id)] ??= []).push(String(lesson.lesson_id))
  }
  return { name: String(row.name), bestScore: Number(row.best_score), totalQuizzes: Number(row.total_quizzes), totalXp: Number(row.total_xp), migrated: Boolean(row.migrated), courseLessons: courseProgress }
}

export function migrate(id: string, input: unknown) {
  const data = input as Record<string, unknown> | null
  const integer = (value: unknown, max: number) => typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= max
  if (!data || !integer(data.bestScore, 100) || !integer(data.totalQuizzes, 1_000_000) || !integer(data.totalXp, 100_000_000)) throw new ApiError("Progresso anterior inválido.")
  // Legacy values are imported once; new attempts are always graded by the server.
  db().prepare("UPDATE profiles SET best_score = MAX(best_score, ?), total_quizzes = MAX(total_quizzes, ?), total_xp = MAX(total_xp, ?), migrated = 1 WHERE id = ? AND migrated = 0").run(data.bestScore as number, data.totalQuizzes as number, data.totalXp as number, id)
  return profile(id)
}

export function startAttempt(id: string, topicId: unknown) {
  const topic = typeof topicId === "string" ? getTopicById(topicId) : undefined
  if (!topic) throw new ApiError("Trilha não encontrada.", 404)
  const recent = db().prepare("SELECT COUNT(*) AS count FROM attempts WHERE profile_id = ? AND created_at > ?").get(id, Date.now() - 60_000)!
  if (Number(recent.count) >= 30) throw new ApiError("Aguarde um minuto antes de iniciar outro quiz.", 429)
  const attemptId = randomBytes(24).toString("hex")
  db().prepare("INSERT INTO attempts (id, profile_id, topic_id, created_at) VALUES (?, ?, ?, ?)").run(attemptId, id, topic.id, Date.now())
  return { id: attemptId, topicId: topic.id, questions: topic.questions.map(({ correct: _correct, ...question }) => question) }
}

export function submitAttempt(id: string, input: unknown): { result: QuizResult; profile: Profile } {
  const data = input as { attemptId?: unknown; answers?: unknown } | null
  if (!data || typeof data.attemptId !== "string" || !Array.isArray(data.answers)) throw new ApiError("Envie a tentativa e as respostas.")
  const database = db()
  database.exec("BEGIN IMMEDIATE")
  try {
    const attempt = database.prepare("SELECT * FROM attempts WHERE id = ? AND profile_id = ?").get(data.attemptId, id)
    if (!attempt) throw new ApiError("Tentativa não encontrada.", 404)
    if (attempt.result) {
      database.exec("COMMIT")
      return { result: JSON.parse(String(attempt.result)), profile: profile(id) }
    }
    const topic = getTopicById(String(attempt.topic_id))!
    const answers = data.answers as unknown[]
    if (answers.length !== topic.questions.length || answers.some((answer, index) => answer !== null && (typeof answer !== "number" || !Number.isInteger(answer) || answer < 0 || answer >= topic.questions[index].options.length))) throw new ApiError("Respostas inválidas para esta trilha.")
    const review = topic.questions.map((q, index) => ({ question: q.question, options: q.options, selected: answers[index] as number | null, correct: q.correct }))
    const correctCount = review.filter((q) => q.selected === q.correct).length
    const result: QuizResult = { score: calculateScore(correctCount, topic.questions.length), xpEarned: topic.questions.reduce((sum, q, index) => sum + (answers[index] === q.correct ? q.xp : 0), 0), correctCount, review }
    database.prepare("UPDATE attempts SET result = ? WHERE id = ?").run(JSON.stringify(result), data.attemptId)
    database.prepare("UPDATE profiles SET total_quizzes = total_quizzes + 1, total_xp = total_xp + ?, best_score = MAX(best_score, ?) WHERE id = ?").run(result.xpEarned, result.score, id)
    database.exec("COMMIT")
    return { result, profile: profile(id) }
  } catch (error) {
    if (database.isTransaction) database.exec("ROLLBACK")
    throw error
  }
}

export function completeLesson(id: string, input: unknown) {
  const data = input as { courseId?: unknown; lessonId?: unknown } | null
  if (!data || typeof data.courseId !== "string" || typeof data.lessonId !== "string" || !courseLessons[data.courseId]?.some((lesson) => lesson.id === data.lessonId)) throw new ApiError("Aula não encontrada.", 404)
  db().prepare("INSERT OR IGNORE INTO lessons (profile_id, course_id, lesson_id) VALUES (?, ?, ?)").run(id, data.courseId, data.lessonId)
  return profile(id)
}

export function history(id: string) {
  return db().prepare("SELECT topic_id, created_at, result FROM attempts WHERE profile_id = ? AND result IS NOT NULL ORDER BY created_at DESC LIMIT 20").all(id).map((row) => ({ topicId: String(row.topic_id), createdAt: Number(row.created_at), ...JSON.parse(String(row.result)) as QuizResult }))
}

function inputText(value: unknown, min: number, max: number) {
  if (typeof value !== "string" || value.trim().length < min || value.trim().length > max) throw new ApiError(`Preencha o texto com ${min} a ${max} caracteres.`)
  return value.trim()
}

function checkPostingLimit(id: string, table: "posts" | "campaigns") {
  const count = db().prepare(`SELECT COUNT(*) AS count FROM ${table} WHERE profile_id = ? AND created_at > ?`).get(id, Date.now() - 60 * 60 * 1000)!
  if (Number(count.count) >= 10) throw new ApiError("Limite de publicações atingido. Tente novamente em uma hora.", 429)
}

export function createPost(id: string, input: unknown) {
  const message = inputText((input as { message?: unknown } | null)?.message, 3, 600)
  checkPostingLimit(id, "posts")
  db().prepare("INSERT INTO posts (profile_id, message, created_at) VALUES (?, ?, ?)").run(id, message, Date.now())
  return hub(id)
}

export function createCampaign(id: string, input: unknown) {
  const data = input as { title?: unknown; description?: unknown } | null
  const title = inputText(data?.title, 3, 100)
  const description = inputText(data?.description, 10, 1000)
  checkPostingLimit(id, "campaigns")
  db().prepare("INSERT INTO campaigns (profile_id, title, description, created_at) VALUES (?, ?, ?, ?)").run(id, title, description, Date.now())
  return hub(id)
}

export function joinCampaign(id: string, input: unknown) {
  const campaignId = (input as { campaignId?: unknown } | null)?.campaignId
  if (typeof campaignId !== "number" || !Number.isSafeInteger(campaignId) || !db().prepare("SELECT id FROM campaigns WHERE id = ?").get(campaignId)) throw new ApiError("Campanha não encontrada.", 404)
  db().prepare("INSERT OR IGNORE INTO participation (campaign_id, profile_id) VALUES (?, ?)").run(campaignId, id)
  return hub(id)
}

export function hub(id: string): HubData {
  const database = db()
  const ranking = database.prepare("SELECT id, total_xp, total_quizzes, ROW_NUMBER() OVER (ORDER BY total_xp DESC, total_quizzes DESC, id) AS position FROM profiles WHERE total_quizzes > 0 OR total_xp > 0 ORDER BY position LIMIT 20").all().map((row) => ({ position: Number(row.position), name: row.id === id ? "Você" : `Estudante ${row.position}`, totalXp: Number(row.total_xp), totalQuizzes: Number(row.total_quizzes), isYou: row.id === id }))
  const posts = database.prepare("SELECT id, profile_id, message, created_at FROM posts ORDER BY id DESC LIMIT 30").all().map((row) => ({ id: Number(row.id), message: String(row.message), createdAt: Number(row.created_at), isYou: row.profile_id === id }))
  const campaigns = database.prepare("SELECT c.*, (SELECT COUNT(*) FROM participation WHERE campaign_id = c.id) AS participants, EXISTS(SELECT 1 FROM participation WHERE campaign_id = c.id AND profile_id = ?) AS joined FROM campaigns c ORDER BY c.id DESC LIMIT 30").all(id).map((row) => ({ id: Number(row.id), title: String(row.title), description: String(row.description), participants: Number(row.participants), joined: Boolean(row.joined) }))
  const count = (sql: string) => Number(database.prepare(sql).get()!.count)
  return { ranking, posts, campaigns, impact: {
    learners: count("SELECT COUNT(*) AS count FROM profiles WHERE total_quizzes > 0 OR EXISTS(SELECT 1 FROM lessons WHERE profile_id = profiles.id)"),
    quizzes: count("SELECT COUNT(*) AS count FROM attempts WHERE result IS NOT NULL"),
    lessons: count("SELECT COUNT(*) AS count FROM lessons"), campaigns: count("SELECT COUNT(*) AS count FROM campaigns"), participations: count("SELECT COUNT(*) AS count FROM participation"),
  } }
}
