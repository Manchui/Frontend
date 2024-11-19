import { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/shared/progress-bar';
import useGetReviewData from '@/hooks/useGetReviewData';
import { useScore, useSetScore } from '@/store/useFilterStore';
import type { GetReviewResponse } from '@manchui-api';

type ReviewCardListProps = {
  datas?: GetReviewResponse['data'];
};

export default function ReviewScore({ datas }: ReviewCardListProps) {
  const score = useScore(); // 현재 선택된 점수
  const setScore = useSetScore(); // 점수 설정 함수
  const { data, isLoading, error } = useGetReviewData({
    page: 1,
    size: 10,
    score, // 현재 선택된 score로 필터링
  });

  const [scoreList, setScoreList] = useState<GetReviewResponse['data']['scoreList'] | null>(null); // scoreList 데이터를 상태로 저장

  // scoreList를 가져오는 API 호출 (프로그레스바용)
  useEffect(() => {
    if (datas) {
      setScoreList(datas.scoreList); // datas에서 scoreList를 받아옴
    }
  }, [datas]);

  const handleScoreToggle = (reversedIndex: number) => {
    setScore(reversedIndex); // 점수 토글
  };

  const SCORE = (
    <div>
      {/* 데이터가 있는 경우 1~5점의 모든 리뷰를 표시 */}
      {scoreList &&
        Object.entries(scoreList)
          .slice(1)
          .map(([key, value], index, array) => {
            const reversedIndex = array.length - index;
            const reviewCount = datas?.reviewCount || 1;
            const scoreValue = value || 0;

            return (
              <div
                key={key}
                className="group mb-1 flex w-full cursor-pointer items-center justify-between gap-4"
                onClick={() => handleScoreToggle(reversedIndex)}
              >
                <p
                  className={`text-right text-md font-medium text-gray-800 ${score === reversedIndex ? 'font-bold text-yellow-600' : ''} group-hover:text-yellow-600`}
                >
                  {reversedIndex}점
                </p>
                <div className={`w-[200px] transition-all duration-200 hover:brightness-95 ${score === reversedIndex ? 'brightness-90' : ''}`}>
                  {/* 프로그레스바에 1~5점 모든 값이 표시되도록 */}
                  <ProgressBar maxValue={reviewCount} value={scoreValue} design="primary" />
                </div>
                <p className={`text-md font-medium text-gray-800 ${score === reversedIndex ? 'font-bold text-yellow-500' : ''} group-hover:text-blue-700`}>
                  {scoreValue}
                </p>
              </div>
            );
          })}
    </div>
  );

  return (
    <section className="my-6 flex flex-col-reverse items-center justify-center gap-6 pc:mb-16 pc:mt-10 pc:flex-row pc:gap-[42px]">
      <div className="flex flex-col justify-center gap-6 pc:gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 tablet:flex-row pc:flex-row" />
          {SCORE}
        </div>
      </div>
    </section>
  );
}
