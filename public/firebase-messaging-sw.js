importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAAXuNJcw9qkFV5qyESRbaWoHi33VVIDvY",
  authDomain: "sdnotification-328e4.firebaseapp.com",
  projectId: "sdnotification-328e4",
  storageBucket: "sdnotification-328e4.firebasestorage.app",
  messagingSenderId: "212028383313",
  appId: "1:212028383313:web:817b53025d77ad1bbe5870"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/sd.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
