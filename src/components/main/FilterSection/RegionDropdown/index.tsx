import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import { REGION_DATA } from '@/constants/main/contants';

interface RegionDropdownProps {
  region?: string;
  setRegion: Dispatch<SetStateAction<string | undefined>>;
}

export default function RegionDropdown({ setRegion, region }: RegionDropdownProps) {
  const [regionDropOpen, setRegionDropOpen] = useState(false);

  const handleRegionSelect = (value: string) => {
    // 지역 필터
    setRegion(value);
    setRegionDropOpen(false);
  };

  return (
    <Dropdown dropOpen={regionDropOpen} isOpen={regionDropOpen} setIsOpen={setRegionDropOpen} buttonLabel={region ?? '지역'} className="left-0">
      <ul className={`max-h-48 w-24 overflow-y-auto rounded-xl ${regionDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
        {REGION_DATA.map((value) => (
          <li
            key={value}
            onClick={() => handleRegionSelect(value)}
            className="cursor-pointer p-2 text-13-15-response font-semibold text-gray-900 hover:bg-gray-50"
          >
            {value}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
