import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Calendar from '@/components/shared/Calendar';

type DropdownProps = {
  locations?: string[];
  onDateChange?: (data: { rangeEnd?: string | null; rangeStart?: string | null; selectedDate?: string }) => void;
  onLocationChange?: (location: string) => void;
  onSortChange?: (sort: string) => void;
  sortOptions?: string[];
  type: 'location' | 'date' | 'sort';
};

/**
 * Dropdown 컴포넌트
 *
 * @param locations - string[] 지역 목록
 * @param onDateChange - (data: { rangeEnd?: string | null; rangeStart?: string | null; selectedDate?: string }) => void 날짜 변경 함수
 * @param onLocationChange - (location: string) => void 지역 변경 함수
 * @param onSortChange - (sort: string) => void  정렬 변경 함수
 * @param sortOptions - string[] 정렬 옵션 목록
 * @param type - 'location' | 'date' | 'sort' 드롭다운 타입
 *
 */
export default function Dropdown({ locations = [], onDateChange, onLocationChange, onSortChange, sortOptions = [], type }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>('지역전체');
  const [selectedDates, setSelectedDates] = useState<{
    rangeEnd: string | null;
    rangeStart: string | null;
  }>({ rangeEnd: null, rangeStart: null });

  const [dateTriggerText, setDateTriggerText] = useState<string>('날짜전체');
  const [selectedSort, setSelectedSort] = useState<string>('마감임박');
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    onLocationChange?.(location);
    setIsOpen(false);
  };

  const handleDateApply = () => {
    if (selectedDates.rangeStart && selectedDates.rangeEnd) {
      setDateTriggerText(`${selectedDates.rangeStart} ~ ${selectedDates.rangeEnd}`);
      onDateChange?.(selectedDates);
      setIsOpen(false);
    }
  };

  const handleDateReset = () => {
    setSelectedDates({ rangeStart: null, rangeEnd: null });
    setDateTriggerText('날짜전체');
    onDateChange?.({ rangeStart: null, rangeEnd: null });
    setIsOpen(false);
  };

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string }) => {
    setSelectedDates({
      rangeEnd: data.rangeEnd || null,
      rangeStart: data.rangeStart || null,
    });
  };

  const handleSortSelect = (sort: string) => {
    setSelectedSort(sort);
    onSortChange?.(sort);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isActive =
    (type === 'location' && selectedLocation !== '지역전체') ||
    (type === 'date' && dateTriggerText !== '날짜전체') ||
    (type === 'sort' && selectedSort !== '마감임박');

  const triggerLabel = type === 'location' ? selectedLocation : type === 'date' ? dateTriggerText : selectedSort;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={clsx('flex h-[40px] w-[110px] items-center justify-center rounded-xl border-2 border-gray-100', {
          'bg-gray-800 text-white': (type === 'location' || type === 'date') && isActive,
          'bg-primary-50 text-gray-800': type === 'sort' && isActive,
          'w-auto px-3': type === 'date',
          'bg-white text-gray-800': !isActive,
        })}
        onClick={toggleDropdown}
      >
        {type === 'sort' && <Image src="/icons/updown-arrow.svg" alt="sort" width={24} height={24} className="mr-2" />}
        {triggerLabel}
        {(type === 'location' || type === 'date') && (
          <Image
            src={`/icons/${isActive ? 'down-white' : 'down'}.svg`}
            alt="down arrow"
            width={24}
            height={24}
            className={`ml-2 duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        )}
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-20 mt-1 max-h-[160px] overflow-y-auto rounded-xl border border-gray-100 bg-white shadow',
            type === 'date' ? 'max-h-[340px] w-[336px]' : 'w-[110px]',
            isOpen ? 'animate-dropdown-open' : 'animate-dropdown-close',
          )}
        >
          {type === 'location' && (
            <ul>
              {['지역전체', ...locations].map((location, index) => (
                <li
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className={clsx('m-2 cursor-pointer rounded-xl px-2 py-1 text-left hover:bg-gray-100', selectedLocation === location && 'bg-gray-50')}
                >
                  {location}
                </li>
              ))}
            </ul>
          )}
          {type === 'date' && onDateChange && (
            <div className="flex flex-col items-center pb-3 pt-5">
              <Calendar selectionType="range" onDateChange={handleDateChange} startDate={selectedDates.rangeStart} />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleDateReset}
                  className="h-[40px] w-[120px] rounded-xl border-2 border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
                >
                  초기화하기
                </button>
                <button type="button" onClick={handleDateApply} className="h-[40px] w-[120px] rounded-xl bg-blue-800 text-white hover:bg-blue-700">
                  적용하기
                </button>
              </div>
            </div>
          )}

          {type === 'sort' && sortOptions.length > 0 && (
            <ul>
              {sortOptions.map((sort, index) => (
                <li
                  key={index}
                  onClick={() => handleSortSelect(sort)}
                  className={clsx('m-2 cursor-pointer rounded-xl px-2 py-1 text-left hover:bg-primary-100', selectedSort === sort && 'bg-primary-50')}
                >
                  {sort}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
