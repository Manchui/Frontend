import { useRouter } from 'next/router';
import MeetingCard from '@/components/mypage/meeting-card/MeetingCard';
import { ProfileCard } from '@/components/mypage/profile-card/ProfileCard';
import RootLayout from '@/components/shared/RootLayout';
import type { Gatherings, User } from '@/types/mypage';

const Data: User = {
  id: 'UUID',
  email: 'aaaa@gmail.com',
  name: 'hhihih',
  image: '/images/together-findpage-default.png',
};

const MeetingData: Gatherings = {
  gatheringCount: 2,
  gatheringList: [
    {
      gatheringId: 2,
      groupName: '모각코해요',
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
    {
      gatheringId: 1,
      groupName: '모각코',
      category: '개발',
      location: '건대입구',
      gatheringImage: '/images/buddah-login.png',
      gatheringDate: '2024-10-22 19:30:00',
      dueDate: '2024-10-21 23:59:59',
      maxUsers: 10,
      participantUsers: 3,
      isOpened: false,
      isCancled: false,
      isClosed: false,
      createdAt: '2024-10-16 14:36:31',
      updatedAt: '2024-10-16 14:36:31',
      deletedAt: null,
      isDeleted: false,
      isHearted: false,
    },
  ],
  pageSize: 10,
  page: 0,
  totalPage: 1,
};

export default function MyPage() {
  const router = useRouter();
  const { category } = router.query;

  const handleCategoryChange = (categoryId: string) => {
    setTimeout(() => {
      void router.push(`/mypage?category=${categoryId}`, undefined, { shallow: true });
    }, 0);
  };

  const getButtonClass = (categoryId: string) => (categoryId === category ? 'bg-red-500 text-white font-bold' : 'hover:text-gray-500');

  return (
    <RootLayout>
      <div className="flex flex-col justify-center gap-4 px-4 tablet:px-6 pc:px-[102px]">
        <div className="m-auto min-w-[343px] duration-100 tablet:min-w-[696px] pc:min-w-[996px]">
          <h1 className="text-lg font-semibold tablet:text-2xl pc:text-2xl">마이 페이지</h1>
          <ProfileCard userData={Data} />
        </div>
        <div className="m-auto flex min-w-[343px] flex-col gap-6 duration-100 tablet:min-w-[696px] pc:min-w-[996px]">
          <div className="flex gap-3">
            <button onClick={() => handleCategoryChange('나의 모임')} className={getButtonClass('나의 모임')} type="button">
              나의 모임
            </button>
            <button onClick={() => handleCategoryChange('나의 리뷰')} className={getButtonClass('나의 리뷰')} type="button">
              나의 리뷰
            </button>
            <button onClick={() => handleCategoryChange('만든 모임')} className={getButtonClass('만든 모임')} type="button">
              내가 만든 모임
            </button>
          </div>
          {MeetingData.gatheringList.map((data, i) => (
            <MeetingCard key={i} MeetingData={data} />
          ))}
        </div>
      </div>
    </RootLayout>
  );
}
