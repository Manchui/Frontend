/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import Link from 'next/link';

export default function MainIntro() {
  return (
    <div className="flex-col-center mb-20 gap-6 text-balance text-center text-blue-800">
      <div className="text-24-60-landing-title flex flex-col font-extrabold">
        <span className="text-red-300">취미에 만취하다</span>
        <span>일상에 즐거움을 더하다</span>
      </div>
      <div className="flex flex-col text-16-20-response font-medium text-gray-600">
        <span>
          다양한 취미와 함께, 즐거움에 만취하세요
          <br />
          새로운 사람들과 모여 당신만의 특별한 시간을 만들어 보세요.
        </span>
      </div>
      <Link href="/main" className="rounded-lg bg-primary-400 px-4 py-2 text-base font-bold text-white drop-shadow-md hover:bg-primary-300">
        모임 참여하기
      </Link>
      <div className="relative aspect-[16/9] w-full min-w-[330px] max-w-screen-pc overflow-hidden">
        <Image src="/images/running.png" alt="모임 이미지" fill className="rounded-3xl object-cover drop-shadow-lg" />
      </div>
    </div>
  );
}
