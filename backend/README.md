# Backend - SHINRAI API & Services

Core backend services for the SHINRAI platform handling authentication, complaint management, escalation, SLA tracking, and notifications.

## Backend Architecture

### 1. Authentication Service
**Location**: `./authentication/`

Handles:
- User registration & login
- JWT token generation & validation
- OAuth2 integration
- Role-based access control (RBAC)
- Session management
- Password reset & security

**API Endpoints**:
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/forgot-password
GET    /auth/verify-email/:token
```

### 2. Complaint APIs
**Location**: `./complaint-apis/`

Core complaint/issue management:
- Create, read, update, delete complaints
- Bulk operations
- Search & filtering
- Complaint history tracking
- Status transitions
- Priority management

**API Endpoints**:
```
GET    /api/complaints
POST   /api/complaints
GET    /api/complaints/:id
PUT    /api/complaints/:id
DELETE /api/complaints/:id
POST   /api/complaints/:id/status
POST   /api/complaints/:id/priority
GET    /api/complaints/:id/history
```

### 3. Escalation Engine
**Location**: `./escalation-engine/`

Automatic escalation workflows:
- Rule-based escalation logic
- Priority elevation
- Department routing
- Supervisor notifications
- Escalation tracking
- Custom escalation rules

**Key Features**:
- Time-based escalation
- Severity-based escalation
- Inactivity escalation
- Manual escalation option

### 4. SLA Engine
**Location**: `./sla-engine/`

Service Level Agreement management:
- SLA definition & configuration
- Compliance tracking
- Breach alerts
- SLA metrics & reporting
- Historical SLA data

**Metrics Tracked**:
- First response time
- Resolution time
- Overall SLA compliance %

### 5. Notifications Service
**Location**: `./notifications/`

Multi-channel notifications:
- Email notifications
- SMS alerts
- Push notifications (mobile)
- In-app notifications
- Notification preferences
- Delivery tracking

**Notification Types**:
- Issue created
- Status updated
- SLA breach warning
- Escalation alert
- Comment on issue
- Resolution notification

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js / Fastify
- **Language**: JavaScript/TypeScript
- **Database**: PostgreSQL + Redis
- **Authentication**: JWT, OAuth2
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest, Supertest
- **Logging**: Winston, Morgan
- **Message Queue**: Redis Queue / RabbitMQ

## Installation & Setup

### Prerequisites
```bash
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or yarn
```

### Quick Start
```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Run migrations
npm run migrate

# Start development server
npm run dev

# Start production server
npm start
```

### Development
```bash
# Watch mode
npm run dev

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Format code
npm run format
```

## API Documentation

### Request/Response Format

**Request**:
```json
{
  "headers": {
    "Authorization": "Bearer <jwt_token>",
    "Content-Type": "application/json"
  },
  "body": {
    "field": "value"
  }
}
```

**Response**:
```json
{
  "status": "success",
  "data": {...},
  "timestamp": "2026-05-13T10:30:00Z"
}
```

### Error Handling
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Detailed error message",
    "details": {...}
  }
}
```

## Environment Variables

```env
# Server
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=shinrai
DB_USER=postgres
DB_PASSWORD=password

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-password

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token

# Frontend
FRONTEND_URL=http://localhost:3000
```

## Database Schema

### Core Tables
- `users` - User accounts & profiles
- `complaints` - Issue records
- `departments` - Campus departments
- `escalations` - Escalation history
- `sla_definitions` - SLA configurations
- `notifications` - Notification logs
- `audit_logs` - System audit trail

## Deployment

### Docker
```bash
docker build -t shinrai-backend .
docker run -p 3000:3000 shinrai-backend
```

### Docker Compose
```bash
docker-compose up
```

### Kubernetes
```bash
kubectl apply -f deployment/
```

## Monitoring & Logging

- **Logs**: Winston (file + console)
- **Metrics**: Prometheus + Grafana
- **Tracing**: Jaeger
- **Health Check**: `/health` endpoint

## Security

✅ JWT Authentication
✅ HTTPS/TLS Encryption
✅ CORS Protection
✅ Rate Limiting
✅ SQL Injection Prevention
✅ XSS Protection
✅ CSRF Protection
✅ Audit Logging

---

**Status**: 🔄 In Development
**Next**: Complete authentication & API implementation
