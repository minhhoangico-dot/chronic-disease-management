@echo off
echo ==========================================
echo   Chronic Disease Management - Deploy Fix
echo ==========================================
echo.
echo 1. Initializing Git...
git init
git branch -M main

echo.
echo 2. Configuring Git Identity (Local)...
:: Setting temporary identity for this repo to allow commit
git config user.email "deploy@example.com"
git config user.name "Netlify Deploy"

echo.
echo 3. Adding files...
git add .

echo.
echo 4. Committing...
git commit -m "Fix deployment: Force push code"

echo.
echo 5. Configuring Remote...
:: Remove origin if it exists to avoid errors
git remote remove origin 2>nul
git remote add origin https://github.com/minhhoangico-dot/chronic-disease-management.git

echo.
echo 6. Pushing to GitHub (Force)...
git push -f origin main

echo.
echo ==========================================
echo   DONE! Your code is on GitHub.
echo   Netlify should start building automatically.
echo ==========================================
pause
