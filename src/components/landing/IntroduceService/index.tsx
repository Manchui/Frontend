/* eslint-disable tailwindcss/no-custom-classname */
import Image from 'next/image';

export default function IntroduceService() {
  return (
    <div className="flex-col-center mb-20 gap-20 text-balance text-center text-blue-800">
      <div className="flex-col-center text-24-40-response font-bold">
        <span>
          취미로 더 <span className="text-red-300">풍부한 일상</span>을,
        </span>
        <span className="mb-5">만취에서 시작하세요</span>
        <span className="text-16-20-response font-medium text-gray-600">다양한 취미를 활동, 간편한 참여로 취미를 즐기고 사람들과 함께하세요</span>
      </div>
      <div className="flex-col-center gap-10 tablet:flex-row tablet:gap-0">
        <div className="flex-col-center gap-6 tablet:flex-1">
          <div className="w-landing-intro-tablet tablet:w-landing-intro-pc relative h-landing-intro overflow-hidden">
            <Image src="/images/introduce1.png" alt="소개 사진 1" fill className="rounded-3xl border-[3px] border-primary-400 fill-background object-cover" />
          </div>
          <span className="text-16-26-response font-bold text-blue-800">다양한 취미로 활동 제공</span>
          <span className="text-16-20-response font-medium text-gray-400">음악, 스포츠, 요리 등 다양한 취미를 쉽게 찾고 참여할 수 있습니다.</span>
        </div>
        <div className="flex-col-center gap-6 tablet:flex-1">
          <div className="w-landing-intro-tablet tablet:w-landing-intro-pc relative h-landing-intro overflow-hidden">
            <Image src="/images/introduce2.png" alt="소개 사진 1" fill className="rounded-3xl border-[3px] border-primary-400 fill-background object-cover" />
          </div>
          <span className="text-16-26-response font-bold text-blue-800">소셜 네트워크 생성</span>
          <span className="text-16-20-response font-medium text-gray-400">공통된 취미를 가진 사람들과 교류하며 새로운 인연을 맺을 수 있습니다.</span>
        </div>
        <div className="flex-col-center gap-6 tablet:flex-1">
          <div className="w-landing-intro-tablet tablet:w-landing-intro-pc relative h-landing-intro overflow-hidden">
            <Image src="/images/introduce3.png" alt="소개 사진 1" fill className="rounded-3xl border-[3px] border-primary-400 fill-background object-cover" />
          </div>
          <span className="text-16-26-response font-bold text-blue-800">간편한 참여</span>
          <span className="text-16-20-response font-medium text-gray-400">간단한 절차로 모임을 만들거나 참여할 수 있어 누구나 쉽게 즐길 수 있습니다.</span>
        </div>
      </div>
    </div>
  );
}
