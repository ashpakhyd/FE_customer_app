'use client';

import { useRouter } from 'next/navigation';

export default function NoAddressModal({ onClose }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center animate-scale-in">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📍</span>
        </div>
        <h2 className="text-xl font-bold text-black mb-2">Address Required</h2>
        <p className="text-gray-600 text-sm mb-6">
          Please add a delivery address before creating a service request.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 text-black rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onClose(); router.push('/add-address'); }}
            className="flex-1 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-500 transition-colors"
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}
