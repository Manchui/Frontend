import CategoryItems from '@/components/main/FilterSection/CategoryList/CategoryItems';
import { FILTER_OPTIONS } from '@/constants/main/contants';

interface CategoryListProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
}

export default function CategoryList({ handleCategoryClick, category }: CategoryListProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto">
      <fieldset className="box-content flex min-w-max gap-2">
        <legend className="absolute size-1 overflow-hidden">filter</legend>
        {FILTER_OPTIONS.map((option) => (
          <CategoryItems key={option.id} option={option} category={category} onCategoryClick={handleCategoryClick} />
        ))}
      </fieldset>
    </div>
  );
}
