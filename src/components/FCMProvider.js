'use client';

import { useEffect } from 'react';
import { onMessageListener } from '../config/firebase';
import toast from 'react-hot-toast';

export default function FCMProvider({ children }) {
  useEffect(() => {
    const unsubscribe = onMessageListener()
      .then((payload) => {
        console.log('Foreground notification received:', payload);
        
        // Show browser notification
        if (Notification.permission === 'granted') {
          new Notification(payload?.notification?.title || 'New Notification', {
            body: payload?.notification?.body,
            icon: '/sd.png',
            badge: '/sd.png',
            tag: payload?.messageId,
          });
        }
        
        // Show toast notification
        toast.success(payload?.notification?.title || 'New Notification', {
          description: payload?.notification?.body,
        });
      })
      .catch((err) => console.log('Notification error:', err));

    return () => unsubscribe;
  }, []);

  return <>{children}</>;
}
