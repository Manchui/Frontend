import CategoryList from '@/components/main/FilterSection/CategoryList';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';
import type { GetReviewResponse } from '@manchui-api';

import ScoreFilter from './ScoreFilter';
import SortToggle from './SortToggle';
import ReviewRating from '../ReviewRating';

export default function FilterSection({ data, scoreReviewCount }: { data?: GetReviewResponse['data']; scoreReviewCount: number | undefined }) {
  return (
    <div className="flex flex-col gap-3 border-t border-t-gray-100 px-4 py-6">
      {/* 카테고리 */}
      <CategoryList />
      <ReviewRating data={data} scoreReviewCount={scoreReviewCount} />
      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RegionDropdown />
          <DateDropdown />
          <ScoreFilter />
        </div>

        <SortToggle />
      </div>
    </div>
  );
}
