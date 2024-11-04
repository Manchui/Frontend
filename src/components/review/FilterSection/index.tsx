import CategoryList from '@/components/review/FilterSection/CategoryList';

import FilterList from './FiterList';

interface FilterSectionProps {
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

export default function FilterSection({ handleCategoryClick, selectedCategory }: FilterSectionProps) {
  return (
    <div className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      {/* 카테고리 */}
      <CategoryList selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
       <FilterList/>
      </div>
    </div>
  );
}
