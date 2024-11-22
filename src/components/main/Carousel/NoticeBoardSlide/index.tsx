import { Gugi } from 'next/font/google';
import useInternalRouter from '@/hooks/useInternalRouter';

const gugi = Gugi({ weight: '400', subsets: ['latin'] });

export default function NoticeBoardSlide() {
  const router = useInternalRouter();

  return (
    <div className="flex h-[400px] flex-col items-center justify-center bg-blue-800 text-white mobile:h-[500px] tablet:h-[600px]">
      <h1 className="text-center text-landing-title text-[#3FD9F9] font-bold drop-shadow-lg">🫧 공지사항 🫧</h1>
      <p className="mt-10 text-center text-16-20-response tracking-wide text-gray-300">
        <span className={`font-bold text-[#3FD9F9] ${gugi.className}`}>New!</span> 만취에서 새로운 카테고리 추가! <br />
        <span className={`font-semibold text-white ${gugi.className}`}>&apos;여행&apos;</span>을 즐겨보세요.
      </p>
      <ul className="mb-10 mt-6 space-y-2 text-center text-13-16-response text-gray-400">
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
      <button
        type="button"
        onClick={() => router.push('/noticeboard')}
        className="inline-block rounded-lg bg-white px-5 py-2 text-13-16-response font-bold text-black shadow-md"
      >
        공지사항 보기
      </button>
    </div>
  );
}
