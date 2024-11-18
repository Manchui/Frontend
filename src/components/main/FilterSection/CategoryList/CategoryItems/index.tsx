import Image from 'next/image';
import { useCategory, useSetCategory } from '@/store/useFilterStore';

interface CategoryItemsProps {
  option: { icon: string; id: string; label: string };
}

export default function CategoryItems({ option }: CategoryItemsProps) {
  const category = useCategory();
  const setCategory = useSetCategory();

  return (
    <div
      onClick={() => {
        setCategory(option.id);
      }}
    >
      <input type="radio" id={option.id} className="hidden" />
      <label
        htmlFor={option.id}
        className={`flex cursor-pointer rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 transition-all duration-300 hover:bg-blue-700 hover:text-white ${category === option.id && 'bg-blue-800 text-white'}`}
      >
        {category === option.id && (
          <Image src={option.icon} alt={`${option.label} 아이콘`} width={20} height={20} className="mr-1 animate-slideInLeft invert" />
        )}
        {option.label}
      </label>
    </div>
  );
}
