CREATE TABLE cv_templates (
  template_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  template_name VARCHAR(150) NOT NULL,
  template_type VARCHAR(30) NOT NULL DEFAULT 'ats'
    CHECK (template_type IN ('ats','creative','portfolio')),
  is_premium BOOLEAN NOT NULL DEFAULT FALSE,
  template_config JSONB NOT NULL DEFAULT '{}'::jsonb,
  template_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (template_status IN ('active','inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cvs (
  cv_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  template_id BIGINT REFERENCES cv_templates(template_id) ON DELETE SET NULL,
  cv_title VARCHAR(180) NOT NULL,
  cv_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  exported_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_cvs_user_id ON cvs(user_id);

CREATE TABLE portfolios (
  portfolio_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  title VARCHAR(180) NOT NULL,
  description TEXT, slug VARCHAR(180) UNIQUE,
  visibility VARCHAR(20) NOT NULL DEFAULT 'private'
    CHECK (visibility IN ('private','unlisted','public')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_portfolios_user_id ON portfolios(user_id);

CREATE TABLE portfolio_projects (
  project_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  portfolio_id BIGINT NOT NULL REFERENCES portfolios(portfolio_id) ON DELETE CASCADE,
  project_name VARCHAR(180) NOT NULL,
  description TEXT, project_url TEXT, repository_url TEXT, image_url TEXT,
  start_date DATE, end_date DATE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);

CREATE TABLE skills (
  skill_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  skill_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE user_skills (
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  skill_id BIGINT NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
  proficiency VARCHAR(20) CHECK (proficiency IS NULL OR proficiency IN ('beginner','intermediate','advanced','expert')),
  PRIMARY KEY (user_id,skill_id)
);