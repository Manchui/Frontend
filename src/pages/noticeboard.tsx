import { useEffect, useRef, useState } from 'react';
import type { Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import { Bagel_Fat_One } from 'next/font/google';
import DoubleArrow from 'public/icons/DoubleArrow';
import NoticeBoardItem from '@/components/noticeboard/NoticeBoardItem';
import { NOTICES } from '@/constants/noticeBoard';
import { IS_SERVER } from '@/constants/server';
import useInternalRouter from '@/hooks/useInternalRouter';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

export default function NoticeBoard() {
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeIndex, setActiveIndex] = useState<number[]>([]);
  const [openAll, setOpenAll] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const router = useInternalRouter();

  const sentinelRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sentinelRef);

  const onClickActiveNotice = (i: number) => {
    setActiveIndex((prev) => (prev.includes(i) ? prev.filter((item) => item !== i) : [...prev, i]));
  };

  const handleOpenAll = () => {
    setActiveIndex(NOTICES.map((_, idx) => idx));
    setOpenAll(true);
  };

  const handleCloseAll = () => {
    setActiveIndex([]);
    setOpenAll(false);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!IS_SERVER) {
        setShowScrollTop(window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isIntersecting) {
      setVisibleCount((prev) => Math.min(prev + 5, NOTICES.length));
    }
  }, [isIntersecting]);

  return (
    <m.div variants={sectionVariants} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="bg-black">
      <div className="mx-auto flex min-h-screen min-w-[350px] max-w-screen-pc flex-col items-center space-y-5 p-14 px-5">
        <span className="mb-20 text-24-40-response font-bold text-white">✨ 공지사항 ✨</span>
        <div className="flex w-full justify-end gap-4 text-13-16-response">
          <button type="button" onClick={handleCloseAll} className="rounded-md bg-gray-700 px-5 py-2 font-semibold text-white duration-300 hover:bg-gray-600">
            전부 닫기
          </button>
          <button type="button" onClick={handleOpenAll} className="rounded-md bg-white px-5 py-2 font-semibold duration-300 hover:bg-gray-100">
            전부 열기
          </button>
        </div>
        <div className="mx-auto w-full max-w-[1200px]">
          <ul className="space-y-6 drop-shadow-sm">
            {NOTICES.slice(0, visibleCount).map((item, i) => (
              <NoticeBoardItem
                key={item.title}
                isOpen={openAll || activeIndex.includes(i)}
                onClickOpenButton={() => onClickActiveNotice(i)}
                title={item.title}
                content={item.content}
              />
            ))}
          </ul>
        </div>
      </div>
      <div ref={sentinelRef} className={`h-10 ${visibleCount >= NOTICES.length ? 'hidden' : ''}`} />
      {showScrollTop && (
        <m.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover="hover"
          onClick={() => router.push('/main')}
          transition={{ duration: 1 }}
          className={`fixed bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-2xl bg-white px-8 py-4 text-13-15-response drop-shadow-xl ${bagelFatOne.className}`}
        >
          HOME
          <m.div variants={{ hover: { x: 8 } }} transition={{ duration: 0.3, ease: 'easeOut' }}>
            <DoubleArrow direction="right" color="black" className="size-4" />
          </m.div>
        </m.button>
      )}
    </m.div>
  );
}
