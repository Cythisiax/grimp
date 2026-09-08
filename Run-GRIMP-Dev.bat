@echo off
setlocal
cd /d "%~dp0"

call npm run electron:dev
set "exit_code=%ERRORLEVEL%"

if not "%exit_code%"=="0" (
  echo.
  echo GRIMP exited with code %exit_code%.
)

pause
exit /b %exit_code%
