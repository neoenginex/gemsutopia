'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useCMSContent } from '@/hooks/useCMSContent';

export default function Hero() {
  const { getHeroImages, loading } = useCMSContent();
  
  // Get images from CMS
  const images = getHeroImages();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    scrollToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToSlide(newIndex);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth } = scrollRef.current;
        const index = Math.round(scrollLeft / clientWidth);
        setCurrentIndex(index);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Reset to first slide when images change
  useEffect(() => {
    setCurrentIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [images.length]);

  // Auto-scroll effect
  useEffect(() => {
    if (images.length === 0 || loading) return;

    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      scrollToSlide(newIndex);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(interval);
  }, [currentIndex, images.length, loading]);

  // Show loading state or empty state
  if (loading || images.length === 0) {
    return (
      <section className="bg-black h-[85vh] sm:h-[85vh] md:h-[60vh] lg:h-[calc(100vh-110px)] md:mt-2 flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center">
          {loading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
          ) : (
            <div className="text-center text-white">
              <p className="text-xl mb-2">No hero images available</p>
              <p className="text-slate-400">Upload images from the admin dashboard</p>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black h-[85vh] sm:h-[85vh] md:h-[60vh] lg:h-[calc(100vh-110px)] md:mt-2 flex-shrink-0">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center relative">
            {/* Left click area */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-0 w-1/2 h-full z-10 bg-transparent cursor-pointer"
              aria-label="Previous slide"
            />
            
            {/* Right click area */}
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-0 w-1/2 h-full z-10 bg-transparent cursor-pointer"
              aria-label="Next slide"
            />
            
            {/* Slider */}
            <div 
              ref={scrollRef}
              className="w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
            >
              <div className="flex h-full">
                {images.map((src, index) => (
                  <div key={index} className="w-full h-full flex-shrink-0 snap-center px-0 sm:px-0.5 md:px-1 lg:px-2 relative">
                    <div className="bg-neutral-700 rounded-2xl w-full h-full overflow-hidden relative">
                      <Image 
                        src={src} 
                        alt={`Hero image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                        sizes="100vw"
                        quality={75}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Pagination dots on top of image */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentIndex === index ? 'bg-black' : 'bg-neutral-600'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            
            {/* Watermark */}
            <div className="absolute bottom-4 right-4 md:right-8 z-20">
              <Image 
                src="/logos/gems-logo.png" 
                alt="Gemsutopia Watermark"
                width={64}
                height={64}
                className="h-16 object-contain"
              />
            </div>
          </div>
        </div>
        
        <style jsx>{`
          .scrollbar-hide {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
  );
}