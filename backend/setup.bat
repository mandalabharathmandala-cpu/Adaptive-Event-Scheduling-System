@echo off
REM EventFlow Backend Setup Script for Windows

echo ====================================
echo EventFlow - Backend Complete Setup
echo ====================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from: https://nodejs.org/
    echo - Download the LTS version (recommended)
    echo - Run the installer
    echo - Restart this terminal after installation
    echo.
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo.

REM Check if npm is available
echo Checking for npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available!
    pause
    exit /b 1
)

echo npm found:
npm --version
echo.

REM Install dependencies
echo Installing npm dependencies...
echo This may take a few minutes...
echo.
call npm install

if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Set up MySQL database (see BACKEND_SETUP.md)
echo 2. Create .env file with your database credentials
echo 3. Run: npm start
echo.
pause
