import { useState } from 'react';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import Loading from '@/components/detail/loading/Loading';
import MyPageCategoryList from '@/components/mypage/categori/CategoriList';
import { MeetingCard } from '@/components/mypage/meeting-card';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import type { User } from '@/types/mypage';
import { useQuery } from '@tanstack/react-query';

// TODO: 프로필 데이터
const Data: User = {
  id: 'UUID',
  email: 'aaaa@gmail.com',
  name: 'hhihih',
  image: '/images/together-findpage-large.png',
  createdAt: '2020-10-10',
};

export default function MyPage() {
  const [category, setCategory] = useState('');

  const { data, isError } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['mypage', { category }],
    queryFn: () => getMyGathering(),
    staleTime: 1000 * 10,
  });
  const participatedList = data?.participatedGatheringList;

  if (isError) return <Loading />;

  return (
    <div>
      <div className="mt-[60px] h-[155px] select-none bg-blue-800 px-11 py-6 text-md font-semibold text-blue-800 duration-100 tablet:h-[249px] tablet:text-2xl pc:h-[302px] pc:text-2xl pc:text-white">
        마이페이지
      </div>
      <RootLayout>
        <div className="m-auto flex flex-col gap-8 px-4 duration-100 tablet:gap-10 pc:gap-14">
          <ProfileCard userData={Data} />
          <div className="flex flex-col">
            <MyPageCategoryList category={category} setCategory={setCategory} />
            <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
              {participatedList?.content.map((list, i) => <MeetingCard key={i} MeetingData={list} />)}
            </div>
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
