const { test } = require('node:test')
const assert = require('node:assert/strict')
const { spawn } = require('node:child_process')
const { mkdtempSync, existsSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { join, resolve } = require('node:path')
const { setTimeout: delay } = require('node:timers/promises')

test('Netlify runtime never falls back to SQLite when PostgreSQL is not configured', async () => {
  const folder = mkdtempSync(join(tmpdir(), 'ecolearn-netlify-'))
  const sqlitePath = join(folder, 'must-not-be-created.sqlite')
  const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', '3108', '-H', '127.0.0.1'], {
    cwd: process.cwd(), windowsHide: true, stdio: 'ignore',
    env: { ...process.env, DATABASE_URL: '', NETLIFY_DB_URL: '', NETLIFY_DB_DRIVER: '', NETLIFY: 'true', ECOLEARN_DATABASE: '', AWS_LAMBDA_FUNCTION_NAME: 'ecolearn-netlify-test', ECOLEARN_DB_PATH: sqlitePath },
  })
  try {
    let response
    for (let retry = 0; retry < 100; retry++) {
      if (server.exitCode !== null) throw new Error('Servidor de teste encerrou antes da validação.')
      try { response = await fetch('http://127.0.0.1:3108/api/profile'); break } catch {}
      await delay(100)
    }
    assert.ok(response)
    assert.equal(response.status, 503)
    assert.match((await response.json()).error, /Netlify Database/)
    assert.equal(existsSync(sqlitePath), false)
  } finally {
    if (server.exitCode === null) {
      const stopped = new Promise(resolve => server.once('exit', resolve))
      server.kill()
      await stopped
    }
    assert.ok(resolve(folder).startsWith(resolve(tmpdir()) + require('node:path').sep))
    rmSync(folder, { recursive: true, force: true })
  }
})
