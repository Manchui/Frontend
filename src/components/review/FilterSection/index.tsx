import { type Dispatch, type SetStateAction } from 'react';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

import SortToggle from './SortToggle';

interface FilterSectionProps {
  setSort: Dispatch<SetStateAction<string | undefined>>;
  sort?: string;
}

export default function FilterSection({ sort, setSort }: FilterSectionProps) {
  return (
    <div className="scrollbar-hide relative my-0 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      {/* 카테고리 */}
      <CategoryList />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
        <div className="flex items-center gap-2">
          <RegionDropdown />
          <DateDropdown />
        </div>
        {/* 정렬 버튼 */}
        <SortToggle sort={sort} setSort={setSort} />
      </div>
    </div>
  );
}
