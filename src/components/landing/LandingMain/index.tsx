/* eslint-disable tailwindcss/no-custom-classname */
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingMain() {
  return (
    <section className="relative">
      <div className="flex-center mx-auto min-h-screen w-full max-w-screen-pc select-none justify-center px-8">
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
          className="flex-1 space-y-10 text-balance font-bold"
        >
          <h1 className="text-landing-title leading-[120%]">
            취미에 <span className="underline decoration-primary-400 decoration-8 underline-offset-8">만취</span>하다
            <br />
            일상에 즐거움을 더하다
          </h1>
          <p className="text-10-24-response text-gray-600">
            다양한 취미와 함께, 즐거움에 만취하세요!
            <br />
            새로운 사람들과 모여 당신만의 특별한 시간을 만들어 보세요!
          </p>
          <Link href="/main" className="inline-block rounded-lg bg-black px-8 py-4 text-13-16-response text-white">
            만취 모임 참여하기
          </Link>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.4 }}
          className="relative size-full flex-1 rounded-lg border-4 border-black"
        >
          <video muted autoPlay loop playsInline>
            <source src="/video/main-video.mp4" className="rounded-lg object-cover" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
