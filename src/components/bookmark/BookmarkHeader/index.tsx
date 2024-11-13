import type { Dispatch, SetStateAction } from 'react';
import GatheringCount from '@/components/bookmark/BookmarkHeader/GatheringCount';
import SearchBar from '@/components/main/HeaderSection/SearchBar';
import type { GetGatheringResponse } from '@manchui-api';

interface BookmarkHeaderProps {
  data?: GetGatheringResponse['data'];
  handleSearchSubmit: (submitValue: string) => void;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function BookmarkHeader({ data, setPage, handleSearchSubmit }: BookmarkHeaderProps) {
  return (
    <div className="flex w-full items-center gap-2 pb-6 mobile:flex-row mobile:justify-between mobile:pb-[30px]">
      <GatheringCount data={data} />
      <SearchBar setPage={setPage} onSearchSubmit={handleSearchSubmit} />
    </div>
  );
}
