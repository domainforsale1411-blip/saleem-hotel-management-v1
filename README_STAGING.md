# Staging Environment Setup

## Overview
This directory contains the configuration for the local staging environment using Docker Compose. It simulates the production deployment architecture.

## Architecture
- **Nginx (Gateway)**: Serves the Frontend (React) and proxies API requests.
- **Backend**: Node.js/Express application.
- **PostgreSQL**: Primary database.
- **Redis**: Caching layer.

## Deployment Instructions

### 1. Automated Deployment (Windows)
Run the provided PowerShell script:
```powershell
.\deploy_staging.ps1
```

### 2. Manual Deployment

**Step 1: Build Frontend**
```bash
cd src/frontend
npm install
npm run build
```

**Step 2: Start Containers**
```bash
docker-compose up -d --build
```

**Step 3: Seed Data (Optional)**
Populate the database with a test admin account (`admin@staging.com` / `password123`) and mock hotels.
```bash
# Run inside the backend container
docker-compose exec backend npm run seed
```

## Access Points
- **Web App**: http://localhost
- **API**: http://localhost/api/v1
- **API Docs**: http://localhost/api-docs
- **Database**: localhost:5432 (User: postgres / Pass: postgres)

## Configuration
- **Backend Config**: `src/backend/.env.staging`
- **Nginx Config**: `nginx/default.conf`
