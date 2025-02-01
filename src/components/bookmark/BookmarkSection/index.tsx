import CardItem from '@/components/main/CardSection/CardItem';
import { MessageWithLink } from '@/components/main/MainCardSection/CardSection';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import NoData from '@/components/shared/NoData';
import PaginationBtn from '@/components/shared/PaginationBtn';
import type { GetBookmarkResponse } from '@manchui-api';

interface BookmarkSectionProps {
  bookmark?: GetBookmarkResponse['data'];
  isError: boolean;
  isLoading: boolean;
}

function BookmarkSectionContent({ bookmark, isLoading, isError }: BookmarkSectionProps) {
  return (
    <>
      <ul className="grid grid-cols-2 gap-5 tablet:grid-cols-3 pc:grid-cols-4">
        {bookmark?.gatheringList.map((data) => <CardItem key={data.gatheringId} data={data} />)}
      </ul>
      {bookmark?.gatheringCount === 0 && <NoData use="main" />}
      {!isLoading && !isError && bookmark?.gatheringCount !== 0 && <PaginationBtn page={bookmark?.page ?? 0} totalPage={bookmark?.totalPage ?? 0} />}
    </>
  );
}

export default function BookmarkSection({ bookmark, isLoading, isError }: BookmarkSectionProps) {
  return (
    <ErrorBoundary
      fallbackComponent={
        <div className="relative top-[100px]">
          <MessageWithLink message="네트워크 연결을 확인해주세요." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
        </div>
      }
    >
      <BookmarkSectionContent bookmark={bookmark} isLoading={isLoading} isError={isError} />
    </ErrorBoundary>
  );
}
