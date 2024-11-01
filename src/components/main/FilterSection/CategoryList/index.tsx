import CategoryItems from '@/components/main/FilterSection/CategoryList/CategoryItems';
import { FILTER_OPTIONS } from '@/constants/main/contants';

interface CategoryListProps {
  handleCategoryClick: (category: string) => void;
  selectedCategory: string;
}

export default function CategoryList({ handleCategoryClick, selectedCategory }: CategoryListProps) {
  return (
    <div className="scrollbar-hide w-full overflow-x-auto">
      <fieldset className="box-content flex min-w-max gap-2">
        <legend className="absolute size-1 overflow-hidden">filter</legend>
        {FILTER_OPTIONS.map((option) => (
          <CategoryItems key={option.id} option={option} selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
        ))}
      </fieldset>
    </div>
  );
}
