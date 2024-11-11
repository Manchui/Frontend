import { type Dispatch, type SetStateAction } from 'react';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';
import DateDropdown from '@/components/review/FilterSection/DateDropdown';

import SortToggle from './SortToggle';

interface FilterSectionProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
  handleDateSubmit: ({ start, end }: { end: string; start: string }) => void;
  location?: string;
  setDateEnd?: Dispatch<SetStateAction<string | undefined>>;
  setDateStart?: Dispatch<SetStateAction<string | undefined>>;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
  setSort: Dispatch<SetStateAction<string | undefined>>;
  sort?: string;
}

export default function FilterSection({
  location,
  category,
  setDateEnd,
  setLocation,
  setDateStart,
  handleDateSubmit,
  handleCategoryClick,
  sort,
  setSort,
}: FilterSectionProps) {
  return (
    <div className="scrollbar-hide relative my-0 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      {/* 카테고리 */}
      <CategoryList category={category} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
        <div className="flex items-center gap-2">
          <RegionDropdown location={location} setLocation={setLocation} />
          <DateDropdown setDateStart={setDateStart} setDateEnd={setDateEnd} handleDateSubmit={handleDateSubmit} />
       
        </div>
         {/* 정렬 버튼 */}
   <SortToggle sort={sort} setSort={setSort} />
       
      </div>
    </div>
  );
}
