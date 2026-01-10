'use client';

import { use } from 'react';
import { useGetTicketQuery } from '../../../store/slices/ticketsApi';
import { useRouter } from 'next/navigation';

export default function TicketDetails({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  // Add error handling for params
  if (!resolvedParams?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-black mb-2">Invalid Ticket ID</h1>
          <button onClick={() => router.push('/tickets')} className="btn-primary">
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  const { data: ticket, isLoading, error } = useGetTicketQuery(resolvedParams.id);

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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-black mb-2">Error Loading Ticket</h1>
          <p className="text-gray-600 mb-4">Unable to load ticket details</p>
          <button onClick={() => router.push('/tickets')} className="btn-primary">
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-black mb-2">Ticket Not Found</h1>
          <button onClick={() => router.push('/tickets')} className="btn-primary">
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Ticket Details</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-black mb-2">{ticket?.title || 'No Title'}</h2>
              <p className="text-sm text-gray-500">#{ticket?._id?.slice(-6) || 'N/A'}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket?.status)}`}>
                {ticket?.status?.replace('_', ' ') || 'Unknown'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket?.priority)}`}>
                {ticket?.priority || 'Unknown'}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-black mb-1">Description</h3>
              <p className="text-gray-600">{ticket?.description || 'No description available'}</p>
            </div>

            {ticket?.issue && (
              <div>
                <h3 className="font-semibold text-black mb-1">Issue</h3>
                <p className="text-gray-600">{ticket.issue}</p>
              </div>
            )}

            {ticket?.appliance && (
              <div>
                <h3 className="font-semibold text-black mb-1">Appliance</h3>
                <p className="text-gray-600">{ticket.appliance}</p>
              </div>
            )}

            {ticket?.timeSlot && (
              <div>
                <h3 className="font-semibold text-black mb-1">Preferred Time</h3>
                <p className="text-gray-600 capitalize">{ticket.timeSlot}</p>
              </div>
            )}

            {ticket?.address && (
              <div>
                <h3 className="font-semibold text-black mb-1">Service Address</h3>
                <p className="text-gray-600">{ticket.address}</p>
              </div>
            )}

            <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
              <span>Created: {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString() : 'N/A'}</span>
              {ticket?.updatedAt && (
                <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}