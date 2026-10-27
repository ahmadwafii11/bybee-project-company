CREATE TABLE companies (
  company_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  industry VARCHAR(120), description TEXT, address TEXT, city VARCHAR(120),
  website_url TEXT, logo_url TEXT,
  company_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (company_status IN ('active','suspended','closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE company_members (
  member_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id BIGINT NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  user_id BIGINT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  position VARCHAR(120),
  member_role VARCHAR(30) NOT NULL DEFAULT 'hr'
    CHECK (member_role IN ('owner','admin','hr','recruiter')),
  member_status VARCHAR(20) NOT NULL DEFAULT 'active'
    CHECK (member_status IN ('invited','active','disabled')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (company_id,user_id)
);

CREATE TABLE company_verifications (
  verification_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  company_id BIGINT NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
  verification_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (verification_status IN ('pending','approved','rejected','needs_revision')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMPTZ,
  reviewed_by BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  notes TEXT, document_url TEXT
);