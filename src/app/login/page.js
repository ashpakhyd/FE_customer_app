'use client';

import { useState } from 'react';
import { useLoginMutation } from '../../store/slices/authApi';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login(formData).unwrap();
      localStorage.setItem('token', result.token);
      router.push('/');
    } catch (error) {
      setError('Invalid phone number or password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">S</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="input-field"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
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
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => router.push('/forgot-password')}
            className="text-yellow-600 font-semibold text-sm"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-yellow-600 font-semibold"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}