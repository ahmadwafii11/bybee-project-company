CREATE TABLE subscriptions (
  subscription_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  plan_id BIGINT NOT NULL REFERENCES plans(plan_id) ON DELETE RESTRICT,
  user_id BIGINT REFERENCES users(user_id) ON DELETE RESTRICT,
  company_id BIGINT REFERENCES companies(company_id) ON DELETE RESTRICT,
  subscription_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (subscription_status IN ('pending','active','expired','cancelled','past_due')),
  start_date TIMESTAMPTZ, end_date TIMESTAMPTZ,
  auto_renew BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK ((user_id IS NOT NULL AND company_id IS NULL) OR (user_id IS NULL AND company_id IS NOT NULL)),
  CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_company_id ON subscriptions(company_id);
CREATE INDEX idx_subscriptions_status_end_date ON subscriptions(subscription_status,end_date);

CREATE TABLE payments (
  payment_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  subscription_id BIGINT NOT NULL REFERENCES subscriptions(subscription_id) ON DELETE RESTRICT,
  amount NUMERIC(14,2) NOT NULL CHECK (amount >= 0),
  currency CHAR(3) NOT NULL DEFAULT 'IDR',
  payment_method VARCHAR(50), provider_name VARCHAR(80),
  transaction_reference VARCHAR(200) UNIQUE,
  payment_status VARCHAR(20) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending','paid','failed','refunded','cancelled')),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_payments_subscription_id ON payments(subscription_id);