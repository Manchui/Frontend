import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';
import type { ReviewsList } from '@/types/detail';

export default function Score({ reviewsList }: { reviewsList: ReviewsList }) {
  const SCORE = (
    <section className="select-none font-medium">
      {Object.entries(reviewsList.scoreList)
        .slice(1)
        .map(([key, value], index, array) => {
          const reversedIndex = array.length - index;
          return (
            <div key={key} className="mb-1 flex items-center justify-center gap-4">
              <span className="text-md font-medium text-gray-800">{reversedIndex}점</span>
              <div className="max-w-52 flex-1 tablet:max-w-80 pc:max-w-80">
                <ProgressBar maxValue={reviewsList.reviewCount} value={value} design="primary" />
              </div>
            </div>
          );
        })}
    </section>
  );

  return (
    <article className="px-4 tablet:px-10 pc:px-5">
      <hr className="my-6 border-blue-100" />
      <h2 className="mb-6 text-center text-lg font-bold tablet:text-xl pc:mb-8 pc:text-xl">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
      <div className="mb-4 flex flex-col items-center justify-center gap-4 tablet:mb-6 tablet:flex-row pc:mb-6 pc:flex-row">
        <h3 className="text-5xl font-bold">{reviewsList.scoreList.avgScore}</h3>
        <Rating score={reviewsList.scoreList.avgScore} />
      </div>
      {SCORE}
    </article>
  );
}
