import type { Dispatch, SetStateAction } from 'react';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

interface BookmarkFilterProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
  handleCloseDateClick: (value: string) => void;
  handleDateSubmit: ({ start, end }: { end: string; start: string }) => void;
  location?: string;
  setDateEnd?: Dispatch<SetStateAction<string | undefined>>;
  setDateStart?: Dispatch<SetStateAction<string | undefined>>;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
}

export default function BookmarkFilter({
  location,
  category,
  setDateEnd,
  setLocation,
  setDateStart,
  handleDateSubmit,
  handleCategoryClick,
  handleCloseDateClick,
}: BookmarkFilterProps) {
  return (
    <>
      <div className="hidden" />
      <div className="flex flex-col gap-3 border-t border-t-gray-100 px-4 py-6">
        <CategoryList category={category} handleCategoryClick={handleCategoryClick} />
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <RegionDropdown location={location} setLocation={setLocation} />
            <DateDropdown setDateStart={setDateStart} setDateEnd={setDateEnd} handleDateSubmit={handleDateSubmit} />
          </div>
          <CloseDateToggle onCloseDateClick={handleCloseDateClick} />
        </div>
      </div>
    </>
  );
}
