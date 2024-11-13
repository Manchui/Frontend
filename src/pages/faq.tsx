import { useState } from 'react';
import * as m from 'framer-motion/m';
import DoubleArrow from 'public/icons/DoubleArrow';
import FAQItem from '@/components/landing/FAQ/FAQItem';
import { FAQS } from '@/constants/faq';
import useInternalRouter from '@/hooks/useInternalRouter';

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const router = useInternalRouter();

  const onClickActiveFaq = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="bg-black">
      <div className="flex-col-center mx-auto min-h-screen max-w-screen-pc select-none py-10">
        <span className="text-landing-title font-bold text-primary-400">🐣 FAQ 🐣</span>

        <div className="mx-auto my-14 flex w-full max-w-[1000px] flex-col gap-8">
          <m.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileHover="hover"
            onClick={() => router.push('/main')}
            transition={{ duration: 1 }}
            type="button"
            className="flex w-fit items-center gap-1 self-end rounded-md bg-white px-7 py-3 text-13-15-response font-semibold drop-shadow-xl"
          >
            HOME
            <m.div variants={{ hover: { x: 8 } }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <DoubleArrow direction="right" color="black" className="size-4" />
            </m.div>
          </m.button>

          <ul className="space-y-8 drop-shadow-sm">
            {FAQS.map((item, i) => (
              <FAQItem key={item.question} isOpen={activeIndex === i} onClickOpenButton={() => onClickActiveFaq(i)} {...item} />
            ))}
          </ul>
        </div>

        <div className="w-full max-w-[800px] rounded-md bg-gray-800 p-6 text-white shadow-lg">
          <h2 className="mb-4 text-center text-16-20-response font-bold text-primary-400">☎️ 문의하기 ☎️</h2>
          <p className="mb-6 text-center text-13-16-response text-gray-300">추가로 궁금한 사항이 있다면 아래 이메일 또는 Google Form을 통해 문의해 주세요.</p>
          <div className="flex flex-col items-center space-y-4">
            {/* 이메일 */}
            <div className="flex items-center gap-2">
              <span className="text-13-16-response font-semibold text-gray-300">이메일:</span>
              <a href="mailto:mephisto7191@naver.com" className="text-13-16-response text-primary-400 hover:underline">
                mephisto7191@naver.com
              </a>
            </div>
            {/* Google Form */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-300">Google Form:</span>
              <a
                href="https://forms.gle/VRssL9W4p6Agpnvy6" // 여기에 실제 Google Form 링크를 넣으세요
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:underline"
              >
                문의 양식 작성하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
