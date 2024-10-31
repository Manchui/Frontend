import Image from 'next/image';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { GatheringList } from '@/types/mypage';

export default function MeetingCard({ MeetingData }: { MeetingData: GatheringList }) {
  // const stateButton = MeetingData.
  const dateObj = new Date(MeetingData.gatheringDate);
  const addCss = MeetingData.groupName.length > 12 && 'w-52';

  function isSameDate(currentDate: Date, dateToCompare: Date): boolean {
    return currentDate > dateToCompare;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl p-5 tablet:flex-row tablet:justify-start pc:flex-row pc:justify-start">
      <div className="max-w-[280px] select-none">
        <Image
          className="h-[156px] w-[311px] rounded-lg bg-slate-400"
          src={MeetingData.gatheringImage}
          alt="모임 사진"
          width={311}
          height={156}
          draggable="false"
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div>
        <div className="flex select-none gap-2">
          <State stateProp={isSameDate(new Date(), dateObj) ? 'completed' : 'planed'} />
          <State stateProp={MeetingData.isOpened ? 'confirmed' : 'pending'} />
        </div>
        <div className="mb-[18px] mt-3">
          <div className="flex items-center gap-2">
            <div className={`truncate text-lg font-semibold tablet:w-auto pc:w-auto ${addCss}`}>{MeetingData.groupName}</div>
            <span className="text-lg font-semibold">|</span>
            <span className="text-sm font-medium text-blue-700">{MeetingData.location}</span>
          </div>
          <div className="flex select-none gap-3 text-sm font-medium text-[#374151]">
            <span>
              {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:${dateObj.getMinutes()}`}
            </span>
            <span className="flex gap-1">
              <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
              {MeetingData.participantUsers}/{MeetingData.maxUsers}
            </span>
          </div>
        </div>
        <div>
          <Button label="예약 취소하기" size="primary" variant="white" />
        </div>
      </div>
    </div>
  );
}
