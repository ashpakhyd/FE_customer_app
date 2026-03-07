'use client';

import { useRouter } from 'next/navigation';
import BottomNavigation from '../../../components/BottomNavigation';
import Image from 'next/image';

export default function RefrigeratorService() {
  const router = useRouter();

  const fridgeServices = [
    {
      id: 'repair',
      name: 'Repair Service',
      price: '₹350 - ₹2,500',
      icon: '🔧',
      desc: 'Fix all refrigerator problems',
      features: ['Not cooling', 'Ice formation', 'Strange noise', 'Door seal issues']
    },
    {
      id: 'gas-refill',
      name: 'Gas Refilling',
      price: '₹1,500 - ₹2,500',
      icon: '❄️',
      desc: 'Refrigerant gas refilling',
      features: ['Gas leak detection', 'Vacuum process', 'Gas refilling', 'Cooling test']
    },
    {
      id: 'maintenance',
      name: 'Deep Cleaning',
      price: '₹350 - ₹1,200',
      icon: '🧽',
      desc: 'Complete fridge cleaning',
      features: ['Interior cleaning', 'Coil cleaning', 'Drain cleaning', 'Deodorizing']
    }
  ];

  const handleBookService = (service) => {
    router.push(`/create-ticket?serviceName=Refrigerator Service&categoryName=Refrigerator&subcategoryName=${service.name}`);
  };

  const handleBookAppointment = (service) => {
    router.push(`/book-appointment?service=fridge&type=${service.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Refrigerator</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Image 
                src="/icons/refrigerator.png" 
                alt="Refrigerator"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Refrigerator</h2>
              <p className="text-sm opacity-90">Keep your food fresh & cool</p>
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
                <h3 className="font-semibold text-red-800">Emergency Repair</h3>
                <p className="text-xs text-red-600">Urgent cooling issues</p>
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
            {fridgeServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-black">{service.name}</h4>
                      <span className="text-sm font-medium text-green-600">{service.price}</span>
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

        {/* Energy Saving Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-black mb-3">Energy Saving Tips</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🌡️</span>
              <span className="text-sm text-gray-700">Set optimal temperature (3-4°C)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🚪</span>
              <span className="text-sm text-gray-700">Don't keep door open too long</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🧽</span>
              <span className="text-sm text-gray-700">Clean coils every 6 months</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">📦</span>
              <span className="text-sm text-gray-700">Don't overfill the fridge</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}