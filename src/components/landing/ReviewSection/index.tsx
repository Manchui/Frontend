import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Review1 from 'public/images/review1.png';
import Review2 from 'public/images/review2.png';
import Review3 from 'public/images/review3.png';
import { IS_SERVER } from '@/constants/server';

export default function ReviewSection() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const scrollToTop = () => {
    if (!IS_SERVER) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!IS_SERVER) {
        setShowScrollTop(window.scrollY > 350);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section>
        <div className="select-none bg-black text-white">
          <div className="mx-auto flex min-h-screen max-w-screen-pc flex-col justify-center gap-20 px-8">
            <motion.div
              ref={ref}
              style={{
                transform: isInView ? 'none' : 'translateY(10px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 1s ease-in-out',
              }}
              className="flex flex-col gap-4"
            >
              <h2 className="text-24-40-response font-bold">만취와 함께한 경험을 공유합니다</h2>
              <span className="text-16-20-response">참여자들이 남긴 생생한 후기를 통해 다양한 모임의 실제 경험을 확인해보세요.</span>
              <Link href="/review" className="w-fit rounded-lg bg-white px-6 py-3 text-13-16-response font-bold text-black">
                후기 보러가기
              </Link>
            </motion.div>
            <motion.div
              ref={ref}
              style={{
                transform: isInView ? 'none' : 'translateY(15px)',
                opacity: isInView ? 1 : 0,
                transition: 'all 0.3s ease-in-out',
              }}
              className="flex gap-5"
            >
              <div className="flex-1 space-y-7 rounded-lg bg-white/10 p-8">
                <div className="flex gap-4">
                  <Image src="/icons/profile.svg" alt="프로필 사진" width={40} height={40} />
                  <div className="flex flex-col">
                    <span className="text-13-16-response font-semibold">김OO</span>
                    <span className="text-xs text-white/40">만취 토론교실</span>
                  </div>
                </div>
                <div className="text-13-15-response">
                  이번 모임은 정말 뜻깊었어요! 처음 만난 분과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도
                  많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!
                </div>
                <div>
                  <Image src={Review1} alt="후기1" />
                </div>
              </div>
              <div className="flex-1 space-y-7 rounded-lg bg-white/10 p-8">
                <div className="flex gap-4">
                  <Image src="/icons/profile.svg" alt="프로필 사진" width={40} height={40} />
                  <div className="flex flex-col">
                    <span className="text-13-16-response font-semibold">김OO</span>
                    <span className="text-xs text-white/40">만취 토론교실</span>
                  </div>
                </div>
                <div className="text-13-15-response">
                  이번 모임은 정말 뜻깊었어요! 처음 만난 분과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도
                  많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!
                </div>
                <div>
                  <Image src={Review2} alt="후기2" />
                </div>
              </div>
              <div className="flex-1 space-y-7 rounded-lg bg-white/10 p-8">
                <div className="flex gap-4">
                  <Image src="/icons/profile.svg" alt="프로필 사진" width={40} height={40} />
                  <div className="flex flex-col">
                    <span className="text-13-16-response font-semibold">김OO</span>
                    <span className="text-xs text-white/40">만취 토론교실</span>
                  </div>
                </div>
                <div className="text-13-15-response">
                  이번 모임은 정말 뜻깊었어요! 처음 만난 분과 취미에 대해 이야기하며 즐거운 시간을 보냈습니다. 특히 요리 클래스가 인상 깊었고, 새로운 친구들도
                  많이 사귀었어요. 앞으로도 이런 모임이 자주 열렸으면 좋겠습니다!
                </div>
                <div>
                  <Image src={Review3} alt="후기3" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section>
        <div className="h-[150px] w-full bg-primary-400" />
      </section>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={scrollToTop}
          transition={{ duration: 0.5 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 transform rounded-2xl bg-white px-10 py-2 text-blue-800 drop-shadow-lg transition-colors duration-300 hover:bg-black hover:text-white"
        >
          ▲
        </motion.button>
      )}
    </>
  );
}
