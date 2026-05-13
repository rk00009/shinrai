# SHINRAI - University Civic Issue Resolution Platform

A comprehensive platform for managing and resolving civic issues within university campuses using AI-powered intelligence and modern dashboards.

## Project Architecture

```
SHINRAI
│
├── Frontend
│   ├── Student Dashboard      - Submit and track issues
│   ├── Faculty Dashboard      - Review and respond to issues
│   ├── Operational Dashboard  - Monitor resolution metrics
│   └── Admin Dashboard        - System administration & configuration
│
├── Backend
│   ├── Authentication         - User authentication & authorization
│   ├── Complaint APIs         - Issue management endpoints
│   ├── Escalation Engine      - Automatic escalation logic
│   ├── SLA Engine             - Service level agreement tracking
│   └── Notifications          - Email, SMS, push notifications
│
├── AI Engine
│   ├── NLP Models             - Text analysis & categorization
│   ├── Vision Models          - Image analysis & damage assessment
│   ├── Duplicate Detection    - Identify related/duplicate issues
│   └── Predictive Analytics   - Predict resolution time & outcomes
│
├── Database                   - PostgreSQL/MongoDB schemas
│
└── Deployment                 - Docker, K8s, CI/CD configs
```

## Quick Start

### Option 1: Local Frontend
```bash
cd frontend/student-dashboard
open index.html
```

### Option 2: Full Stack Development
```bash
# Backend
cd backend && npm install && npm start

# Frontend (separate terminal)
cd frontend/student-dashboard && npm install && npm start

# AI Engine
cd ai-engine && python setup.py && python main.py
```

### Option 3: Docker
```bash
docker-compose up
```

## Technology Stack

### Frontend
- HTML5, CSS3, ES6+ JavaScript
- Responsive Design
- Real-time Updates

### Backend
- Node.js / Express (or Python/Flask)
- RESTful APIs
- WebSocket for real-time events

### AI/ML
- Python (TensorFlow, PyTorch, Scikit-learn)
- NLP: Transformers, BERT, Spacy
- Vision: OpenCV, YOLOv8
- Analytics: Pandas, NumPy, Scikit-learn

### Database
- PostgreSQL (primary)
- Redis (caching)
- MongoDB (documents)

### Deployment
- Docker & Docker Compose
- Kubernetes (K8s)
- CI/CD (GitHub Actions, GitLab CI)
- AWS / Azure / GCP

## Key Features

✅ Multi-role Dashboard System
✅ AI-Powered Issue Analysis
✅ Automatic Escalation Workflows
✅ SLA Monitoring & Alerts
✅ Real-time Notifications
✅ Analytics & Reporting
✅ Mobile-Responsive UI
✅ Enterprise Security

## Documentation

- [Frontend Setup](./frontend/README.md)
- [Backend Setup](./backend/README.md)
- [AI Engine Documentation](./ai-engine/README.md)
- [Database Schema](./database/README.md)
- [Deployment Guide](./deployment/README.md)

## Status

🚀 **Phase 10 Completion** - Frontend dashboards completed
🔄 **In Progress** - Backend API integration
📋 **Planned** - AI engine & full-stack integration

## Contributors

- Product Team
- Development Team
- AI/ML Team
- DevOps Team

---

**Last Updated**: May 13, 2026
