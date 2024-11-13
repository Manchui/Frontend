import { useCallback, useMemo, useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import { useRouter } from 'next/router';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import CloseDateToggle from '@/components/main/FilterSection/CloseDateToggle';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';
import { Toast } from '@/components/shared/Toast';
import { IS_SERVER } from '@/constants/server';

export default function FilterSection() {
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
    <m.div
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateY(10px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 1s ease-in-out',
      }}
      className="scrollbar-hide relative mb-8 mt-4 flex w-full select-none flex-col gap-2 bg-white px-4 py-5 mobile:rounded-lg"
    >
      {/* 카테고리 */}
      <CategoryList />

      {/* 필터 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CloseDateToggle />
          <RegionDropdown />
          <DateDropdown />
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
    </m.div>
  );
}
