const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { execFileSync } = require('node:child_process');
const folder = mkdtempSync(join(tmpdir(), 'ecolearn-test-'));
process.env.ECOLEARN_DB_PATH = join(folder, 'test.sqlite');
for (const key of ['DATABASE_URL', 'NETLIFY_DB_URL', 'NETLIFY', 'ECOLEARN_DATABASE', 'AWS_LAMBDA_FUNCTION_NAME']) delete process.env[key];
const service = require('../.test-build/server/service.js');
const { db } = require('../.test-build/server/db.js');
const { quizTopics } = require('../.test-build/quiz-data.js');
after(async () => { await (await db()).close(); rmSync(folder, { recursive: true, force: true }); });
test('visitor identity is isolated and recovers from its cookie', async () => {
    const first = await service.identify();
    const second = await service.identify();
    assert.notEqual(first.id, second.id);
    assert.equal((await service.identify(first.token)).id, first.id);
    assert.equal((await service.identify(first.token)).fresh, false);
    assert.equal((await service.profile(first.id)).totalXp, 0);
});
test('legacy progress is imported once without erasing accumulated values', async () => {
    const user = await service.identify();
    await service.migrate(user.id, { bestScore: 80, totalXp: 420, totalQuizzes: 3 });
    const saved = await service.migrate(user.id, { bestScore: 100, totalXp: 9000, totalQuizzes: 99 });
    assert.equal(saved.totalXp, 420);
    assert.equal(saved.totalQuizzes, 3);
    assert.equal(saved.bestScore, 80);
    await assert.rejects(async () => await service.migrate(user.id, { bestScore: 101, totalXp: -1, totalQuizzes: '3' }), service.ApiError);
});
test('food health has the exact seven answers supplied by the user', async () => {
    const topic = quizTopics.find(t => t.id === 'saude-alimentar');
    assert.deepEqual(topic.questions.map(q => String.fromCharCode(65 + q.correct)), ['B', 'B', 'A', 'C', 'B', 'B', 'A']);
    assert.equal(topic.questions.length, 7);
    assert.ok(topic.questions.every(q => q.options.length === 3));
});
test('every quiz is graded server side and duplicate submission awards XP only once', async () => {
    for (const topic of quizTopics) {
        const user = await service.identify();
        const attempt = await service.startAttempt(user.id, topic.id);
        assert.ok(attempt.questions.every(q => !('correct' in q)));
        const payload = { attemptId: attempt.id, answers: topic.questions.map(q => q.correct), score: 999, xpEarned: 999999 };
        const first = await service.submitAttempt(user.id, payload);
        assert.equal(first.result.score, 100);
        assert.equal(first.result.xpEarned, topic.questions.reduce((sum, q) => sum + q.xp, 0));
        assert.equal(first.profile.totalQuizzes, 1);
        const again = await service.submitAttempt(user.id, payload);
        assert.deepEqual(again, first);
        assert.equal((await service.history(user.id)).length, 1);
    }
});
test('wrong answers and timeouts earn no XP', async () => {
    const user = await service.identify();
    const attempt = await service.startAttempt(user.id, 'saude-alimentar');
    const saved = await service.submitAttempt(user.id, { attemptId: attempt.id, answers: [0, null, 1, 0, 0, 0, 1] });
    assert.equal(saved.result.score, 0);
    assert.equal(saved.profile.totalXp, 0);
    assert.equal(saved.result.review[1].selected, null);
});
test('malformed and foreign attempts cannot change progress; transaction rolls back', async () => {
    const user = await service.identify();
    const other = await service.identify();
    const attempt = await service.startAttempt(user.id, 'saude-alimentar');
    await assert.rejects(async () => await service.submitAttempt(other.id, { attemptId: attempt.id, answers: [] }), service.ApiError);
    for (const answers of [[], [1, 1, 0, 2, 1, 1, 3], [1, 1, 0, 2, 1, 1, 0.5]]) {
        await assert.rejects(async () => await service.submitAttempt(user.id, { attemptId: attempt.id, answers }), service.ApiError);
    }
    assert.equal((await service.profile(user.id)).totalQuizzes, 0);
    assert.equal((await service.submitAttempt(user.id, { attemptId: attempt.id, answers: [1, 1, 0, 2, 1, 1, 0] })).result.score, 100);
});
test('lesson completion persists once and rejects missing lessons', async () => {
    const user = await service.identify();
    const payload = { courseId: 'reciclagem', lessonId: 'separar' };
    await service.completeLesson(user.id, payload);
    assert.deepEqual((await service.completeLesson(user.id, payload)).courseLessons.reciclagem, ['separar']);
    await assert.rejects(async () => await service.completeLesson(user.id, { courseId: 'reciclagem', lessonId: 'fake' }), service.ApiError);
});
test('progress survives a new Node process', async () => {
    const user = await service.identify();
    await service.migrate(user.id, { bestScore: 80, totalXp: 500, totalQuizzes: 7 });
    const output = execFileSync(process.execPath, ['-e', `const s = require('./.test-build/server/service.js'); (async () => console.log(JSON.stringify(await s.profile(${JSON.stringify(user.id)}))))().catch(e => { console.error(e); process.exitCode = 1 })`], { cwd: process.cwd(), env: process.env, encoding: 'utf8' });
    assert.equal(JSON.parse(output.trim()).totalXp, 500);
});
test('community, campaigns and impact persist real activity without duplicate participation', async () => {
    const user = await service.identify();
    const other = await service.identify();
    await service.createPost(user.id, { message: 'Ideia de teste: separar embalagens.' });
    const campaignData = await service.createCampaign(user.id, { title: 'Coleta de teste', description: 'Organizar um ponto de coleta de materiais recicláveis.' });
    const campaignId = campaignData.campaigns[0].id;
    await service.joinCampaign(other.id, { campaignId });
    const repeated = await service.joinCampaign(other.id, { campaignId });
    assert.equal(repeated.campaigns[0].participants, 1);
    assert.equal(repeated.campaigns[0].joined, true);
    assert.equal((await service.hub(user.id)).campaigns[0].joined, false);
    assert.equal((await service.hub(user.id)).posts[0].isYou, true);
    assert.equal((await service.hub(other.id)).posts[0].isYou, false);
    assert.ok(repeated.impact.campaigns >= 1);
    assert.ok(repeated.impact.participations >= 1);
    await assert.rejects(async () => await service.joinCampaign(user.id, { campaignId: -1 }), service.ApiError);
    await assert.rejects(async () => await service.createPost(user.id, { message: '  ' }), service.ApiError);
    await assert.rejects(async () => await service.createCampaign(user.id, { title: 'A', description: '' }), service.ApiError);
});
test('quiz catalog matches server metadata and all referenced images exist', async () => {
    const catalog = require('../lib/quiz-catalog.json');
    const { existsSync } = require('node:fs');
    assert.equal(catalog.length, quizTopics.length);
    for (const topic of quizTopics) {
        const metadata = catalog.find(item => item.id === topic.id);
        assert.equal(metadata.questionCount, topic.questions.length);
        assert.equal(metadata.maxXp, topic.questions.reduce((sum, question) => sum + question.xp, 0));
        for (const image of [topic.image, ...topic.questions.map(q => q.image)])
            assert.ok(existsSync(join(process.cwd(), 'public', image)), image);
    }
});
