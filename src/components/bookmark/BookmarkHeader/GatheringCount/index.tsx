import { memo } from 'react';
import * as m from 'framer-motion/m';
import type { GetGatheringResponse } from '@manchui-api';

function GatheringCount({ data }: { data?: GetGatheringResponse['data'] }) {
  return (
    <m.div
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="flex items-center gap-1 text-pretty px-4"
    >
      <h1 className="text-bookmark-title font-bold">찜한 모임</h1>
      <span className="rounded-xl bg-red-400 px-2 text-sm font-bold text-white">{data?.gatheringCount}</span>
    </m.div>
  );
}

export default memo(GatheringCount);
