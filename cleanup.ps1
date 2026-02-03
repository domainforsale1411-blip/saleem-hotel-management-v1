
Write-Host "🧹 Cleaning up node_modules..."

# Frontend
if (Test-Path "src\frontend\node_modules") {
    Write-Host "Removing src\frontend\node_modules..."
    Remove-Item -Path "src\frontend\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "src\frontend\package-lock.json") {
    Remove-Item -Path "src\frontend\package-lock.json" -Force -ErrorAction SilentlyContinue
}

# Backend
if (Test-Path "src\backend\node_modules") {
    Write-Host "Removing src\backend\node_modules..."
    Remove-Item -Path "src\backend\node_modules" -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "src\backend\package-lock.json") {
    Remove-Item -Path "src\backend\package-lock.json" -Force -ErrorAction SilentlyContinue
}

Write-Host "✅ Cleanup attempt finished. If errors persist, please restart VS Code and delete node_modules manually."
