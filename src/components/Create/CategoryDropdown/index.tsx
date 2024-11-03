import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import { FILTER_OPTIONS } from '@/constants/main/contants';

type CategoryDropdownProps = {
  setSelectedCategory: (category: string) => void;
};

export function CategoryDropdown({ setSelectedCategory }: CategoryDropdownProps) {
  const categoryList = Array.from(FILTER_OPTIONS.map((option) => option.label));

  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 선택 서비스 </h2>
      <LongDropdown listDropdown={categoryList} placeholder="서비스 카테고리를 정해주세요." onListChange={setSelectedCategory} />
    </div>
  );
}
