import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Image from 'next/image';
import Link from 'next/link';
import { REVIEW_DATA } from '@/constants/landing';

export default function LandingReviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="select-none bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-screen-pc flex-col justify-center gap-20 px-8">
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-24-40-response font-bold">만취와 함께한 경험을 공유합니다</h2>
          <p className="text-16-20-response">참여자들이 남긴 생생한 후기를 통해 다양한 모임의 실제 경험을 확인해보세요.</p>
          <nav>
            <Link href="/review" className="w-fit rounded-lg bg-white px-6 py-3 text-13-16-response font-bold text-black duration-300 hover:bg-gray-100">
              후기 보러가기
            </Link>
          </nav>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex flex-col gap-5 tablet:flex-row"
        >
          {REVIEW_DATA.map(({ name, title, content, image }) => (
            <article key={name} className="flex-1 space-y-7 rounded-lg bg-white/10 p-8">
              <header className="flex gap-4">
                <figure>
                  <Image src="/icons/profile.svg" alt="프로필 사진" width={40} height={40} />
                </figure>
                <div className="flex flex-col">
                  <h3 className="text-13-16-response font-semibold">{name}</h3>
                  <p className="text-xs text-white/40">{title}</p>
                </div>
              </header>
              <p className="text-13-15-response">{content}</p>
              <figure>
                <Image src={image} alt={title} />
              </figure>
            </article>
          ))}
        </m.div>
      </div>
    </section>
  );
}
