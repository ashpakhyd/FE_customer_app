'use client';

import { useForm } from 'react-hook-form';
import { useCreateTicketMutation } from '../../store/slices/ticketsApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';

function BookAppointmentForm() {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get('type') || 'appointment';
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      priority: 'MEDIUM',
      serviceType: 'APPOINTMENT',
      appointmentType: 'maintenance'
    }
  });
  
  const [createTicket, { isLoading }] = useCreateTicketMutation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const router = useRouter();

  const appointmentTypes = [
    { id: 'maintenance', name: 'Regular Maintenance', icon: '🔧', desc: 'Routine service check' },
    { id: 'installation', name: 'New Installation', icon: '⚙️', desc: 'Install new appliance' },
    { id: 'inspection', name: 'Pre-Purchase Inspection', icon: '🔍', desc: 'Check before buying' },
    { id: 'consultation', name: 'Technical Consultation', icon: '💡', desc: 'Expert advice' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const onSubmit = async (data) => {
    setError('');
    
    if (!selectedDate || !selectedTime) {
      setError('Please select date and time for appointment');
      return;
    }

    try {
      const appointmentData = {
        ...data,
        title: `${data.appointmentType} Appointment - ${data.appliance}`,
        description: `${data.description}\n\nScheduled for: ${selectedDate} at ${selectedTime}`,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        serviceType: 'APPOINTMENT'
      };
      
      await createTicket(appointmentData).unwrap();
      setSuccess(true);
      reset();
      setTimeout(() => {
        router.push('/tickets');
      }, 3000);
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm text-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-black mb-2">Appointment Booked!</h1>
          <p className="text-gray-600 mb-4">
            Your appointment has been scheduled successfully.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-black mb-2">Appointment Details</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Date:</span> {selectedDate}</p>
              <p><span className="font-medium">Time:</span> {selectedTime}</p>
            </div>
          </div>
          
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
          <h1 className="text-xl font-bold text-black">Book Appointment</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Appointment Types */}
        <div>
          <h3 className="font-semibold text-black mb-4">Select Service Type</h3>
          <div className="grid grid-cols-2 gap-3">
            {appointmentTypes.map((type) => (
              <label key={type.id} className="cursor-pointer">
                <input
                  {...register('appointmentType')}
                  type="radio"
                  value={type.id}
                  className="sr-only"
                />
                <div className="bg-white rounded-xl p-4 border-2 border-gray-200 hover:border-yellow-400 transition-colors">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">{type.icon}</span>
                  </div>
                  <p className="font-medium text-black text-sm text-center mb-1">{type.name}</p>
                  <p className="text-xs text-gray-600 text-center">{type.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Appliance */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Appliance/Service</label>
            <select
              {...register('appliance', { required: 'Please select appliance' })}
              className="input-field"
            >
              <option value="">Select Appliance</option>
              <option value="Air Conditioner">Air Conditioner</option>
              <option value="Washing Machine">Washing Machine</option>
              <option value="Refrigerator">Refrigerator</option>
              <option value="Microwave">Microwave</option>
              <option value="Water Heater">Water Heater</option>
              <option value="Television">Television</option>
              <option value="Other">Other</option>
            </select>
            {errors.appliance && <p className="text-red-500 text-sm mt-1">{errors.appliance.message}</p>}
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Preferred Date</label>
            <input
              type="date"
              min={getMinDate()}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input-field"
              required
            />
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Preferred Time</label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedTime === time
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-yellow-400'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Additional Details</label>
            <textarea
              {...register('description', { required: 'Please provide details' })}
              placeholder="Describe what you need help with..."
              className="input-field h-24 resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">Service Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter your complete address..."
              className="input-field h-20 resize-none"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>

          {/* Priority */}
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
            {isLoading ? 'Booking Appointment...' : 'Book Appointment'}
          </button>
        </form>

        {/* Contact Info */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-black mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-3">Call us for immediate assistance</p>
          <a 
            href="tel:+919172605997"
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center space-x-2 hover:bg-yellow-500 transition-colors"
          >
            <span>📞</span>
            <span>+91 9172605997</span>
          </a>
        </div>
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

export default function BookAppointment() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <BookAppointmentForm />
    </Suspense>
  );
}