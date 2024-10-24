import { useState } from 'react';
import cx from 'clsx';
import Image from 'next/image';

interface OptionButtonProps {
  options: string[];
}

/**
 * Option Button Component
 * @param options - 카테고리 목록
 * @returns
 */

export default function OptionButton({ options }: OptionButtonProps) {
  const [selectedOption, setSelectedOption] = useState<string>('전체');
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex space-x-2">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => handleOptionClick(option)}
          className={cx('flex w-fit flex-row rounded-md border px-4 py-2', {
            'bg-black text-white': selectedOption === option,
            'bg-white text-black': selectedOption !== option,
          })}
        >
          {selectedOption === option && <Image src="/icons/running-selected.png" alt={`${option} 아이콘`} width={24} height={24} className="mr-2" />}
          {option}
        </button>
      ))}
    </div>
  );
}
