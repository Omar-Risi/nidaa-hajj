'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    direction: 'rtl',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl" ref={emblaRef} dir="rtl">
        <div className="flex">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="min-w-0 flex-shrink-0 flex-grow-0"
              style={{ 
                flex: '0 0 100%',
                width: '100%'
              }}
            >
              <img
                src={image}
                alt={`صورة ${index + 1}`}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation - Only show if more than 1 image */}
      {images.length > 1 && (
        <>
          {/* Previous Button (Right side in RTL) */}
          <button
            onClick={scrollPrev}
            disabled={selectedIndex === 0}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6 text-gold-start" />
          </button>

          {/* Next Button (Left side in RTL) */}
          <button
            onClick={scrollNext}
            disabled={selectedIndex === images.length - 1}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6 text-gold-start" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-gold-start'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`الانتقال للصورة ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Counter */}
          <div className="text-center mt-2 text-sm text-gray-600">
            {selectedIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
