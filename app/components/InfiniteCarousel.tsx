import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface InfiniteCarouselProps {
  tema?: string;
  items: { src: string; alt: string, path: string }[];
  interval?: number;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ tema = "", items, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const router = useRouter();

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff < -50) goToNextSlide();
    else if (diff > 50) goToPrevSlide();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {
        tema && <p className=''>{tema}</p>
      }
      <div
        className="relative overflow-hidden w-full h-full flex-1"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out h-full space-x-6"
          // style={{ transform: `translateX(-100%)` }}
          style={{ transform: `translateX(-${currentIndex * 50}%)` }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              className="relative w-1/2 flex-shrink-0 cursor-pointer"
              onClick={() => router.push(`${item.path}`)}
            >
              <Image 
                src={item.src}
                alt={item.alt} 
                fill 
                style={{ objectFit: 'cover' }}
              />
              <p className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black bg-opacity-50">
                {item.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Progress bar below carousel */}
      <div className="w-full flex justify-center py-4">
        <div className="w-2/3 bg-gray-200 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;
