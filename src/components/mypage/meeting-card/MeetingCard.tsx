import Image from 'next/image';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { GatheringList } from '@/types/mypage';

export default function MeetingCard({ MeetingData }: { MeetingData: GatheringList }) {
  return (
    <div className="mb-6 flex w-[280px] flex-col gap-4 duration-200">
      <div className="tablet:max-w-[280px]">
        <Image
          className="h-[156px] w-[311px] rounded-3xl bg-slate-400"
          src={MeetingData.gatheringImage}
          alt="모임 사진"
          width={311}
          height={156}
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="tablet:flex tablet:flex-col tablet:justify-center">
        <div className="flex h-8">
          <State stateProp="planed" />
          <State stateProp="confirmed" />
          <State stateProp="completed" />
          <State stateProp="pending" />
        </div>
        <div className="mb-[18px] mt-3">
          <span>
            {MeetingData.groupName} | {MeetingData.location}
          </span>
          <br />
          <span className="text-sm font-medium text-[#374151]">
            {MeetingData.gatheringDate} · 시간 {MeetingData.participantUsers}/{MeetingData.maxUsers}
          </span>
        </div>
        <div>
          <Button label="예약 취소하기" size="primary" variant="white" />
        </div>
      </div>
    </div>
  );
}
