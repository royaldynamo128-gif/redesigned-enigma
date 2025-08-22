@echo off
echo Building APK for Radhe Video Conferencing...
echo.

echo 1. Building web app...
npm run build
echo.

echo 2. Copying web files to Android assets...
if not exist "android\app\src\main\assets" mkdir "android\app\src\main\assets"
xcopy "dist\*" "android\app\src\main\assets\" /E /Y
echo.

echo 3. Building Android APK...
cd android
gradlew assembleRelease
echo.

echo 4. APK location: android\app\build\outputs\apk\release\app-release.apk
echo.
echo Build complete! You can install the APK on your Android device.
pause
