import Link from 'next/link';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

interface FilterSectionProps {
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

export default function FilterSection({ handleCategoryClick, selectedCategory }: FilterSectionProps) {
  return (
    <div className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      <CategoryList selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
        <div className="flex items-center gap-2">
          <CloseDateToggle />
          <RegionDropdown />
          <DateDropdown />
        </div>

        {/* 모임 만들기 버튼 */}
        <Link
          href="/create"
          className="rounded-xl bg-blue-800 px-3 py-2 text-13-16-response font-semibold text-white transition-all duration-200 hover:bg-blue-700"
        >
          모임 만들기
        </Link>
      </div>
    </div>
  );
}
