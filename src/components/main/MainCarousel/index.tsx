/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import React, { useRef, useState } from 'react';
import { Gugi } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import type SwiperCore from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getGatheringData } from '@/apis/getGatheringData';
import { useQuery } from '@tanstack/react-query';

const gugi = Gugi({ weight: '400', subsets: ['latin'] });

function MainCarousel() {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { data } = useQuery({
    queryKey: ['main'],
    queryFn: () => getGatheringData({ page: 1, size: 8 }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 3,
  });

  const gatherings = data?.data.gatheringList || [];

  const goToPreviousSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === 0 ? gatherings.length - 1 : swiperIndex - 1, 500);
    }
  };

  const goToNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === gatherings.length - 1 ? 0 : swiperIndex + 1, 500);
    }
  };

  return (
    <main className="relative min-w-[320px] bg-background pt-[60px]">
      {/* Banner Carousel */}
      <div className="group relative">
        <Swiper
          modules={[Navigation, Autoplay, EffectCreative, Thumbs, Pagination]}
          effect="creative"
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          centeredSlides
          slidesPerView={1}
          creativeEffect={{
            prev: { opacity: 0 },
            next: { opacity: 0 },
          }}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
          autoplay={{ delay: 3000, disableOnInteraction: false, waitForTransition: false, pauseOnMouseEnter: true }}
          className="h-carousel-mobile-responsive tablet:h-carousel-tablet-responsive"
        >
          {gatherings.map((gathering, i) => (
            <SwiperSlide key={gathering.gatheringId} className="relative">
              <Image
                src={gathering.gatheringImage}
                alt={gathering.name}
                fill
                sizes="100vw"
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-bannerGradient" />
              <div className="absolute bottom-0 left-0 p-6 text-white tablet:ml-6 tablet:p-6">
                <span className={`text-18-32-response font-bold ${gugi.className}`}>{gathering.name}</span>
                <div className="flex flex-col gap-1 font-bold">
                  <div className="flex gap-1 text-title-response">
                    <span className={`${gugi.className}`}>{gathering.groupName}</span>
                    <span className={`${gugi.className}`}>|</span>
                    <span className={`${gugi.className}`}>
                      인원 {gathering.currentUsers}/{gathering.maxUsers}
                    </span>
                  </div>
                  <Link
                    href={`/detail/${gathering.gatheringId}`}
                    className="flex w-fit items-center rounded-md bg-white/40 py-1 pl-2 text-sub-response mobile:py-2 mobile:pl-4"
                  >
                    지금 인기 있는 모임을 만나보세요
                    <Image src="/icons/main/banner-btn.svg" alt="자세히 보기" width={24} height={24} className="ml-2" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination flex !w-[95%] justify-end mobile:!hidden" />
        </Swiper>

        {/* Carousel Navigation */}
        <button
          ref={prevRef}
          type="button"
          onClick={goToPreviousSlide}
          className="absolute left-0 top-1/2 z-50 mx-4 -translate-y-1/2 rounded-full bg-gray-700 p-2 text-white opacity-0 transition-all duration-300 hover:bg-gray-600 group-hover:opacity-100"
        >
          <Image src="/icons/carousel-left.svg" alt="Previous Button" width={30} height={30} />
        </button>

        <button
          ref={nextRef}
          type="button"
          onClick={goToNextSlide}
          className="absolute right-0 top-1/2 z-50 mx-4 -translate-y-1/2 rounded-full bg-gray-700 p-2 text-white opacity-0 transition-all duration-300 hover:bg-gray-600 group-hover:opacity-100"
        >
          <Image src="/icons/carousel-right.svg" alt="Next Button" width={30} height={30} />
        </button>
      </div>

      {/* Carousel Thumbnail */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={(thumb: SwiperCore) => setThumbsSwiper(thumb)}
        slidesPerView={4}
        spaceBetween={10}
        className="absolute bottom-20 right-12 float-right opacity-0 tablet:h-[60px] tablet:w-thumb-tablet-responsive tablet:opacity-100 pc:w-thumb-pc-responsive"
      >
        {gatherings.map((gathering, i) => (
          <SwiperSlide
            key={gathering.gatheringId}
            onClick={() => swiperInstance?.slideTo(i)}
            className={`cursor-pointer rounded-lg ${swiperIndex !== i && 'border-none opacity-30'}`}
          >
            <Image
              src={gathering.gatheringImage}
              alt={`Thumbnail ${i}`}
              fill
              sizes="100vw"
              loading={i === 0 ? 'eager' : 'lazy'}
              priority={i === 0}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default React.memo(MainCarousel);
