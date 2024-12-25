import { useEffect, useState } from 'react';
import * as m from 'framer-motion/m';
import { IS_SERVER } from '@/constants/server';

export default function LandingScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

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

  function ShowScrollTop() {
    if (!showScrollTop) return null;

    return (
      <m.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={scrollToTop}
        transition={{ duration: 0.5 }}
        className="fixed bottom-10 left-1/2 z-10 -translate-x-1/2 transform rounded-2xl bg-white px-10 py-2 shadow-lg transition-colors duration-300 hover:bg-black hover:text-white"
      >
        ▲
      </m.button>
    );
  }

  return ShowScrollTop();
}
