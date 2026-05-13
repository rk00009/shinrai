# Database - SHINRAI Data Layer

Core database schemas, migrations, and data management for the SHINRAI platform.

## Database Architecture

### Primary Database: PostgreSQL
- **Purpose**: Transactional data, relational integrity
- **Version**: 14+
- **Port**: 5432

### Cache Layer: Redis
- **Purpose**: Session cache, real-time data, message queue
- **Version**: 7+
- **Port**: 6379

### Optional: MongoDB
- **Purpose**: Document storage, flexible schemas
- **Version**: 5.0+
- **Port**: 27017

## Core Tables

### Users
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role ENUM('student', 'faculty', 'admin', 'operator'),
  department_id INTEGER,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Complaints/Issues
```sql
CREATE TABLE complaints (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100),
  priority ENUM('low', 'medium', 'high', 'critical'),
  status ENUM('open', 'assigned', 'in_progress', 'resolved', 'closed'),
  department_id INTEGER REFERENCES departments(id),
  assigned_to INTEGER REFERENCES users(id),
  location VARCHAR(255),
  image_urls TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  resolution_notes TEXT
);
```

### Departments
```sql
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  head_id INTEGER REFERENCES users(id),
  email VARCHAR(255),
  phone VARCHAR(20),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Escalations
```sql
CREATE TABLE escalations (
  id SERIAL PRIMARY KEY,
  complaint_id INTEGER NOT NULL REFERENCES complaints(id),
  from_user_id INTEGER REFERENCES users(id),
  to_user_id INTEGER REFERENCES users(id),
  reason VARCHAR(255),
  escalation_level INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);
```

### SLA Definitions
```sql
CREATE TABLE sla_definitions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  first_response_time_hours INTEGER,
  resolution_time_hours INTEGER,
  priority_level ENUM('low', 'medium', 'high', 'critical'),
  department_id INTEGER REFERENCES departments(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### SLA Tracking
```sql
CREATE TABLE sla_tracking (
  id SERIAL PRIMARY KEY,
  complaint_id INTEGER NOT NULL REFERENCES complaints(id),
  sla_id INTEGER NOT NULL REFERENCES sla_definitions(id),
  first_response_time TIMESTAMP,
  resolution_time TIMESTAMP,
  is_breach BOOLEAN DEFAULT false,
  breach_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Notifications
```sql
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  complaint_id INTEGER REFERENCES complaints(id),
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  channel ENUM('email', 'sms', 'push', 'in_app'),
  is_read BOOLEAN DEFAULT false,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP
);
```

### Audit Logs
```sql
CREATE TABLE audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id INTEGER,
  changes JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Indexes

```sql
-- Performance Indexes
CREATE INDEX idx_complaints_user_id ON complaints(user_id);
CREATE INDEX idx_complaints_department_id ON complaints(department_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);
CREATE INDEX idx_complaints_created_at ON complaints(created_at DESC);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at DESC);
```

## Migrations

### Running Migrations
```bash
# Run all pending migrations
npm run migrate

# Rollback last migration
npm run migrate:rollback

# Create new migration
npm run migrate:create -- --name create_users_table
```

### Migration File Structure
```
database/migrations/
├── 001_create_users_table.sql
├── 002_create_departments_table.sql
├── 003_create_complaints_table.sql
├── 004_create_escalations_table.sql
└── 005_add_indexes.sql
```

## Seeding

### Initial Data
```bash
npm run seed

# Seed specific file
npm run seed -- --file=seed/departments.sql
```

### Seed Files
```
database/seeds/
├── departments.sql
├── users.sql
├── sample_complaints.sql
└── sla_definitions.sql
```

## Backup & Recovery

### Backup
```bash
# Full backup
pg_dump shinrai > backup_$(date +%Y%m%d).sql

# Compressed backup
pg_dump shinrai | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restore
```bash
# From backup
psql shinrai < backup_20260513.sql

# From compressed backup
gunzip -c backup_20260513.sql.gz | psql shinrai
```

## Performance Tuning

### Query Optimization
```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM complaints WHERE status = 'open';

-- Vacuum and analyze
VACUUM ANALYZE;
```

### Connection Pooling
```
PgBouncer Configuration
pool_mode: transaction
min_pool_size: 10
default_pool_size: 25
max_pool_size: 100
```

## Security

✅ Row-Level Security (RLS)
✅ Column-Level Encryption
✅ Audit Logging
✅ Access Control Lists
✅ Data Masking
✅ Regular Backups

## Monitoring

```bash
# Database statistics
psql shinrai -c "SELECT * FROM pg_stat_statements;"

# Table sizes
psql shinrai -c "SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size FROM pg_tables ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

# Connection count
psql shinrai -c "SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;"
```

---

**Status**: 🔄 Schema Design & Migration Development
**Next**: Production deployment & optimization
