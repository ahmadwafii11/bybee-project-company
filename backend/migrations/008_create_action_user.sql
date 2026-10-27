CREATE TABLE reports (
  report_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  reported_by BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  job_id BIGINT REFERENCES jobs(job_id) ON DELETE CASCADE,
  company_id BIGINT REFERENCES companies(company_id) ON DELETE CASCADE,
  reason VARCHAR(120) NOT NULL, details TEXT,
  report_status VARCHAR(20) NOT NULL DEFAULT 'open'
    CHECK (report_status IN ('open','investigating','resolved','dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMPTZ,
  CHECK (job_id IS NOT NULL OR company_id IS NOT NULL)
);

CREATE TABLE moderation_actions (
  action_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  report_id BIGINT REFERENCES reports(report_id) ON DELETE SET NULL,
  admin_user_id BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  target_type VARCHAR(30) NOT NULL CHECK (target_type IN ('job','company','user','portfolio')),
  target_id BIGINT NOT NULL,
  action_type VARCHAR(40) NOT NULL CHECK (action_type IN ('approve','reject','hide','restore','warn','suspend','unsuspend')),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
  audit_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_user_id BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  action VARCHAR(120) NOT NULL,
  entity_type VARCHAR(80) NOT NULL,
  entity_id VARCHAR(100),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  ip_address INET,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_audit_logs_actor_created ON audit_logs(actor_user_id,created_at);

-- Optional module: include only if landing-page services are in scope.
CREATE TABLE service_packages (
  service_package_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  package_name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  base_price NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (base_price >= 0),
  features JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE service_orders (
  service_order_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_user_id BIGINT REFERENCES users(user_id) ON DELETE SET NULL,
  company_id BIGINT REFERENCES companies(company_id) ON DELETE SET NULL,
  service_package_id BIGINT REFERENCES service_packages(service_package_id) ON DELETE SET NULL,
  service_name VARCHAR(150) NOT NULL,
  project_brief TEXT NOT NULL,
  agreed_price NUMERIC(14,2) NOT NULL CHECK (agreed_price >= 0),
  order_status VARCHAR(25) NOT NULL DEFAULT 'requested'
    CHECK (order_status IN ('requested','quoted','in_progress','review','completed','cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (customer_user_id IS NOT NULL OR company_id IS NOT NULL)
);

CREATE TABLE project_milestones (
  milestone_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  service_order_id BIGINT NOT NULL REFERENCES service_orders(service_order_id) ON DELETE CASCADE,
  milestone_name VARCHAR(150) NOT NULL,
  description TEXT, due_date DATE,
  milestone_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (milestone_status IN ('pending','in_progress','completed','blocked')),
  completed_at TIMESTAMPTZ
);