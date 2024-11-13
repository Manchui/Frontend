/* eslint-disable tailwindcss/no-custom-classname */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Logo from 'public/logo/logo.png';

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <div className="relative min-h-screen w-full bg-black text-white">
        <div className="absolute left-1/2 top-1/2 flex w-full max-w-screen-pc -translate-x-1/2 -translate-y-1/2 select-none flex-col gap-20 px-10 py-12">
          <motion.div
            ref={ref}
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 1s ease-in-out',
            }}
            className="space-y-5 text-balance text-center font-bold"
          >
            <h2 className="text-landing-title leading-[120%]">
              만취에서 쉽고 <span className="text-primary-400">빠르게 모임</span>을 만들고,
              <br />
              <span className="text-primary-400">다양한 활동</span>을 참여하세요.
            </h2>
            <span className="inline-block">몇 번의 클릭만으로 당신의 관심사를 함께할 사람들을 만나보세요.</span>
          </motion.div>
          <motion.div
            ref={ref}
            style={{
              transform: isInView ? 'none' : 'translateY(15px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.3s ease-in-out',
            }}
            className="flex w-full"
          >
            <div className="max-w-[500px] flex-1 divide-y text-16-20-response">
              <button type="button" className="flex flex-col gap-2 p-5 text-start">
                <div className="flex gap-3 text-16-26-response font-bold">
                  <span>⓵</span>
                  <h3>간편한 회원가입</h3>
                </div>
                <span className="text-white/70">간편히 아이디와 비밀번호만 입력하여 빠르게 가입하실 수 있습니다.</span>
              </button>
              <button type="button" className="flex flex-col gap-2 p-5 text-start">
                <div className="flex gap-3 text-16-26-response font-bold">
                  <span>⓶</span>
                  <h3>빠른 모임 생성</h3>
                </div>
                <span className="text-white/70">관심 있는 새로운 모임을 빠르게 직접 만들어 사람들을 초대하세요.</span>
              </button>
              <button type="button" className="flex flex-col gap-2 p-5 text-start">
                <div className="flex gap-3 text-16-26-response font-bold">
                  <span>⓷</span>
                  <h3>다양한 모임 참여</h3>
                </div>
                <span className="text-white/70">모임 일정에 맞춰 함께 모여 활동을 즐기고, 새로운 사람들과 교류하세요.</span>
              </button>
            </div>
            <div className="flex-1 rounded-xl bg-background">
              <div className="relative size-full">
                <Image src={Logo} alt="예시사진" fill className="rounded-xl object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
