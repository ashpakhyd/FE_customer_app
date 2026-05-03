'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAddressesQuery, useDeleteAddressMutation, useSelectAddressMutation, useEditAddressMutation } from '../../store/slices/addressesApi';
import BottomNavigation from '../../components/BottomNavigation';
import { HiHome, HiBriefcase, HiLocationMarker, HiPencil, HiTrash, HiPlus, HiCheck } from 'react-icons/hi';

export default function AddressesPage() {
  const router = useRouter();
  const { data: addresses = [], isLoading } = useGetAddressesQuery();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();
  const [selectAddress] = useSelectAddressMutation();
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteAddress(id).unwrap();
      setDeleteConfirmId(null);
    } catch {
      setDeleteConfirmId(null);
    }
  };

  const handleSelect = async (addr) => {
    if (!addr.isSelected) await selectAddress(addr._id);
  };

  const typeIcon = (type) => {
    if (type === 'Office') return <HiBriefcase className="text-lg" />;
    if (type === 'Other') return <HiLocationMarker className="text-lg" />;
    return <HiHome className="text-lg" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">My Addresses</h1>
          <button
            onClick={() => router.push('/add-address')}
            className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
          >
            <HiPlus className="text-xl text-black" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-3 mt-2">
        {addresses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="font-semibold text-black mb-2">No Addresses</h3>
            <p className="text-gray-500 text-sm mb-4">Add your first address</p>
            <button onClick={() => router.push('/add-address')} className="btn-primary">
              Add Address
            </button>
          </div>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr._id}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 transition-colors ${
                addr.isSelected ? 'border-yellow-400' : 'border-transparent'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1" onClick={() => handleSelect(addr)}>
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-yellow-600">
                    {typeIcon(addr.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-semibold text-black text-sm">{addr.type || 'Home'}</p>
                      {addr.isSelected && (
                        <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-medium flex items-center space-x-1"><HiCheck className="text-xs" /><span>Selected</span></span>
                      )}
                      {addr.isDefault && !addr.isSelected && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{addr.house}, {addr.colony}</p>
                    <p className="text-sm text-gray-600">{addr.area}, {addr.city} - {addr.pincode}</p>
                  </div>
                </div>

                {/* Edit / Delete buttons */}
                <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
                  <button
                    onClick={() => router.push(`/edit-address/${addr._id}`)}
                    className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                  >
                    <HiPencil className="text-sm" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(addr._id)}
                    className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-500"
                  >
                    <HiTrash className="text-sm" />
                  </button>
                </div>
              </div>

              {!addr.isSelected && (
                <button
                  onClick={() => handleSelect(addr)}
                  className="mt-3 w-full py-2 border border-yellow-400 text-yellow-600 rounded-xl text-sm font-medium hover:bg-yellow-50 transition-colors"
                >
                  Deliver Here
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🗑️</span>
            </div>
            <h2 className="text-lg font-bold text-black mb-2">Delete Address?</h2>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 bg-gray-100 text-black rounded-xl font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl font-medium disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
