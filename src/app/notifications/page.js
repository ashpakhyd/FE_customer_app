'use client';

import { useGetNotificationsQuery, useMarkNotificationReadMutation } from '../../store/slices/ticketsApi';
import { useRouter } from 'next/navigation';

export default function Notifications() {
  const { data: notifications, isLoading } = useGetNotificationsQuery();
  const [markAsRead] = useMarkNotificationReadMutation();
  const router = useRouter();

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'TICKET_CREATED': return '🎫';
      case 'TICKET_ASSIGNED': return '👨‍🔧';
      case 'TICKET_UPDATED': return '🔄';
      case 'TICKET_COMPLETED': return '✅';
      default: return '🔔';
    }
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
          <h1 className="text-xl font-bold text-black">Notifications</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4 max-w-md mx-auto space-y-3">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <div 
              key={notification._id}
              className={`bg-white rounded-2xl p-4 shadow-sm ${!notification.isRead ? 'border-l-4 border-yellow-400' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{notification.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="text-xs text-yellow-600 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔔</span>
            </div>
            <h3 className="font-semibold text-black mb-2">No Notifications</h3>
            <p className="text-gray-600">You're all caught up!</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center justify-around py-2 max-w-md mx-auto">
          <button onClick={() => router.push('/')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🏠</span>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button onClick={() => router.push('/tickets')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">📋</span>
            </div>
            <span className="text-xs text-gray-400">Tickets</span>
          </button>
          <button className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mb-1">
              <span className="text-white text-xs">🔔</span>
            </div>
            <span className="text-xs text-black font-medium">Alerts</span>
          </button>
          <button onClick={() => router.push('/profile')} className="flex flex-col items-center py-2 px-4">
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