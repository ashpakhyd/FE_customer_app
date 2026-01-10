'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const router = useRouter();

  const slides = [
    {
      id: 1,
      title: "Professional Service",
      description: "Get expert technicians for all your home appliance repairs and maintenance needs",
      image: "🔧",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Quick Booking",
      description: "Book services instantly or schedule appointments that fit your busy lifestyle",
      image: "📱",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Track Progress",
      description: "Real-time updates on your service requests with transparent pricing and status",
      image: "📍",
      color: "bg-purple-500"
    },
    {
      id: 4,
      title: "24/7 Support",
      description: "Emergency services available round the clock for urgent repair needs",
      image: "🚨",
      color: "bg-red-500"
    }
  ];

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    router.push('/login');
  };

  const skipOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6 pt-12">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-yellow-400' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
        <button
          onClick={skipOnboarding}
          className="text-gray-500 font-medium"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div
          className="flex transition-transform duration-300 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div key={slide.id} className="min-w-full flex flex-col items-center justify-center px-8 py-12">
              {/* Image/Icon */}
              <div className={`w-48 h-48 ${slide.color} rounded-3xl flex items-center justify-center mb-12 shadow-lg`}>
                <span className="text-8xl">{slide.image}</span>
              </div>

              {/* Text Content */}
              <div className="text-center max-w-sm">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => currentSlide > 0 && setCurrentSlide(currentSlide - 1)}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              currentSlide === 0
                ? 'border-gray-200 text-gray-300'
                : 'border-gray-400 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
            }`}
            disabled={currentSlide === 0}
          >
            <span className="text-xl">←</span>
          </button>

          <button
            onClick={() => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
              currentSlide === slides.length - 1
                ? 'border-gray-200 text-gray-300'
                : 'border-gray-400 text-gray-600 hover:border-yellow-400 hover:text-yellow-600'
            }`}
            disabled={currentSlide === slides.length - 1}
          >
            <span className="text-xl">→</span>
          </button>
        </div>

        <button
          onClick={handleGetStarted}
          className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-semibold text-lg hover:bg-yellow-500 transition-colors shadow-lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
        </button>
      </div>
    </div>
  );
}