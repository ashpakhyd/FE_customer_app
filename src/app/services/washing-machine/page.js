'use client';

import { useRouter } from 'next/navigation';

export default function WashingMachineService() {
  const router = useRouter();

  const washingServices = [
    {
      id: 'installation',
      name: 'Installation & Setup',
      price: '₹800 - ₹1,500',
      icon: '⚙️',
      desc: 'Complete washing machine installation',
      features: ['Unboxing & setup', 'Water connection', 'Drain setup', 'Test run']
    },
    {
      id: 'repair',
      name: 'Repair Service',
      price: '₹400 - ₹1,800',
      icon: '🔧',
      desc: 'Fix all washing machine issues',
      features: ['Not starting', 'Water not draining', 'Excessive vibration', 'Door problems']
    },
    {
      id: 'maintenance',
      name: 'Deep Cleaning',
      price: '₹600 - ₹1,000',
      icon: '🧽',
      desc: 'Complete machine cleaning',
      features: ['Drum cleaning', 'Filter cleaning', 'Pipe cleaning', 'Performance check']
    },
    {
      id: 'parts',
      name: 'Parts Replacement',
      price: '₹300 - ₹2,500',
      icon: '🔩',
      desc: 'Replace faulty components',
      features: ['Motor repair', 'Belt replacement', 'Pump replacement', 'Control panel']
    }
  ];

  const handleBookService = (service) => {
    router.push(`/create-ticket?serviceName=Washing Machine Service&categoryName=Washing Machine&subcategoryName=${service.name}`);
  };

  const handleBookAppointment = (service) => {
    router.push(`/book-appointment?service=washing&type=${service.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      {/* Header */}
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Washing Machine</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-2xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🧺</span>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Washing Machine</h2>
              <p className="text-sm opacity-90">Expert repair & maintenance</p>
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
                <p className="text-xs text-red-600">Same day service available</p>
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
            {washingServices.map((service) => (
              <div key={service.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">{service.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-black">{service.name}</h4>
                      <span className="text-sm font-medium text-purple-600">{service.price}</span>
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

        {/* Tips Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-black mb-3">Maintenance Tips</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">💡</span>
              <span className="text-sm text-gray-700">Clean lint filter regularly</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">💧</span>
              <span className="text-sm text-gray-700">Check water connections monthly</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">🧽</span>
              <span className="text-sm text-gray-700">Clean drum every 3 months</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⚖️</span>
              <span className="text-sm text-gray-700">Don't overload the machine</span>
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