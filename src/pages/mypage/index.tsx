import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MeetingCard } from '@/components/mypage/meeting-card';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';
import type { Gatherings } from '@/types/mypage';

// TODO: 나의 모임 목록 카드 데이터 0
const MeetingData: Gatherings = {
  gatheringCount: 2,
  gatheringList: [
    {
      gatheringId: 2,
      groupName: '모각코해요오오오오오오오오오오오',
      category: '개발',
      location: '홍대입구',
      gatheringImage: '/images/test-detail.png',
      gatheringDate: '2024-10-31 19:30:00', // 모임 날짜
      dueDate: '2024-10-22 23:59:59', // 마감
      maxUsers: 10,
      participantUsers: 2,
      isOpened: true,
      isCanceled: false,
      isClosed: false,
      createdAt: '2024-10-16 14:36:31', // 모임 생성일
      updatedAt: '2024-10-16 14:36:31', // 업데이트 날짜
      deletedAt: null,
      isDeleted: false,
      isHearted: true,
    },
    {
      gatheringId: 2,
      groupName: '모각코해요',
      category: '개발',
      location: '홍대입구',
      gatheringImage: '/images/test-detail.png',
      gatheringDate: '2024-10-31 19:30:00', // 모임 날짜
      dueDate: '2024-10-22 23:59:59', // 마감
      maxUsers: 10,
      participantUsers: 2,
      isOpened: true,
      isCanceled: false,
      isClosed: false,
      createdAt: '2024-10-16 14:36:31', // 모임 생성일
      updatedAt: '2024-10-16 14:36:31', // 업데이트 날짜
      deletedAt: null,
      isDeleted: false,
      isHearted: true,
    },
  ],
  pageSize: 10,
  page: 0,
  totalPage: 1,
};
// TODO: 나의 리뷰 목록 카드 데이터
const MyGatherData: Gatherings = {
  gatheringCount: 2,
  gatheringList: [
    {
      gatheringId: 2,
      groupName: '또잉',
      category: '개발',
      location: '홍대입구',
      gatheringImage: '/images/test-detail.png',
      gatheringDate: '2024-10-24 19:30:00',
      dueDate: '2024-10-22 23:59:59',
      maxUsers: 10,
      participantUsers: 2,
      isOpened: false,
      isCanceled: false,
      isClosed: false,
      createdAt: '2024-10-16 14:36:31',
      updatedAt: '2024-10-16 14:36:31',
      deletedAt: null,
      isHearted: true,
    },
  ],
  pageSize: 10,
  page: 0,
  totalPage: 1,
};
// TODO: 만든 모임 목록 카드 데이터
const MyMakeData: Gatherings = {
  gatheringCount: 2,
  gatheringList: [
    {
      gatheringId: 2,
      groupName: 'make',
      category: '개발',
      location: '홍대입구',
      gatheringImage: '/images/test-detail.png',
      gatheringDate: '2024-10-24 19:30:00',
      dueDate: '2024-10-22 23:59:59',
      maxUsers: 10,
      participantUsers: 2,
      isOpened: false,
      isCanceled: false,
      isClosed: false,
      createdAt: '2024-10-16 14:36:31',
      updatedAt: '2024-10-16 14:36:31',
      deletedAt: null,
      isHearted: true,
    },
  ],
  pageSize: 10,
  page: 0,
  totalPage: 1,
};

export default function MyPage() {
  const router = useRouter();
  const [date, setDate] = useState(MeetingData);
  const [category, setCategory] = useState('');
  const { query } = router;
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      void router.push('/login');
      Toast('success', '로그인을 해주세요.');
    }
  }, [isLoggedIn, router]);

  // NOTE: URL 적는 걸로 생각하며 작성
  const categories: { [key: string]: Gatherings } = {
    '나의 모임': MeetingData,
    '나의 리뷰': MyGatherData,
    '내가 만든 모임': MyMakeData,
  };

  const handleCategoryChange = (categoryId: string) => {
    if (category !== categoryId) {
      setCategory(categoryId);
      void router.push(`/mypage?category=${categoryId}`, undefined, { shallow: true });
    }
  };

  // useEffect(() => {
  //   if (!query.category && router.pathname === '/mypage') {
  //     handleCategoryChange('나의 모임');
  //   }
  //   console.log(query.category);
  // }, [router.pathname, query.category]);

  // NOTE: 카테고리 선택시 임시 스타일(변경 예정)
  const getButtonClass = (categoryId: string) =>
    categoryId === query.category ? 'flex-1 py-1.5 border-b-2 border-blue-800' : 'flex-1 hover:text-gray-500 text-blue-400 py-1.5 border-blue-100';

  return (
    <div>
      <div className="mt-[60px] h-[155px] select-none bg-blue-800 px-11 py-6 text-md font-semibold text-blue-800 duration-100 tablet:h-[249px] tablet:text-2xl pc:h-[302px] pc:text-2xl pc:text-white">
        마이페이지
      </div>
      <RootLayout>
        <div className="m-auto flex flex-col gap-8 px-4 duration-100 tablet:gap-10 pc:gap-14">
          <ProfileCard />
          <div className="flex flex-col">
            <div className="flex select-none items-center justify-between text-sub-response font-semibold">
              {Object.keys(categories).map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setDate(categories[item]);
                    handleCategoryChange(item);
                  }}
                  className={`border-b-2 ${getButtonClass(item)}`}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
              {date.gatheringList.map((data, i) => (
                <MeetingCard key={i} MeetingData={data} />
              ))}
            </div>
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
