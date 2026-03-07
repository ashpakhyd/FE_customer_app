# Firebase Cloud Messaging API Enable Karna

## Error Fix Steps:

### 1. Firebase Console mein jao:
https://console.firebase.google.com/project/otpproject-ca2c3/settings/cloudmessaging

### 2. Cloud Messaging API Enable karo:

**Option A - Direct Link:**
- Is link pe jao: https://console.cloud.google.com/apis/library/fcm.googleapis.com?project=otpproject-ca2c3
- "ENABLE" button click karo

**Option B - Manual:**
1. Firebase Console → Project Settings → Cloud Messaging
2. "Cloud Messaging API (V1)" section mein
3. "Manage API in Google Cloud Console" link click karo
4. "ENABLE" button click karo

### 3. Dev Server Restart karo:
```bash
npm run dev
```

### 4. Browser Cache Clear karo aur phir se login karo

## Verification:

Login karne ke baad browser console mein FCM token print hona chahiye.

## Alternative (Agar API enable nahi kar sakte):

Notification feature ko optional bana sakte hain - error aane par bhi app kaam karega, sirf notifications nahi aayenge.
