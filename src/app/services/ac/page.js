'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ACService() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');

  const acServices = [
    {
      id: 'installation',
      name: 'AC Installation',
      price: '₹1,500 - ₹3,000',
      icon: '⚙️',
      desc: 'Professional AC installation service',
      features: ['Wall mounting', 'Pipe connection', 'Gas filling', '1 year warranty']
    },
    {
      id: 'repair',
      name: 'AC Repair',
      price: '₹500 - ₹2,000',
      icon: '🔧',
      desc: 'Fix all AC related issues',
      features: ['Not cooling', 'Water leakage', 'Strange noise', 'Remote issues']
    },
    {
      id: 'maintenance',
      name: 'AC Service & Cleaning',
      price: '₹800 - ₹1,200',
      icon: '🧽',
      desc: 'Complete AC maintenance',
      features: ['Deep cleaning', 'Filter replacement', 'Gas check', 'Performance test']
    },
    {
      id: 'gas-refill',
      name: 'Gas Refilling',
      price: '₹2,000 - ₹4,000',
      icon: '❄️',
      desc: 'AC gas refilling service',
      features: ['Gas leak detection', 'Vacuum process', 'Gas refilling', 'Cooling test']
    }
  ];

  const handleBookService = (service) => {
    router.push(`/create-ticket?serviceName=AC Service&categoryName=Air Conditioner&subcategoryName=${service.name}`);
  };

  const handleBookAppointment = (service) => {
    router.push(`/book-appointment?service=ac&type=${service.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">AC Services</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">❄️</span>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">AC Services</h2>
              <p className="text-sm opacity-90">Professional air conditioning solutions</p>
            </div>
          </div>
        </div>

        {/* Emergency Service */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🚨</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Emergency AC Repair</h3>
                <p className="text-xs text-red-600">24/7 urgent service available</p>
              </div>
            </div>
            <button 
              onClick={() => window.location.href = 'tel:+919172605997'}
              className="bg-red-500 text-white px-3 py-2 rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
            >
              Call Now
            </button>
          </div>
        </div>

        {/* Services List */}
        <div>
          <h3 className="font-semibold text-black mb-4">Available Services</h3>
          <div className="space-y-4">
            {acServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-black">{service.name}</h4>
                      <span className="text-sm font-medium text-blue-600">{service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{service.desc}</p>
                    
                    {/* Features */}
                    <div className="grid grid-cols-2 gap-1 mb-4">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-1">
                          <span className="text-green-500 text-xs">✓</span>
                          <span className="text-xs text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBookService(service)}
                        className="flex-1 bg-yellow-400 text-black py-2 px-3 rounded-lg font-medium text-sm hover:bg-yellow-500 transition-colors"
                      >
                        Book Now
                      </button>
                      <button
                        onClick={() => handleBookAppointment(service)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-black mb-3">Why Choose Our AC Service?</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⭐</span>
              <span className="text-sm text-gray-700">Certified technicians</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🛡️</span>
              <span className="text-sm text-gray-700">1 year service warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⚡</span>
              <span className="text-sm text-gray-700">Same day service</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">💰</span>
              <span className="text-sm text-gray-700">Transparent pricing</span>
            </div>
          </div>
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