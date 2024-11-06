/* eslint-disable tailwindcss/no-custom-classname */
import BookmarkBanner from '@/components/bookmark/BookmarkBanner';
import BookmarkCardList from '@/components/bookmark/BookmarkCardList';
import BookmarkContainer from '@/components/bookmark/BookmarkContainer';
import BookmarkFilter from '@/components/bookmark/BookmarkFilter';
import BookmarkHeader from '@/components/bookmark/BookmarkHeader';
import RootLayout from '@/components/shared/RootLayout';
import type { GetGatheringResponse } from '@manchui-api';

const data: GetGatheringResponse['data'] = {
  gatheringCount: 2,
  gatheringList: [
    {
      category: '전체',
      closed: false,
      createdAt: '2024-01-01T12:00:00Z',
      currentUsers: 5,
      deletedAt: null,
      dueDate: '2024-02-01T12:00:00Z',
      gatheringDate: '2024-01-15T15:00:00Z',
      gatheringId: 1,
      gatheringImage: 'https://ryungbucket.s3.ap-northeast-2.amazonaws.com/b4e5d864-2daa-4b82-8d1c-9c75dd34b651.png',
      groupName: '개발자 모임',
      hearted: true,
      location: '을지로 3가',
      maxUsers: 10,
      minUsers: 2,
      name: '첫번째 모임',
      opened: true,
      profileImage: 'https://ryungbucket.s3.ap-northeast-2.amazonaws.com/b4e5d864-2daa-4b82-8d1c-9c75dd34b651.png',
      updatedAt: '2024-01-10T10:00:00Z',
    },
    {
      category: '전체',
      closed: true,
      createdAt: '2024-01-05T14:30:00Z',
      currentUsers: 8,
      deletedAt: null,
      dueDate: '2024-02-10T12:00:00Z',
      gatheringDate: '2024-02-01T18:00:00Z',
      gatheringId: 2,
      gatheringImage: 'https://ryungbucket.s3.ap-northeast-2.amazonaws.com/b4e5d864-2daa-4b82-8d1c-9c75dd34b651.png',
      groupName: '디자인 토크',
      hearted: false,
      location: '을지로 3가',
      maxUsers: 20,
      minUsers: 5,
      name: '디자인 워크샵',
      opened: false,
      profileImage: 'https://ryungbucket.s3.ap-northeast-2.amazonaws.com/b4e5d864-2daa-4b82-8d1c-9c75dd34b651.png',
      updatedAt: '2024-01-15T10:00:00Z',
    },
  ],
  page: 1,
  pageSize: 10,
  totalPage: 2,
};

export default function BookmarkPage() {
  return (
    <>
      <BookmarkBanner />
      <RootLayout>
        <BookmarkContainer>
          <BookmarkHeader />
          <div className="w-full bg-white">
            <BookmarkFilter />
            <BookmarkCardList data={data} />
          </div>
        </BookmarkContainer>
      </RootLayout>
    </>
  );
}
