const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { PGlite } = require('@electric-sql/pglite')
const service = require('../.test-build/server/service.js')
const { createPostgresDatabase, runWithDatabase, postgresSql } = require('../.test-build/server/db.js')
const { postgresSchema } = require('../.test-build/server/schema.js')
const { quizTopics } = require('../.test-build/quiz-data.js')
const engine = new PGlite()
const queries = []
const database = createPostgresDatabase({
  async query(sql, values) {
    queries.push(sql)
    return engine.query(sql, values)
  },
})
const run = operation => runWithDatabase(database, operation)
before(async () => {
  const migration = readFileSync('netlify/database/migrations/0001_ecolearn.sql', 'utf8')
  assert.equal(migration.trim(), postgresSchema.trim())
  await engine.exec(migration)
})
after(async () => { await engine.close() })

test('PostgreSQL creates profiles and preserves one-time legacy progress', () => run(async () => {
  const user = await service.identify()
  assert.equal((await service.identify(user.token)).id, user.id)
  await service.migrate(user.id, { bestScore: 80, totalXp: 420, totalQuizzes: 3 })
  assert.equal((await service.migrate(user.id, { bestScore: 100, totalXp: 999, totalQuizzes: 20 })).totalXp, 420)
}))

test('PostgreSQL grades all quizzes, locks the attempt and awards XP once', () => run(async () => {
  for (const topic of quizTopics) {
    const user = await service.identify()
    const attempt = await service.startAttempt(user.id, topic.id)
    const payload = { attemptId: attempt.id, answers: topic.questions.map(q => q.correct) }
    const first = await service.submitAttempt(user.id, payload)
    const second = await service.submitAttempt(user.id, payload)
    assert.equal(first.result.score, 100)
    assert.equal(second.profile.totalQuizzes, 1)
    assert.equal(second.profile.totalXp, topic.questions.reduce((sum, q) => sum + q.xp, 0))
    assert.ok((await service.history(user.id))[0].createdAt > 2_147_483_647)
  }
  assert.ok(queries.some(sql => sql.includes('FOR UPDATE')))
}))

test('PostgreSQL rolls back invalid and foreign submissions and allows later success', () => run(async () => {
  const user = await service.identify()
  const other = await service.identify()
  const attempt = await service.startAttempt(user.id, 'saude-alimentar')
  await assert.rejects(() => service.submitAttempt(other.id, { attemptId: attempt.id, answers: [] }), service.ApiError)
  await assert.rejects(() => service.submitAttempt(user.id, { attemptId: attempt.id, answers: [] }), service.ApiError)
  assert.equal(database.isTransaction, false)
  assert.equal((await service.profile(user.id)).totalXp, 0)
  assert.equal((await service.submitAttempt(user.id, { attemptId: attempt.id, answers: [1,1,0,2,1,1,0] })).result.score, 100)
}))

test('PostgreSQL persists courses, community and campaigns without duplicate participation', () => run(async () => {
  const user = await service.identify()
  const other = await service.identify()
  const lesson = { courseId: 'reciclagem', lessonId: 'separar' }
  await service.completeLesson(user.id, lesson)
  assert.deepEqual((await service.completeLesson(user.id, lesson)).courseLessons.reciclagem, ['separar'])
  await service.createPost(user.id, { message: 'Teste de PostgreSQL: separar recicláveis.' })
  const created = await service.createCampaign(user.id, { title: 'Coleta seletiva', description: 'Separar os resíduos para coleta na escola.' })
  const campaignId = created.campaigns[0].id
  await service.joinCampaign(other.id, { campaignId })
  const repeated = await service.joinCampaign(other.id, { campaignId })
  assert.equal(repeated.campaigns[0].participants, 1)
  assert.equal(repeated.campaigns[0].joined, true)
  assert.equal((await service.hub(user.id)).campaigns[0].joined, false)
  assert.equal(repeated.impact.lessons, 1)
  assert.ok(repeated.ranking.length > 0)
}))

test('PostgreSQL uses parameters and resolves insert conflicts without overwriting', () => {
  assert.equal(postgresSql('SELECT * FROM profiles WHERE id = ?'), 'SELECT * FROM profiles WHERE id = $1')
  assert.equal(postgresSql('INSERT OR IGNORE INTO lessons VALUES (?, ?, ?)'), 'INSERT INTO lessons VALUES ($1, $2, $3) ON CONFLICT DO NOTHING')
})
