@echo off
echo ==========================================
echo   Chronic Disease Management - Push Fix
echo ==========================================
echo.
echo 1. Adding netlify.toml and other changes...
git add .

echo.
echo 2. Committing fix...
git commit -m "Add netlify.toml for Next.js runtime support"

echo.
echo 3. Pushing to GitHub...
git push origin main

echo.
echo ==========================================
echo   DONE! Netlify will rebuild with Next.js runtime.
echo ==========================================
pause
