import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Calendar from '@/components/shared/Calendar';

type DropdownProps = {
  locations?: string[];
  onDateChange?: (dates: [Date, Date]) => void;
  onLocationChange?: (location: string) => void;
  onSortChange?: (sortType: string) => void;
  type: 'filter' | 'sort';
};

export default function Dropdown({ type, locations = [], onDateChange, onSortChange, onLocationChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>('지역전체');
  const [selectedSort, setSelectedSort] = useState<string | null>('마감임박');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    if (onLocationChange) {
      onLocationChange(location);
    }
    setIsOpen(false);
  };

  const handleSortSelect = (sortType: string) => {
    setSelectedSort(sortType);
    if (onSortChange) {
      onSortChange(sortType);
    }
    setIsOpen(false);
  };

  const handleDateApply = () => {
    if (onDateChange) {
      onDateChange(dateRange as [Date, Date]);
      setIsOpen(false);
    }
  };

  const handleDateReset = () => {
    setDateRange([null, null]);
    setIsOpen(false);
  };

  const sortOptions = ['마감임박', '최신순', '리뷰 높은 순', '참여 인원 순'];

  return (
    <div className="relative">
      <button
        type="button"
        className={clsx('w-[120px] box-border flex h-10 rounded-md border-2 bg-white', type === 'sort' ? 'items-end' : 'items-start')}
        onClick={toggleDropdown}
      >
        {type === 'sort' && <Image src="./icons/updown-arrow.svg" alt="arrow" width={24} height={24} />}
        {type === 'sort' ? selectedSort : selectedLocation}
        {type === 'filter' && (
          <Image src="./icons/down-arrow.svg" alt="down arrow" width={18} height={18} className={`duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        )}
      </button>
      {isOpen && (
        <div className={`absolute z-10 rounded-md border border-gray-200 bg-white shadow-lg ${isOpen ? 'animate-dropdown-open' : 'animate-dropdown-close'}`}>
          {type === 'filter' && locations.length > 0 && (
            <ul>
              {locations.map((location, index) => (
                <li key={index} onClick={() => handleLocationSelect(location)} className="cursor-pointer p-2 hover:bg-gray-100">
                  {location}
                </li>
              ))}
            </ul>
          )}
          {type === 'sort' && (
            <ul className="items-end">
              {sortOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSortSelect(option)}
                  className={`cursor-pointer p-2 hover:bg-primary-50 ${selectedSort === option ? 'bg-primary-50' : ''}`}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          {type === 'filter' && onDateChange && (
            <div>
              <Calendar selectionType="range" />
              <button type="button" onClick={handleDateApply}>
                적용
              </button>
              <button type="button" onClick={handleDateReset}>
                초기화
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
