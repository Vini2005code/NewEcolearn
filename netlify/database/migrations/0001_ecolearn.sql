CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY, name TEXT NOT NULL DEFAULT 'Estudante Ecolearn',
  best_score INTEGER NOT NULL DEFAULT 0, total_quizzes INTEGER NOT NULL DEFAULT 0,
  total_xp INTEGER NOT NULL DEFAULT 0, migrated INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS attempts (
  id TEXT PRIMARY KEY, profile_id TEXT NOT NULL REFERENCES profiles(id),
  topic_id TEXT NOT NULL, created_at BIGINT NOT NULL, result TEXT
);
CREATE INDEX IF NOT EXISTS attempts_profile ON attempts(profile_id, created_at);
CREATE TABLE IF NOT EXISTS lessons (
  profile_id TEXT NOT NULL REFERENCES profiles(id), course_id TEXT NOT NULL,
  lesson_id TEXT NOT NULL, PRIMARY KEY (profile_id, course_id, lesson_id)
);
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY, profile_id TEXT NOT NULL REFERENCES profiles(id),
  message TEXT NOT NULL, created_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS campaigns (
  id BIGSERIAL PRIMARY KEY, profile_id TEXT NOT NULL REFERENCES profiles(id),
  title TEXT NOT NULL, description TEXT NOT NULL, created_at BIGINT NOT NULL
);
CREATE TABLE IF NOT EXISTS participation (
  campaign_id BIGINT NOT NULL REFERENCES campaigns(id), profile_id TEXT NOT NULL REFERENCES profiles(id),
  PRIMARY KEY (campaign_id, profile_id)
);
