# SHINRAI Tech Stack

## Final Technology Selections

Your recommended tech stack for production-grade SHINRAI platform.

---

## Frontend Stack

### Framework: Next.js 14

**Why Next.js?**
- ✅ Server-side rendering (SSR) for performance
- ✅ Built-in optimization (images, fonts)
- ✅ API routes (no separate backend needed for simple routes)
- ✅ TypeScript support out of the box
- ✅ Vercel deployment ready
- ✅ Incremental Static Regeneration (ISR)

**Version**: 14.0+
**Language**: TypeScript
**Package Manager**: pnpm (faster than npm)

### Styling: Tailwind CSS

**Why Tailwind?**
- ✅ Utility-first approach (faster development)
- ✅ Small bundle size (only used utilities)
- ✅ Mobile-first responsive design
- ✅ Built-in dark mode support
- ✅ Consistent design system
- ✅ PurgeCSS automatic

**Version**: 3.3+
**Plugins**: Headless UI, Forms, Typography

### State Management: Zustand

**Why Zustand?**
- ✅ Minimal boilerplate (vs Redux)
- ✅ TypeScript friendly
- ✅ Devtools support
- ✅ Middleware support
- ✅ Smaller bundle size

**Alternative**: Jotai (if atomic state needed)

### HTTP Client: TanStack Query

**Why React Query?**
- ✅ Server state management
- ✅ Automatic caching
- ✅ Retry logic
- ✅ Background refetching
- ✅ DevTools for debugging

**Version**: 5.0+ (TanStack Query)

### Real-time Communication: Socket.io

**Why Socket.io?**
- ✅ WebSocket with fallbacks
- ✅ Auto-reconnection
- ✅ Broadcasting support
- ✅ Room management
- ✅ Event-based API

**Use Cases**:
- Real-time status updates
- Live notifications
- Collaborative editing (notes)
- Live user presence

### Testing: Vitest + Playwright

**Vitest**: Unit & integration tests
**Playwright**: E2E tests

### Build Tool: Vite

Next.js handles this, but for libraries use Vite.

---

## Backend Stack

### Runtime: Node.js 20 LTS

**Why Node.js?**
- ✅ JavaScript ecosystem
- ✅ Event-driven architecture
- ✅ Great for I/O operations
- ✅ npm ecosystem massive
- ✅ Can share code with frontend

**Version**: 20.x LTS (long-term support)

### Framework: Express.js with TypeScript

**Why Express?**
- ✅ Minimalist & flexible
- ✅ Largest middleware ecosystem
- ✅ Easy to learn
- ✅ Great performance
- ✅ Mature & stable

**Alternative**: Fastify (if pure performance needed)

**TypeScript**: Always use TypeScript in production

### API Documentation: Swagger/OpenAPI

**Tool**: Swagger UI + @nestjs/swagger (or manual)

### Validation: Zod or Joi

**Zod**: TypeScript-first schema validation
**Joi**: More mature, robust

**Recommendation**: Zod (better TypeScript integration)

### Middleware Stack

```
Express Middleware Order:

1. cors() - Handle CORS
2. helmet() - Security headers
3. compression() - Gzip compression
4. morgan() - Request logging
5. express.json() - Parse JSON
6. express.urlencoded() - Parse URL params
7. authenticateToken() - JWT validation
8. errorHandler() - Error handling
```

### Authentication: JWT + Passport.js

**JWT**: Token-based authentication
**Passport.js**: OAuth2, Google, Microsoft integrations

**Tokens**:
- Access token: 1 hour expiry
- Refresh token: 7 days expiry

### Authorization: Role-Based Access Control (RBAC)

```javascript
// Middleware example
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
};

// Usage
router.post('/admin/users', authorize(['admin']), createUser);
```

### Logging: Winston

**Why Winston?**
- ✅ Multi-transport logging
- ✅ Log levels (error, warn, info, debug)
- ✅ File rotation
- ✅ JSON formatting
- ✅ Production-ready

