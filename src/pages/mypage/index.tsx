import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CardComponents } from '@/components/mypage/card-style';
import MyPageCategoryList from '@/components/mypage/category/CategoryList';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';

export default function MyPage() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      void router.push('/login');
      Toast('success', '로그인을 해주세요.');
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <div className="mt-[60px] h-bookmark-banner min-h-[155px] select-none items-center justify-center bg-blue-800 px-11 py-6 text-16-20-response font-semibold text-blue-800 pc:text-white">
        마이페이지
      </div>
      <RootLayout>
        <div className="m-auto flex flex-col gap-8 px-4 duration-100 tablet:gap-10 pc:gap-14">
          <ProfileCard />
          <div className="flex flex-col">
            <MyPageCategoryList category={category} setCategory={setCategory} />
            <CardComponents category={category} />
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
