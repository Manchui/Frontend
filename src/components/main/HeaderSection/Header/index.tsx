import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FILTER_OPTIONS } from '@/constants/contants';

interface HeaderProps {
  category?: string;
}

export default function Header({ category }: HeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const selectedOption = FILTER_OPTIONS.find((option) => option.id === (category ?? ''));

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateX(-10px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 1s ease-in-out',
      }}
      className="flex items-center gap-1"
    >
      {selectedOption && (
        <Image src={selectedOption.icon} alt="타이틀 로고" width={30} height={30} className="h-title-image w-title-image transition-opacity duration-300" />
      )}
      <h2>{category || '전체'}</h2>
    </motion.div>
  );
}