### Error Handling: Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
```

### Environment Variables: dotenv

```
.env.local
.env.development
.env.staging
.env.production
```

---

## Database Stack

### Primary Database: PostgreSQL 14+

**Why PostgreSQL?**
- ✅ ACID compliance
- ✅ JSON support (JSONB)
- ✅ Full-text search
- ✅ Spatial data (PostGIS)
- ✅ Open source, free
- ✅ Enterprise-grade

**ORM**: Prisma or TypeORM

**Recommendation**: Prisma
- ✅ Type-safe queries
- ✅ Auto-migrations
- ✅ Intuitive API
- ✅ Great TypeScript support

### Cache Layer: Redis

**Use Cases**:
- Session storage
- Rate limiting
- Real-time data
- Background job queue
- Pub/sub for notifications

**Version**: 7.0+

**Client**: ioredis

```javascript
import Redis from 'ioredis';
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});
```

### Message Queue: Bull (Redis-based)

**Why Bull?**
- ✅ Built on Redis
- ✅ Job persistence
- ✅ Retry logic
- ✅ Job priority
- ✅ Processing queue
- ✅ Event-driven

**Use Cases**:
- Send emails asynchronously
- Process images
- Generate reports
- AI model inference
- Database cleanup jobs

### Search: PostgreSQL Full-Text Search (initially)

**Later**: Consider Elasticsearch if needed

---

## AI/ML Stack

### Language: Python 3.10+

**Why separate from Node.js?**
- ✅ ML libraries are mature
- ✅ NumPy, Pandas performance
- ✅ PyTorch, TensorFlow standard
- ✅ Better for GPU computing

### API Framework: FastAPI

**Why FastAPI?**
- ✅ High performance (async)
- ✅ Automatic API docs (Swagger)
- ✅ Type hints (validation)
- ✅ Easy deployment
- ✅ Modern Python

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.post("/ai/categorize")
async def categorize_complaint(text: str):
    category = nlp_model.predict(text)
    return {"category": category}
```

### ML Libraries

**NLP**: Transformers, Hugging Face
```python
from transformers import pipeline
classifier = pipeline("zero-shot-classification", model="bert-base-multilingual-uncased")
```

**Computer Vision**: YOLOv8, OpenCV
```python
from ultralytics import YOLO
model = YOLO("yolov8m.pt")
results = model.predict(image_path)
```

**Duplicate Detection**: Sentence Transformers
```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(texts)
```

**Predictive Analytics**: Scikit-learn, XGBoost
```python
from xgboost import XGBRegressor
model = XGBRegressor(n_estimators=100, max_depth=6)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
```

### Model Serving: TensorFlow Serving (if needed)

For high-throughput model inference, use TensorFlow Serving or TorchServe.

### GPU Support: CUDA 11.8+

For faster inference and training on GPUs.

---

## Deployment & DevOps Stack

### Containerization: Docker

```dockerfile
# Frontend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```dockerfile
# Backend Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

```dockerfile
# AI Engine Dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```

### Orchestration: Kubernetes (k8s)

**Why Kubernetes?**
- ✅ Auto-scaling
- ✅ Load balancing
- ✅ Rolling updates
- ✅ Health checks
- ✅ Industry standard

### Managed Kubernetes: EKS (AWS) or AKS (Azure)

### Package Manager: Helm

For deploying to Kubernetes.

### CI/CD: GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: docker build -t shinrai:latest .
      - run: docker push registry/shinrai:latest
      
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl set image deployment/shinrai ...
```

### Infrastructure as Code: Terraform

```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_eks_cluster" "shinrai" {
  name            = "shinrai-prod"
  version         = "1.28"
  role_arn        = aws_iam_role.cluster.arn
}
```

### Monitoring: Prometheus + Grafana

**Prometheus**: Metrics collection
**Grafana**: Metrics visualization

### Logging: ELK Stack (Elasticsearch, Logstash, Kibana)

Alternative: Datadog, New Relic

### Application Performance Monitoring (APM): Jaeger

For distributed tracing.

---

## File Storage

### Cloud Storage: AWS S3 or Azure Blob Storage

For complaint images and documents.

```javascript
import AWS from 'aws-sdk';
const s3 = new AWS.S3();

