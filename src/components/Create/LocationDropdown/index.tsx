import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import { REGION_DATA } from '@/constants/contants';

type LocationDropdownProps = {
  error: string;
  setSelectedLocation: (location: string) => void;
};

export function LocationDropdown({ setSelectedLocation, error }: LocationDropdownProps) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 장소 </h2>
      <LongDropdown listDropdown={REGION_DATA} placeholder="모임 위치를 정해주세요." onListChange={setSelectedLocation} />
      {error && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{error}를 선택하세요.</p>}
    </div>
  );
}
