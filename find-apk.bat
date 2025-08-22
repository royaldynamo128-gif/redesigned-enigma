@echo off
echo Looking for APK file...
echo.

if exist "android\app\build\outputs\apk\release\app-release.apk" (
    echo ✅ APK found!
    echo Location: android\app\build\outputs\apk\release\app-release.apk
    echo.
    echo Opening folder...
    explorer "android\app\build\outputs\apk\release"
) else (
    echo ❌ APK not found!
    echo.
    echo Please build the APK first:
    echo 1. Press Ctrl + Shift + P in VS Code
    echo 2. Type "Tasks: Run Task"
    echo 3. Select "Build APK"
)

pause
