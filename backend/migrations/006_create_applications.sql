CREATE TABLE applications (
  application_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  job_id BIGINT NOT NULL REFERENCES jobs(job_id) ON DELETE RESTRICT,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  cv_id BIGINT REFERENCES cvs(cv_id) ON DELETE SET NULL,
  cover_letter TEXT,
  application_status VARCHAR(25) NOT NULL DEFAULT 'submitted'
    CHECK (application_status IN ('submitted','reviewing','shortlisted','interview','accepted','rejected','withdrawn')),
  applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (job_id,user_id)
);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_job_status ON applications(job_id,application_status);

CREATE TABLE application_status_history (
  history_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  application_id BIGINT NOT NULL REFERENCES applications(application_id) ON DELETE CASCADE,
  changed_by BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  old_status VARCHAR(25),
  new_status VARCHAR(25) NOT NULL
    CHECK (new_status IN ('submitted','reviewing','shortlisted','interview','accepted','rejected','withdrawn')),
  note TEXT,
  changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plans (
  plan_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plan_name VARCHAR(100) NOT NULL,
  target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('job_seeker','company')),
  billing_period VARCHAR(20) NOT NULL CHECK (billing_period IN ('free','monthly','yearly')),
  price NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'IDR',
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (plan_name,target_type,billing_period)
);
