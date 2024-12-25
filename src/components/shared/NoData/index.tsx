/* eslint-disable tailwindcss/no-custom-classname */
import { memo } from 'react';
import dynamic from 'next/dynamic';
import { MessageWithLink } from '@/components/main/CardSection';
import { useSetCategory } from '@/store/useFilterStore';

import Empty from 'public/lottie/empty.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

function NoData({ use = 'main' }: { use: 'main' | 'bookmark' }) {
  const setCategory = useSetCategory();

  return (
    <div className="absolute left-1/2 w-full -translate-x-1/2">
      <Lottie animationData={Empty} className={`"fill-background" ${use === 'main' ? 'fill-background' : 'fill-white'}`} />
      <MessageWithLink
        onClick={() => setCategory('')}
        message={`${use === 'main' ? '아직 등록된 모임이 없습니다.' : '아직 찜한 모임이 없습니다.'}`}
        buttonText="모임 둘러보기"
      />
    </div>
  );
}

export default memo(NoData);
