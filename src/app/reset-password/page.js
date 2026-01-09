'use client';

import { useState, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '../../store/slices/authApi';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const phone = searchParams.get('phone');
  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setError('');
    
    if (data.newPassword !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await resetPassword({
        phone,
        otp: data.otp,
        newPassword: data.newPassword
      }).unwrap();
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setError('Invalid OTP or failed to reset password');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Password Reset!</h1>
          <p className="text-gray-600 mb-4">
            Your password has been successfully reset.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Reset Password</h1>
          <p className="text-gray-600">
            Enter OTP and your new password for<br />
            <span className="font-semibold text-black">{phone || 'your phone'}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('otp', { required: 'OTP is required', minLength: { value: 6, message: 'OTP must be 6 digits' } })}
            type="text"
            placeholder="Enter OTP"
            className="input-field"
            maxLength="6"
          />
          {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
          
          <input
            {...register('newPassword', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
            type="password"
            placeholder="New Password"
            className="input-field"
          />
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          
          <input
            {...register('confirmPassword', { 
              required: 'Confirm password is required',
              validate: value => value === newPassword || 'Passwords do not match'
            })}
            type="password"
            placeholder="Confirm New Password"
            className="input-field"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

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
            {isLoading ? 'Resetting...' : 'Reset Password'}
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

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}