import * as m from 'framer-motion/m';
import { Gugi } from 'next/font/google';
import Image from 'next/image';
import { POSITION_BASE } from '@/constants/image';

const gugi = Gugi({ weight: '400', subsets: ['latin'] });

interface CardProps {
  bgColorClass: string;
  description: string[];
  title: string;
  type: string;
}

export default function Card({ type, title, description, bgColorClass }: CardProps) {
  return (
    <div className={`group relative h-[400px] max-w-xs flex-1 basis-[200px] cursor-pointer overflow-hidden rounded-2xl ${bgColorClass}`}>
      {/* 카드 이미지 */}
      <div className="relative top-1/2 size-full -translate-y-1/2 transition-transform duration-300 ease-in-out group-hover:blur-sm group-hover:brightness-90">
        <Image src={`${POSITION_BASE}/${type}.svg`} alt="개발자 아이콘" fill />
      </div>

      {/* 오버레이 및 설명 텍스트 */}
      <m.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
      >
        <h2 className={`${gugi.className} text-16-26-response font-bold`}>{title}</h2>
        <ul className="mt-2 space-y-2 text-center text-13-16-response leading-relaxed">
          {description.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </m.div>
    </div>
  );
}
