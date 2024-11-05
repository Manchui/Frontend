import Image from 'next/image';
import { useRouter } from 'next/router';
import getGatheringData from '@/apis/detail/get-gathering-data';
import { FloatingBar } from '@/components/detail/FloatingBar';
import { GatheringCard } from '@/components/detail/GatheringCard';
import Loading from '@/components/detail/loading/Loading';
import { ReviewListCard } from '@/components/detail/ReviewListCard';
import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';
import { useQuery } from '@tanstack/react-query';

export default function DetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery({
    // NOTE: page,size는 임시값
    queryKey: ['detail', { id, page: 1, size: 10 }],
    queryFn: () => {
      if (typeof id === 'string') {
        return getGatheringData(id);
      }
      return null;
    },
    staleTime: 1000 * 10,
  });
  const gatherings = data;

  if (isLoading) return <Loading />;
  if (!gatherings) return <Loading />;

  // TODO: 스코어를 백엔드에서 계산해서 따로 api를 만들면 좋을 듯
  // TODO: 스코어 계산은 추후에 더 좋은 방법 찾아서 변경
  const SCORE = (
    <div className="mb-1 flex items-center justify-center gap-4">
      <p className="text-sm font-medium text-gray-800">5점</p>
      <div className="w-[200px]">
        <ProgressBar maxValue={5} value={2.8} design="primary" />
      </div>
    </div>
  );

  return (
    <main className="pb-[96px] pt-[60px]">
      <GatheringCard gatherings={gatherings} />

      <div className="mx-auto w-full max-w-[1200px]">
        <section className="mt-6 px-4 tablet:mt-9 tablet:px-10 pc:mt-10 pc:px-5">
          <h1 className="text-xl font-bold">모임설명</h1>
          <p className="my-2">{gatherings.content}</p>
          <hr className="border-gray-50" />
        </section>

        <section className="my-6 flex flex-col-reverse items-center justify-center gap-6 pc:mb-16 pc:mt-10 pc:flex-row pc:gap-[42px]">
          <div className="flex flex-col justify-center gap-6 pc:gap-8">
            <h2 className="text-lg font-bold tablet:text-xl pc:text-xl">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
            <div className="flex flex-col gap-4 tablet:flex-row tablet:gap-[60px] pc:flex-row pc:gap-[60px]">
              <div className="flex flex-col items-center gap-4 tablet:flex-row pc:flex-row">
                <h1 className="text-5xl font-bold">2.8</h1>
                <Rating score={2.8} />
              </div>
              <div>
                {SCORE}
                {SCORE}
                {SCORE}
                {SCORE}
                {SCORE}
              </div>
            </div>
          </div>
          <div className="relative h-[193px] w-[343px] duration-100 tablet:h-[414px] tablet:w-[737px] pc:h-[356px] pc:w-[619px]">
            <Image alt="지도 이미지" src="/images/img-detail-page.png" fill style={{ objectFit: 'cover' }} className="rounded-2xl" />
          </div>
        </section>

        <section className="mt-6 min-h-20 px-4 tablet:mt-9 tablet:px-10 pc:mt-10 pc:px-5">
          {gatherings.reviewsList && <ReviewListCard reviews={gatherings.reviewsList} />}
          <div className="mx-auto pb-6 pt-2 text-center text-[#6B7280]">아직 리뷰가 없어요.</div>
        </section>
      </div>
      <FloatingBar id={id} gatherings={gatherings} usersList={gatherings.usersList} maxUsers={gatherings.maxUsers} />
    </main>
  );
}
