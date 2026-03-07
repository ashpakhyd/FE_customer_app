'use client';

import { useGetProfileQuery } from '../../store/slices/authApi';
import { useRouter } from 'next/navigation';
import BottomNavigation from '../../components/BottomNavigation';

export default function Profile() {
  const { data: profile, isLoading } = useGetProfileQuery();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
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
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Profile</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-black">{profile?.name?.charAt(0) || 'U'}</span>
          </div>
          <h2 className="text-xl font-bold text-black mb-1">{profile?.name || 'User'}</h2>
          <p className="text-gray-600 mb-2">{profile?.email || 'No email'}</p>
          <p className="text-gray-600">{profile?.phone || 'No phone'}</p>
          <div className="flex items-center justify-center mt-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              profile?.isVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {profile?.isVerified ? 'Verified' : 'Not Verified'}
            </span>
          </div>
          {!profile?.isVerified && (
            <button
              onClick={() => window.open(`https://wa.me/918623038373?text=${encodeURIComponent(`Verify me\nName: ${profile?.name || 'N/A'}\nMobile: ${profile?.phone || 'N/A'}`)}`, '_blank')}
              className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Click to Verify
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <button 
            onClick={() => router.push('/tickets')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <span className="font-medium text-black">My Tickets</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button 
            onClick={() => router.push('/notifications')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🔔</span>
              </div>
              <span className="font-medium text-black">Notifications</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button 
            onClick={() => router.push('/settings')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">⚙️</span>
              </div>
              <span className="font-medium text-black">Settings</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button 
            onClick={() => router.push('/help')}
            className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-lg">❓</span>
              </div>
              <span className="font-medium text-black">Help & Support</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 rounded-2xl p-4 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🚪</span>
              </div>
              <span className="font-medium text-red-600">Logout</span>
            </div>
            <span className="text-red-400">→</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">© 2024 Ashfaq Ahemad Shaikh. All rights reserved.</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}