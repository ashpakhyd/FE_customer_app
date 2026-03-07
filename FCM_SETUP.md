# Firebase Cloud Messaging (FCM) Setup

## Setup Complete ✅

Firebase notification system customer app mein successfully setup ho gaya hai.

## Files Created/Modified:

1. **src/config/firebase.js** - Firebase config aur FCM token functions
2. **src/components/FCMProvider.js** - Foreground notification handler
3. **public/firebase-messaging-sw.js** - Background notification service worker
4. **src/app/layout.js** - FCMProvider added
5. **src/app/login/page.js** - FCM token backend pe send karne ka code
6. **.env.local** - VAPID key aur API URL added

## Important: VAPID Key Setup

Firebase Console se VAPID key generate karke `.env.local` mein add karein:

1. Firebase Console → Project Settings → Cloud Messaging
2. Web Push certificates section mein "Generate key pair" click karein
3. Generated key ko copy karke `.env.local` mein paste karein:
   ```
   NEXT_PUBLIC_FIREBASE_VAPID_KEY=YOUR_ACTUAL_VAPID_KEY
   ```

## Features:

✅ Login ke baad FCM token automatically backend pe send hota hai
✅ Foreground notifications (jab app open ho) toast message ke saath show hote hain
✅ Background notifications (jab app background/closed ho) system notification ke saath show hote hain
✅ Service worker automatically background messages handle karta hai

## Backend API Endpoint:

```
POST /api/fcm/fcm-token
Headers: {
  Authorization: Bearer <token>,
  Content-Type: application/json
}
Body: {
  fcmToken: "FCM_TOKEN_STRING"
}
```

## Testing:

1. App ko login karein
2. Browser console mein FCM token print hoga
3. Backend pe token save ho jayega
4. Backend se notification send karke test kar sakte hain

## Browser Support:

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Limited support (iOS 16.4+)
