/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageWithLink } from '@/components/main/CardSection';
import type { GetReviewResponse } from '@manchui-api';

import { ReviewCard } from '../ReviewCard';

type ReviewCardListProps = {
  data?: GetReviewResponse['data'];
  isError: boolean;
  isLoading: boolean;
  skeletonCount?: number;
};

export default function ReviewCardList({ data, isLoading, isError, skeletonCount }: ReviewCardListProps) {
  return (
    <section className="mt-0 flex w-full flex-col items-center gap-6 bg-white px-4 pb-6 pt-1 mobile:rounded-lg tablet:items-start">
      {data?.reviewContentList.map((reviewContent) => <ReviewCard key={reviewContent.reviewId} review={reviewContent} />)}
      {data?.reviewCount === 0 && (
        <div className="h-[605px]tablet:flex-row w-[280px] flex-col items-center gap-4 bg-white tablet:flex tablet:w-full">
          <p>아직 작성된 리뷰가 없습니다.</p>
        </div>
      )}

      {isError && <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />}
    </section>
  );
}
