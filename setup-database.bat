@echo off
title NexCourse & Placement Portal - Database Setup
echo ========================================================
echo   Setting up MySQL Database: student_placement_db
echo ========================================================
echo.

set MYSQL_BIN="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe"

if not exist %MYSQL_BIN% (
    echo MySQL not found at default location. Trying system PATH...
    set MYSQL_BIN=mysql
)

echo Please enter your MySQL root password when prompted:
echo.

echo [1/2] Creating Database & Tables...
%MYSQL_BIN% -u root -p < "%~dp0database\mysql_schema.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to run mysql_schema.sql. Make sure MySQL service is running.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/2] Seeding Sample Placement & Course Data...
%MYSQL_BIN% -u root -p < "%~dp0database\sample_data.sql"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to run sample_data.sql.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   SUCCESS! Database 'student_placement_db' is ready!
echo ========================================================
pause
