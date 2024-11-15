import CategoryList from '@/components/main/FilterSection/CategoryList';
import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

export default function BookmarkFilter() {
  return (
    <>
      <div className="hidden" />
      <div className="flex flex-col gap-3 border-t border-t-gray-100 px-4 py-6">
        <CategoryList />
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <RegionDropdown />
            <DateDropdown />
          </div>
          <CloseDateToggle />
        </div>
      </div>
    </>
  );
}
