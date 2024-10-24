import Image from 'next/image';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';

export default function MeetingCard() {
  return (
    <div className="m-auto mb-6 grid max-w-[311px] gap-4 duration-200 mobile:grid-rows-2 tablet:max-w-[648px] tablet:grid-cols-2 tablet:grid-rows-1 pc:min-w-[948px]">
      <div className="flex-1 tablet:max-w-[280px]">
        <Image
          className="h-[156px] w-[311px] rounded-3xl bg-slate-400"
          src="/images/buddah-login.png"
          alt="모임 사진"
          width={311}
          height={156}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="flex-auto tablet:flex tablet:flex-col tablet:justify-center">
        <div className="flex">
          <State stateProp="planed" />
          <State stateProp="confirmed" />
          <State stateProp="completed" />
          <State stateProp="pending" />
        </div>
        <div className="mb-[18px] mt-3">
          <span>제목입니다요 | 위치</span>
          <br />
          <span className="text-sm font-medium text-[#374151]">요일 · 시간 인원수</span>
        </div>
        <div>
          <Button label="예약 취소하기" size="primary" variant="white" />
        </div>
      </div>
    </div>
  );
}
