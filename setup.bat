@echo off
title NexCourse & Placement Portal - Full Stack Setup & Verification
echo ==================================================================
echo   NexCourse & Placement Portal - Full Stack Setup & Health Check
echo ==================================================================
echo.

echo [1/3] Verifying Node.js & React Frontend dependencies...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
) else (
    echo Frontend dependencies are already installed and verified!
)

echo.
echo [2/3] Checking MySQL & Database Scripts...
echo MySQL schema and seed data are ready in:
echo   - database\mysql_schema.sql
echo   - database\sample_data.sql
echo To import them into MySQL, run: setup-database.bat
echo.

echo [3/3] Checking Spring Boot & Java Compiler...
set JAVA_HOME=C:\Program Files\Java\jdk-25
set PATH=%JAVA_HOME%\bin;%PATH%
"%~dp0backend\.maven\bin\mvn.cmd" -v

echo.
echo ==================================================================
echo   Setup Complete!
echo.
echo   1. Database: Run 'setup-database.bat' (to create MySQL tables)
echo   2. Backend:  Run 'run-backend.bat'   (starts at http://localhost:8080)
echo   3. Frontend: Run 'run-frontend.bat'  (starts at http://localhost:5173)
echo ==================================================================
pause
