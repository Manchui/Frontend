/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import { useState } from 'react';
import Image from 'next/image';
import { Autoplay, EffectCreative, Navigation, Thumbs, Virtual } from 'swiper/modules';
import type { SwiperClass } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import RootLayout from '@/components/shared/RootLayout';

const images = [
  { src: '/images/0.jpg' },
  { src: '/images/1.jpg' },
  { src: '/images/2.jpg' },
  { src: '/images/3.jpg' },
  { src: '/images/4.jpg' },
  { src: '/images/5.jpg' },
  { src: '/images/6.jpg' },
  { src: '/images/7.jpg' },
  { src: '/images/8.jpg' },
  { src: '/images/9.jpg' },
];

export default function MainPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay, Virtual, EffectCreative, Thumbs]}
        loop
        speed={400}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        centeredSlides
        effect="creative"
        creativeEffect={{
          prev: {
            scale: 1.1,
            opacity: 0,
          },
          next: {
            scale: 1.1,
            opacity: 0,
          },
        }}
        slidesPerView={1.05}
        onSlideChangeTransitionEnd={(swiper) => {
          setActiveIndex(swiper.realIndex);
        }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="overflow-visible bg-background mobile:h-carousel-mobile-responsive tablet:h-carousel-tablet-responsive"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="rounded-3xl object-contain">
            <Image src={image.src} alt="test" fill sizes="w-full" className="object-cover" loading="eager" priority />
            <button type="button" className="prev absolute bottom-1/2 left-0 mx-2 hidden translate-y-1/2 rounded-full border-2 p-1 tablet:block">
              <Image src="./icons/carousel-left.svg" alt="Previous Btn" width={30} height={30} />
            </button>
            <button type="button" className="next absolute bottom-1/2 right-0 mx-2 hidden translate-y-1/2 rounded-full border-2 p-1 tablet:block">
              <Image src="./icons/carousel-right.svg" alt="Previous Btn" width={30} height={30} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        slidesPerView={4}
        spaceBetween={10}
        className="pc:w-thumb-pc-responsive relative bottom-20 right-12 float-right !hidden tablet:!block tablet:h-[50px] tablet:w-thumb-tablet-responsive pc:h-[60px]"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className={`cursor-pointer rounded-lg border-2 ${activeIndex === i ? 'border-white' : 'border-transparent'}`}>
            <Image
              src={image.src}
              alt={`Thumbnail ${i}`}
              fill
              sizes="w-full"
              className={`swiper-slide-active:border-gray-500 rounded-lg border object-cover ${activeIndex === i ? 'border-transparent' : ''}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <RootLayout>
        <div className="flex flex-col items-center justify-center gap-4">컨텐츠</div>
      </RootLayout>
    </>
  );
}
