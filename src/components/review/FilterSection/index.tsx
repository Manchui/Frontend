import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';
import { Toast } from '@/components/shared/Toast';
import { IS_SERVER } from '@/constants/server';

interface FilterSectionProps {
  category?: string;
  handleCategoryClick: (category: string) => void;
  handleCloseDateClick: (value: string) => void;
  handleDateSubmit: ({ start, end }: { end: string; start: string }) => void;
  region?: string;
  setDateEnd?: Dispatch<SetStateAction<string | undefined>>;
  setDateStart?: Dispatch<SetStateAction<string | undefined>>;
  setRegion: Dispatch<SetStateAction<string | undefined>>;
}

export default function FilterSection({
  handleCategoryClick,
  category,
  setRegion,
  handleCloseDateClick,
  region,
  handleDateSubmit,
  setDateStart,
  setDateEnd,
}: FilterSectionProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleCreateButtonClick = () => {
    if (isLoggedIn) {
      void router.push('/create');
    } else {
      Toast('warning', '로그인이 필요합니다.');
    }
  };

  useEffect(() => {
    if (!IS_SERVER) {
      setIsLoggedIn(!!localStorage.getItem('accessToken'));
    }
  }, []);

  return (
    <div className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg">
      {/* 카테고리 */}
      <CategoryList category={category} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex select-none items-center justify-between">
        <div className="flex items-center gap-2">
          <CloseDateToggle onCloseDateClick={handleCloseDateClick} />
          <RegionDropdown region={region} setRegion={setRegion} />
          <DateDropdown setDateStart={setDateStart} setDateEnd={setDateEnd} handleDateSubmit={handleDateSubmit} />
        </div>

        {/* 모임 만들기 버튼 */}
        <button
          type="button"
          onClick={handleCreateButtonClick}
          className="rounded-xl bg-blue-800 px-3 py-2 text-13-16-response font-semibold text-white transition-all duration-200 hover:bg-blue-700"
        >
          모임 만들기
        </button>
      </div>
    </div>
  );
}
