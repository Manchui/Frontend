import Image from 'next/image';
import { FILTER_OPTIONS } from '@/constants/contants';

interface HeaderProps {
  category?: string;
}

export default function Header({ category }: HeaderProps) {
  return (
    <div className="flex items-center gap-1">
      {FILTER_OPTIONS.map(
        (option) =>
          (category ?? '') === option.id && (
            <Image
              key={option.id}
              src={option.icon}
              alt="타이틀 로고"
              width={30}
              height={30}
              className="h-title-image w-title-image transition-opacity duration-300"
            />
          ),
      )}
      <h2>{category || '전체'}</h2>
    </div>
  );
}
