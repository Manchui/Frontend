import { useState } from 'react';
import Lottie from 'lottie-react';
import getMyAttendance from '@/apis/mypage/get-mypage-attendance';
import getMyGathering from '@/apis/mypage/get-mypage-gathring';
import { MessageWithLink } from '@/components/main/CardSection';
import PaginationBtn from '@/components/shared/PaginationBtn';
import useFilterStore from '@/store/useFilterStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { MeetingCard } from './MeetingCard';
import ReviewCategory from '../category/ReviewCategory';
import MyReviewList from '../MyReviewList';

import Empty from 'public/lottie/empty.json';

export function CardComponents({ category }: { category: string }) {
  const queryClient = useQueryClient();
  const [review, setReview] = useState('작성 가능한 리뷰');
  const { page } = useFilterStore();

  const size = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['mypage', category, page],
    queryFn: () => {
      if (category === '나의 모임') {
        setReview('작성 가능한 리뷰');
        return getMyAttendance(page ?? 1, size);
      }
      if (category === '내가 만든 모임') {
        setReview('작성 가능한 리뷰');
        return getMyGathering(page ?? 1, size);
      }
      return null;
    },
    staleTime: 1000 * 10,
  });

  const participatedList = data?.participatedGatheringList?.content;
  const writtenGatheringList = data?.writtenGatheringList?.content;

  const handleRemoveItem = (id: number) => {
    if (!data) return;
    const updatedData = {
      ...data,
      participatedGatheringList: participatedList
        ? { ...data.participatedGatheringList, content: participatedList.filter((item) => item.gatheringId !== id) }
        : data.participatedGatheringList,
      writtenGatheringList: writtenGatheringList
        ? { ...data.writtenGatheringList, content: writtenGatheringList.filter((item) => item.gatheringId !== id) }
        : data.writtenGatheringList,
    };
    queryClient.setQueryData(['mypage', category, page], updatedData);
  };

  const renderEmptyState = (message: string) => (
    <div className="py-20">
      <div className="absolute left-1/2 w-full -translate-x-1/2">
        <Lottie animationData={Empty} className="h-empty fill-white" />
        <MessageWithLink message={message} buttonText="모임 둘러보기" />
      </div>
    </div>
  );

  if (participatedList?.length === 0) {
    return renderEmptyState('아직 신청한 모임이 없어요.');
  }
  if (writtenGatheringList?.length === 0) {
    return renderEmptyState('아직 만든 모임이 없어요.');
  }

  return (
    <>
      {participatedList && <MeetingCard category={category} MeetingData={participatedList} handleRemoveItem={handleRemoveItem} />}
      {category === '나의 리뷰' && (
        <>
          <ReviewCategory category={category} review={review} setReview={setReview} />
          <MyReviewList category={category} review={review} handleRemoveItem={handleRemoveItem} />
        </>
      )}
      {writtenGatheringList && <MeetingCard category={category} MeetingData={writtenGatheringList} handleRemoveItem={handleRemoveItem} />}
      {!isLoading && !isError && participatedList?.length !== 0 && category !== '나의 리뷰' && (
        <PaginationBtn page={data?.page ?? 0} totalPage={data?.totalPage ?? 0} />
      )}
    </>
  );
}
