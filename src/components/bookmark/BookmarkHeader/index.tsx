import SearchBar from '@/components/main/HeaderSection/SearchBar';
import type { GetBookmarkResponse } from '@manchui-api';

export default function BookmarkHeader({ data }: { data?: GetBookmarkResponse['data'] }) {
  return (
    <div className="flex w-full items-center justify-between gap-2 pb-6">
      <div className="flex items-center gap-1 text-pretty">
        <h1 className="text-xl font-bold tablet:text-2xl">찜한 모임</h1>
        <span className="rounded-xl bg-red-400 px-2 text-sm font-bold text-white">{data?.gatheringCount}</span>
      </div>
      <SearchBar />
    </div>
  );
}

export function BookmarkHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-between pb-6">
      <div className="flex items-center gap-1 text-nowrap">
        <h1 className="text-xl font-bold tablet:text-2xl">찜한 모임</h1>
        <span className="rounded-xl bg-red-400 px-2 text-sm font-bold text-white">0</span>
      </div>
      <SearchBar />
    </div>
  );
}
