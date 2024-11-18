import * as m from 'framer-motion/m';

/* eslint-disable tailwindcss/no-custom-classname */
export default function BookmarkBanner({ isError }: { isError: boolean }) {
  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-[60px] flex h-bookmark-banner min-w-[340px] items-center justify-center bg-blue-800 text-16-20-response font-semibold text-white"
    >
      {isError ? '잠시 후 다시 시도해주세요.' : '마감되기 전에 지금 바로 참여해보세요'}
    </m.div>
  );
}
