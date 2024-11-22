import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IMG } from '@/constants/loginCarousel';

/**
 * Carousel Component
 * @description Carousel Component for login page and signup page
 * @returns 
 */

export default function Carousel() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedImg = [IMG[IMG.length - 1], ...IMG, IMG[0]];

  const goToNext = () => {
    setTransition(true);
    setCurrent((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (current === 0) {
      timeoutId = setTimeout(() => {
        setCurrent(extendedImg.length - 2);
        setTransition(false);
      }, 500);
    } else if (current === extendedImg.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrent(1);
        setTransition(false);
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [current, extendedImg.length]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div className={`flex ${transition && 'transition-transform duration-500'}`} style={{ transform: `translateX(-${current * 100}%)` }}>
          {extendedImg.map((img, index) => (
            <div key={index} className="flex w-full shrink-0 flex-col items-center justify-between rounded-2xl text-white">
              <Image src={img.src} className="flex size-[350px] justify-center" alt={img.alt} width={500} height={300} />
              <h1 className="text-center text-2xl font-bold">{img.heading1}</h1>
              <h1 className="text-center text-2xl font-bold">{img.heading2}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-20 flex flex-row justify-center gap-x-4">
        {IMG.map((_, btnIndex) => (
          <button
            key={btnIndex}
            onClick={() => {
              setTransition(true);
              setCurrent(btnIndex + 1); // extendedImg에서 맞는 슬라이드 위치로 이동
            }}
            className={`h-2 ${current === btnIndex + 1 ? 'w-16 bg-[#FDF9F2]' : 'w-2 bg-gray-400'} rounded-full transition-all duration-1000 ease-in-out`}
            type="button"
            aria-label={`carousel button ${btnIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
