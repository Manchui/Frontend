import { useState } from 'react';
import Dropdown from '@/components/main/Dropdown';
import { Toast } from '@/components/shared/Toast';
import { useSetSort, useSort } from '@/store/useFilterStore';

const sortData = [
  { api: 'ratingDesc', name: '별점 높은순' },
  { api: 'ratingAsc', name: '별점 낮은순' },
];



export default function SortToggle() {
  const [sortDropOpen, setSortDropOpen] = useState(false);
 const sort=useSort();
 const setSort=useSetSort();

  const handleInitClick = () => {
    setSort(undefined);
    setSortDropOpen(false);

    Toast('info', '순서가 초기화되었습니다.');
  };

  const handleSortSelect = (value: { api: string; name: string }) => {
    setSort(value.api);
    setSortDropOpen(false);

    Toast('success', `${value.name}이 선택되었습니다.`);
  };
  const getSortName = () => sortData.find((item) => item.api === sort)?.name || '최신순';
  return (
    <Dropdown value={sort} dropOpen={sortDropOpen} isOpen={sortDropOpen} setIsOpen={setSortDropOpen} buttonLabel={getSortName()} className="left-0">
      <ul
        className={`max-h-48 w-24 cursor-pointer overflow-y-auto rounded-xl text-13-16-response font-semibold text-gray-900 ${sortDropOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}
      >
        <li onClick={handleInitClick} className="p-2 hover:bg-gray-50">
          최신순
        </li>
        {sortData.map((value) => (
          <li key={value.api} onClick={() => handleSortSelect(value)} className="p-2 hover:bg-gray-50">
            {value.name}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
