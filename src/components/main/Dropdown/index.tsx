import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

interface DropdownProps {
  buttonLabel: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dropOpen: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  value?: string;
}

export default function Dropdown({ buttonLabel, children, isOpen, setIsOpen, className, dropOpen, value }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <div ref={dropdownRef} className="relative cursor-pointer">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center rounded-lg border border-gray-100 p-2 text-13-16-response font-semibold text-gray-900 mobile:gap-1 tablet:px-4 ${dropOpen && 'bg-blue-800 text-white'} ${value && 'bg-blue-800 text-white'}`}
      >
        {buttonLabel}
        <Image
          src={`${dropOpen || value ? './icons/down-white.svg' : './icons/down-arrow.svg'}`}
          alt="down arrow"
          width={18}
          height={18}
          className={`duration-300 ${dropOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>
      {isOpen && <div className={`absolute top-full z-10 mt-2 rounded-xl bg-white drop-shadow-2xl ${className}`}>{children}</div>}
    </div>
  );
}
