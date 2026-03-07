'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../app/swiper-custom.css';

export default function ImageGallery({ images, onImageClick }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full bg-black">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full aspect-[4/3]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img 
              src={image} 
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => onImageClick(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
