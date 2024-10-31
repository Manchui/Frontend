import Image from 'next/image';
import { FILTER_OPTIONS } from '@/constants/main/contants';

interface HeaderProps {
  selectedCategory: string;
}

export default function Header({ selectedCategory }: HeaderProps) {
  return (
    <div className="flex items-center gap-1">
      {FILTER_OPTIONS.map(
        (option) =>
          selectedCategory === option.label && (
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
      <h2>{selectedCategory}</h2>
    </div>
  );
}
