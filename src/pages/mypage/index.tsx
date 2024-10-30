import { useState } from 'react';
import { useRouter } from 'next/router';
import MeetingCard from '@/components/mypage/meeting-card/MeetingCard';
import { ProfileCard } from '@/components/mypage/profile-card/ProfileCard';
import RootLayout from '@/components/shared/RootLayout';
import type { Gatherings, User } from '@/types/mypage';

// TODO: 프로필 데이터
const Data: User = {
  id: 'UUID',
  email: 'aaaa@gmail.com',
  name: 'hhihih',
  image: '/images/together-findpage-default.png',
};
// TODO: 나의 모임 목록 카드 데이터 0
const MeetingData: Gatherings = {
  gatheringCount: 2,
  gatheringList: [
    {
      gatheringId: 2,
      groupName: '모각코해요오오오오오오오오오오오',
      category: '개발',
      location: '홍대입구',
      gatheringImage: '/images/buddah-login.png',
      gatheringDate: '2024-10-24 19:30:00', // 모임 날짜
      dueDate: '2024-10-22 23:59:59', // 마감
      maxUsers: 10,
      participantUsers: 2,
      isOpened: false,
      isCancled: false,
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
      gatheringImage: '/images/buddah-login.png',
      gatheringDate: '2024-10-24 19:30:00',
      dueDate: '2024-10-22 23:59:59',
      maxUsers: 10,
      participantUsers: 2,
      isOpened: false,
      isCancled: false,
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
      gatheringImage: '/images/buddah-login.png',
      gatheringDate: '2024-10-24 19:30:00',
      dueDate: '2024-10-22 23:59:59',
      maxUsers: 10,
      participantUsers: 2,
      isOpened: false,
      isCancled: false,
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
    categoryId === query.category ? 'flex-1 py-[6px] border-b-2 border-blue-800' : 'flex-1 hover:text-gray-500 text-blue-400 py-[6px]';

  return (
    <RootLayout>
      <div className="flex flex-col justify-center gap-4 px-4 pt-[60px] tablet:px-6 pc:px-[102px]">
        <div className="m-auto min-w-[343px] duration-100 tablet:min-w-[696px] pc:min-w-[996px]">
          <h1 className="text-lg font-semibold tablet:text-2xl pc:text-2xl">마이 페이지</h1>
          <ProfileCard userData={Data} />
        </div>
        <div className="m-auto flex min-w-[343px] flex-col duration-100 tablet:min-w-[696px] pc:min-w-[996px]">
          <div className="flex items-center justify-between text-sm font-semibold tablet:text-lg pc:text-lg">
            {Object.keys(categories).map((item) => (
              <button
                key={item}
                onClick={() => {
                  setDate(categories[item]);
                  handleCategoryChange(item);
                }}
                className={getButtonClass(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          {date.gatheringList.map((data, i) => (
            <MeetingCard key={i} MeetingData={data} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
