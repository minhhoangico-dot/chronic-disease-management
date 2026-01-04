@echo off
echo ==========================================
echo   Chronic Disease Management - Push Fix
echo ==========================================
echo.
echo 1. Adding all changed files...
git add .

echo.
echo 2. Committing fix...
git commit -m "Fix build: Replace any types with interfaces"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo   DONE! Netlify will rebuild now.
echo ==========================================
pause
