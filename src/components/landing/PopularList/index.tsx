import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Link from 'next/link';

export default function PopularList() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section>
      <div className="bg-background">
        <div className="flex-col-center mx-auto min-h-screen w-full max-w-screen-pc select-none gap-10 px-8 text-center">
          <m.div
            ref={ref}
            style={{
              transform: isInView ? 'none' : 'translateY(10px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 1s ease-in-out',
            }}
            className="space-y-5"
          >
            <span className="text-16-20-response font-bold underline decoration-primary-400 decoration-[6px] underline-offset-8">만취 모임 LIST</span>
            <h2 className="text-24-40-response font-bold">지금 가장 인기있는 모임 TOP 리스트</h2>
            <p className="text-16-20-response text-gray-600">
              다양한 취미와 관심사를 가진 사람들이 함께하는 인기 모임들을 만나고, 당신만의 특별한 경험을 만들어 보세요.
            </p>
            <Link
              href="/main"
              className="inline-block rounded-lg bg-black px-6 py-3 text-13-16-response font-bold text-white duration-300 hover:bg-gray-900/80"
            >
              모임 참여하기
            </Link>
          </m.div>
          <m.div
            ref={ref}
            style={{
              transform: isInView ? 'none' : 'translateY(15px)',
              opacity: isInView ? 1 : 0,
              transition: 'all 0.3s ease-in-out',
            }}
            className="grid min-h-[500px] w-full grid-cols-6 gap-4"
          >
            <div className="col-span-2 rounded-lg border border-blue-100 bg-gray-50 drop-shadow-lg" />
            <div className="col-span-2 rounded-lg border border-blue-100 bg-gray-50 drop-shadow-lg" />
            <div className="col-span-2 rounded-lg border border-blue-100 bg-gray-50 drop-shadow-lg" />
            <div className="col-span-3 rounded-lg border border-blue-100 bg-gray-50 drop-shadow-lg" />
            <div className="col-span-3 rounded-lg border border-blue-100 bg-gray-50 drop-shadow-lg" />
          </m.div>
        </div>
      </div>
    </section>
  );
}
