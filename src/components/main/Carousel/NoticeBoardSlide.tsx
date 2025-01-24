import useInternalRouter from '@/hooks/useInternalRouter';

export default function NoticeBoardSlide() {
  const router = useInternalRouter();

  return (
    <div className="flex h-[300px] flex-col items-center justify-center text-white">
      <h1 className="text-center text-2xl font-bold text-backend">🫧 공지사항 🫧</h1>
      <p className="mt-5 text-center text-base tracking-wide text-gray-300">
        <span className="font-bold text-backend">New!</span> 만취에서 새로운 카테고리 추가! <br />
        <span className="font-semibold text-white">&apos;여행&apos;</span>을 즐겨보세요.
      </p>
      <ul className="my-6 space-y-2 text-center text-sm text-gray-400">
        <li>
          🌍 <span className="font-bold text-white">테마 여행 모임</span>으로 특별한 추억 만들기
        </li>
        <li>
          📸 사진부터 캠핑까지 다양한 <span className="font-bold text-primary-300">여행 스타일</span> 모임
        </li>
        <li>
          🤝 혼자가 아닌 함께 떠나는 <span className="font-bold text-green-300">소그룹 여행</span>!
        </li>
      </ul>
      <button type="button" onClick={() => router.push('/noticeboard')} className="inline-block rounded-lg bg-white px-5 py-2 text-xs font-bold text-black">
        공지사항 보기
      </button>
    </div>
  );
}
