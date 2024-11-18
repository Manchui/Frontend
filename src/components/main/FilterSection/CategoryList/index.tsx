import CategoryItems from '@/components/main/FilterSection/CategoryList/CategoryItems';
import { FILTER_OPTIONS } from '@/constants/filter';

export default function CategoryList() {
  return (
    <div className="relative min-w-0 flex-1">
      <div className="scrollbar-hide relative w-full min-w-0 flex-1 overflow-x-auto">
        <fieldset className="box-content flex min-w-max gap-2">
          <legend className="absolute size-1 overflow-hidden">filter</legend>
          {FILTER_OPTIONS.map((option) => (
            <CategoryItems key={option.label} option={option} />
          ))}
        </fieldset>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
