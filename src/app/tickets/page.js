'use client';

import { useGetMyTicketsQuery } from '../../store/slices/ticketsApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Tickets() {
  const { data: tickets, isLoading } = useGetMyTicketsQuery();
  const [filter, setFilter] = useState('ALL');
  const router = useRouter();

  const filteredTickets = tickets?.filter(ticket => {
    if (filter === 'ALL') return true;
    return ticket.status === filter;
  }) || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-blue-100 text-blue-600';
      case 'ASSIGNED': return 'bg-yellow-100 text-yellow-600';
      case 'IN_PROGRESS': return 'bg-orange-100 text-orange-600';
      case 'COMPLETED': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-600';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-600';
      case 'LOW': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
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
        <div className="flex items-center justify-between max-w-md mx-auto mb-4">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">My Tickets</h1>
          <button 
            onClick={() => router.push('/services')}
            className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center"
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 max-w-md mx-auto overflow-x-auto scrollbar-hide pb-2">
          {['ALL', 'NEW', 'OPEN', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                filter === status 
                  ? 'bg-yellow-400 text-black' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets List */}
      <div className="p-4 max-w-md mx-auto space-y-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div 
              key={ticket._id} 
              onClick={() => router.push(`/tickets/${ticket._id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{ticket.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>#{ticket._id.slice(-6)}</span>
                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="font-semibold text-black mb-2">No Tickets Found</h3>
            <p className="text-gray-600 mb-4">You haven't created any tickets yet</p>
            <button 
              onClick={() => router.push('/services')}
              className="btn-primary"
            >
              Create First Ticket
            </button>
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
          <button className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center mb-1">
              <span className="text-white text-xs">📋</span>
            </div>
            <span className="text-xs text-black font-medium">Tickets</span>
          </button>
          <button onClick={() => router.push('/notifications')} className="flex flex-col items-center py-2 px-4">
            <div className="w-6 h-6 flex items-center justify-center mb-1">
              <span className="text-gray-400 text-xs">🔔</span>
            </div>
            <span className="text-xs text-gray-400">Alerts</span>
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