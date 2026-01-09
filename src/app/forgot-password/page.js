'use client';

import { useState } from 'react';
import { useForgotPasswordMutation } from '../../store/slices/authApi';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const [phone, setPhone] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await forgotPassword({ phone }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?phone=${phone}`);
      }, 2000);
    } catch (error) {
      setError('Phone number not found');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">OTP Sent!</h1>
          <p className="text-gray-600 mb-4">
            Password reset OTP has been sent to your phone number.
          </p>
          <p className="text-sm text-gray-500">Redirecting to reset page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your phone number to reset password</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/login')}
            className="text-gray-500 text-sm"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}