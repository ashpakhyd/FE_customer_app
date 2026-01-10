'use client';

import { useGetMyTicketsQuery, useGetNotificationsQuery } from '../store/slices/ticketsApi';
import { useGetProfileQuery } from '../store/slices/authApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
    const token = localStorage.getItem('token');
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (!onboardingCompleted) {
      router.push('/onboarding');
      return;
    }
    
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const { data: tickets, isLoading: ticketsLoading, error: ticketsError } = useGetMyTicketsQuery(undefined, {
    skip: !isClient
  });
  const { data: notifications, error: notificationsError } = useGetNotificationsQuery(undefined, {
    skip: !isClient
  });
  const { data: profile, error: profileError } = useGetProfileQuery(undefined, {
    skip: !isClient
  });

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Check if onboarding is completed
  const onboardingCompleted = localStorage.getItem('onboardingCompleted');
  if (!onboardingCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const unreadNotifications = notifications?.filter(n => !n.isRead).length || 0;
  const activeTickets = tickets?.filter(t => t.status !== 'COMPLETED').length || 0;

  if (ticketsLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-black">{profile?.name?.charAt(0) || 'U'}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Hello!</p>
              <p className="font-semibold text-black">{profile?.name || 'User'}</p>
            </div>
          </div>
          <div className="relative">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-lg">🔔</span>
            </div>
            {unreadNotifications > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white">{unreadNotifications}</span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchTerm && router.push(`/tickets?search=${encodeURIComponent(searchTerm)}`)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-10 text-sm"
            />
            <button 
              onClick={() => searchTerm && router.push(`/tickets?search=${encodeURIComponent(searchTerm)}`)}
              className="absolute right-3 top-3 text-gray-400"
            >
              🔍
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Service Status Card */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 text-black">
          <h3 className="text-lg font-bold mb-2">Your Service Status</h3>
          <p className="text-sm mb-4 opacity-90">
            {activeTickets > 0 ? `You have ${activeTickets} active service requests` : 'All services completed'}
          </p>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/tickets')}
              className="bg-white text-black px-4 py-2 rounded-lg font-medium text-sm"
            >
              View Details
            </button>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{activeTickets}</span>
            </div>
          </div>
        </div>

        {/* Emergency Banner */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-4 text-white mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">🚨</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Emergency Service</h3>
                <p className="text-xs opacity-90">24/7 urgent repairs</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = 'tel:+919172605997'}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
            >
              Call Now
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black">Quick Actions</h3>
            <button onClick={() => router.push('/services')} className="text-yellow-600 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => router.push('/services')}
              className="bg-yellow-100 rounded-xl p-4 cursor-pointer hover:bg-yellow-200 transition-colors"
            >
              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center mb-3">
                <span className="text-lg">🔧</span>
              </div>
              <p className="font-semibold text-black text-sm mb-1">New Service</p>
              <p className="text-xs text-gray-600">Request repair service</p>
            </div>
            <div 
              onClick={() => router.push('/tickets')}
              className="bg-blue-100 rounded-xl p-4 cursor-pointer hover:bg-blue-200 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center mb-3">
                <span className="text-lg">📋</span>
              </div>
              <p className="font-semibold text-black text-sm mb-1">My Tickets</p>
              <p className="text-xs text-gray-600">Track your requests</p>
            </div>
            <div 
              onClick={() => router.push('/help')}
              className="bg-green-100 rounded-xl p-4 cursor-pointer hover:bg-green-200 transition-colors"
            >
              <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center mb-3">
                <span className="text-lg">💬</span>
              </div>
              <p className="font-semibold text-black text-sm mb-1">Support</p>
              <p className="text-xs text-gray-600">Get help instantly</p>
            </div>
            <div 
              onClick={() => router.push('/book-appointment')}
              className="bg-purple-100 rounded-xl p-4 cursor-pointer hover:bg-purple-200 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-400 rounded-xl flex items-center justify-center mb-3">
                <span className="text-lg">📅</span>
              </div>
              <p className="font-semibold text-black text-sm mb-1">Schedule</p>
              <p className="text-xs text-gray-600">Book appointment</p>
            </div>
          </div>
        </div>

        {/* Featured Services */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black">Featured Services</h3>
            <button onClick={() => router.push('/services')} className="text-yellow-600 text-sm font-medium">View All</button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div 
              onClick={() => router.push('/services/ac')}
              className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">❄️</span>
              </div>
              <p className="font-medium text-black text-xs text-center">AC Service</p>
            </div>
            <div 
              onClick={() => router.push('/services/washing-machine')}
              className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🧺</span>
              </div>
              <p className="font-medium text-black text-xs text-center">Washing</p>
            </div>
            <div 
              onClick={() => router.push('/services/refrigerator')}
              className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🧊</span>
              </div>
              <p className="font-medium text-black text-xs text-center">Fridge</p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
              <div>
                <h3 className="font-bold text-sm">Special Offers</h3>
                <p className="text-xs opacity-90">Save up to 30% on services</p>
              </div>
            </div>
            <button 
              onClick={() => alert('Offers coming soon!')}
              className="bg-white text-orange-600 px-3 py-2 rounded-lg font-medium text-xs hover:bg-gray-100 transition-colors"
            >
              View Deals
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black">Recent Activity</h3>
            <button onClick={() => router.push('/tickets')} className="text-yellow-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-3">
            {tickets?.slice(0, 3).map((ticket) => (
              <div key={ticket._id} className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => router.push(`/tickets/${ticket._id}`)}>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🎫</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-black text-sm mb-1">{ticket.title}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'COMPLETED' ? 'bg-green-100 text-green-600' :
                        ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-600' :
                        ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.priority === 'HIGH' ? 'bg-red-100 text-red-600' :
                        ticket.priority === 'MEDIUM' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </div>
            )) || (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">No recent activity</p>
                <button 
                  onClick={() => router.push('/services')}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-sm hover:bg-yellow-500 transition-colors"
                >
                  Create First Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          <button className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mb-1">
              <span className="text-white text-xs">🏠</span>
            </div>
            <span className="text-xs text-black font-medium">Home</span>
          </button>
          <button 
            onClick={() => router.push('/tickets')}
            className="flex flex-col items-center py-2 px-4"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">📋</span>
            </div>
            <span className="text-xs text-gray-400">Tickets</span>
          </button>
          <button 
            onClick={() => router.push('/notifications')}
            className="flex flex-col items-center py-2 px-4 relative"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🔔</span>
            </div>
            <span className="text-xs text-gray-400">Alerts</span>
            {unreadNotifications > 0 && (
              <div className="absolute top-1 right-3 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => router.push('/profile')}
            className="flex flex-col items-center py-2 px-4"
          >
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">👤</span>
            </div>
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
