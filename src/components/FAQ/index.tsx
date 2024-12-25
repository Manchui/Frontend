import { useEffect, useState } from 'react';
import FAQItem from '@/components/FAQ/FAQItem';
import { FAQS } from '@/constants/faq';

const DEFAULT_OPEN_IDX = 0;

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number>(DEFAULT_OPEN_IDX);

  const onClickActiveFaq = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? -1 : idx));
  };

  useEffect(() => {
    setActiveIndex(DEFAULT_OPEN_IDX);
  }, []);

  return (
    <section>
      <div className="bg-background">
        <div className="flex-col-center mx-auto min-h-screen max-w-screen-pc select-none gap-20">
          <span className="text-24-40-response font-bold">자주 묻는 질문</span>
          <div className="mx-auto w-full max-w-[1200px]">
            <ul className="space-y-6 drop-shadow-sm">
              {FAQS.map((item, i) => (
                <FAQItem key={item.question} isOpen={activeIndex === i} onClickOpenButton={() => onClickActiveFaq(i)} {...item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
