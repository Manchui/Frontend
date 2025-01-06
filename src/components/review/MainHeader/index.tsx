import * as m from 'framer-motion/m';

export default function MainHeader({ isError }: { isError: boolean }) {
  return (
    <m.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-[60px] flex h-bookmark-banner min-w-[340px] items-center justify-center bg-blue-800 text-16-20-response font-semibold text-white"
    >
      {isError ? (
        '잠시 후 다시 시도해주세요.'
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p className="text-16-26-response font-bold">모든 리뷰</p>
          <span className="text-13-16-response font-medium">만취를 이용한 분들은 이렇게 느꼈어요</span>
        </div>
      )}
    </m.div>
  );
}
