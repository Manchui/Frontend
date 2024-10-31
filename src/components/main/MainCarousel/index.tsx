/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type SwiperCore from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination, Thumbs, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Main } from '@/types/main/types';

interface MainCarouselProps {
  mainData: Main;
}

export default function MainCarousel({ mainData }: MainCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // 캐러셀 이미지 데이터 변수
  const images = mainData?.data?.gatheringList.map((gathering) => gathering.gatheringImage) || [];

  return (
    <main className="relative min-w-[320px] bg-background pt-[70px]">
      {/* Banner Carousel */}
      <Swiper
        modules={[Navigation, Autoplay, Virtual, EffectCreative, Thumbs, Pagination]}
        loop
        loopPreventsSliding
        // init
        // initialSlide={0}
        // loopAdditionalSlides={1}
        speed={300}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        centeredSlides
        effect="creative"
        creativeEffect={{
          prev: { opacity: 0 },
          next: { opacity: 0 },
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
        autoplay={{ delay: 3000, disableOnInteraction: false, waitForTransition: true, pauseOnMouseEnter: true }}
        className="h-carousel-mobile-responsive tablet:h-carousel-tablet-responsive"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="absolute z-0 rounded-3xl">
            <Image src={src} alt="Carousel image" fill sizes="100vw" className="rounded-3xl object-cover" loading="eager" priority />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination flex !w-[95%] justify-end mobile:!hidden" />
      </Swiper>

      {/* Carousel Navigation */}
      <button
        ref={prevRef}
        type="button"
        className="prev absolute left-0 top-1/2 z-50 mx-4 hidden translate-y-1/3 rounded-full border-2 p-1 hover:brightness-0 hover:invert mobile:block tablet:mx-10"
      >
        <Image src="./icons/carousel-left.svg" alt="Previous Button" width={30} height={30} />
      </button>
      <button
        ref={nextRef}
        type="button"
        className="next absolute right-0 top-1/2 z-50 mx-4 hidden translate-y-1/3 rounded-full border-2 p-1 hover:brightness-0 hover:invert mobile:block tablet:mx-10"
      >
        <Image src="./icons/carousel-right.svg" alt="Next Button" width={30} height={30} />
      </button>

      {/* Carousel Thumbnail */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={(swiper: SwiperCore) => setThumbsSwiper(swiper)}
        slidesPerView={4}
        spaceBetween={10}
        className="absolute bottom-20 right-12 float-right !opacity-0 tablet:h-[60px] tablet:w-thumb-tablet-responsive tablet:!opacity-100 pc:h-[60px] pc:w-thumb-pc-responsive"
      >
        {images?.map((src, i) => (
          <SwiperSlide key={i} className={`cursor-pointer rounded-lg border-2 ${activeIndex === i ? 'border-white' : 'border-transparent'}`}>
            <Image
              src={src}
              alt={`Thumbnail ${i}`}
              fill
              sizes="w-full"
              loading="lazy"
              className={`swiper-slide-active:border-gray-500 rounded-lg border object-cover ${activeIndex === i ? 'border-transparent' : ''}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
