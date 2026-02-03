# How to Run the Project Locally

The automated deployment script is currently blocked by system file locks and missing dependencies. Please follow these manual steps to start the application.

## Prerequisites

1.  **Restart Your Computer** (or fully restart VS Code):
    *   This is required to release the file locks on `node_modules` that are causing `npm install` errors (`EPERM`).
2.  **Start Docker Desktop**:
    *   Open Docker Desktop and ensure the engine is running.
    *   Verify by running `docker info` in a terminal.

## Steps to Run

### 1. Clean Environment
Once you have restarted, run the cleanup script to remove any corrupted dependency folders:

```powershell
.\cleanup.ps1
```

### 2. Install Dependencies & Start Staging
Run the automated deployment script again. It will now be able to install dependencies and start the Docker containers:

```powershell
.\deploy_staging.ps1
```

## Troubleshooting

### If `npm install` still fails:
Manually install dependencies in each folder:

```powershell
# Backend
cd src/backend
npm install
npm run dev

# Frontend (new terminal)
cd src/frontend
npm install
npm run dev
```

### If Docker fails:
Ensure no other services are using ports `5432` (Postgres) or `6379` (Redis).
