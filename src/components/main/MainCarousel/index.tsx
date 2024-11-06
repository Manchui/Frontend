/* eslint-disable tailwindcss/no-custom-classname */
import 'swiper/css';
import 'swiper/css/bundle';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    queryFn: () => getGatheringData({ page: 1, size: 8 }),
  });

  const gatherings = data?.data.gatheringList || [];

  const goToPreviousSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === 0 ? gatherings.length - 1 : swiperIndex - 1, 0);
    }
  };

  const goToNextSlide = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperIndex === gatherings.length - 1 ? 0 : swiperIndex + 1, 0);
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
        {gatherings.map((gathering) => (
          <SwiperSlide key={gathering.gatheringId} className="relative">
            <Image src={gathering.gatheringImage} alt={gathering.name} fill sizes="100vw" className="object-cover" loading="eager" priority />
            <div className="bg-bannerGradient absolute inset-0" />
            <div className="absolute bottom-0 left-0 p-6 text-white tablet:ml-6 tablet:p-6">
              <span className="text-18-32-response font-bold">{gathering.name}</span>
              <div className="flex flex-col gap-1 font-medium">
                <div className="text-10-24-response flex gap-1">
                  <span>{gathering.groupName}</span>
                  <span>|</span>
                  <span>
                    인원 {gathering.currentUsers}/{gathering.maxUsers}
                  </span>
                </div>
                <Link
                  href={`/detail/${gathering.gatheringId}`}
                  className="flex w-fit items-center rounded-md bg-white/40 px-2 py-1 text-sub-response mobile:px-4 mobile:py-2"
                >
                  자세히 보기
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
        className="absolute left-0 top-1/2 z-50 mx-4 hidden rounded-full bg-gray-700 p-2 text-white mobile:block"
      >
        <Image src="/icons/carousel-left.svg" alt="Previous Button" width={30} height={30} />
      </button>
      <button
        ref={nextRef}
        type="button"
        onClick={goToNextSlide}
        className="absolute right-0 top-1/2 z-50 mx-4 hidden rounded-full bg-gray-700 p-2 text-white mobile:block"
      >
        <Image src="/icons/carousel-right.svg" alt="Next Button" width={30} height={30} />
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
            className={`cursor-pointer rounded-lg border-2 ${swiperIndex === i ? 'border-white' : 'border-transparent'}`}
          >
            <Image src={gathering.gatheringImage} alt={`Thumbnail ${i}`} fill sizes="100vw" loading="lazy" className="rounded-lg object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
