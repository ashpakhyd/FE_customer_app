'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return <>{children}</>;
}
