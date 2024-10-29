/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import { useState } from 'react';
import Image from 'next/image';
import type SwiperCore from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination, Thumbs, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface MainCarouselProps {
  images: { src: string }[];
}

export default function MainCarousel({ images }: MainCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className="relative min-w-[320px] bg-background pt-[70px]">
      <Swiper
        modules={[Navigation, Autoplay, Virtual, EffectCreative, Thumbs, Pagination]}
        loop
        speed={300}
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        centeredSlides
        effect="creative"
        creativeEffect={{
          prev: {
            opacity: 0,
          },
          next: {
            opacity: 0,
          },
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        slidesPerView={1.03}
        onSlideChangeTransitionEnd={(swiper: SwiperCore) => {
          setActiveIndex(swiper.realIndex);
        }}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-carousel-mobile-responsive tablet:h-carousel-tablet-responsive"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className="absolute z-0 rounded-3xl">
            <Image src={image.src} alt="test" fill sizes="100vw" className="rounded-3xl object-cover" loading="eager" priority quality={100} />
            <button
              type="button"
              className="prev absolute bottom-1/2 left-0 mx-2 hidden translate-y-1/2 rounded-full border-2 p-1 hover:brightness-0 hover:invert mobile:block"
            >
              <Image src="./icons/carousel-left.svg" alt="Previous Btn" width={30} height={30} />
            </button>
            <button
              type="button"
              className="next absolute bottom-1/2 right-0 mx-2 hidden translate-y-1/2 rounded-full border-2 p-1 hover:brightness-0 hover:invert mobile:block"
            >
              <Image src="./icons/carousel-right.svg" alt="Previous Btn" width={30} height={30} />
            </button>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination flex !w-[95%] justify-end mobile:!hidden" />
      </Swiper>

      <Swiper
        modules={[Thumbs]}
        onSwiper={(swiper: SwiperCore) => setThumbsSwiper(swiper)}
        slidesPerView={4}
        spaceBetween={10}
        className="absolute bottom-20 right-12 float-right !opacity-0 tablet:h-[60px] tablet:w-thumb-tablet-responsive tablet:!opacity-100 pc:h-[60px] pc:w-thumb-pc-responsive"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i} className={`cursor-pointer rounded-lg border-2 ${activeIndex === i ? 'border-white' : 'border-transparent'}`}>
            <Image
              src={image.src}
              alt={`Thumbnail ${i}`}
              fill
              sizes="w-full"
              priority
              className={`swiper-slide-active:border-gray-500 rounded-lg border object-cover ${activeIndex === i ? 'border-transparent' : ''}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
