'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

export default function FullScreenGallery({ images, isOpen, onClose, initialSlide = 0 }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <button onClick={onClose} className="text-white text-3xl w-10 h-10 flex items-center justify-center">
          ×
        </button>
      </div>
      
      <div className="flex-1 flex items-center">
        <Swiper
          modules={[Navigation, Pagination, Zoom]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          initialSlide={initialSlide}
          zoom={true}
          className="w-full h-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="swiper-zoom-container">
                <img 
                  src={image} 
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
