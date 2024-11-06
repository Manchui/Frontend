import Image from 'next/image';
import { Button } from '@/components/shared/button';
import type { GatheringList } from '@/types/mypage';

export function MyMakeCard({ MeetingData }: { MeetingData: GatheringList }) {
  const dateObj = new Date(MeetingData.gatheringDate);
  const addCss = MeetingData.groupName.length > 12 && 'w-52';

  return (
    <div className="border-b-2 border-dashed border-gray-50 py-1">
      <article className="m-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
        <div className="flex flex-col justify-center gap-4 phablet:items-start tablet:flex-row pc:flex-row">
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
            <div className="mb-[18px] mt-3">
              <div className="flex items-center gap-2">
                <div className={`truncate text-2lg font-semibold tablet:w-auto pc:w-auto ${addCss}`}>{MeetingData.groupName}</div>
                <span className="text-2lg font-semibold">|</span>
                <span className="text-md font-medium text-blue-700">{MeetingData.location}</span>
              </div>
              <div className="flex select-none gap-3 text-md font-medium text-[#374151]">
                <span>
                  {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:${dateObj.getMinutes()}`}
                </span>
                <span className="flex gap-1">
                  <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
                  {MeetingData.participantUsers}/{MeetingData.maxUsers}
                </span>
              </div>
            </div>
            <div className='flex flex-row justify-center gap-4'>
              <Button label="취소하기" size="primary" variant="white" />
              <Button label="자세히 보기" size="primary" variant="primary" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
