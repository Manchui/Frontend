/* eslint-disable radix */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type LongDropdownProps = {
  disabled?: boolean;
  listDropdown: string[];

  maxValue?: number;
  minValue?: number;
  onListChange: (list: string) => void;
  placeholder: string;
};

export default function LongDropdown({ listDropdown = [], placeholder, onListChange, disabled, maxValue, minValue }: LongDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string>(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleLocationSelect = (list: string) => {
    if (!disabled) {
      setSelectedList(list);
      onListChange?.(list);
      setIsOpen(false);
    }
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

  const isActive = selectedList !== placeholder;
  const triggerLabel = isActive ? selectedList : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className={clsx('flex h-11 w-full items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-2 text-sm font-medium text-gray-400', {
          'text-gray-800': isActive,
        })}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span className="truncate">{triggerLabel}</span>
        <Image src="/icons/down.svg" alt="down arrow" width={24} height={24} className={`ml-2 duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-20 mt-1 max-h-[200px] w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow',
            isOpen ? 'animate-dropdown-open' : 'animate-dropdown-close',
          )}
        >
          <ul>
            {listDropdown
              .filter((list) => list !== placeholder)
              .map((list, index) => {
                const isDisabled = maxValue !== undefined && parseInt(list) > maxValue;

                const minisDisabled = minValue !== undefined && parseInt(list) < minValue;

                return (
                  <li
                    key={index}
                    onClick={() => !isDisabled && !minisDisabled && handleLocationSelect(list)}
                    className={clsx(
                      'm-2 cursor-pointer rounded-xl px-2 py-1 text-left',
                      minisDisabled || isDisabled ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-100',
                      selectedList === list && 'bg-gray-50',
                    )}
                  >
                    {list}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
