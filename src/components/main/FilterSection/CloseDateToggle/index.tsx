import { useState } from 'react';
import Image from 'next/image';

export default function CloseDateToggle({ onCloseDateClick }: { onCloseDateClick: (value: string) => void }) {
  const [toggleValue, setToggleValue] = useState<boolean>(false); // 마감임박 토글 상태

  const handleCloseDateFilterToggle = () => {
    setToggleValue(!toggleValue);

    onCloseDateClick(!toggleValue ? 'closeDate' : '');

    // console.log(newCloseDateState ? 'closeDate' : '');
  };

  return (
    <div
      onClick={handleCloseDateFilterToggle}
      className={`group flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-100 p-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 ${toggleValue && 'bg-blue-800 text-white'}`}
    >
      <Image src={toggleValue ? '/icons/sort-white.svg' : '/icons/sort.svg'} alt="마감 임박순" width={20} height={20} className="mobile:size-[20px]" />
      <span className="hidden mobile:block">마감임박</span>
    </div>
  );
}
