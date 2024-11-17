import type { Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import Image from 'next/image';
import { BACKEND_CARDS, DESIGNER_CARDS, FRONTEND_CARDS } from '@/constants/cards';
import { POSITION_BASE } from '@/constants/image';
import useInternalRouter from '@/hooks/useInternalRouter';

export default function Carousel() {
  const router = useInternalRouter();

  const cards = [
    { ...BACKEND_CARDS[0], bg: '#85c8f5', title: 'SERVER' },
    { ...FRONTEND_CARDS[0], bg: '#fb9b9b', title: 'WEB' },
    { ...DESIGNER_CARDS[0], bg: '#cdf86f', title: 'DESIGN' },
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        delay: i * 0.4,
      },
    }),
  };

  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-w-[320px] select-none overflow-hidden bg-gradient-to-r from-[#85c8f5] via-[#fb9b9b] to-[#cdf86f] pt-[60px]"
    >
      <div className="flex h-[400px] flex-col justify-center mobile:h-[500px] tablet:h-[600px]">
        <h1 className="text-center text-24-40-response font-bold text-white drop-shadow-lg">만취 프로젝트 개발자</h1>
        <div className="mt-10 flex justify-center gap-3 mobile:gap-6">
          {cards.map((card, index) => (
            <m.div
              key={card.title}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              whileHover={{ scale: 1.1 }}
              className="relative flex w-[300px] cursor-pointer flex-col items-center justify-center rounded-xl p-4 shadow-lg"
              style={{ backgroundColor: card.bg }}
            >
              <Image src={`${POSITION_BASE}/${card.type}.svg`} alt={`${card.title} Icon`} width={200} height={100} className="mb-4" />
              <h2 className="text-16-20-response font-bold text-white">{card.title}</h2>
            </m.div>
          ))}
        </div>
        <div className="mt-4 text-center tablet:mt-10">
          <button
            type="button"
            onClick={() => router.push('/introduce')}
            className="inline-block rounded-lg bg-white px-8 py-4 text-13-16-response font-bold text-black shadow-md transition hover:bg-gray-50"
          >
            더 알아보기
          </button>
        </div>
      </div>
    </m.div>
  );
}
