import Image from 'next/image';
import { Toast } from '@/components/shared/Toast';
import { useScore, useSetScore } from '@/store/useFilterStore';

export default function ScoreFilter() {
  const score = useScore();
  const setScore = useSetScore();

  const handleScoreRemove = () => {
    setScore(0);
    Toast('info', '별점 필터가 초기화되었습니다.');
  };
  return (
    <div>
      {score ? (
        <div className="relative flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-blue-800 p-3 text-13-16-response font-semibold text-white ease-out">
          <span className="leading-none">{score}점</span>
          <button type="button" onClick={handleScoreRemove} className="flex size-3 items-center justify-center">
            <Image src="icons/x-white.svg" alt="x" width={12} height={12} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
