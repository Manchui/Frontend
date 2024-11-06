import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import { Toast } from '@/components/shared/Toast';
import {  } from '@/constants/contants';

const sortData=['별점 높은순', '별점 낮은순'];

interface RegionDropdownProps {
  setSort: Dispatch<SetStateAction<string | undefined>>;
  sort?: string;
  
}

export default function RegionDropdown({ sort, setSort }: RegionDropdownProps) {
  const [sortDropOpen, setSortDropOpen] = useState(false);

  const handleInitClick = () => {
    setSort(undefined);
    setSortDropOpen(false);

    Toast('success', '순서가 초기화되었습니다.');
  };

  const handleRegionSelect = (value: string) => {
    setSort(value);
    setSortDropOpen(false);

    Toast('success', `${value}이 선택되었습니다.`);
  };

  return (
    <Dropdown
      value={sort}
      dropOpen={sortDropOpen}
      isOpen={sortDropOpen}
      setIsOpen={setSortDropOpen}
      buttonLabel={sort ?? '최신순'}
      className="left-0"
    >
      <ul
        className={`max-h-48 w-24 cursor-pointer overflow-y-auto rounded-xl text-13-16-response font-semibold text-gray-900 ${sortDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}
      >
        <li onClick={handleInitClick} className="p-2 hover:bg-gray-50">
          최신순
        </li>
        {sortData.map((value) => (
          <li key={value} onClick={() => handleRegionSelect(value)} className="p-2 hover:bg-gray-50">
            {value}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
