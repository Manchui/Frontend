import { type Dispatch, type SetStateAction, useCallback, useMemo } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  location?: string;
  setDateEnd?: Dispatch<SetStateAction<string | undefined>>;
  setDateStart?: Dispatch<SetStateAction<string | undefined>>;
  setLocation: Dispatch<SetStateAction<string | undefined>>;
}

export default function FilterSection({
  handleCategoryClick,
  category,
  setLocation,
  handleCloseDateClick,
  location,
  handleDateSubmit,
  setDateStart,
  setDateEnd,
}: FilterSectionProps) {
  const router = useRouter();

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const isLoggedIn = useMemo(() => !IS_SERVER && !!localStorage.getItem('accessToken'), []);

  const handleCreateButtonClick = useCallback(() => {
    if (isLoggedIn) {
      void router.push('/create');
    } else {
      Toast('warning', '로그인이 필요합니다.');
    }
  }, [isLoggedIn, router]);

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(10px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 1s ease-in-out',
      }}
      className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg"
    >
      {/* 카테고리 */}
      <CategoryList category={category} handleCategoryClick={handleCategoryClick} />

      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloseDateToggle onCloseDateClick={handleCloseDateClick} />
          <RegionDropdown location={location} setLocation={setLocation} />
          <DateDropdown setDateStart={setDateStart} setDateEnd={setDateEnd} handleDateSubmit={handleDateSubmit} />
        </div>

        {/* 모임 만들기 버튼 */}
        <button
          type="button"
          onClick={handleCreateButtonClick}
          className="shrink-0 rounded-xl bg-blue-800 px-3 py-2 text-13-16-response font-semibold text-white transition-all duration-200 hover:bg-blue-700"
        >
          모임 만들기
        </button>
      </div>
    </motion.div>
  );
}
