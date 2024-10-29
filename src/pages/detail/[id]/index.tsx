import Image from 'next/image';
import { GatheringCard } from '@/components/detail/GatheringCard';
import { ReviewListCard } from '@/components/detail/ReviewListCard';
// import { useRouter } from 'next/router';
import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';
import type { DetailData } from '@/types/detail';

// TODO: 지울 것
const PAGE_DATA: DetailData = {
  category: '개발',
  content:
    '모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 v  v 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 v',
  createdAt: '2024-10-16 14:36:31',
  deletedAt: null,
  dueDate: '2024-10-22 23:59:59',
  gatheringDate: '2024-10-28 19:30:00',
  gatheringId: 2,
  gatheringImage: '/images/test-detail.png',
  groupName: '모각코해요',
  image: 'https://profileImage.jpg',
  isCanceled: false,
  isClosed: false,
  isHearted: false,
  isOpened: false,
  location: '홍대입구',
  name: 'hi',
  updatedAt: '2024-10-16 14:36:31',
  minUsers: 3,
  participantUsers: 6,
  reviewList: [
    {
      comment: '오프라인으로 만나서 모각코 하니까 더 집중이 잘돼요',
      createdAt: '2024-01-30 14:36:31',
      profileImagePath: '/images/test-detail.png',
      score: 5,
      userNick: '김개발',
      userId: 'fc32e8b4-8de5-4d79-a154-4cb29fa48abf',
    },
    {
      comment: '각자 개발에 집중해서 좋았고 질문도 잘 받아주셨어요',
      createdAt: '2024-10-12 14:36:31',
      profileImagePath: '/images/test-detail.png',
      score: 4,
      userNick: '김디자인',
      userId: 'b0f0b618-ce1a-4c52-9693-340edadff154',
    },
  ],
  usersList: [
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'abcd-1234',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userId: 'bcde-2345',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'cdef-3456',
    },
  ],
  maxUsers: 10,
};

export default function DetailPage() {
  // TODO: 스코어를 백엔드에서 계산해서 따로 api를 만들면 좋을 듯
  // TODO: 스코어 계산은 추후에 더 좋은 방법 찾아서 변경
  const SCORE = (
    <div className="mb-1 flex items-center gap-4">
      <p className="text-sm font-medium text-gray-800">5점</p>
      <div className="w-[200px]">
        <ProgressBar maxValue={5} value={2.8} design="primary" />
      </div>
    </div>
  );
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <div className="mt-[60px]">
      <GatheringCard PAGE_DATA={PAGE_DATA} />

      <div className="mx-auto min-h-screen w-full max-w-[1200px]">
        <div className="mt-6 px-4 tablet:mt-9 tablet:px-10 pc:mt-10 pc:px-5">
          <h1 className="text-xl font-bold">모임설명</h1>
          <p className="my-2">{PAGE_DATA.content}</p>
          <hr />
        </div>

        <div className="my-6 flex flex-col-reverse items-center justify-center gap-6 pc:mb-16 pc:mt-10 pc:flex-row pc:gap-[42px]">
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
        </div>

        <div className="mt-6 px-4 tablet:mt-9 tablet:px-10 pc:mt-10 pc:px-5">
          <hr />
          <div className="flex flex-col items-center pt-2">
            {PAGE_DATA.reviewList.map((review, i) => (
              <div key={i} className={`border-b border-dashed py-4 ${i === PAGE_DATA.reviewList.length - 1 ? 'border-b-0' : ''}`}>
                <ReviewListCard review={review} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
