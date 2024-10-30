import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface DropdownProps {
  buttonLabel: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dropOpen: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Dropdown({ buttonLabel, children, isOpen, setIsOpen, className, dropOpen }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative cursor-pointer">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`flex items-center rounded-lg border border-gray-100 px-4 py-2 text-13-16-response font-semibold text-gray-900 mobile:gap-1 ${dropOpen && 'bg-blue-800 text-white'}`}
      >
        {buttonLabel}
        <Image
          src={`${dropOpen ? './icons/down-white.svg' : './icons/down-arrow.svg'}`}
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
