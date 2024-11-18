import { useCallback, useEffect, useRef, useState } from 'react';
import { type Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import ArrowBtn from 'public/icons/ArrowBtn';
import IntroduceSlide from '@/components/main/Carousel/IntroduceSlide';
import NoticeBoardSlide from '@/components/main/Carousel/NoticeBoardSlide';
import PopularCategorySlide from '@/components/main/Carousel/PopularCategorySlide';

const zoomVariants: Variants = {
  enter: {
    scale: 1.1,
    opacity: 0,
  },
  center: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8 },
  },
};

interface CarouselProps {
  handleScrollToFilter: () => void;
}

export default function Carousel({ handleScrollToFilter }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    <IntroduceSlide key="introduce" />,
    <PopularCategorySlide key="popular" handleScrollToFilter={handleScrollToFilter} />,
    <NoticeBoardSlide key="notice" />,
  ];

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (timeoutRef.current) return;
    setCurrentIndex((prev) => (prev + 1) % slides.length);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 500);
  }, [slides.length]);

  const handlePrev = () => {
    if (timeoutRef.current) return;
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 500);
  };

  useEffect(() => {
    if (isHovered) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return undefined;
    }

    intervalRef.current = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNext, isHovered]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-w-[320px] select-none overflow-hidden bg-black pt-[60px]"
    >
      <m.div key={currentIndex} variants={zoomVariants} initial="enter" animate="center" className="w-full">
        {slides[currentIndex]}
      </m.div>

      <button type="button" onClick={handlePrev} className="absolute left-4 top-1/2 p-2">
        <ArrowBtn direction="left" color="gray" className="size-12" />
      </button>

      <button type="button" onClick={handleNext} className="absolute right-4 top-1/2 p-2">
        <ArrowBtn direction="right" color="gray" className="size-12" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-full transition-all duration-500 ${index === currentIndex ? 'h-[10px] w-10 bg-white' : 'size-[10px] bg-gray-400'}`}
            style={{
              transition: 'width 0.7s cubic-bezier(0.25, 0.8, 0.5, 1), background-color 0.5s',
            }}
          />
        ))}
      </div>
    </m.div>
  );
}
