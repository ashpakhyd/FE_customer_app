'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BottomNavigation from '../../components/BottomNavigation';

export default function Settings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleSwitch = (setter, value) => {
    setter(!value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button 
            onClick={() => router.back()} 
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Settings</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Account</h2>
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/profile/edit')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <span className="font-medium text-black">Edit Profile</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button 
              onClick={() => router.push('/change-password')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <span className="font-medium text-black">Change Password</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔔</span>
                </div>
                <div>
                  <span className="font-medium text-black">Push Notifications</span>
                  <p className="text-xs text-gray-600">Get notified about ticket updates</p>
                </div>
              </div>
              <button
                onClick={() => toggleSwitch(setNotifications, notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📧</span>
                </div>
                <div>
                  <span className="font-medium text-black">Email Alerts</span>
                  <p className="text-xs text-gray-600">Receive email notifications</p>
                </div>
              </div>
              <button
                onClick={() => toggleSwitch(setEmailAlerts, emailAlerts)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  emailAlerts ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  emailAlerts ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌙</span>
                </div>
                <div>
                  <span className="font-medium text-black">Dark Mode</span>
                  <p className="text-xs text-gray-600">Switch to dark theme</p>
                </div>
              </div>
              <button
                onClick={() => toggleSwitch(setDarkMode, darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-yellow-400' : 'bg-gray-300'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌐</span>
                </div>
                <div>
                  <span className="font-medium text-black">Language</span>
                  <p className="text-xs text-gray-600">Choose your language</p>
                </div>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-100 rounded-lg px-3 py-2 text-sm font-medium text-black"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">Privacy & Security</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🛡️</span>
                </div>
                <span className="font-medium text-black">Privacy Policy</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📋</span>
                </div>
                <span className="font-medium text-black">Terms of Service</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-black mb-4">About</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">App Version</span>
              <span className="font-medium text-black">1.0.0</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Build Number</span>
              <span className="font-medium text-black">100</span>
            </div>
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <span className="font-medium text-black">Check for Updates</span>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-4 border border-red-200">
          <h2 className="text-lg font-bold text-red-800 mb-4">Danger Zone</h2>
          <div className="space-y-3">
            <button className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors">
              Clear All Data
            </button>
            <button className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}