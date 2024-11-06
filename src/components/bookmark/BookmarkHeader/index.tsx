import SearchBar from '@/components/main/HeaderSection/SearchBar';
import type { GetGatheringResponse } from '@manchui-api';

interface BookmarkHeaderProps {
  data?: GetGatheringResponse['data'];
  handleSearchSubmit: (submitValue: string) => void;
}

export default function BookmarkHeader({ data, handleSearchSubmit }: BookmarkHeaderProps) {
  return (
    <div className="flex w-full items-center gap-2 pb-6 mobile:flex-row mobile:justify-between mobile:pb-[30px]">
      <div className="flex items-center gap-1 text-pretty">
        <h1 className="text-bookmark-title font-bold">찜한 모임</h1>
        <span className="rounded-xl bg-red-400 px-2 text-sm font-bold text-white">{data?.gatheringCount}</span>
      </div>
      <SearchBar onSearchSubmit={handleSearchSubmit} />
    </div>
  );
}