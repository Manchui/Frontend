import { useEffect, useState } from 'react';
import Image from 'next/image';

const IMG = [
  {
    src: '/images/people-signuppage.png',
    heading1: '만취 모임에서',
    heading2: '건강한 나를 만나보세요.',
    paragraph1: '요가, 러닝, 피트니스 등 여러 운동을 통해 건강을 챙기며, 함께하는 사람들과',
    paragraph2: '더 가까워지는 시간을 가져보세요. 운동을 통해 몸과 마음을 리프레시하고, 즐거움도 함께 누리세요.',
    alt: 'people',
  },
  {
    src: '/images/board-signuppage.png',
    heading1: '만취 모임에서',
    heading2: '함께 배우고 성장하는 시간',
    paragraph1: '모임에서 취미활동 뿐만 아니라 함께 공부할 수 있는 시간도 있어요!',
    paragraph2: '관심 있는 주제를 스터디하며 지식을 쌓고, 서로의 서장에 도움이 되는 학습의 시간을 가져보세요.',
    alt: 'board',
  },
  {
    src: '/images/gameday-signuppage.png',
    heading1: '사람들과 함께',
    heading2: '만취 모임에서 다양한 게임을 즐길 수 있어요.',
    paragraph1: '팀을 이뤄 협동 게임에 도전하거나, 간단한 보드게임으로 즐거운 경쟁을 펼쳐보세요.',
    paragraph2: '게임을 통해 더 가까워지고, 웃음이 가득한 시간이 기다리고 있습니다.',
    alt: 'game',
  },
];

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
    const interval = setInterval(goToNext, 7000);
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
              <Image src={img.src} className="flex size-[500px] justify-center" alt={img.alt} width={500} height={300} />
              <h1 className="text-center text-2xl font-bold">{img.heading1}</h1>
              <h1 className="text-center text-2xl font-bold">{img.heading2}</h1>
              <p className="text-center">{img.paragraph1}</p>
              <p className="text-center">{img.paragraph2}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative mt-12 flex flex-row justify-center gap-x-4">
        {IMG.map((_, btnIndex) => (
          <button
            key={btnIndex}
            onClick={() => {
              setTransition(true);
              setCurrent(btnIndex + 1); // extendedImg에서 맞는 슬라이드 위치로 이동
            }}
            className={`h-4 ${current === btnIndex + 1 ? 'w-16 bg-[#FDF9F2]' : 'w-4 bg-gray-400'} rounded-full transition-all duration-1000 ease-in-out`}
            type="button"
            aria-label={`carousel button ${btnIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
