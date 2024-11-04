import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

export default function FilterList() {
  return (
    <div className="flex select-none items-center justify-between">
      <div className="flex items-center gap-2">
        <RegionDropdown />
        <DateDropdown />
      </div>
      
      <CloseDateToggle />
    </div>
  );
}
