import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import { REGION_DATA } from '@/constants/main/contants';

type LocationDropdownProps = {
  setSelectedLocation: (location: string) => void;
};

export function LocationDropdown({ setSelectedLocation }: LocationDropdownProps) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 장소 </h2>
      <LongDropdown listDropdown={REGION_DATA} placeholder="모임 위치를 정해주세요." onListChange={setSelectedLocation} />
    </div>
  );
}
