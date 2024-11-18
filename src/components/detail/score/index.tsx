import Image from 'next/image';
import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';
import type { ReviewsList } from '@/types/detail';

export default function Score({ reviewsList }: { reviewsList: ReviewsList }) {
  const SCORE = (
    <div>
      {Object.entries(reviewsList.scoreList)
        .slice(1)
        .map(([key, value], index, array) => {
          const reversedIndex = array.length - index;
          return (
            <div key={key} className="mb-1 flex items-center justify-center gap-4">
              <p className="text-md font-medium text-gray-800">{reversedIndex}점</p>
              <div className="w-[200px]">
                <ProgressBar maxValue={reviewsList.reviewCount} value={value} design="primary" />
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <section className="my-6 flex flex-col-reverse items-center justify-center gap-6 pc:mb-16 pc:mt-10 pc:flex-row pc:gap-[42px]">
      <div className="flex flex-col justify-center gap-6 pc:gap-8">
        <h2 className="text-lg font-bold tablet:text-xl pc:text-xl">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-4 tablet:flex-row pc:flex-row">
            <h1 className="text-5xl font-bold">{reviewsList.scoreList.avgScore}</h1>
            <Rating score={reviewsList.scoreList.avgScore} />
          </div>
          {SCORE}
        </div>
      </div>
      <div className="relative h-[193px] w-[343px] duration-100 tablet:h-[414px] tablet:w-[737px] pc:h-[356px] pc:w-[619px]">
        <Image alt="지도 이미지" src="/images/img-detail-page.png" fill style={{ objectFit: 'cover' }} className="rounded-2xl" />
      </div>
    </section>
  );
}
