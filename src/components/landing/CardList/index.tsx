/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';
import Link from 'next/link';

export function CardList() {
  return (
    <div className="text-balance bg-blue-800 px-5 text-white">
      <div className="mx-auto flex max-w-screen-pc flex-col tablet:flex-row">
        <div className="flex-col-center text-24-40-response gap-5 pt-10">
          <span className="font-semibold text-primary-400">만취 모임 LIST</span>
          <span className="text-16-26-response text-center font-bold">
            지금 가장 인기있는 모임
            <br />
            <span className="text-red-300">TOP LIST</span>
          </span>
          <span className="text-center text-16-20-response font-medium text-white">
            다양한 취미와 관심사를 가진 사람들이 함께하는 인기 모임들을 만나고,
            <br /> 당신만의 특별한 경험을 만들어보세요.
          </span>
          <Link href="/main" className="rounded-lg bg-primary-400 px-4 py-2 text-base font-bold text-white hover:bg-primary-300">
            모임 참여하기
          </Link>
        </div>
        <div className="mx-auto grid w-fit select-none grid-rows-3 gap-6 p-10 mobile:gap-0 tablet:grid-rows-4">
          <Image src="/images/card.png" alt="카드 이미지" width={350} height={350} className="object-cover mobile:hidden" />
          <Image src="/images/card.png" alt="카드 이미지" width={350} height={350} className="object-cover mobile:hidden" />
          <Image src="/images/card.png" alt="카드 이미지" width={350} height={350} className="object-cover mobile:hidden" />
          <Image src="/images/long-card.png" alt="카드 이미지" width={660} height={150} className="hidden object-cover mobile:block" />
          <Image src="/images/long-card.png" alt="카드 이미지" width={660} height={150} className="hidden object-cover mobile:block" />
          <Image src="/images/long-card.png" alt="카드 이미지" width={660} height={150} className="hidden object-cover mobile:block" />
          <Image src="/images/long-card.png" alt="카드 이미지" width={660} height={150} className="hidden object-cover tablet:block" />
        </div>
      </div>
    </div>
  );
}
