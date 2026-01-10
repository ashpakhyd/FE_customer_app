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
      title: "Welcome to Help App",
      subtitle: "Your trusted service partner",
      description: "Get professional repair and maintenance services for all your home appliances",
      icon: "🏠",
      bgGradient: "from-yellow-400 to-orange-500"
    },
    {
      id: 2,
      title: "Expert Technicians",
      subtitle: "Certified professionals",
      description: "Our skilled technicians provide quality service with 1-year warranty on all repairs",
      icon: "👨‍🔧",
      bgGradient: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      title: "24/7 Emergency Service",
      subtitle: "Always available",
      description: "Urgent repairs? We're here round the clock for emergency service calls",
      icon: "🚨",
      bgGradient: "from-red-400 to-red-600"
    },
    {
      id: 4,
      title: "Easy Booking",
      subtitle: "Simple & fast",
      description: "Book services instantly or schedule appointments at your convenience",
      icon: "📱",
      bgGradient: "from-green-400 to-green-600"
    },
    {
      id: 5,
      title: "Track Your Service",
      subtitle: "Stay updated",
      description: "Real-time updates on your service requests with transparent pricing",
      icon: "📋",
      bgGradient: "from-purple-400 to-purple-600"
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

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleGetStarted();
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
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white overflow-hidden">
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={skipOnboarding}
          className="bg-white bg-opacity-20 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
        >
          Skip
        </button>
      </div>

      {/* Slides Container */}
      <div
        className="flex transition-transform duration-300 ease-in-out h-screen"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full h-screen bg-gradient-to-br ${slide.bgGradient} flex flex-col items-center justify-center text-white px-6`}
          >
            {/* Icon */}
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8">
              <span className="text-6xl">{slide.icon}</span>
            </div>

            {/* Content */}
            <div className="text-center max-w-sm">
              <h1 className="text-3xl font-bold mb-3">{slide.title}</h1>
              <h2 className="text-xl font-medium mb-6 opacity-90">{slide.subtitle}</h2>
              <p className="text-lg leading-relaxed opacity-80">{slide.description}</p>
            </div>

            {/* Bottom Section */}
            <div className="absolute bottom-20 left-0 right-0 px-6">
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mb-8">
                {slides.map((_, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      dotIndex === currentSlide
                        ? 'bg-white scale-125'
                        : 'bg-white bg-opacity-50'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => currentSlide > 0 && setCurrentSlide(currentSlide - 1)}
                  className={`w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center ${
                    currentSlide === 0 ? 'opacity-50' : 'opacity-100'
                  }`}
                  disabled={currentSlide === 0}
                >
                  <span className="text-xl">←</span>
                </button>

                <button
                  onClick={nextSlide}
                  className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
                >
                  {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                </button>

                <button
                  onClick={() => currentSlide < slides.length - 1 && setCurrentSlide(currentSlide + 1)}
                  className={`w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center ${
                    currentSlide === slides.length - 1 ? 'opacity-50' : 'opacity-100'
                  }`}
                  disabled={currentSlide === slides.length - 1}
                >
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Swipe Hint */}
      {currentSlide === 0 && (
        <div className="absolute bottom-32 left-0 right-0 text-center">
          <p className="text-white text-sm opacity-70 animate-pulse">
            Swipe left to continue →
          </p>
        </div>
      )}
    </div>
  );
}