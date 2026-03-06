'use client';

import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../store/slices/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState('');
  const router = useRouter();
  const password = watch('password');

  const onSubmit = async (data) => {
    setError('');
    
    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Store data in sessionStorage and redirect to verify-phone
    sessionStorage.setItem('registerData', JSON.stringify({
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: 'CUSTOMER'
    }));
    
    router.push(`/verify-phone?phone=${data.phone}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Create Account</h1>
          <p className="text-gray-600">Join our service platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Full Name"
            className="input-field"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          
          <input
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Enter valid 10-digit mobile number'
              }
            })}
            type="tel"
            placeholder="Phone Number"
            className="input-field"
            maxLength="10"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter valid email address'
              }
            })}
            type="email"
            placeholder="Email Address"
            className="input-field"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          
          <input
            {...register('password', { 
              required: 'Password is required', 
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message: 'Password must contain uppercase, lowercase and number'
              }
            })}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          
          <input
            {...register('confirmPassword', { 
              required: 'Confirm password is required',
              validate: value => value === password || 'Passwords do not match'
            })}
            type="password"
            placeholder="Confirm Password"
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/login')}
              className="text-yellow-600 font-semibold"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}