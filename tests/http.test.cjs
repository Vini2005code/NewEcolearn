const { test, before, after } = require('node:test')
const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const { mkdtempSync, rmSync } = require('node:fs')
const { join } = require('node:path')
const { tmpdir } = require('node:os')
const { setTimeout: delay } = require('node:timers/promises')
const folder = mkdtempSync(join(tmpdir(), 'ecolearn-http-'))
const base = 'http://127.0.0.1:3107'
let server
let log = ''
let cookie

before(async () => {
  server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', '3107', '-H', '127.0.0.1'], { cwd: process.cwd(), env: { ...process.env, ECOLEARN_DB_PATH: join(folder, 'http.sqlite') }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] })
  server.stdout.on('data', chunk => { log += chunk })
  server.stderr.on('data', chunk => { log += chunk })
  for (let count = 0; count < 100; count++) {
    if (server.exitCode !== null) throw new Error(log)
    try { const response = await fetch(base + '/api/profile'); if (response.ok) { cookie = response.headers.get('set-cookie').split(';')[0]; return } } catch {}
    await delay(100)
  }
  throw new Error('Servidor de teste não iniciou: ' + log)
})

after(async () => {
  if (server && server.exitCode === null) {
    const stopped = new Promise(resolve => server.once('exit', resolve))
    server.kill()
    await stopped
  }
  rmSync(folder, { recursive: true, force: true })
})

function post(path, body, headers = {}) {
  return fetch(base + '/api' + path, { method: 'POST', headers: { cookie, 'content-type': 'application/json', ...headers }, body: JSON.stringify(body) })
}

test('HTTP profile creates a private, persistent cookie and disables caching', async () => {
  const response = await fetch(base + '/api/profile', { headers: { cookie } })
  assert.equal(response.status, 200)
  assert.match(response.headers.get('cache-control'), /no-store/)
  assert.equal((await response.json()).totalXp, 0)
  const fresh = await fetch(base + '/api/profile')
  assert.match(fresh.headers.get('set-cookie'), /HttpOnly/i)
  assert.match(fresh.headers.get('set-cookie'), /SameSite=lax/i)
})

test('HTTP quiz result is graded and saved, and a retry does not duplicate XP', async () => {
  const started = await post('/quizzes/start', { topicId: 'saude-alimentar' })
  const attempt = await started.json()
  assert.equal(attempt.questions.length, 7)
  assert.equal(attempt.questions[0].correct, undefined)
  const payload = { attemptId: attempt.id, answers: [1, 1, 0, 2, 1, 1, 0], xpEarned: 90000 }
  const saved = await (await post('/quizzes/submit', payload)).json()
  assert.equal(saved.result.score, 100)
  assert.equal(saved.profile.totalXp, 175)
  const retry = await (await post('/quizzes/submit', payload)).json()
  assert.equal(retry.profile.totalQuizzes, 1)
  assert.equal(retry.profile.totalXp, 175)
})

test('HTTP rejects invalid input, cross origin writes, and access to another journey', async () => {
  assert.equal((await post('/quizzes/start', { topicId: 'missing' })).status, 404)
  assert.equal((await post('/quizzes/start', { topicId: 'animais' }, { origin: 'https://other.example' })).status, 403)
  assert.equal((await fetch(base + '/api/quizzes/start', { method: 'POST', headers: { cookie, 'content-type': 'application/json' }, body: '{' })).status, 400)
  assert.equal((await fetch(base + '/api/quizzes/start', { method: 'POST', body: '{}' })).status, 415)
  assert.equal((await fetch(base + '/api/missing', { headers: { cookie } })).status, 404)
  const attempt = await (await post('/quizzes/start', { topicId: 'animais' })).json()
  const foreign = await fetch(base + '/api/quizzes/submit', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ attemptId: attempt.id, answers: [2,1,0,1,0] }) })
  assert.equal(foreign.status, 404)
})
