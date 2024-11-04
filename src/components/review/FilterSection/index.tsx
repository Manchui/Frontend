import CategoryList from '@/components/review/FilterSection/CategoryList';

import CloseDateToggle from './CloseDateToggle';
import DateDropdown from './DateDropdown';
import RegionDropdown from './RegionDropdown';
import ReviewRating from '../ReviewRating';

interface FilterSectionProps {
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

export default function FilterSection({ handleCategoryClick, selectedCategory }: FilterSectionProps) {
  return (
    <div className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-4 bg-white px-4 py-5 mobile:rounded-lg">
      <CategoryList selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
      {/* 리뷰 별점 */}
      <ReviewRating />
      {/* 필터 */}
      <div className="flex select-none items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <RegionDropdown />
          <DateDropdown />
        </div>

        <CloseDateToggle />
      </div>
    </div>
  );
}
