/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import React, { useRef, useState } from 'react';
import Lottie from 'lottie-react';
import Image from 'next/image';
import ArrowBtn from 'public/icons/ArrowBtn';
import type SwiperCore from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getGatheringData } from '@/apis/getGatheringData';
import CarouselContent from '@/components/main/MainCarousel/CarouselContent';
import { useQuery } from '@tanstack/react-query';

import Error from 'public/lottie/error.json'; // 빨간 느낌표

function MainCarousel({ isError }: { isError: boolean }) {
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
        {isError ? (
          <div className="flex-center h-carousel-mobile-responsive flex-col gap-2 border-b-2 border-cardBorder tablet:h-carousel-tablet-responsive">
            <Lottie animationData={Error} className="size-24" />
          </div>
        ) : (
          <>
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
                  <CarouselContent gathering={gathering} i={i} />
                </SwiperSlide>
              ))}
              <div className="swiper-pagination flex !w-[95%] justify-end mobile:!hidden" />
            </Swiper>

            {/* Carousel Button */}
            <button
              ref={prevRef}
              type="button"
              onClick={goToPreviousSlide}
              className="absolute left-0 top-1/2 z-50 mx-4 hidden -translate-y-1/2 rounded-full p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 mobile:block"
            >
              <ArrowBtn direction="left" color="dimgray" className="size-10" />
            </button>

            <button
              ref={nextRef}
              type="button"
              onClick={goToNextSlide}
              className="absolute right-0 top-1/2 z-50 mx-4 hidden -translate-y-1/2 rounded-full p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 mobile:block"
            >
              <ArrowBtn direction="right" color="dimgray" className="size-10" />
            </button>

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
                  className={`cursor-pointer rounded-lg ${swiperIndex !== i ? 'border-none opacity-30' : 'border-2 border-background'}`}
                >
                  <Image
                    src={gathering.gatheringImage}
                    alt={`${gathering.groupName} Thumbnail`}
                    fill
                    sizes="100vw"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    priority={i === 0}
                    className="rounded-lg object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </main>
  );
}

export default React.memo(MainCarousel);
