import { useState } from 'react';
import type { Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import ArrowBtn from 'public/icons/ArrowBtn';
import { SINGLE_FAQ } from '@/constants/faq';
import useInternalRouter from '@/hooks/useInternalRouter';

const headerVariants: Variants = {
  open: { backgroundColor: '#f9d043' },
  closed: { backgroundColor: 'white' },
};

const bodyVariants: Variants = {
  open: { opacity: 1, height: 'fit-content', display: 'block' },
  closed: { opacity: 0, height: 0, display: 'none' },
};

export default function QnaSlide() {
  const [activeIndex, setActiveIndex] = useState<number>(0); // 초기 상태: 모든 드롭다운 닫힘

  const router = useInternalRouter();

  const onClickActiveQna = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="relative flex h-[400px] flex-col items-center justify-center bg-blue-800 mobile:h-[500px] tablet:h-[600px]">
      <div className="w-full max-w-[700px] text-center">
        <span className="text-landing-title font-bold text-primary-300">자주 묻는 질문</span>
        <div className="mx-auto mt-6 w-full max-w-[1200px]">
          <ul className="space-y-4">
            {SINGLE_FAQ.map((qna, i) => (
              <li key={qna.question} onClick={() => onClickActiveQna(i)} className="cursor-pointer text-13-16-response font-semibold">
                <m.div
                  initial={false}
                  animate={activeIndex === i ? 'open' : 'closed'}
                  variants={headerVariants}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center justify-between px-6 py-5 shadow-md"
                >
                  <h4 className={`${activeIndex === i ? 'text-blue-800' : 'text-black'}`}>{qna.question}</h4>
                  <m.div transition={{ duration: 0.3, ease: 'easeOut' }}>
                    <ArrowBtn direction={activeIndex === i ? 'up' : 'down'} color="black" />
                  </m.div>
                </m.div>
                <m.div
                  initial={false}
                  animate={activeIndex === i ? 'open' : 'closed'}
                  variants={bodyVariants}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <p className="bg-white px-6 py-5">{qna.answer}</p>
                </m.div>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={() => router.push('/faq')} className="mt-6 rounded-md bg-primary-300 px-10 py-4 font-semibold text-blue-800">
          바로가기
        </button>
      </div>
    </div>
  );
}
