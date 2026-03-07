'use client';

import { useEffect } from 'react';
import { onMessageListener } from '../config/firebase';
import toast from 'react-hot-toast';

export default function FCMProvider({ children }) {
  useEffect(() => {
    onMessageListener()
      .then((payload) => {
        toast.success(payload?.notification?.title || 'New Notification', {
          description: payload?.notification?.body,
        });
      })
      .catch((err) => console.log('Notification error:', err));
  }, []);

  return <>{children}</>;
}
