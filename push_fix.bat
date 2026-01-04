@echo off
echo ==========================================
echo   Chronic Disease Management - Build Fix
echo ==========================================
echo.
echo 1. Adding updated package files...
git add package.json package-lock.json

echo.
echo 2. Committing fix...
git commit -m "Fix build: Add @types/pg"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo   DONE! Netlify will rebuild now.
echo ==========================================
pause
