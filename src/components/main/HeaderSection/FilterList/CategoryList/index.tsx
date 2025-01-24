import { useCallback } from 'react';
import { FILTER_OPTIONS } from '@/constants/filter';
import { useCategory, useSetCategory } from '@/store/useFilterStore';

export default function CategoryList() {
  const category = useCategory();
  const setCategory = useSetCategory();

  const handleCategoryClick = useCallback(
    (id: string) => {
      setCategory(id);
    },
    [setCategory],
  );

  return (
    <div className="scrollbar-hide relative flex w-full gap-2 overflow-x-auto pr-32">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => handleCategoryClick(option.id)}
          className={`flex h-9 cursor-pointer items-center rounded-lg border border-gray-100 px-3 duration-300 ${
            (!category && option.id === '') || category === option.id ? 'bg-blue-800 text-white' : 'hover:bg-gray-50 hover:text-blue-800'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
