# Deployment - SHINRAI Infrastructure & DevOps

Deployment configurations, CI/CD pipelines, and infrastructure-as-code for SHINRAI.

## Deployment Architecture

### Development
- Local development environment
- Docker Compose for local stack
- SQLite/PostgreSQL local instances

### Staging
- AWS EC2 / Azure VM instances
- PostgreSQL managed database
- Redis managed cache
- Staging domain

### Production
- Kubernetes cluster (AWS EKS / Azure AKS)
- CloudFlare CDN for frontend
- PostgreSQL managed database (RDS)
- Redis managed cache (ElastiCache)
- Auto-scaling groups
- Load balancers

## Docker & Docker Compose

### Docker Images
```
- shinrai-frontend:latest
- shinrai-backend:latest
- shinrai-ai-engine:latest
- shinrai-postgres:latest
- shinrai-redis:latest
```

### Local Development with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose up -d --build
```

### Production Docker Build

```bash
# Build frontend
docker build -f Dockerfile.frontend -t shinrai-frontend:1.0.0 .

# Build backend
docker build -f Dockerfile.backend -t shinrai-backend:1.0.0 .

# Build AI engine
docker build -f Dockerfile.ai -t shinrai-ai-engine:1.0.0 .

# Push to registry
docker push registry.example.com/shinrai-frontend:1.0.0
docker push registry.example.com/shinrai-backend:1.0.0
docker push registry.example.com/shinrai-ai-engine:1.0.0
```

## Kubernetes Deployment

### Cluster Setup
```bash
# Create EKS cluster
aws eks create-cluster --name shinrai-prod --version 1.28

# Configure kubectl
aws eks update-kubeconfig --region us-east-1 --name shinrai-prod

# Install Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
```

### Helm Charts
```
deployment/helm/
├── shinrai-frontend/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
├── shinrai-backend/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
└── shinrai-ai-engine/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
```

### Deploy with Helm
```bash
# Add Helm repository
helm repo add shinrai https://charts.shinrai.io

# Install release
helm install shinrai-prod shinrai/shinrai \
  --namespace shinrai-prod \
  --create-namespace \
  -f values-prod.yaml

# Upgrade release
helm upgrade shinrai-prod shinrai/shinrai \
  -f values-prod.yaml

# Rollback release
helm rollback shinrai-prod 1
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy SHINRAI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run tests
        run: npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker images
        run: docker build -t shinrai:${{ github.sha }} .
      - name: Push to registry
        run: docker push ${{ secrets.REGISTRY_URL }}/shinrai:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/shinrai-backend \
            shinrai-backend=${{ secrets.REGISTRY_URL }}/shinrai:${{ github.sha }}
```

### Pipeline Stages

1. **Lint & Format Check**
   - ESLint, Prettier, Black
   - YAML validation

2. **Unit Tests**
   - Frontend: Jest
   - Backend: Jest, Supertest
   - AI Engine: Pytest

3. **Integration Tests**
   - API endpoint tests
   - Database integration
   - AI model validation

4. **Build**
   - Docker image creation
   - Asset minification
   - Bundle analysis

5. **Push to Registry**
   - Docker Hub / AWS ECR / Azure ACR

6. **Deploy to Staging**
   - Automated deployment
   - Smoke tests
   - Performance tests

7. **Manual Approval**
   - QA verification
   - Stakeholder approval

8. **Deploy to Production**
   - Blue-green deployment
   - Canary releases
   - Rollback capability

## Environment Configuration

### Development (`.env.dev`)
```env
NODE_ENV=development
API_URL=http://localhost:3000
DATABASE_URL=postgresql://user:pass@localhost:5432/shinrai_dev
REDIS_URL=redis://localhost:6379
LOG_LEVEL=debug
```

### Staging (`.env.staging`)
```env
NODE_ENV=staging
API_URL=https://api-staging.shinrai.io
DATABASE_URL=postgresql://user:pass@shinrai-staging-db:5432/shinrai
REDIS_URL=redis://shinrai-staging-cache:6379
LOG_LEVEL=info
```

### Production (`.env.prod`)
```env
NODE_ENV=production
API_URL=https://api.shinrai.io
DATABASE_URL=postgresql://user:pass@shinrai-prod-db:5432/shinrai
REDIS_URL=redis://shinrai-prod-cache:6379
LOG_LEVEL=warn
```

## Monitoring & Alerting

### Prometheus Metrics
```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'shinrai-backend'
    static_configs:
      - targets: ['localhost:3000']
  - job_name: 'shinrai-ai-engine'
    static_configs:
      - targets: ['localhost:8000']
```

### Grafana Dashboards
- Application Performance
- API Latency & Errors
- Database Metrics
- AI Model Performance
- Infrastructure Health

### Alert Rules
```yaml
# alerts.yml
groups:
  - name: shinrai
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
      
      - alert: SLABreach
        expr: sla_breach_count > 0
        for: 1m
```

### Logging Stack
- Logs: ELK Stack (Elasticsearch, Logstash, Kibana)
- Tracing: Jaeger
- Metrics: Prometheus
- Events: EventBridge / CloudWatch

## Scaling

### Auto-scaling Rules
```yaml
# Kubernetes HPA
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: shinrai-backend
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: shinrai-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

## Disaster Recovery

### Backup Strategy
- Daily database backups (daily retention: 30 days)
- Weekly full backup (weekly retention: 12 weeks)
- Monthly archive backup (yearly retention)
- Geographically distributed replicas

### Recovery Time Objectives (RTO)
- Critical Systems: < 15 minutes
- Important Systems: < 1 hour
- Standard Systems: < 4 hours

### Recovery Point Objectives (RPO)
- Database: < 1 hour
- File Storage: < 4 hours

## Security in Deployment

✅ TLS/SSL Encryption
✅ Network Policies
✅ Pod Security Policies
✅ Secret Management (Vault/AWS Secrets Manager)
✅ RBAC (Role-Based Access Control)
✅ Network Segmentation
✅ DDoS Protection (CloudFlare)
✅ WAF Rules

## Cost Optimization

- Reserved Instances (30% savings)
- Spot Instances for non-critical workloads
- Auto-scaling based on demand
- Scheduled scaling (off-peak hours)
- Resource right-sizing
- Storage optimization

---

**Status**: 🔄 Infrastructure Setup & CI/CD Pipeline Development
**Next**: Production deployment & monitoring setup
