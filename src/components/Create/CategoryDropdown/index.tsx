import { useEffect, useState } from 'react';
import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import { FILTER_OPTIONS } from '@/constants/filter';
import type { GetCloseGatheringIdResponse } from '@manchui-api';

type CategoryDropdownProps = {
  closeGatheringIdData?: GetCloseGatheringIdResponse['data'];
  error: string;
  setSelectedCategory: (category: string) => void;
};

export function CategoryDropdown({ closeGatheringIdData, setSelectedCategory, error }: CategoryDropdownProps) {
  const categoryList = FILTER_OPTIONS.slice(1).map((option) => option.label);
  const [placeholder, setPlaceholder] = useState<string>('서비스 카테고리를 정해주세요.');
  useEffect(() => {
    if (closeGatheringIdData) {
      setSelectedCategory(closeGatheringIdData.category);
      setPlaceholder(closeGatheringIdData.category);
    }
  }, [closeGatheringIdData, setSelectedCategory]);

  const isCategorySelected = Boolean(closeGatheringIdData?.category);

  // console.log('Selected placeholder:', placeholder);

  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 카테고리 </h2>
      <LongDropdown listDropdown={categoryList} placeholder={placeholder} onListChange={setSelectedCategory} disabled={isCategorySelected} />
      {error && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{error}를 선택하세요.</p>}
    </div>
  );
}
