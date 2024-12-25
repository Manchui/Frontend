import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Link from 'next/link';

export default function LandingMain() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <header className="relative min-h-screen select-none">
      <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2">
        <figure className="h-full">
          <video muted autoPlay loop playsInline className="h-full object-cover">
            <source src="/video/main-video.webm" type="video/webm" />
            <source src="/video/main-video.mp4" type="video/mp4" />
          </video>
        </figure>
      </div>
      <m.article
        ref={ref}
        initial={{ x: -10, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
        className="absolute left-5 top-1/3 -translate-y-1/2 font-bold text-white mobile:left-10 tablet:left-20"
      >
        <h1 className="text-landing-title leading-[100%]">
          취미에 만취하다
          <br />
          일상에 즐거움을 더하다
        </h1>
        <p className="mt-6 text-16-20-response font-medium">다양한 취미와 함게, 즐거움에 만취하세요!</p>
        <p className="text-balance text-16-20-response font-medium">새로운 사람들과 모여 당신만의 특별한 시간을 만들어 보세요.</p>
        <nav className="mt-10 w-fit rounded-lg border border-gray-400 bg-blue-900 px-6 py-3 duration-300 hover:bg-blue-800">
          <Link href="/main">만취 모임 참여하기</Link>
        </nav>
      </m.article>
    </header>
  );
}
