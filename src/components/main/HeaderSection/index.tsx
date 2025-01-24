import { memo } from 'react';
import FilterList from '@/components/main/HeaderSection/FilterList';
import SearchBar from '@/components/main/HeaderSection/SearchBar';
import Skeleton from '@/components/shared/Skeleton';

function HeaderSection() {
  return (
    <div className="mb-6 mt-16 select-none border-b border-b-gray-50 px-5">
      {/* 헤더 영역 */}
      <div className="flex items-center justify-between">
        <p className="text-nowrap text-2xl font-bold">전체 카테고리</p>
        <SearchBar />
      </div>

      {/* 필터 영역 */}
      <FilterList />
    </div>
  );
}

export default memo(HeaderSection);

export function HeaderSkeleton() {
  return (
    <div className="mb-6 mt-16 border-b border-b-gray-50 px-5">
      <div className="flex items-center justify-between">
        <p className="text-nowrap text-2xl font-bold">전체 카테고리</p>
        <Skeleton className="h-[29px] w-[148px] tablet:w-[212px]" />
      </div>
      <Skeleton className="my-6 h-[36px]" />
    </div>
  );
}
