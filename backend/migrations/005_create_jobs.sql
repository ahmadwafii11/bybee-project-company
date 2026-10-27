CREATE TABLE job_categories (
  category_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  category_name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE jobs (
  job_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id BIGINT NOT NULL REFERENCES companies(company_id) ON DELETE RESTRICT,
  created_by BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  category_id BIGINT REFERENCES job_categories(category_id) ON DELETE SET NULL,
  job_title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  employment_type VARCHAR(30) CHECK (employment_type IS NULL OR employment_type IN ('full_time','part_time','contract','internship','freelance')),
  workplace_type VARCHAR(20) CHECK (workplace_type IS NULL OR workplace_type IN ('onsite','hybrid','remote')),
  location VARCHAR(200),
  salary_min NUMERIC(14,2), salary_max NUMERIC(14,2),
  currency CHAR(3) NOT NULL DEFAULT 'IDR',
  deadline DATE,
  job_status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CHECK (job_status IN ('draft','pending_review','published','closed','rejected')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (salary_min IS NULL OR salary_min >= 0),
  CHECK (salary_max IS NULL OR salary_max >= 0),
  CHECK (salary_min IS NULL OR salary_max IS NULL OR salary_max >= salary_min)
);
CREATE INDEX idx_jobs_company_id ON jobs(company_id);
CREATE INDEX idx_jobs_status_deadline ON jobs(job_status,deadline);
CREATE INDEX idx_jobs_category_id ON jobs(category_id);

CREATE TABLE job_skills (
  job_id BIGINT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
  skill_id BIGINT NOT NULL REFERENCES skills(skill_id) ON DELETE CASCADE,
  is_required BOOLEAN NOT NULL DEFAULT TRUE,
  PRIMARY KEY (job_id,skill_id)
);
