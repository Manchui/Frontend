import type { Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import ArrowBtn from 'public/icons/ArrowBtn';

interface QNAItemProps {
  answer: string;
  isOpen: boolean;
  onClickOpenButton: () => void;
  question: string;
}

const headerVariants: Variants = {
  open: { backgroundColor: '#F7C312' },
  closed: { backgroundColor: 'white' },
};

const bodyVariants: Variants = {
  initial: { opacity: 0, height: 0, display: 'none' },
  open: { opacity: 1, height: 'fit-content', display: 'block' },
  closed: { opacity: 0, height: 0, display: 'none' },
};

export default function FAQItem({ isOpen, onClickOpenButton, question, answer }: QNAItemProps) {
  return (
    <li onClick={onClickOpenButton} className="cursor-pointer text-13-16-response font-semibold">
      <m.div
        animate={isOpen ? 'open' : 'closed'}
        variants={headerVariants}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center justify-between px-6 py-5"
      >
        <h4 className={`${isOpen && 'text-black'}`}>{question}</h4>
        <m.div transition={{ duration: 0.5, ease: 'easeOut' }}>
          <ArrowBtn direction={`${isOpen ? 'up' : 'down'}`} color={`${isOpen ? 'white' : 'black'}`} />
        </m.div>
      </m.div>
      <m.div animate={isOpen ? 'open' : 'closed'} variants={bodyVariants} transition={{ duration: 0.5, height: 0, ease: 'easeOut' }}>
        <p className="bg-white px-6 py-5">A: {answer}</p>
      </m.div>
    </li>
  );
}
