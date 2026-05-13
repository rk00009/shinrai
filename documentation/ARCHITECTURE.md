# SHINRAI Architecture Documentation

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     User Layer (Browsers)                       │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │  Student     │   Faculty    │ Operational  │    Admin     │  │
│  │  Dashboard   │  Dashboard   │  Dashboard   │  Dashboard   │  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
└──────────────────┬──────────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────────┐
│                    Presentation Layer (CDN)                     │
│  CloudFlare / AWS CloudFront (Static Assets)                    │
└──────────────────┬──────────────────────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────────────────────┐
│                    API Gateway Layer                            │
│  Load Balancer → API Gateway (Rate Limiting, Auth, Routing)    │
└──────────────────┬──────────────────────────────────────────────┘
                   │
       ┌───────────┼───────────┬─────────────┐
       │           │           │             │
┌──────▼───┐ ┌─────▼──┐ ┌─────▼──┐ ┌──────▼───┐
│ Auth     │ │Backend │ │  AI    │ │Real-time │
│ Service  │ │Services│ │Engine  │ │Services  │
└──────┬───┘ └─────┬──┘ └─────┬──┘ └──────┬───┘
       │           │           │             │
       └───────────┼───────────┼─────────────┘
                   │           │
           ┌───────┴────┬──────┴──────┐
           │            │             │
      ┌────▼──┐   ┌────▼───┐   ┌────▼──┐
      │  Data │   │ Cache  │   │Message│
      │ Store │   │ Layer  │   │ Queue │
      │  (DB) │   │(Redis) │   │(Redis)│
      └───────┘   └────────┘   └───────┘
```

## Component Details

### 1. Frontend Layer
- **Technology**: HTML5, CSS3, ES6+ JavaScript
- **Deployment**: CDN (CloudFlare)
- **Features**:
  - Responsive design
  - Real-time updates via WebSocket
  - Progressive enhancement
  - Offline support (Service Workers)
  - Accessibility compliance (WCAG 2.1 AA)

### 2. API Gateway
- **Technology**: AWS API Gateway / Nginx
- **Features**:
  - Request authentication
  - Rate limiting
  - Request/response transformation
  - CORS handling
  - API versioning

### 3. Backend Services (Microservices)

#### Authentication Service
- User registration/login
- JWT token management
- OAuth2 integration
- Session management

#### Complaint Management API
- CRUD operations
- Search and filtering
- Status management
- Attachment handling

#### Escalation Engine
- Rule-based escalation
- Automatic routing
- Notification triggering
- Audit trail

#### SLA Engine
- SLA definition & tracking
- Breach detection
- Metrics calculation
- Reporting

#### Notification Service
- Multi-channel delivery (Email, SMS, Push)
- Notification preferences
- Delivery tracking
- Retry logic

### 4. AI Engine
- **Technology**: Python, TensorFlow, PyTorch
- **Components**:
  - NLP for text analysis
  - Vision for image analysis
  - Duplicate detection
  - Predictive models

### 5. Data Layer
- **Primary**: PostgreSQL (transactional data)
- **Cache**: Redis (session, cache, queue)
- **Secondary**: MongoDB (documents)

### 6. Integration Points

#### Internal Communication
- REST APIs
- gRPC (for high-performance services)
- Message Queue (async operations)

#### External Integrations
- Email service (SMTP/SendGrid)
- SMS service (Twilio)
- Push notifications (Firebase)
- File storage (S3/Azure Blob)

## Data Flow

### Issue Submission Flow
```
1. User submits issue via Student Dashboard
2. Frontend validates input locally
3. POST /api/complaints (with JWT token)
4. Backend authenticates user
5. NLP engine categorizes complaint
6. Vision engine analyzes attachments
7. Duplicate detection checks for similar issues
8. Data stored in PostgreSQL
9. Cache updated in Redis
10. Notification sent to relevant department
11. Response sent to frontend
12. Real-time update via WebSocket
```

### Escalation Flow
```
1. SLA engine monitors complaint status
2. If SLA breach detected:
   - Alert sent to supervisor
   - Escalation rule applied
   - Issue reassigned
   - Notification triggered
   - Audit log created
3. Real-time dashboard update
```

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | HTML5, CSS3, JS | User interface |
| API | Node.js/Express | Backend services |
| AI/ML | Python, TensorFlow | Intelligence |
| Database | PostgreSQL | Primary data store |
| Cache | Redis | Performance optimization |
| Messaging | RabbitMQ/Redis | Async processing |
| Deployment | Docker, K8s | Container orchestration |
| Monitoring | Prometheus, Grafana | Observability |
| Logging | ELK Stack | Log aggregation |

## Security Architecture

### Authentication & Authorization
- JWT tokens with expiration
- OAuth2 for social login
- MFA support
- Role-based access control (RBAC)

### Data Protection
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- Database encryption
- API key management

### Network Security
- VPC isolation
- Network policies
- WAF protection
- DDoS mitigation

### Audit & Compliance
- All actions logged
- User activity tracking
- Data access audit
- Compliance reporting

## Scalability

### Horizontal Scaling
- Stateless services (no session affinity needed)
- Load balanced API servers
- Database read replicas
- CDN for static assets

### Vertical Scaling
- Resource allocation per service
- Auto-scaling based on metrics
- Cost optimization

### Performance Optimization
- Database query optimization
- Caching strategy (Redis)
- API response compression
- Image optimization

## Disaster Recovery

### Backup Strategy
- Daily incremental backups
- Weekly full backups
- Geo-redundant storage
- Point-in-time recovery

### Failover
- Database replication
- Multi-region deployment
- Load balancer health checks
- Automatic failover

## Monitoring & Observability

### Metrics
- Application performance
- API latency
- Database performance
- Resource utilization

### Logging
- Structured logging
- Log aggregation
- Search & analysis
- Alert triggers

### Tracing
- Distributed tracing
- Request flow visualization
- Performance bottleneck identification

---

**Last Updated**: May 13, 2026
