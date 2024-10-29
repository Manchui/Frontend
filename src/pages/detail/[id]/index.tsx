import Image from 'next/image';
import { GatheringCard } from '@/components/detail/GatheringCard';
// import { useRouter } from 'next/router';
import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';
import RootLayout from '@/components/shared/RootLayout';
import type { DetailData } from '@/types/detail';

// 지울 것
const PAGE_DATA: DetailData = {
  category: '개발',
  content:
    '모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 v  v 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 모임 상세 설명 v',
  createdAt: '2024-10-16 14:36:31',
  deletedAt: null,
  dueDate: '2024-10-22 23:59:59',
  gatheringDate: '2024-10-28 19:30:00',
  gatheringId: 2,
  gatheringImage: 'https://image.jpg',
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
  participantUsers: 3,
  reviewList: [
    {
      comment: '오프라인으로 만나서 모각코 하니까 더 집중이 잘돼요',
      createdAt: '2024-10-14 14:36:31',
      profileImagePath: 'https://image.jpg',
      score: 5,
      userNick: '김개발',
      userId: 'fc32e8b4-8de5-4d79-a154-4cb29fa48abf',
    },
    {
      comment: '각자 개발에 집중해서 좋았고 질문도 잘 받아주셨어요',
      createdAt: '2024-10-12 14:36:31',
      profileImagePath: 'https://image.jpg',
      score: 5,
      userNick: '김디자인',
      userId: 'b0f0b618-ce1a-4c52-9693-340edadff154',
    },
  ],
  usersList: [
    {
      profileImagePath: '/images/test-detail.png',
      userNick: '김개발',
      userId: 'abcd-1234',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userNick: '김디자인',
      userId: 'bcde-2345',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userNick: '김디자인',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userNick: '김디자인',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/love-bookmarkpage.png',
      userNick: '김디자인',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userNick: '김디자인',
      userId: 'cdef-3456',
    },
  ],
  maxUsers: 10,
};

export default function DetailPage() {
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <RootLayout>
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center px-8 tablet:flex-row pc:flex-row">
          <div className="relative m-4 h-48 min-w-80 rounded-2xl border">
            <Image alt="모임 이미지" src="/images/test-detail.png" layout="fill" objectFit="cover" className="rounded-2xl" />
          </div>
          <GatheringCard PAGE_DATA={PAGE_DATA} />
        </div>
        <div className="px-8">
          <h1 className="text-xl font-bold">모임설명</h1>
          <p className="my-2">{PAGE_DATA.content}</p>
        </div>

        <hr className="m-8" />
        <div>
          <div>{/* 지도 넣을 곳 */}</div>
          <div className="my-4 flex flex-col items-center text-center">
            <h2 className="">이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
            {/* 스코어를 백엔드에서 계산해서 따로 api를 만들면 좋을 듯 */}
            <h1 className="m-4 text-4xl font-bold">2.8</h1>
            <Rating score={2.8} />
            {/* 스코어 프로그래스바 추후에 더 좋은 방법 찾아서 변경 */}
            <div className="flex flex-row">
              <p>5점: </p>
              <div className="w-[200px]">
                <ProgressBar maxValue={5} value={2.8} design="primary" />
              </div>
            </div>
          </div>
        </div>
        <hr className="m-8" />
        {PAGE_DATA.reviewList.map((review, index) => (
          <div key={index} className="z-10 px-8">
            <div>
              <Rating score={review.score} />
              <p className="text-pretty">{review.comment}</p>
            </div>
            <div className="flex items-center">
              <div className="relative size-6 rounded-full border-2 border-white">
                <Image alt="profile" src="/icons/person-gray.svg" layout="fill" objectFit="cover" className="rounded-full" />
              </div>
              <div className="flex flex-row justify-center px-2">
                {/* 닉네임을 백엔드에서 추가해야 할 듯 */}
                <p>
                  {review.userNick} | {review.createdAt}
                </p>
              </div>
            </div>
            <hr className="my-2 border-dashed" />
          </div>
        ))}
      </div>
    </RootLayout>
  );
}
