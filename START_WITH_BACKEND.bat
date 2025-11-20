@echo off
echo.
echo ================================================
echo   Starting TikTok Downloader Pro with Backend
echo ================================================
echo.
echo Starting backend server...
start /B node server/index.js

timeout /t 3 /nobreak >nul

echo Starting frontend...
npm start

pause
