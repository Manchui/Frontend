import { useState } from 'react';
import { CardComponents } from '@/components/mypage/card-style';
import MyPageCategoryList from '@/components/mypage/categori/CategoriList';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import type { User } from '@/types/mypage';

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
            <CardComponents category={category} />
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
