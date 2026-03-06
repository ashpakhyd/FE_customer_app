'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useRegisterMutation } from '../../store/slices/authApi';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function VerifyPhone() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState(searchParams.get('phone') || '');
  const [isEditing, setIsEditing] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleConfirm = async () => {
    setError('');
    const registerData = JSON.parse(sessionStorage.getItem('registerData') || '{}');
    registerData.phone = phone;
    
    try {
      await registerUser(registerData).unwrap();
      // Store phone and password for login page
      sessionStorage.setItem('loginData', JSON.stringify({
        phone: registerData.phone,
        password: registerData.password
      }));
      sessionStorage.removeItem('registerData');
      router.push('/login');
    } catch (err) {
      setError(err?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Confirm Phone Number</h1>
          <p className="text-gray-600">Please verify your phone number</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 text-sm mb-2">Your Phone Number</p>
          {isEditing ? (
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength="10"
              className="text-2xl font-bold text-black tracking-wider w-full border-2 border-yellow-400 rounded-lg px-3 py-2"
              autoFocus
            />
          ) : (
            <p className="text-2xl font-bold text-black tracking-wider">{phone}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}

        <div className="space-y-3">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="btn-primary w-full"
            >
              Save
            </button>
          ) : (
            <>
              <button
                onClick={handleConfirm}
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Registering...' : 'Confirm'}
              </button>
              
              <button
                onClick={handleEdit}
                disabled={isLoading}
                className="w-full py-3 px-4 border-2 border-yellow-400 text-yellow-600 rounded-lg font-semibold hover:bg-yellow-50 transition-colors disabled:opacity-50"
              >
                Edit Phone Number
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
