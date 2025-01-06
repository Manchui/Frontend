import { ProgressBar } from '@/components/shared/progress-bar';
import { Toast } from '@/components/shared/Toast';
import { useScore, useSetScore } from '@/store/useFilterStore';
import type { GetReviewResponse } from '@manchui-api';

export default function ReviewRating({ data, scoreReviewCount }: { data?: GetReviewResponse['data']; scoreReviewCount: number | undefined }) {
  const score = useScore();
  const setScore = useSetScore();

  const handleScoreToggle = (reversedIndex: number) => {
    setScore(reversedIndex);
    Toast('success', `${reversedIndex}점 필터가 적용되었습니다.`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-blue-100 py-6 pt-4 tablet:flex-row tablet:gap-[140px] pc:flex-row">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-13-16-response font-medium text-gray-400">총 리뷰수</h1>
        <div className="flex items-baseline justify-end">
          <span className="text-24-40-response font-bold">{scoreReviewCount || 0}</span>
          <span className="ml-1 text-16-20-response font-bold">개</span>
        </div>
      </div>
      <div>
        <section className="my-6 flex flex-col-reverse items-center justify-center gap-6 pc:mb-16 pc:mt-10 pc:flex-row pc:gap-[42px]">
          <div className="flex flex-col justify-center gap-6 pc:gap-8">
            <div className="flex flex-col items-center gap-4">
              {' '}
              <div>
                {Object.entries(data?.scoreList || {})
                  .slice(1)
                  .map(([key, value], index, array) => {
                    const reversedIndex = array.length - index;
                    const scoreValue = value || 0;

                    return (
                      <div
                        key={key}
                        className="group mb-1 flex w-full cursor-pointer items-center justify-between gap-4 transition-all duration-200"
                        onClick={() => handleScoreToggle(reversedIndex)}
                      >
                        <p
                          className={`text-md font-medium text-gray-800 ${score === reversedIndex ? 'font-bold text-yellow-500' : ''} group-hover:font-light group-hover:text-yellow-500`}
                        >
                          {reversedIndex}점
                        </p>
                        <div
                          className={`w-[200px] transition-all duration-200 group-hover:scale-105 group-hover:brightness-95 ${score === reversedIndex ? 'scale-105 brightness-90' : ''}`}
                        >
                          <ProgressBar maxValue={data?.reviewCount || 1} value={scoreValue} design="primary" />
                        </div>
                        <p
                          className={`text-md font-medium text-gray-800 ${score === reversedIndex ? 'font-bold text-yellow-500' : ''} group-hover:font-light group-hover:text-yellow-500`}
                        >
                          {scoreValue}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
