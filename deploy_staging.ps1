# Staging Deployment Script

Write-Host "🚀 Starting Staging Deployment..."

# 1. Build Frontend
Write-Host "📦 Building Frontend..."
Push-Location "src/frontend"
npm install
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend build failed!"
    Pop-Location
    exit 1
}
Pop-Location

# 2. Start Docker Containers
Write-Host "🐳 Starting Docker Containers..."
docker-compose up -d --build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker Compose failed!"
    exit 1
}

Write-Host "✅ Staging environment deployed successfully!"
Write-Host "🌍 Access at: http://localhost"
Write-Host "📘 API Docs at: http://localhost/api-docs"
