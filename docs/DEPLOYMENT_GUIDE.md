# Deployment Guide

## Prerequisites
- Docker & Docker Compose
- Node.js v18+ (for local builds)
- Git

## Environment Variables
Create a `.env` file in `src/backend` based on `.env.example`:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=saleem_hotel
DB_USER=postgres
DB_PASSWORD=postgres

# JWT
JWT_SECRET=your_super_secret_key_change_in_prod
JWT_EXPIRE=7d

# Environment
NODE_ENV=production
PORT=3000
```

## Docker Deployment (Recommended)

The system uses Docker Compose to orchestrate the PostgreSQL database, Redis cache, and potentially the application services.

### 1. Start Infrastructure
```bash
docker-compose up -d postgres redis
```

### 2. Build & Run Backend
```bash
cd src/backend
npm install
npm start
```

### 3. Build Frontend
```bash
cd src/frontend
npm install
npm run build
# Serve the 'dist' folder using Nginx or a static server
```

## CI/CD Pipeline
The project is configured with GitHub Actions (`.github/workflows/main.yml`) for Continuous Integration.

### Triggers
- Pushes to `main` branch
- Pull Requests to `main` branch

### Stages
1. **Build**: Installs dependencies.
2. **Test**: Runs unit and integration tests (`npm test`).
3. **Lint**: Checks code quality.

## Production Checklist
- [ ] Change `JWT_SECRET` to a strong, random string.
- [ ] Set `NODE_ENV=production`.
- [ ] Enable SSL/TLS (HTTPS) using a reverse proxy (Nginx/Traefik).
- [ ] Update CORS origin to match your frontend domain.
- [ ] Ensure database passwords are not default.
