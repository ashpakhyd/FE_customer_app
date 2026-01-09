'use client';

import { useForm } from 'react-hook-form';
import { useCreateTicketMutation } from '../../store/slices/ticketsApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateTicket() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      priority: 'MEDIUM',
      serviceType: 'REPAIR',
      urgency: 'NORMAL'
    }
  });
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setError('');
    try {
      await createTicket(data).unwrap();
      setSuccess(true);
      reset();
      setTimeout(() => {
        router.push('/tickets');
      }, 2000);
    } catch (error) {
      setError('Failed to create ticket. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Ticket Created!</h1>
          <p className="text-gray-600 mb-4">
            Your service request has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500">Redirecting to tickets...</p>
        </div>
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
          <h1 className="text-xl font-bold text-black">Create Ticket</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Form */}
      <div className="p-4 max-w-md mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              type="text"
              placeholder="e.g., AC Not Cooling"
              className="input-field"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Describe the issue in detail..."
              className="input-field h-24 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Priority</label>
            <select
              {...register('priority')}
              className="input-field"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Appliance</label>
            <input
              {...register('appliance', { required: 'Appliance is required' })}
              type="text"
              placeholder="e.g., Air Conditioner, Washing Machine"
              className="input-field"
            />
            {errors.appliance && <p className="text-red-500 text-sm mt-1">{errors.appliance.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">Service Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter your complete address..."
              className="input-field h-20 resize-none"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

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
            {isLoading ? 'Creating Ticket...' : 'Create Ticket'}
          </button>
        </form>
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