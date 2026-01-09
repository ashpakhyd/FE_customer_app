'use client';

import { useForm } from 'react-hook-form';
import { useForgotPasswordMutation } from '../../store/slices/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setError('');

    try {
      await forgotPassword({ phone: data.phone }).unwrap();
      setSuccess(true);
      setTimeout(() => {
        router.push(`/reset-password?phone=${data.phone}`);
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('phone', { required: 'Phone number is required' })}
            type="tel"
            placeholder="Phone Number"
            className="input-field"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

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