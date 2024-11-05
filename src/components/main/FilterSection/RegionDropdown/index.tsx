import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import { Toast } from '@/components/shared/Toast';
import { REGION_DATA } from '@/constants/contants';

interface RegionDropdownProps {
  region?: string;
  setRegion: Dispatch<SetStateAction<string | undefined>>;
}

export default function RegionDropdown({ setRegion, region }: RegionDropdownProps) {
  const [regionDropOpen, setRegionDropOpen] = useState(false);

  const handleInitClick = () => {
    setRegion(undefined);
    setRegionDropOpen(false);

    Toast('success', '지역 필터가 초기화되었습니다.');
  };

  const handleRegionSelect = (value: string) => {
    setRegion(value);
    setRegionDropOpen(false);

    Toast('success', `${value} 지역이 선택되었습니다.`);
  };

  return (
    <Dropdown value={region} dropOpen={regionDropOpen} isOpen={regionDropOpen} setIsOpen={setRegionDropOpen} buttonLabel={region ?? '지역'} className="left-0">
      <ul
        className={`max-h-48 w-24 cursor-pointer overflow-y-auto rounded-xl text-13-15-response font-semibold text-gray-900 ${regionDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}
      >
        <li onClick={handleInitClick} className="p-2 hover:bg-gray-50">
          전체
        </li>
        {REGION_DATA.map((value) => (
          <li key={value} onClick={() => handleRegionSelect(value)} className="p-2 hover:bg-gray-50">
            {value}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
