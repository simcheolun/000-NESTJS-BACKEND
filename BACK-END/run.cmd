@echo off
cls
if "%1" == "dev" (
    npm run start:dev
) else (
    npm run start
)