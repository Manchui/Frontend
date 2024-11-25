import Image from 'next/image';
import { FILTER_OPTIONS } from '@/constants/filter';
import { useCategory } from '@/store/useFilterStore';

export default function Header() {
  const category = useCategory();

  const selectedOption = FILTER_OPTIONS.find((option) => option.id === (category ?? ''));

  return (
    <div className="flex items-center gap-1">
      {selectedOption && <Image src={selectedOption.icon} alt="타이틀 로고" width={30} height={30} className="h-title-image w-title-image" />}
      <h2>{category || '전체'}</h2>
    </div>
  );
}
