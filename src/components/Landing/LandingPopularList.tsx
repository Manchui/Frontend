import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Image from 'next/image';
import Link from 'next/link';
import { POPULAR_MEETINGS } from '@/constants/landing';
import { cn } from '@/utils/classNames';

export default function LandingPopularList() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="relative min-h-screen select-none bg-black text-white">
      <div className="absolute left-1/2 top-1/2 w-full max-w-[1200px] -translate-x-1/2 -translate-y-1/2">
        <m.article
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <header className="flex flex-col items-center gap-3">
            <p className="text-16-20-response font-medium">만취 모임 LIST</p>
            <h2 className="text-24-40-response font-bold">가장 인기 있는 모임 TOP 5</h2>
            <p className="mx-5 text-wrap text-13-16-response font-medium">
              다양한 취미와 관심사를 가진 사람들이 함께하는 인기 모임들을 만나고, 당신만의 특별한 경험을 만들어 보세요.
            </p>
          </header>
          <div className="mt-10 w-fit rounded-lg border border-gray-400 bg-blue-900 px-6 py-3 duration-300 hover:bg-blue-800">
            <Link href="/main">만취 모임 참여하기</Link>
          </div>
        </m.article>
        <m.section
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-14 grid min-h-[500px] grid-cols-6 gap-4 text-black"
        >
          {POPULAR_MEETINGS.map(({ title, description, colSpan, image }, i) => (
            <article
              key={title}
              className={cn('flex flex-col justify-between rounded-lg bg-white px-8 py-6', {
                'col-span-2': colSpan === 2,
                'col-span-3': colSpan === 3,
              })}
            >
              <header>
                <h3 className="text-16-20-response font-bold">{title}</h3>
                <p className="mt-4 font-medium">{description}</p>
              </header>
              <div className="mt-4 flex items-end justify-between">
                <nav className="font-medium text-gray-600 underline decoration-gray-600 underline-offset-8">
                  <Link href="/main">자세히보기</Link>
                </nav>
                {(i === 0 || i === POPULAR_MEETINGS.length - 1) && image && (
                  <figure>
                    <Image src={image} alt={`${title} 이미지`} width={120} height={100} className="relative top-3" />
                  </figure>
                )}
              </div>
            </article>
          ))}
        </m.section>
      </div>
    </section>
  );
}
