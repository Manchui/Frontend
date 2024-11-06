import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CardComponents } from '@/components/mypage/card-style';
import MyPageCategoryList from '@/components/mypage/category/CategoryList';
import ReviewCategory from '@/components/mypage/category/ReviewCategory';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import { Toast } from '@/components/shared/Toast';
import { userStore } from '@/store/userStore';

export default function MyPage() {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [review, setReview] = useState('');
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      void router.push('/login');
      Toast('success', '로그인을 해주세요.');
    }
  }, [isLoggedIn, router]);

  return (
    <div>
      <div className="mt-[60px] h-[155px] select-none bg-blue-800 px-11 py-6 text-md font-semibold text-blue-800 duration-100 tablet:h-[249px] tablet:text-2xl pc:h-[302px] pc:text-2xl pc:text-white">
        마이페이지
      </div>
      <RootLayout>
        <div className="m-auto flex flex-col gap-8 px-4 duration-100 tablet:gap-10 pc:gap-14">
          <ProfileCard />
          <div className="flex flex-col">
            <MyPageCategoryList category={category} setCategory={setCategory} />
            {category === '나의 리뷰' && <ReviewCategory category={category} review={review} setReview={setReview} />}
            <CardComponents review={review} category={category} />
          </div>
        </div>
      </RootLayout>
    </div>
  );
}
