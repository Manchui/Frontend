/* eslint-disable radix */
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type LongDropdownProps = {
  disabled?: boolean;
  isCloseGathering?: boolean;
  listDropdown: Array<string | { gatheringId: number; groupName: string }>;
  maxValue?: number;
  minValue?: number;
  onListChange: (list: string) => void;
  placeholder: string;
  setGatheringId?: (id: number) => void;
};

export default function LongDropdown({
  listDropdown = [],
  placeholder,
  onListChange,
  disabled,
  maxValue,
  minValue,
  isCloseGathering = false,
  setGatheringId,
}: LongDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<string>(placeholder);
  const [inputValue, setInputValue] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isCloseDisabled, setIsCloseDisabled] = useState<boolean>(false);

  const toggleDropdown = () => {
    if (!disabled && (!isCloseDisabled || !isCloseGathering)) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleListSelect = (list: string | { gatheringId: number; groupName: string }) => {
    if (!disabled) {
      if (isCloseGathering) {
        setIsCloseDisabled(true);
      }

      const selectedGroupName = isCloseGathering && typeof list === 'object' ? list.groupName : (list as string);
      setSelectedList(selectedGroupName);
      setInputValue(selectedGroupName);
      onListChange(selectedGroupName);

      if (isCloseGathering && typeof list === 'object') {
        if (setGatheringId) {
          setGatheringId(list.gatheringId);
        }
      }

      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCloseClick = () => {
    setIsCloseDisabled(false);
    setSelectedList('');
    setInputValue('');
    onListChange('');
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
        {isCloseGathering ? (
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="-ml-2 w-full border-none bg-transparent p-2 text-sm text-gray-800 outline-none"
            disabled={isCloseDisabled || disabled}  // Disabled condition
          />
        ) : (
          <span className="truncate">{triggerLabel}</span>
        )}
        <Image
          src={isCloseGathering && isCloseDisabled ? '/icons/x.svg' : '/icons/down.svg'}
          alt="down arrow"
          width={isCloseGathering && isCloseDisabled ? 12 : 24}
          height={isCloseGathering && isCloseDisabled ? 12 : 24}
          className={clsx('ml-2', {
            'rotate-180 duration-300': !isCloseGathering && isOpen,
            'rotate-0 duration-300': !isCloseGathering && !isOpen,
            'mr-1 rotate-180 duration-0': isCloseGathering && isCloseDisabled,
          })}
          onClick={isCloseGathering && isCloseDisabled ? handleCloseClick : undefined}
        />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-20 mt-1 max-h-[200px] w-full overflow-y-auto rounded-xl border border-gray-100 bg-white shadow',
            isOpen ? 'animate-dropdown-open' : 'animate-dropdown-close',
          )}
        >
          <ul>
            {listDropdown.map((list, index) => {
              const displayText = isCloseGathering && typeof list === 'object' ? list.groupName : (list as string);

              const isDisabled = maxValue !== undefined && parseInt(displayText) > maxValue;
              const minisDisabled = minValue !== undefined && parseInt(displayText) < minValue;

              return (
                <li
                  key={index}
                  onClick={() => !isDisabled && !minisDisabled && handleListSelect(list)}
                  className={clsx(
                    'm-2 cursor-pointer rounded-xl px-2 py-1 text-left',
                    minisDisabled || isDisabled ? 'cursor-not-allowed text-gray-400' : 'hover:bg-gray-100',
                    selectedList === displayText && 'bg-gray-50',
                  )}
                >
                  {displayText}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
