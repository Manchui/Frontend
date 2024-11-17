/* eslint-disable tailwindcss/no-custom-classname */
import * as m from 'framer-motion/m';
import Link from 'next/link';
import ArrowBtn from 'public/icons/ArrowBtn';

export default function LandingMain() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <video muted autoPlay loop playsInline className="size-full object-cover">
          <source src="/video/main-video.mp4" />
        </video>
      </div>
      <div className="mx-auto flex min-h-screen w-full max-w-screen-pc select-none px-8 pt-[150px]">
        <m.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
          className="absolute flex-1 space-y-10 text-balance font-bold text-white"
        >
          <h1 className="text-landing-title leading-[120%]">
            취미에 <span className="underline decoration-primary-400 decoration-8 underline-offset-8">만취</span>하다
            <br />
            일상에 즐거움을 더하다
          </h1>
          <p className="text-10-24-response text-white">
            다양한 취미와 함께, 즐거움에 만취하세요!
            <br />
            새로운 사람들과 모여 당신만의 특별한 시간을 만들어 보세요!
          </p>
          <Link href="/main" className="flex w-fit gap-2 rounded-lg bg-black p-4 text-13-16-response text-white duration-300 hover:bg-gray-900/80">
            만취 모임 참여하기
            <ArrowBtn direction="right" />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
