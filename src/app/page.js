'use client';

import { useGetMyTicketsQuery, useGetNotificationsQuery } from '../store/slices/ticketsApi';
import { useGetProfileQuery } from '../store/slices/authApi';
import { useGetOffersQuery } from '../store/slices/offersApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { requestFCMToken } from '../config/firebase';
import BottomNavigation from '../components/BottomNavigation';
import Image from 'next/image';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);
  const [isEnablingNotification, setIsEnablingNotification] = useState(false);
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
      return;
    }

    // Check notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      setTimeout(() => setShowNotificationPrompt(true), 2000);
    }
  }, [router]);

  const handleEnableNotifications = async () => {
    setIsEnablingNotification(true);
    try {
      const fcmToken = await requestFCMToken();
      if (fcmToken) {
        // Send token to backend
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fcm/fcm-token`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fcmToken })
        });
        setShowNotificationPrompt(false);
      }
    } catch (error) {
      console.error('Failed to enable notifications:', error);
    } finally {
      setIsEnablingNotification(false);
    }
  };

  const { data: tickets, isLoading: ticketsLoading, error: ticketsError } = useGetMyTicketsQuery(undefined, {
    skip: !isClient
  });
  const { data: notifications, error: notificationsError } = useGetNotificationsQuery(undefined, {
    skip: !isClient
  });
  const { data: profile, error: profileError } = useGetProfileQuery(undefined, {
    skip: !isClient
  });
  const { data: offersData } = useGetOffersQuery({ type: 'available', limit: 3 }, {
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
  const featuredOffers = offersData?.offers?.slice(0, 2) || [];

  if (ticketsLoading) return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Notification Permission Popup */}
      {showNotificationPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔔</span>
            </div>
            <h2 className="text-xl font-bold text-black text-center mb-2">Enable Notifications</h2>
            <p className="text-gray-600 text-center text-sm mb-6">
              Stay updated with your service requests, technician assignments, and special offers!
            </p>
            <div className="space-y-3">
              <button
                onClick={handleEnableNotifications}
                disabled={isEnablingNotification}
                className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isEnablingNotification ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                    Enabling...
                  </>
                ) : (
                  'Enable Notifications'
                )}
              </button>
              <button
                onClick={() => setShowNotificationPrompt(false)}
                disabled={isEnablingNotification}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-60"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

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
        <div className="gradient-card rounded-2xl p-6 text-black" style={{background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #fcd34d'}}>
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
        <div className="gradient-card-red rounded-2xl p-4 text-white mb-6" style={{background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f87171'}}>
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
                <Image 
                  src="/icons/newService.png" 
                  alt="New Service"
                  width={24}
                  height={24}
                  className="object-contain"
                />
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
                <Image 
                  src="/icons/airConditioner.png" 
                  alt="AC Service"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <p className="font-medium text-black text-xs text-center">AC Service</p>
            </div>
            <div 
              onClick={() => router.push('/services/washing-machine')}
              className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Image 
                  src="/icons/washing-machine.png" 
                  alt="Washing Machine"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <p className="font-medium text-black text-xs text-center">Washing</p>
            </div>
            <div 
              onClick={() => router.push('/services/refrigerator')}
              className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Image 
                  src="/icons/refrigerator.png" 
                  alt="Refrigerator"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <p className="font-medium text-black text-xs text-center">Fridge</p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black">Special Offers</h3>
            <button onClick={() => router.push('/offers')} className="text-yellow-600 text-sm font-medium">View All</button>
          </div>
          
          {featuredOffers.length > 0 ? (
            <div className="space-y-3">
              {featuredOffers.map((offer) => {
                const discount = offer.discountPercentage || Math.round(((offer.price.original - offer.price.discounted) / offer.price.original) * 100);
                return (
                  <div
                    key={offer._id}
                    onClick={() => router.push(`/offers/${offer._id}`)}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">{discount}% OFF</span>
                        </div>
                        <h3 className="font-bold text-black mb-1">{offer.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm line-through text-black opacity-60">{offer.price.currency} {offer.price.original}</span>
                          <span className="text-lg font-bold text-black">{offer.price.currency} {offer.price.discounted}</span>
                        </div>
                      </div>
                      <div className="text-black text-2xl">→</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div 
              onClick={() => router.push('/offers')}
              className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">🎁</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">HOT</span>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-1">Exclusive Deals</h3>
                  <p className="text-sm text-black opacity-90 mb-3">Save up to 50% on services</p>
                  <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-3 py-2">
                    <span className="text-xs font-medium text-black">View All Offers</span>
                    <span className="text-black">→</span>
                  </div>
                </div>
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-3xl">%</span>
                </div>
              </div>
            </div>
          )}
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
      <BottomNavigation />
    </div>
  );
}
