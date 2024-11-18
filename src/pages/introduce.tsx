/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useState } from 'react';
import { type Variants } from 'framer-motion';
import * as m from 'framer-motion/m';
import { Bagel_Fat_One, Gugi } from 'next/font/google';
import DoubleArrow from 'public/icons/DoubleArrow';
import Card from '@/components/introduce/Card';
import { CARDS } from '@/constants/cards';
import { IS_SERVER } from '@/constants/server';
import useInternalRouter from '@/hooks/useInternalRouter';

const gugi = Gugi({ weight: '400', subsets: ['latin'] });
const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

const design = CARDS.designer[0];

export default function Introduce() {
  const router = useInternalRouter();

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!IS_SERVER) {
        setShowScrollTop(window.scrollY > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <m.div initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="bg-black">
      <div className="mx-auto flex min-h-screen min-w-[350px] max-w-screen-pc flex-col items-center space-y-5 p-14 px-5">
        {/* Frontend Section */}
        <m.div variants={sectionVariants} transition={{ duration: 0.8, delay: 0.3 }} className="w-full space-y-5">
          <h2
            className={`${gugi.className} decoration-front inline-block select-none text-introduce-response text-white underline decoration-[6px] underline-offset-8`}
          >
            Frontend Dev
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CARDS.frontend.map((card) => (
              <Card key={card.title} title={card.title} type={card.type} description={card.description} bgColorClass={card.bgColorClass} />
            ))}
          </div>
        </m.div>

        {/* Backend, Designer Section */}
        <m.div variants={sectionVariants} transition={{ duration: 0.8, delay: 0.8 }} className="flex w-full flex-col gap-3 phablet:flex-row">
          <div className="flex-1 space-y-5 text-center tablet:text-start">
            <h2 className={`${gugi.className} decoration-backend select-none text-introduce-response text-white underline decoration-[6px] underline-offset-8`}>
              Backend Dev
            </h2>
            <div className="flex flex-wrap justify-center gap-3 tablet:justify-start max-w-[600px]">
              {CARDS.backend.map((card) => (
                <Card key={card.title} title={card.title} type={card.type} description={card.description} bgColorClass={card.bgColorClass} />
              ))}
            </div>
          </div>
          <m.div variants={sectionVariants} transition={{ duration: 0.8, delay: 1.3 }} className="mx-auto w-full max-w-[290px] flex-1 space-y-5">
            <h2
              className={`${gugi.className} decoration-design select-none text-center text-introduce-response text-white underline decoration-[6px] underline-offset-8`}
            >
              Designer
            </h2>
            <Card title={design.title} type={design.type} description={design.description} bgColorClass={design.bgColorClass} />
          </m.div>
        </m.div>
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
      </div>
    </m.div>
  );
}
