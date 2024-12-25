import { useState } from 'react';
import { CardComponents } from '@/components/mypage/card-style';
import MyPageCategoryList from '@/components/mypage/category/CategoryList';
import { ProfileCard } from '@/components/mypage/profile-card';
import RootLayout from '@/components/shared/RootLayout';
import { SEO } from '@/components/shared/SEO';

interface MainPageProps {
  seo: {
    title: string;
  };
}

export default function MyPage({ seo }: MainPageProps) {
  const [category, setCategory] = useState('');

  return (
    <>
      <SEO title={seo.title} />
      <h1 className="mt-[60px] h-bookmark-banner min-h-[155px] select-none items-center justify-center bg-blue-800 px-11 py-6 text-16-20-response font-semibold text-blue-800 pc:text-white">
        마이페이지
      </h1>
      <RootLayout>
        <ProfileCard />
        <MyPageCategoryList category={category} setCategory={setCategory} />
        <CardComponents category={category} />
      </RootLayout>
    </>
  );
}

export const getServerSideProps = () => ({
  props: {
    seo: {
      title: '마이 페이지',
    },
  },
});
