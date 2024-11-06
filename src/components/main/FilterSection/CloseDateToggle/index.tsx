import { useState } from 'react';
import Image from 'next/image';
import { Toast } from '@/components/shared/Toast';

export default function CloseDateToggle({ onCloseDateClick }: { onCloseDateClick: (value: string) => void }) {
  const [toggleValue, setToggleValue] = useState<boolean>(false);

  const handleCloseDateFilterToggle = () => {
    const updatedToggleValue = !toggleValue;
    setToggleValue(updatedToggleValue);
    onCloseDateClick(updatedToggleValue ? 'closeDate' : '');

    Toast('success', updatedToggleValue ? '마감 임박순 필터가 적용되었습니다.' : '마감 임박순 필터가 해제되었습니다.');
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
