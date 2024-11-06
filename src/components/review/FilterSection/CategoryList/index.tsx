import CategoryItems from '@/components/main/FilterSection/CategoryList/CategoryItems';
import { FILTER_OPTIONS } from '@/constants/contants';

interface CategoryListProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
}

export default function CategoryList({ handleCategoryClick, category }: CategoryListProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto relative min-w-0 flex-1">
      <fieldset className="box-content flex min-w-max gap-2">
        <legend className="absolute size-1 overflow-hidden">filter</legend>
        {FILTER_OPTIONS.map((option) => (
          <CategoryItems key={option.label} option={option} category={category} onCategoryClick={handleCategoryClick} />
        ))}
      </fieldset>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[50px] bg-gradient-to-l from-white to-transparent " />
    </div>
  );
}
