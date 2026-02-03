# Saleem Hotel Management System

## Overview
Develop "Saleem Hotel Management System" - a bilingual (English/Arabic), secure web application with demo/live functionality, subscription management, and integrated AI assistant.

## Features
- **Bilingual Support**: Full Arabic/English support with RTL/LTR layout switching.
- **Demo & Live Modes**: Automatic 7-day demo expiration with mock data.
- **Subscription Management**: 3 tiers (Starter, Pro, Enterprise) with crypto payment (USDT).
- **AI Integration**: "SaleemAI" assistant for hotel operations.
- **Security**: JWT authentication, Role-Based Access Control, and secure data isolation.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS (implied), i18next
- **Backend**: Node.js, Express, Sequelize
- **Database**: PostgreSQL, Redis
- **DevOps**: Docker, Nginx, GitHub Actions

## Quick Start
See [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) for detailed instructions.

### Prerequisites
- Docker & Docker Compose
- Node.js v18+

### Running Locally (Staging)
```powershell
.\deploy_staging.ps1
```
Or manually:
```bash
docker-compose up -d --build
```

## Documentation
- [Architecture](docs/architecture.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Security Protocol](docs/SECURITY_PROTOCOL.md)
- [QA Strategy](docs/QA_STRATEGY.md)
