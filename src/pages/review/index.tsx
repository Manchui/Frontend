/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import FilterSection from '@/components/review/FilterSection';
import HeaderSection from '@/components/review/HeaderSection';
import { ReviewCard } from '@/components/review/ReviewCard';
import MainContainer from '@/components/review/ReviewContainer';
import Pagination from '@/components/shared/pagination';
import RootLayout from '@/components/shared/RootLayout';

type ReviewType = {
  ImagePath: string;
  comment: string;
  createdAt: string;
  gatheringLocation: string;
  gatheringName: string;
  name: string;
  profileImagePath: string;
  score: number;
  userId: string;
};
const mockData: ReviewType[] = Array.from({ length: 100 }, (_, i) => ({
  comment: `리뷰 내용 ${i + 1} - ${'123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'}`,
  createdAt: '2024-01-25',
  name: `사용자 ${i + 1}`,
  ImagePath: '/images/test-detail.png',
  profileImagePath: '/images/profile.svg',
  score: Math.floor(Math.random() * 5) + 1,
  userId: `${i + 1}`,
  gatheringName: '모르는 개 산책',
  gatheringLocation: '이태원',
}));

export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [data, setData] = useState<ReviewType[]>([]);
  const [page, setPage] = useState(0);
  const [size, ] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchData = (page: number, size: number) => {
    const start = page * size;
    const end = start + size;
    const slicedData = mockData.slice(start, end);

    setData(slicedData);
    setTotalPage(Math.ceil(mockData.length / size));
  };

  useEffect(() => {
    fetchData(page, size);
  }, [page, size]);

  return (
    <div className="mt-[60px]">
      <RootLayout>
        <div className="flex h-[155px] w-full flex-col items-center justify-center gap-[10px] bg-blue-800 text-white">
          <p className="text-2xl font-bold">모든 리뷰</p>
          <span className="text-base font-medium">만취를 이용한 분들은 이렇게 느꼈어요</span>
        </div>
        <MainContainer>
          {/* Header (타이틀, 검색창) */}
          <HeaderSection searchValue={searchValue} setSearchValue={setSearchValue} selectedCategory={selectedCategory} />

          {/* 카테고리 */}
          <FilterSection selectedCategory={selectedCategory} handleCategoryClick={handleCategoryClick} />
          {/* 카드 */}
          <section className="mt-0 flex w-full flex-col items-center gap-6 bg-white px-4 pb-6 pt-1 mobile:rounded-lg tablet:items-start">
            {data.map((item) => (
              <div key={item.userId}>
                <ReviewCard review={item} />
              </div>
            ))}
            <div className="flex self-center">
              <Pagination
                page={page}
                
                totalPage={totalPage}
                setPage={setPage} 
                // 임시
              />
            </div>
          </section>
        </MainContainer>
      </RootLayout>
    </div>
  );
}
