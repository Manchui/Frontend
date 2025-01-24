import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const PopularCategorySlide = dynamic(() => import('@/components/main/Carousel/PopularCategorySlide'), { loading: () => <CarouselSkeleton />, ssr: true });
const IntroduceSlide = dynamic(() => import('@/components/main/Carousel/IntroduceSlide'), { loading: () => <CarouselSkeleton />, ssr: true });
const NoticeBoardSlide = dynamic(() => import('@/components/main/Carousel/NoticeBoardSlide'), { loading: () => <CarouselSkeleton />, ssr: true });
const FAQSlide = dynamic(() => import('@/components/main/Carousel/FAQSlide'), { loading: () => <CarouselSkeleton />, ssr: true });

interface CarouselProps {
  base64: {
    design: string;
    develop: string;
    food: string;
    server: string;
    study: string;
    web: string;
  };
}

const TOTAL_SLIDES = 4;

function Carousel({ base64 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    if (timeoutRef.current) return;
    setCurrentIndex((prev) => (prev + 1) % TOTAL_SLIDES);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 500);
  }, []);

  const handlePrev = useCallback(() => {
    if (timeoutRef.current) return;
    setCurrentIndex((prev) => (prev - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, 500);
  }, []);

  const slides = useMemo(
    () => ({
      0: <PopularCategorySlide base64={base64} />,
      1: <IntroduceSlide />,
      2: <NoticeBoardSlide />,
      3: <FAQSlide />,
    }),
    [base64],
  );

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNext]);

  return (
    <div className="group relative min-w-[300px] select-none overflow-hidden bg-blue-800 pt-[60px]">
      <div className="w-full">{slides[currentIndex as keyof typeof slides]}</div>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-20 hidden p-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 tablet:block tablet:opacity-0"
      >
        <Image src="/icons/carousel-left.svg" alt="이전" width={30} height={30} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-20 hidden p-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 tablet:block tablet:opacity-0"
      >
        <Image src="/icons/carousel-right.svg" alt="다음" width={30} height={30} />
      </button>

      <div className="absolute bottom-3 right-5 z-20 flex gap-2">
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer rounded-full transition-all duration-500 ${
              index === currentIndex ? 'h-[10px] w-10 bg-white' : 'size-[10px] bg-gray-400'
            }`}
            style={{
              transition: 'width 0.7s cubic-bezier(0.25, 0.8, 0.5, 1), background-color 0.5s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function CarouselSkeleton() {
  return (
    <div className="relative min-w-[360px] bg-blue-800">
      <div className="h-[300px]" />
    </div>
  );
}

export default memo(Carousel);
