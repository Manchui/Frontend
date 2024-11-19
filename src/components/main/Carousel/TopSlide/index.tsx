import Image from 'next/image';
import DoubleArrow from 'public/icons/DoubleArrow';
import useInternalRouter from '@/hooks/useInternalRouter';

export default function TopSlide() {
  const router = useInternalRouter();

  return (
    <div onClick={() => router.push('/main')} className="cursor-pointer bg-[#000000]">
      <div className="mx-auto flex h-[400px] max-w-[1200px] items-center justify-around text-white mobile:h-[500px] tablet:h-[600px]">
        <div className="flex flex-col space-y-2">
          <span className="w-fit rounded-md bg-primary-400 px-2 py-1 font-bold text-blue-800">실시간 업데이트!</span>
          <h1 className="text-18-32-response font-bold">무슨 모임에 가입해야할지 모르겠다면?</h1>
          <div className="flex items-center gap-2 text-18-32-response font-bold">
            <span>실시간</span>
            <span className="text-primary-400">TOP 10</span>
            <span>모임 보러가기</span>
            <DoubleArrow direction="right" color="#f7c312" />
          </div>
        </div>
        <div className="relative h-full w-[700px]">
          <Image src="/images/top.webp" alt="TOP 모임" fill className="" />
        </div>
      </div>
    </div>
  );
}
