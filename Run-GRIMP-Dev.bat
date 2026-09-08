@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if not errorlevel 1 goto :node_ready

echo Node.js is required to run GRIMP and is not installed.
where winget >nul 2>nul
if errorlevel 1 (
  echo Windows Package Manager ^(winget^) is unavailable.
  echo Install the current Node.js LTS from https://nodejs.org/ and run this launcher again.
  pause
  exit /b 1
)

echo Installing Node.js LTS...
winget install --id OpenJS.NodeJS.LTS --exact --accept-package-agreements --accept-source-agreements
if errorlevel 1 (
  echo Node.js installation failed.
  pause
  exit /b 1
)

rem winget does not update PATH in the already-running command prompt.
set "PATH=%ProgramFiles%\nodejs;%PATH%"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js installed, but this window cannot find it yet. Close this window and run the launcher again.
  pause
  exit /b 1
)

:node_ready
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is installed but npm is missing. Reinstall Node.js LTS from https://nodejs.org/.
  pause
  exit /b 1
)

if exist node_modules goto :dependencies_ready
echo Installing GRIMP dependencies...
call npm ci
if errorlevel 1 (
  echo GRIMP dependency installation failed.
  pause
  exit /b 1
)

:dependencies_ready
call npm run electron:dev
set "exit_code=%ERRORLEVEL%"

if not "%exit_code%"=="0" (
  echo.
  echo GRIMP exited with code %exit_code%.
)

pause
exit /b %exit_code%
