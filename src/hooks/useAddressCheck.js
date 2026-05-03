'use client';

import { useGetAddressesQuery } from '../store/slices/addressesApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useAddressCheck() {
  const { data: addresses = [], isLoading } = useGetAddressesQuery();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const navigateToTicket = (url) => {
    if (isLoading) return;
    if (addresses.length === 0) {
      setShowModal(true);
    } else {
      router.push(url);
    }
  };

  return { navigateToTicket, showModal, setShowModal };
}
