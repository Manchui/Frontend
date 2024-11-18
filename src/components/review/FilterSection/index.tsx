import { useRef } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import CategoryList from '@/components/main/FilterSection/CategoryList';
import DateDropdown from '@/components/main/FilterSection/DateDropdown';
import RegionDropdown from '@/components/main/FilterSection/RegionDropdown';

import SortToggle from './SortToggle';

export default function FilterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

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
          <RegionDropdown />
          <DateDropdown />
        </div>

        {/* 모임 만들기 버튼 */}
        <SortToggle />
      </div>
    </m.div>
  );
}
