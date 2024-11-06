import Image from 'next/image';
import State from '@/components/shared/chip/State';
import type { GatheringList } from '@/types/mypage';

import CancelButton from '../button/CancelButton';

export function MeetingCard({ MeetingData }: { MeetingData: GatheringList }) {
  const dateObj = new Date(MeetingData.gatheringDate);
  const addCss = MeetingData.groupName.length > 12 && 'w-52';

  return (
    <div className="border-b-2 border-dashed border-gray-50 py-1">
      <article className="m-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
        <div className="group flex flex-col justify-center gap-4 phablet:items-start tablet:flex-row pc:flex-row">
          <div className="max-w-[280px] select-none overflow-hidden rounded-lg">
            <Image
              className="h-[156px] w-[311px] transform bg-slate-400 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              src={MeetingData.gatheringImage}
              alt="모임 사진"
              width={311}
              height={156}
              draggable="false"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="flex h-[156px] flex-col justify-between">
            <div className="flex select-none gap-2">
              <State stateProp={MeetingData.isClosed ? 'completed' : 'planed'} />
              <State stateProp={MeetingData.isOpened ? 'confirmed' : 'pending'} />
            </div>
            <div className="mb-[18px] mt-3">
              <div className="flex items-center gap-2">
                <div className={`truncate text-2lg font-semibold tablet:w-auto pc:w-auto ${addCss}`}>{MeetingData.groupName}</div>
                <span className="text-2lg font-semibold">|</span>
                <span className="text-md font-medium text-blue-700">{MeetingData.location}</span>
              </div>
              <div className="flex select-none gap-3 text-md font-medium text-[#374151]">
                <span>
                  {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:00`}
                </span>
                <span className="flex gap-1">
                  <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
                  {MeetingData.participantUsers}/{MeetingData.maxUsers}
                </span>
              </div>
            </div>
            <CancelButton data={MeetingData} />
          </div>
        </div>
      </article>
    </div>
  );
}
