import LongDropdown from '@/components/shared/Dropdown/LongDropdown';
import { FILTER_OPTIONS } from '@/constants/filter';

type CategoryDropdownProps = {
  error: string;
  setSelectedCategory: (category: string) => void;
};

export function CategoryDropdown({ setSelectedCategory ,error}: CategoryDropdownProps) {
  const categoryList = FILTER_OPTIONS.slice(1).map(option => option.label);


  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-gray-900"> 카테고리 </h2>
      <LongDropdown listDropdown={categoryList} placeholder="서비스 카테고리를 정해주세요." onListChange={setSelectedCategory} />
      {error && <p className="mt-1 -mb-5 text-red-500 text-sm font-medium ">{error}를 선택하세요.</p>}
    </div>
  );
}

