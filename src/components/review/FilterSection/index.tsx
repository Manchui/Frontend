/* eslint-disable react/no-unused-prop-types */
import { type Dispatch, type SetStateAction } from 'react';
import CategoryList from '@/components/review/FilterSection/CategoryList';
import DateDropdown from '@/components/review/FilterSection/DateDropdown';
import RegionDropdown from '@/components/review/FilterSection/RegionDropdown';

interface FilterSectionProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
  handleCloseDateClick: (value: string) => void;
  handleDateSubmit: ({ start, end }: { end: string; start: string }) => void;
  location?: string;
  setDateEnd?: Dispatch<SetStateAction<string | undefined>>;
  setDateStart?: Dispatch<SetStateAction<string | undefined>>;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
}

export default function FilterSection({
  location,
  category,
  setDateEnd,
  setLocation,
  setDateStart,
  handleDateSubmit,
  handleCategoryClick,
}: FilterSectionProps) {


  return (
    <div className="scrollbar-hide relative my-0 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      {/* 카테고리 */}
      <CategoryList category={category} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <CloseDateToggle onCloseDateClick={handleCloseDateClick} /> */}
          <RegionDropdown location={location} setLocation={setLocation}  />
          <DateDropdown setDateStart={setDateStart} setDateEnd={setDateEnd} handleDateSubmit={handleDateSubmit} />
        </div>

        {/* 모임 만들기 버튼 */}
      
      </div>
    </div>
  );
}
