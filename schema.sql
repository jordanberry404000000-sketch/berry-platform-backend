-- ============================================
-- BERRY PLATFORM — DATABASE SCHEMA
-- Alerts + Infrastructure Metrics
-- ============================================

-- Security & Certs Alerts
CREATE TABLE IF NOT EXISTS alerts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  severity TEXT NOT NULL,      -- High / Medium / Low
  source TEXT NOT NULL,        -- Infrastructure / Security / Identity
  status TEXT NOT NULL,        -- Active / Resolved
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Infrastructure Metrics (optional history)
CREATE TABLE IF NOT EXISTS infrastructure_metrics (
  id SERIAL PRIMARY KEY,
  metric_type TEXT NOT NULL,   -- cpu / memory / disk / service / network
  value JSONB NOT NULL,        -- snapshot payload
  status TEXT NOT NULL,        -- OK / WARN / CRITICAL
  source TEXT NOT NULL DEFAULT 'Infrastructure',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Infrastructure Services (health table)
CREATE TABLE IF NOT EXISTS infrastructure_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,          -- service name
  status TEXT NOT NULL,        -- ONLINE / DEGRADED / OFFLINE
  uptime_percent REAL NOT NULL,
  last_heartbeat TIMESTAMP NOT NULL DEFAULT NOW()
);