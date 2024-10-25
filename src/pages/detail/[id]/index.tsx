import Image from 'next/image';
// import { useRouter } from 'next/router';
import DateChip from '@/components/shared/chip/DateChip';
import RootLayout from '@/components/shared/RootLayout';

export default function DetailPage() {
  // const router = useRouter();
  // const { id } = router.query;

  // 지울 것
  const date = new Date();
  return (
    <RootLayout>
      <div>
        <div className="flex flex-row items-center justify-center px-8">
          <div className="relative h-48 m-4 min-w-80 rounded-2xl border bg-black">
            <Image alt="test" src="/images/test-detail.png" layout="fill" objectFit='cover' className='rounded-2xl'/>
            {/* <Image
              src={`https://picsum.photos/id/${id}/200/300`}
              width={200}
              height={300}
            /> */}
          </div>
          <div className="m-4 min-w-80 rounded-2xl border p-4">
            <div>
              <h1 className="text-lg font-bold">달램핏 오피스 스트레칭</h1>
              <p>을지로 3가 서울시 중구 청계천로 100</p>
              <DateChip dateTime={date} />
            </div>
            <hr className="my-2 border-dashed" />
            <div className="flex flex-row justify-between">
              <p>모집 정원 16명</p>
              <div>이미지</div>
              <p>개설 확정</p>
            </div>
            <div className="flex flex-row justify-between">
              <p>최소 인원 5명</p>
              <p>최대 인원 20명</p>
            </div>
          </div>
        </div>
        <div className="px-8">
          <h1 className="text-2xl">모임설명</h1>
          <p>
            모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.모임설명입니다.
          </p>
          <hr />
          <h2>이용자들은 이 프로그램을 이렇게 느꼈어요!</h2>
        </div>
      </div>
    </RootLayout>
  );
}
