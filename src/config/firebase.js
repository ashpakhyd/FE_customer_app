import { initializeApp, getApps } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

export const sendOtpToPhone = async (phoneNumber) => {
  if (window.recaptchaVerifier) {
    try { window.recaptchaVerifier.clear(); } catch {}
    window.recaptchaVerifier = null;
  }

  let container = document.getElementById('recaptcha-invisible');
  if (!container) {
    container = document.createElement('div');
    container.id = 'recaptcha-invisible';
    document.body.appendChild(container);
  }

  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-invisible', {
    size: 'invisible',
    callback: () => {},
  });

  await window.recaptchaVerifier.render();

  const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
  const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
  window.confirmationResult = confirmationResult;
  return confirmationResult;
};

export const verifyOtpCode = async (otp) => {
  return await window.confirmationResult.confirm(otp);
};

export const requestFCMToken = async () => {
  try {
    const supported = await isSupported();
    if (!supported) {
      console.log('FCM not supported in this browser');
      return null;
    }

    // Check if running in TWA
    const isTWA = window.matchMedia('(display-mode: standalone)').matches || 
                  window.navigator.standalone || 
                  document.referrer.includes('android-app://');

    // Request notification permission
    const permission = await Notification.requestPermission();
    console.log('Notification permission:', permission);
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    const messaging = getMessaging(app);
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    console.log('FCM Token obtained:', token ? 'Yes' : 'No');
    return token;
  } catch (error) {
    console.error('FCM Token Error:', error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    isSupported().then((supported) => {
      if (supported) {
        const messaging = getMessaging(app);
        onMessage(messaging, (payload) => {
          resolve(payload);
        });
      }
    });
  });
