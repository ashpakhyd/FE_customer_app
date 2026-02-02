'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceCategories({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);

  const serviceData = {
    electrician: {
      name: 'Electrician',
      icon: '⚡',
      categories: [
        { id: 'wiring', name: 'Wiring & Installation', icon: '🔌', desc: 'New wiring, switches, outlets' },
        { id: 'repair', name: 'Electrical Repair', icon: '🔧', desc: 'Fix electrical issues' },
        { id: 'lighting', name: 'Lighting Solutions', icon: '💡', desc: 'LED, bulbs, fixtures' },
        { id: 'fan', name: 'Fan Installation', icon: '🌀', desc: 'Ceiling & wall fans' },
        { id: 'other', name: 'Other', icon: '⚙️', desc: 'Other electrical services' }
      ]
    },
    appliances: {
      name: 'Appliances Repair',
      icon: '🔧',
      categories: [
        { id: 'washing-machine', name: 'Washing Machine', icon: '🧺', desc: 'Repair & maintenance' },
        { id: 'refrigerator', name: 'Refrigerator', icon: '❄️', desc: 'Cooling issues, repair' },
        { id: 'microwave', name: 'Microwave', icon: '📱', desc: 'Heating & repair' },
        { id: 'dishwasher', name: 'Dishwasher', icon: '🍽️', desc: 'Cleaning & repair' },
        { id: 'ac', name: 'Air Conditioner', icon: '❄️', desc: 'AC repair & service' },
        { id: 'tv', name: 'Television', icon: '📺', desc: 'TV repair & setup' },
        { id: 'other', name: 'Other', icon: '⚙️', desc: 'Other appliance services' }
      ]
    },
    plumber: {
      name: 'Plumber',
      icon: '🚿',
      categories: [
        { id: 'pipe-repair', name: 'Pipe Repair', icon: '🔧', desc: 'Leakage & blockage' },
        { id: 'bathroom', name: 'Bathroom Fitting', icon: '🚽', desc: 'Toilet, basin, shower' },
        { id: 'kitchen', name: 'Kitchen Plumbing', icon: '🚰', desc: 'Sink, tap installation' },
        { id: 'drainage', name: 'Drainage Cleaning', icon: '🕳️', desc: 'Drain cleaning service' }
      ]
    },
    carpenter: {
      name: 'Carpenter',
      icon: '🔨',
      categories: [
        { id: 'furniture', name: 'Furniture Making', icon: '🪑', desc: 'Custom furniture' },
        { id: 'repair', name: 'Furniture Repair', icon: '🔧', desc: 'Fix broken furniture' },
        { id: 'door-window', name: 'Door & Window', icon: '🚪', desc: 'Installation & repair' },
        { id: 'cabinet', name: 'Cabinet Work', icon: '🗄️', desc: 'Kitchen & storage' }
      ]
    },
    painter: {
      name: 'Painter',
      icon: '🎨',
      categories: [
        { id: 'interior', name: 'Interior Painting', icon: '🏠', desc: 'Room painting' },
        { id: 'exterior', name: 'Exterior Painting', icon: '🏢', desc: 'Building exterior' },
        { id: 'texture', name: 'Texture Painting', icon: '🎭', desc: 'Decorative textures' },
        { id: 'waterproof', name: 'Waterproofing', icon: '💧', desc: 'Leak protection' }
      ]
    },
    cleaner: {
      name: 'Cleaning Service',
      icon: '🧹',
      categories: [
        { id: 'deep-clean', name: 'Deep Cleaning', icon: '✨', desc: 'Complete house cleaning' },
        { id: 'regular', name: 'Regular Cleaning', icon: '🧽', desc: 'Daily/weekly cleaning' },
        { id: 'carpet', name: 'Carpet Cleaning', icon: '🪣', desc: 'Professional carpet care' },
        { id: 'office', name: 'Office Cleaning', icon: '🏢', desc: 'Commercial cleaning' }
      ]
    },
    gardener: {
      name: 'Gardener',
      icon: '🌱',
      categories: [
        { id: 'lawn-care', name: 'Lawn Care', icon: '🌿', desc: 'Grass cutting & maintenance' },
        { id: 'plant-care', name: 'Plant Care', icon: '🪴', desc: 'Watering & pruning' },
        { id: 'landscaping', name: 'Landscaping', icon: '🌳', desc: 'Garden design' },
        { id: 'pest-plant', name: 'Plant Pest Control', icon: '🐛', desc: 'Garden pest removal' }
      ]
    },
    'pest-control': {
      name: 'Pest Control',
      icon: '🐛',
      categories: [
        { id: 'cockroach', name: 'Cockroach Control', icon: '🪳', desc: 'Cockroach elimination' },
        { id: 'termite', name: 'Termite Control', icon: '🐜', desc: 'Termite treatment' },
        { id: 'rodent', name: 'Rodent Control', icon: '🐭', desc: 'Rat & mice removal' },
        { id: 'general-pest', name: 'General Pest Control', icon: '🕷️', desc: 'All pest treatment' }
      ]
    },
    'ac-repair': {
      name: 'AC Repair',
      icon: '❄️',
      categories: [
        { id: 'not-cooling', name: 'Not Cooling', icon: '🌡️', desc: 'Temperature issues' },
        { id: 'gas-refill', name: 'Gas Refill', icon: '⛽', desc: 'Refrigerant refill' },
        { id: 'cleaning', name: 'AC Cleaning', icon: '🧽', desc: 'Filter & coil cleaning' },
        { id: 'installation', name: 'AC Installation', icon: '🔧', desc: 'New AC setup' }
      ]
    },
    builder: {
      name: 'Builder',
      icon: '🏗️',
      categories: [
        { id: 'construction', name: 'Construction Work', icon: '🧱', desc: 'Building construction' },
        { id: 'renovation', name: 'Renovation', icon: '🔨', desc: 'Home renovation' },
        { id: 'flooring', name: 'Flooring', icon: '🏠', desc: 'Floor installation' },
        { id: 'roofing', name: 'Roofing', icon: '🏘️', desc: 'Roof repair & installation' }
      ]
    },
    doctor: {
      name: 'Doctor',
      icon: '👨⚕️',
      categories: [
        { id: 'general', name: 'General Physician', icon: '🩺', desc: 'General consultation' },
        { id: 'pediatric', name: 'Pediatrician', icon: '👶', desc: 'Child specialist' },
        { id: 'orthopedic', name: 'Orthopedic', icon: '🦴', desc: 'Bone & joint specialist' },
        { id: 'dermatology', name: 'Dermatologist', icon: '🧴', desc: 'Skin specialist' }
      ]
    },
    advocate: {
      name: 'Advocate',
      icon: '⚖️',
      categories: [
        { id: 'civil', name: 'Civil Law', icon: '📋', desc: 'Property, contracts' },
        { id: 'criminal', name: 'Criminal Law', icon: '🚨', desc: 'Criminal cases' },
        { id: 'family', name: 'Family Law', icon: '👨👩👧👦', desc: 'Divorce, custody' },
        { id: 'corporate', name: 'Corporate Law', icon: '🏢', desc: 'Business legal matters' }
      ]
    },
    tutor: {
      name: 'Home Tutor',
      icon: '📚',
      categories: [
        { id: 'academic', name: 'Academic Subjects', icon: '📖', desc: 'Math, Science, English' },
        { id: 'language', name: 'Language Learning', icon: '🗣️', desc: 'Hindi, English, regional' },
        { id: 'music', name: 'Music Lessons', icon: '🎵', desc: 'Vocal & instrumental' },
        { id: 'computer', name: 'Computer Skills', icon: '💻', desc: 'Basic computer training' }
      ]
    },
    security: {
      name: 'Security Guard',
      icon: '🛡️',
      categories: [
        { id: 'residential', name: 'Residential Security', icon: '🏠', desc: 'Home security' },
        { id: 'commercial', name: 'Commercial Security', icon: '🏢', desc: 'Office security' },
        { id: 'event', name: 'Event Security', icon: '🎉', desc: 'Function security' },
        { id: 'personal', name: 'Personal Security', icon: '👤', desc: 'Bodyguard service' }
      ]
    },
    driver: {
      name: 'Driver',
      icon: '🚗',
      categories: [
        { id: 'personal', name: 'Personal Driver', icon: '👨', desc: 'Full-time driver' },
        { id: 'trip', name: 'Trip Driver', icon: '🗺️', desc: 'Outstation trips' },
        { id: 'delivery', name: 'Delivery Driver', icon: '📦', desc: 'Goods delivery' },
        { id: 'chauffeur', name: 'Chauffeur Service', icon: '🤵', desc: 'Professional driving' }
      ]
    },
    cook: {
      name: 'Cook/Chef',
      icon: '👨🍳',
      categories: [
        { id: 'home-cook', name: 'Home Cook', icon: '🍽️', desc: 'Daily cooking' },
        { id: 'party-cook', name: 'Party Cook', icon: '🎉', desc: 'Event catering' },
        { id: 'special-diet', name: 'Special Diet Cook', icon: '🥗', desc: 'Health-focused cooking' },
        { id: 'baking', name: 'Baker', icon: '🧁', desc: 'Cakes & pastries' }
      ]
    },
    beautician: {
      name: 'Beautician',
      icon: '💄',
      categories: [
        { id: 'facial', name: 'Facial Treatment', icon: '✨', desc: 'Skin care treatments' },
        { id: 'hair-care', name: 'Hair Care', icon: '💇', desc: 'Hair styling & treatment' },
        { id: 'makeup', name: 'Makeup Service', icon: '💋', desc: 'Bridal & party makeup' },
        { id: 'nail-care', name: 'Nail Care', icon: '💅', desc: 'Manicure & pedicure' }
      ]
    },
    massage: {
      name: 'Massage Therapist',
      icon: '💆',
      categories: [
        { id: 'therapeutic', name: 'Therapeutic Massage', icon: '🙌', desc: 'Pain relief massage' },
        { id: 'relaxation', name: 'Relaxation Massage', icon: '😌', desc: 'Stress relief' },
        { id: 'sports', name: 'Sports Massage', icon: '🏃', desc: 'Athletic recovery' },
        { id: 'prenatal', name: 'Prenatal Massage', icon: '🤱', desc: 'Pregnancy massage' }
      ]
    },
    photographer: {
      name: 'Photographer',
      icon: '📸',
      categories: [
        { id: 'wedding', name: 'Wedding Photography', icon: '💒', desc: 'Wedding shoots' },
        { id: 'portrait', name: 'Portrait Photography', icon: '👤', desc: 'Individual portraits' },
        { id: 'event', name: 'Event Photography', icon: '🎉', desc: 'Party & function photos' },
        { id: 'product', name: 'Product Photography', icon: '📦', desc: 'Commercial photography' }
      ]
    },
    'event-planner': {
      name: 'Event Planner',
      icon: '🎉',
      categories: [
        { id: 'wedding', name: 'Wedding Planning', icon: '💒', desc: 'Complete wedding planning' },
        { id: 'birthday', name: 'Birthday Party', icon: '🎂', desc: 'Birthday celebrations' },
        { id: 'corporate', name: 'Corporate Events', icon: '🏢', desc: 'Business events' },
        { id: 'festival', name: 'Festival Events', icon: '🪔', desc: 'Religious celebrations' }
      ]
    }
  };

  const service = serviceData[resolvedParams.serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-black mb-2">Service Not Found</h1>
          <button onClick={() => router.push('/services')} className="btn-primary">
            Back to Services
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
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{service.icon}</span>
            <h1 className="text-xl font-bold text-black">{service.name}</h1>
          </div>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <p className="text-gray-600 text-sm mb-6 text-center">Select category for {service.name.toLowerCase()}</p>
        
        <div className="space-y-4">
          {service.categories.map((category) => (
            <div
              key={category.id}
              onClick={() => router.push(`/services/${resolvedParams.serviceId}/${category.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-xl">{category.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-black mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">{category.desc}</p>
                </div>
                <span className="text-gray-400">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}