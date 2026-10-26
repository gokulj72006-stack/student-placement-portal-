@echo off
title NexCourse & Placement Portal - Spring Boot Backend
echo ========================================================
echo   Starting Spring Boot REST API
echo   Port: http://localhost:8080
echo ========================================================
cd /d "%~dp0backend"

set JAVA_HOME=C:\Program Files\Java\jdk-25
set PATH=%JAVA_HOME%\bin;%PATH%

if exist "%~dp0backend\.maven\bin\mvn.cmd" (
    echo [INFO] Using included Maven at backend\.maven...
    call "%~dp0backend\.maven\bin\mvn.cmd" spring-boot:run
) else (
    echo [INFO] Using system Maven...
    call mvn spring-boot:run
)

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Spring Boot exited with code %ERRORLEVEL%.
)
pause
