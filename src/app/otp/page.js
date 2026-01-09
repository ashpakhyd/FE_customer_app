'use client';

import { useState, useEffect, Suspense } from 'react';
import { useVerifyOtpMutation, useSendOtpMutation } from '../../store/slices/authApi';
import { useRouter, useSearchParams } from 'next/navigation';

function OTPContent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const phone = searchParams.get('phone');
  const type = searchParams.get('type');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }

    try {
      const result = await verifyOtp({ phone, otp: otpString }).unwrap();
      localStorage.setItem('token', result.token);
      router.push('/');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      await sendOtp({ phone }).unwrap();
      setTimer(60);
      setError('');
    } catch (error) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Verify OTP</h1>
          <p className="text-gray-600">
            Enter the 6-digit code sent to<br />
            <span className="font-semibold text-black">{phone || 'your phone'}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                required
              />
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <div className="text-center mt-6">
          {timer > 0 ? (
            <p className="text-gray-600">
              Resend OTP in <span className="font-semibold text-yellow-600">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-yellow-600 font-semibold"
            >
              {isResending ? 'Sending...' : 'Resend OTP'}
            </button>
          )}
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => router.back()}
            className="text-gray-500 text-sm"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OTP() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <OTPContent />
    </Suspense>
  );
}