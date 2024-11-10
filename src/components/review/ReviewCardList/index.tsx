/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// 스켈레톤 나중에 추가
import Lottie from 'lottie-react';
import { MessageWithLink } from '@/components/main/CardSection';
import type { GetReviewResponse } from '@manchui-api';

import { ReviewCard } from '../ReviewCard';

import Empty from 'public/lottie/empty.json';

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
        <div className="absolute left-1/2 w-full -translate-x-1/2">
          <Lottie animationData={Empty} className="h-empty fill-white" />
          <MessageWithLink link="/main" message="아직 작성된 리뷰가 없습니다." buttonText="모임 둘러보기" />
        </div>
      )}

      {isError && (
        <div className="absolute left-1/2 w-full -translate-x-1/2">
          <MessageWithLink message="에러가 발생하였습니다." buttonText="다시 시도하기" onClick={() => window.location.reload()} />
        </div>
      )}
    </section>
  );
}
