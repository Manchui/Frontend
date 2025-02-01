import { useCallback } from 'react';
import CategoryList from '@/components/main/HeaderSection/FilterList/CategoryList';
import CloseDateToggle from '@/components/main/HeaderSection/FilterList/CloseDateToggle';
import DateDropdown from '@/components/main/HeaderSection/FilterList/DateDropdown';
import RegionDropdown from '@/components/main/HeaderSection/FilterList/RegionDropdown';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import { userStore } from '@/store/userStore';

export default function FilterList() {
  const router = useInternalRouter();
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const handleCreateButtonClick = useCallback(() => {
    if (isLoggedIn) {
      void router.push('/create');
    } else {
      Toast('error', '로그인이 필요합니다.');
    }
  }, [isLoggedIn, router]);

  return (
    <div className="relative my-6 flex w-full items-center text-nowrap text-[14px]">
      <div className="flex items-center gap-2 overflow-x-auto leading-[100%] after:absolute after:right-0 after:top-0 after:h-full after:w-32 after:bg-gradient-to-l after:from-white after:via-white after:to-transparent">
        <div className="scrollbar-hide flex h-9 items-center gap-2 overflow-x-auto">
          {/* 필터 버튼들 */}
          <div className="flex shrink-0 items-center gap-2">
            <CloseDateToggle />
            <RegionDropdown />
            <DateDropdown />
          </div>

          {/* 구분선 */}
          <span className="h-9 w-px shrink-0 bg-gray-100" />

          {/* 카테고리 버튼들 */}
          <CategoryList />
        </div>
      </div>
      <button
        type="button"
        onClick={handleCreateButtonClick}
        className="absolute right-0 h-9 rounded-lg bg-blue-800 px-3 font-semibold text-white duration-300 hover:bg-blue-700"
      >
        모임 만들기
      </button>
    </div>
  );
}
