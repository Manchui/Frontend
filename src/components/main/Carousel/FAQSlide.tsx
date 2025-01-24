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
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const router = useInternalRouter();

  const onClickActiveQna = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="relative flex h-[300px] flex-col items-center justify-center">
      <div className="w-full max-w-screen-sm text-center">
        <span className="text-2xl font-bold text-primary-300">자주 묻는 질문</span>
        <div className="mx-auto mt-6 w-full max-w-[600px]">
          <ul className="space-y-4">
            {SINGLE_FAQ.map((qna, i) => (
              <li key={qna.question} onClick={() => onClickActiveQna(i)} className="cursor-pointer text-sm font-semibold">
                <m.div
                  initial={false}
                  animate={activeIndex === i ? 'open' : 'closed'}
                  variants={headerVariants}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center justify-between p-5 shadow-md"
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
                  className="overflow-hidden text-left"
                >
                  <p className="bg-white p-5">{qna.answer}</p>
                </m.div>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={() => router.push('/faq')} className="mt-6 rounded-md bg-primary-300 px-6 py-2 text-sm font-semibold text-blue-800">
          바로가기
        </button>
      </div>
    </div>
  );
}
