import { useState } from 'react';
import Image from 'next/image';

export default function CloseDateToggle() {
  const [closeDateToggle, setCloseDateToggle] = useState<boolean>(false); // 마감임박 토글 상태

  const handleCloseFilterToggle = () => {
    // 마감 임박 토글 클릭
    const newCloseDateState = !closeDateToggle;
    setCloseDateToggle(newCloseDateState);

    // console.log(newCloseDateState ? 'closeDate' : '');
  };

  return (
    <div
      onClick={handleCloseFilterToggle}
      className={`group flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-100 p-2 text-13-16-response font-semibold text-gray-900 transition-all duration-200 ${closeDateToggle && 'bg-blue-800 text-white'}`}
    >
      <Image src={closeDateToggle ? '/icons/sort-white.svg' : '/icons/sort.svg'} alt="마감 임박순" width={20} height={20} className="mobile:size-[20px]" />
      <span className="hidden mobile:block">마감임박</span>
    </div>
  );
}