const params = {
  Bucket: 'shinrai-complaints',
  Key: `complaints/${complaintId}/${filename}`,
  Body: fileBuffer
};

s3.upload(params, (err, data) => {
  if (err) console.log(err);
  else console.log('Upload success:', data);
});
```

### CDN: CloudFlare or AWS CloudFront

For fast image delivery globally.

---

## Security Stack

### Secrets Management: AWS Secrets Manager or HashiCorp Vault

Never commit secrets to git.

```javascript
// Load from secrets manager, not .env
const secrets = await secretsManager.getSecret('shinrai/prod');
const dbPassword = secrets.password;
```

### SSL/TLS: Let's Encrypt

Automatic certificate management.

### API Security: Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### CORS: Express CORS

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

---

## Technology Stack Summary Table

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Frontend** | Next.js + TypeScript | 14+ | SSR, optimization |
| **Styling** | Tailwind CSS | 3.3+ | Utility-first, fast |
| **State** | Zustand | Latest | Minimal boilerplate |
| **Real-time** | Socket.io | 4.5+ | WebSocket fallback |
| **Testing** | Vitest + Playwright | Latest | Fast + reliable |
| **Backend** | Express + TypeScript | 4.18+ | Flexible, mature |
| **API Docs** | Swagger/OpenAPI | 3.0+ | Standard |
| **Validation** | Zod | Latest | Type-safe |
| **Auth** | JWT + Passport | Latest | Token-based |
| **Database** | PostgreSQL | 14+ | ACID, robust |
| **ORM** | Prisma | 5.0+ | Type-safe |
| **Cache** | Redis | 7.0+ | Fast, reliable |
| **Queue** | Bull | Latest | Job processing |
| **AI Framework** | FastAPI | Latest | High performance |
| **ML Libs** | Transformers, YOLOv8 | Latest | SOTA models |
| **Deployment** | Docker | Latest | Containerization |
| **Orchestration** | Kubernetes | 1.28+ | Auto-scaling |
| **CI/CD** | GitHub Actions | Latest | Native to GitHub |
| **Monitoring** | Prometheus + Grafana | Latest | Observability |
| **Logging** | Winston + ELK | Latest | Centralized logs |
| **Storage** | AWS S3 | Latest | Scalable storage |
| **CDN** | CloudFlare | Latest | Global delivery |

---

## Development Environment Setup

```bash
# Frontend
npm create next-app@latest shinrai-frontend --typescript --tailwind

# Backend
mkdir shinrai-backend
cd shinrai-backend
npm init -y
npm install express typescript ts-node @types/express @types/node

# AI Engine
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn transformers torch torchvision
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────────┐
│         Internet / Users                     │
└─────────────────────┬────────────────────────┘
                      │
┌─────────────────────▼────────────────────────┐
│         CloudFlare CDN                       │
│    (SSL, DDoS Protection, Caching)          │
└─────────────────────┬────────────────────────┘
                      │
┌─────────────────────▼────────────────────────┐
│      AWS Application Load Balancer           │
│         (Route 53 DNS)                       │
└──┬─────────────────────────────────────────┬─┘
   │                                         │
┌──▼──────────────┐          ┌──────────────▼─┐
│  EKS Cluster    │          │  RDS Database   │
│  (Kubernetes)   │          │  (PostgreSQL)   │
│                 │          │                 │
│ ┌─────────────┐ │          └─────────────────┘
│ │Next.js Pod  │ │
│ └─────────────┘ │          ┌─────────────────┐
│                 │          │  ElastiCache    │
│ ┌─────────────┐ │          │  (Redis)        │
│ │Express Pod  │ │          └─────────────────┘
│ └─────────────┘ │
│                 │          ┌─────────────────┐
│ ┌─────────────┐ │          │  S3 Bucket      │
│ │FastAPI Pod  │ │          │  (Images)       │
│ └─────────────┘ │          └─────────────────┘
└─────────────────┘
```

---

**Status**: ✅ Complete
**Last Updated**: May 13, 2026
**Approval**: Recommended for Phase 3 onwards
