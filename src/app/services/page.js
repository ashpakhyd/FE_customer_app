'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdElectricBolt, MdConstruction, MdPlumbing, MdFormatPaint, MdCleaningServices, MdCarpenter } from 'react-icons/md';
import { GiPlantSeed, GiBugNet, GiHouse, GiCookingPot } from 'react-icons/gi';
import { TbAirConditioning } from 'react-icons/tb';
import { FaUserMd, FaBalanceScale, FaBook, FaShieldAlt, FaCar, FaCamera, FaCalendarAlt } from 'react-icons/fa';
import { IoSparkles } from 'react-icons/io5';
import { BiSpa } from 'react-icons/bi';

export default function Services() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const activeServices = ['electrician', 'appliances'];

  const handleServiceClick = (serviceId) => {
    if (activeServices.includes(serviceId)) {
      router.push(`/services/${serviceId}`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const services = [
    { id: 'electrician', name: 'Electrician', icon: <MdElectricBolt />, color: 'bg-yellow-100', iconBg: 'bg-yellow-400' },
    { id: 'appliances', name: 'Appliances Repair', icon: <MdConstruction />, color: 'bg-blue-100', iconBg: 'bg-blue-400' },
    { id: 'plumber', name: 'Plumber', icon: <MdPlumbing />, color: 'bg-cyan-100', iconBg: 'bg-cyan-400' },
    { id: 'carpenter', name: 'Carpenter', icon: <MdCarpenter />, color: 'bg-orange-100', iconBg: 'bg-orange-400' },
    { id: 'painter', name: 'Painter', icon: <MdFormatPaint />, color: 'bg-purple-100', iconBg: 'bg-purple-400' },
    { id: 'cleaner', name: 'Cleaning Service', icon: <MdCleaningServices />, color: 'bg-green-100', iconBg: 'bg-green-400' },
    { id: 'gardener', name: 'Gardener', icon: <GiPlantSeed />, color: 'bg-emerald-100', iconBg: 'bg-emerald-400' },
    { id: 'pest-control', name: 'Pest Control', icon: <GiBugNet />, color: 'bg-red-100', iconBg: 'bg-red-400' },
    { id: 'ac-repair', name: 'AC Repair', icon: <TbAirConditioning />, color: 'bg-sky-100', iconBg: 'bg-sky-400' },
    { id: 'builder', name: 'Builder', icon: <GiHouse />, color: 'bg-stone-100', iconBg: 'bg-stone-400' },
    { id: 'doctor', name: 'Doctor', icon: <FaUserMd />, color: 'bg-pink-100', iconBg: 'bg-pink-400' },
    { id: 'advocate', name: 'Advocate', icon: <FaBalanceScale />, color: 'bg-indigo-100', iconBg: 'bg-indigo-400' },
    { id: 'tutor', name: 'Home Tutor', icon: <FaBook />, color: 'bg-amber-100', iconBg: 'bg-amber-400' },
    { id: 'security', name: 'Security Guard', icon: <FaShieldAlt />, color: 'bg-gray-100', iconBg: 'bg-gray-400' },
    { id: 'driver', name: 'Driver', icon: <FaCar />, color: 'bg-blue-100', iconBg: 'bg-blue-500' },
    { id: 'cook', name: 'Cook/Chef', icon: <GiCookingPot />, color: 'bg-orange-100', iconBg: 'bg-orange-500' },
    { id: 'beautician', name: 'Beautician', icon: <IoSparkles />, color: 'bg-rose-100', iconBg: 'bg-rose-400' },
    { id: 'massage', name: 'Massage Therapist', icon: <BiSpa />, color: 'bg-violet-100', iconBg: 'bg-violet-400' },
    { id: 'photographer', name: 'Photographer', icon: <FaCamera />, color: 'bg-teal-100', iconBg: 'bg-teal-400' },
    { id: 'event-planner', name: 'Event Planner', icon: <FaCalendarAlt />, color: 'bg-fuchsia-100', iconBg: 'bg-fuchsia-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white pb-20">
      <div className="bg-white p-4 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button onClick={() => router.back()} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg">←</span>
          </button>
          <h1 className="text-xl font-bold text-black">Select Service</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <p className="text-gray-600 text-sm mb-6 text-center">Choose the service you need</p>
        
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`${service.color} rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform ${!activeServices.includes(service.id) ? 'opacity-60' : ''}`}
            >
              <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                <span className="text-2xl">{service.icon}</span>
              </div>
              <h3 className="font-semibold text-black text-sm mb-1">{service.name}</h3>
              <p className="text-xs text-gray-600">Professional service</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <p className="font-medium text-sm">This service is coming soon!</p>
        </div>
      )}

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