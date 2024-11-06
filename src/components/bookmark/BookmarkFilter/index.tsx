import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

export default function BookmarkFilter() {
  return (
    <div className="flex justify-between border-t border-t-gray-100 px-4 py-6">
      <div className="flex gap-2 mobile:gap-4">
        <RegionDropdown setRegion={() => {}} />
        <DateDropdown handleDateSubmit={() => {}} />
      </div>
      <CloseDateToggle onCloseDateClick={() => {}} />
    </div>
  );
}
