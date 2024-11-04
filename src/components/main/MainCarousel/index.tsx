/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import { useRef, useState } from 'react';
import Image from 'next/image';
import type SwiperCore from 'swiper';
import { Autoplay, EffectCreative, Navigation, Pagination, Thumbs, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getGatheringData } from '@/apis/getGatheringData';
import { useQuery } from '@tanstack/react-query';

export default function MainCarousel() {
  const [swiperIndex, setSwiperIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { data } = useQuery({
    queryKey: ['main'],
    queryFn: () =>
      getGatheringData({
        page: 1,
        size: 8,
      }),
  });

  const images = data?.data?.gatheringList.map((gathering) => gathering.gatheringImage) || [];

  const goToPreviousSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === 0 ? images.length - 1 : swiperIndex - 1, 0);
    }
  };

  const goToNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === images.length - 1 ? 0 : swiperIndex + 1, 0);
    }
  };

  return (
    <main className="relative min-w-[320px] bg-background pt-[60px]">
      {/* Banner Carousel */}
      <Swiper
        modules={[Navigation, Autoplay, Virtual, EffectCreative, Thumbs, Pagination]}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
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
        slidesPerView={1}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        autoplay={{ delay: 3000, disableOnInteraction: false, waitForTransition: true, pauseOnMouseEnter: true }}
        className="h-carousel-mobile-responsive tablet:h-carousel-tablet-responsive"
      >
        {images.map((src, i) => (
          <SwiperSlide key={i} className="absolute z-0">
            <Image src={src} alt="Carousel image" fill sizes="100vw" className="object-cover" loading="eager" priority />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination flex !w-[95%] justify-end mobile:!hidden" />
      </Swiper>

      {/* Carousel Navigation */}
      <button ref={prevRef} type="button" onClick={goToPreviousSlide} className="absolute left-0 top-1/2 z-50 mx-4 rounded-full bg-gray-700 p-2 text-white">
        <Image src="/icons/carousel-left.svg" alt="Previous Button" width={30} height={30} />
      </button>
      <button ref={nextRef} type="button" onClick={goToNextSlide} className="absolute right-0 top-1/2 z-50 mx-4 rounded-full bg-gray-700 p-2 text-white">
        <Image src="/icons/carousel-right.svg" alt="Next Button" width={30} height={30} />
      </button>

      {/* Carousel Thumbnail */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={(thumb: SwiperCore) => setThumbsSwiper(thumb)}
        slidesPerView={4}
        spaceBetween={10}
        className="absolute bottom-20 right-12 float-right tablet:h-[60px] tablet:w-thumb-tablet-responsive pc:h-[60px] pc:w-thumb-pc-responsive"
      >
        {images.map((src, i) => (
          <SwiperSlide
            key={i}
            onClick={() => swiperInstance?.slideTo(i)}
            className={`cursor-pointer rounded-lg border-2 ${swiperIndex === i ? 'border-white' : 'border-transparent'}`}
          >
            <Image src={src} alt={`Thumbnail ${i}`} fill sizes="100vw" loading="lazy" className="rounded-lg object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
