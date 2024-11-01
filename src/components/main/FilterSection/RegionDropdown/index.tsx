import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import { REGION_DATA } from '@/constants/main/contants';

export default function RegionDropdown() {
  const [regionDropOpen, setRegionDropOpen] = useState(false);

  // const handleRegionSelect = (region: string) => {
  //   // 지역 필터
  //   console.log('선택된 지역:', region);
  //   setRegionDropOpen(false);
  // };

  return (
    <Dropdown dropOpen={regionDropOpen} isOpen={regionDropOpen} setIsOpen={setRegionDropOpen} buttonLabel="지역" className="left-0">
      <ul className={`max-h-48 w-24 overflow-y-auto rounded-xl ${regionDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
        {REGION_DATA.map((region) => (
          <li
            key={region}
            // onClick={() => handleRegionSelect(region)}
            className="cursor-pointer p-2 text-13-15-response font-semibold text-gray-900 hover:bg-gray-50"
          >
            {region}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
