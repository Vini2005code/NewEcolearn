export interface Profile {
  name: string
  bestScore: number
  totalQuizzes: number
  totalXp: number
  migrated: boolean
  courseLessons: Record<string, string[]>
}

export interface PublicQuestion {
  id: number
  question: string
  image: string
  options: string[]
  xp: number
}

export interface QuizAttempt {
  id: string
  topicId: string
  questions: PublicQuestion[]
}

export interface QuizResult {
  score: number
  xpEarned: number
  correctCount: number
  review: { question: string; options: string[]; selected: number | null; correct: number }[]
}

export interface HubData {
  ranking: { position: number; name: string; totalXp: number; totalQuizzes: number; isYou: boolean }[]
  posts: { id: number; message: string; createdAt: number; isYou: boolean }[]
  campaigns: { id: number; title: string; description: string; participants: number; joined: boolean }[]
  impact: { learners: number; quizzes: number; lessons: number; campaigns: number; participations: number }
}
