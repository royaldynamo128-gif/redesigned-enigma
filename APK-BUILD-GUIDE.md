# 📱 APK Build Guide for Radhe Video Conferencing

## 🚀 Quick Start

### Method 1: Using VS Code (Recommended)

1. **Open VS Code** and open your project folder
2. **Press `Ctrl + Shift + P`** and type "Tasks: Run Task"
3. **Select "Build APK"** - This will build everything automatically
4. **Find your APK** at: `android/app/build/outputs/apk/release/app-release.apk`

### Method 2: Using Batch File

1. **Double-click `build-apk.bat`**
2. **Wait for build to complete**
3. **Install APK** on your Android device

### Method 3: Manual Build

```bash
# 1. Build web app
npm run build

# 2. Copy files to Android
mkdir android\app\src\main\assets
xcopy dist\* android\app\src\main\assets\ /E /Y

# 3. Build APK
cd android
gradlew assembleRelease
```

## 📋 Prerequisites

### Required Software:
- **Node.js** (v18+)
- **Java JDK** (v11+)
- **Android Studio** (for Android SDK)
- **VS Code** (with extensions)

### VS Code Extensions:
- **Android** - Android development support
- **Gradle for Java** - Gradle build support
- **Live Server** - For development

## 🔧 Setup Steps

### 1. Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android SDK
- Set ANDROID_HOME environment variable

### 2. Install Java JDK
- Download OpenJDK 11 or higher
- Set JAVA_HOME environment variable

### 3. Configure Environment Variables
```bash
ANDROID_HOME=C:\Users\YourName\AppData\Local\Android\Sdk
JAVA_HOME=C:\Program Files\Java\jdk-11
```

## 📱 APK Features

### ✅ What's Included:
- **Full video conferencing** functionality
- **Camera and microphone** access
- **Chat system** with stickers
- **PDF viewer** with bookmarks
- **QR code sharing**
- **Mobile-optimized** interface

### 🔧 Technical Details:
- **WebView-based** app
- **WebRTC** for video calls
- **Socket.IO** for real-time communication
- **Responsive design** for all screen sizes

## 🌐 Online Usage

### For Online Use:
1. **Deploy your server** to a hosting service (Heroku, Railway, etc.)
2. **Update the URL** in `MainActivity.java`:
   ```java
   webView.loadUrl("https://your-deployed-server.com");
   ```
3. **Rebuild the APK** with the new URL

### Server Deployment Options:
- **Heroku** - Easy deployment
- **Railway** - Simple setup
- **DigitalOcean** - More control
- **AWS** - Enterprise level

## 🛠️ Troubleshooting

### Common Issues:

1. **Build fails:**
   - Check Java JDK installation
   - Verify Android SDK path
   - Update Gradle version

2. **APK doesn't install:**
   - Enable "Unknown sources" in Android settings
   - Check APK signature
   - Verify minimum SDK version

3. **Video doesn't work:**
   - Grant camera/microphone permissions
   - Check internet connection
   - Verify WebRTC support

### Debug Commands:
```bash
# Check Java version
java -version

# Check Android SDK
echo %ANDROID_HOME%

# Clean build
cd android && gradlew clean
```

## 📱 Installation

### On Android Device:
1. **Enable "Unknown sources"** in Settings > Security
2. **Transfer APK** to device
3. **Install APK** by tapping on it
4. **Grant permissions** when prompted

### Testing:
1. **Open the app**
2. **Create a meeting**
3. **Share the link** with others
4. **Test video/audio** functionality

## 🚀 Next Steps

### For Production:
1. **Add app icon** and branding
2. **Implement user authentication**
3. **Add push notifications**
4. **Optimize performance**
5. **Publish to Google Play Store**

### For Distribution:
1. **Sign the APK** with your key
2. **Test on multiple devices**
3. **Create installation guide**
4. **Set up support system**

## 📞 Support

Your APK is now ready! The app will work with other people online once you:
1. **Deploy the server** to a hosting service
2. **Update the server URL** in the Android app
3. **Rebuild the APK**

🎉 **You now have a complete mobile video conferencing app!**
