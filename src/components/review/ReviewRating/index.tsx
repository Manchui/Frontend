import type { GetReviewResponse } from '@manchui-api';

import ReviewScore from '../ReviewScore';

type ReviewCardListProps = {
  data?: GetReviewResponse['data'];
};

export default function ReviewRating({ data }: ReviewCardListProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-blue-100 py-6 pt-4 tablet:flex-row tablet:gap-[140px] pc:flex-row">
      <div className="flex flex-col items-center gap-1">
        <h1 className="text-13-16-response font-medium text-gray-400">총 리뷰수</h1>
        <div className="flex items-baseline">
          <span className="align-baseline text-24-40-response font-bold">{data?.reviewCount}</span>
          <span className="align-baseline text-16-20-response font-bold">개</span>
        </div>
      </div>
      <div>
        <ReviewScore datas={data} />
      </div>
    </div>
  );
} 