import Image from 'next/image';
// import { useRouter } from 'next/router';
import DateChip from '@/components/shared/chip/DateChip';
import RootLayout from '@/components/shared/RootLayout';
// 지울 것
const PAGE_DATA = {
  category: '개발',
  content: '모임 상세 설명',
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
      userId: 'fc32e8b4-8de5-4d79-a154-4cb29fa48abf',
    },
    {
      comment: '각자 개발에 집중해서 좋았고 질문도 잘 받아주셨어요',
      createdAt: '2024-10-12 14:36:31',
      profileImagePath: 'https://image.jpg',
      score: 5,
      userId: 'b0f0b618-ce1a-4c52-9693-340edadff154',
    },
  ],
  usersList: [
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'abcd-1234',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'bcde-2345',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/test-detail.png',
      userId: 'cdef-3456',
    },
    {
      profileImagePath: '/images/test-detail.png',
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
  // const router = useRouter();
  // const { id } = router.query;
  const gatheringDate = new Date(PAGE_DATA.gatheringDate);
  return (
    <RootLayout>
      <div>
        <div className="flex items-center justify-center px-8 mobile:flex-col tablet:flex-row pc:flex-row">
          <div className="relative m-4 h-48 min-w-80 rounded-2xl border bg-black">
            <Image alt="test" src="/images/test-detail.png" layout="fill" objectFit="cover" className="rounded-2xl" />
          </div>
          <div className="m-4 h-48 min-w-80 rounded-2xl border-2 p-4">
            <div>
              <h1 className="text-lg font-bold">{PAGE_DATA.groupName}</h1>
              <p>{PAGE_DATA.location}</p>
              <DateChip dateTime={gatheringDate} />
            </div>
            <hr className="my-2 border-dashed" />
            <div className="flex flex-row justify-between">
              <p className="font-bold">모집 정원 {PAGE_DATA.participantUsers}명</p>
              <div className="relative flex">
                {PAGE_DATA.usersList.slice(0, 5).map((user, index) =>
                  index < 4 ? (
                    <div key={index} className="relative size-8 rounded-full border-2 border-white" style={{ marginLeft: `-${15}px` }}>
                      <Image alt="test" src={user.profileImagePath} layout="fill" objectFit="cover" className="rounded-full" />
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="relative flex size-8 items-center justify-center rounded-full border-2 border-white bg-gray-300 text-white"
                      style={{ marginLeft: `-${15}px` }}
                    >
                      +{PAGE_DATA.usersList.length - 4}
                    </div>
                  ),
                )}
              </div>
              <p>개설 확정</p>
            </div>
            
            <div className="flex flex-row justify-between text-sm">
              <p >최소 인원 {PAGE_DATA.minUsers}명</p>
              <p>최대 인원 {PAGE_DATA.maxUsers}명</p>
            </div>
          </div>
        </div>
        <div className="px-8">
          <h1 className="text-xl font-bold">모임설명</h1>
          <p />
          <hr />
          <h2>이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
        </div>
      </div>
    </RootLayout>
  );
}