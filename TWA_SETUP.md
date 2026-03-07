# TWA Notification Fix

## Issue
Notification permission TWA me kaam nahi kar raha tha.

## Solution Applied

### 1. Firebase Config Updated
- Added TWA detection
- Better error logging
- Console logs for debugging

### 2. Manifest.json Updated
- Added `gcm_sender_id: "103953800507"` for FCM support

## TWA Build Steps

### Step 1: Update assetlinks.json
Apne domain par `.well-known/assetlinks.json` file add karo:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.custticket.app",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
  }
}]
```

SHA256 fingerprint nikalne ke liye:
```bash
cd D:\twa\customer
keytool -list -v -keystore android.keystore -alias android
```

### Step 2: Rebuild TWA
```bash
cd D:\twa\customer
bubblewrap update --manifest=https://cust-ticket-app.vercel.app/manifest.json
bubblewrap build
```

### Step 3: AndroidManifest.xml me Permission Add Karo
File location: `D:\twa\customer\app\src\main\AndroidManifest.xml`

Add these permissions:
```xml
<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

### Step 4: Rebuild APK
```bash
cd D:\twa\customer
gradlew assembleRelease
```

## Testing
1. Install APK
2. Login karo
3. Notification popup aayega
4. "Enable Notifications" click karo
5. Android permission dialog aayega
6. Allow karo
7. Console me check karo: "FCM Token obtained: Yes"

## Important Notes
- TWA me notification permission Android system se aati hai
- Browser notification API TWA me differently kaam karta hai
- `gcm_sender_id` manifest me hona zaroori hai
- Digital Asset Links properly configure hone chahiye
