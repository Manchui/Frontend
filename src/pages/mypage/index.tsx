import { useState } from 'react';
import { CardComponents } from '@/components/mypage/cardStyle';
import MyPageCategoryList from '@/components/mypage/category/CategoryList';
import { ProfileCard } from '@/components/mypage/ProfileCard';
import RootLayout from '@/components/shared/RootLayout';

export default function MyPage() {
  const [category, setCategory] = useState('');

  return (
    <div>
      <div className="mt-[60px] h-bookmark-banner min-h-[155px] select-none items-center justify-center bg-blue-800 px-11 py-6 text-16-20-response font-semibold text-blue-800 pc:text-white">
        마이페이지
      </div>
      <RootLayout>
        <div className="m-auto flex flex-col gap-8 duration-100 tablet:gap-10 pc:gap-14">
          <ProfileCard />
          <div>
            <MyPageCategoryList category={category} setCategory={setCategory} />
            <div className="flex min-h-screen flex-col bg-white">
              <CardComponents category={category} />
            </div>
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
