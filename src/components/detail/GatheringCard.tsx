import Image from 'next/image';
import type { DetailData } from '@/types/detail';

import DateChip from '../shared/chip/DateChip';
import { ProgressBar } from '../shared/progress-bar';
import Tag from '../shared/Tag';

export function GatheringCard({ gatherings }: { gatherings: DetailData }) {
  const gatheringDate = new Date(gatherings.gatheringDate);
  const dueDate = new Date(gatherings.dueDate);
  const today = new Date();

  const isToday = today.getFullYear() === dueDate.getFullYear() && today.getMonth() === dueDate.getMinutes() && today.getDate() === dueDate.getDate();

  return (
    <article className="flex flex-col items-center justify-center gap-6 bg-blue-800 py-[22px] tablet:flex-row tablet:pb-7 tablet:pt-6 pc:flex-row pc:pb-[34px] pc:pt-[27px]">
      <div className="relative h-[180px] w-[343px] tablet:h-[240px] tablet:w-[360px] pc:h-[270px] pc:w-[486px]">
        <Image
          alt="모임 이미지"
          src={gatherings.gatheringImage}
          width={486}
          height={270}
          style={{ objectFit: 'cover' }}
          className="size-full rounded-[18px] border-2 duration-100"
        />
        <div className="absolute right-0 top-0">
          {isToday && <Tag Hour={dueDate.getHours()} Type="detail" finish={dueDate.getTime() < new Date().getTime() && true} />}
        </div>
      </div>
      <div className="h-[240px] w-[343px] rounded-2xl border bg-white py-[20.5px] duration-100 tablet:h-[240px] tablet:w-[360px] pc:h-[270px] pc:w-[486px] pc:py-6">
        <div className="mx-6">
          <div className="flex justify-between">
            <p className="text-lg font-semibold">{gatherings.groupName}</p>
            <button type="button">
              <Image
                src={gatherings.isHearted ? '/icons/heart-active-noround.svg' : '/icons/heart-inactive-noround.svg'}
                alt="찜하기 버튼"
                width={28}
                height={28}
              />
            </button>
          </div>
          <p className="mb-3 mt-[2px] text-sm font-medium text-blue-800">{gatherings.location}</p>
          <DateChip dateTime={gatheringDate} />
          <hr className="mt-6 border-dashed border-gray-50 pc:mt-[43px]" />
        </div>
        <div className="mx-6 mt-5 pc:mt-6">
          <ProgressBar
            maxValue={gatherings.maxUsers}
            mainValue={gatherings.minUsers}
            value={gatherings.currentUsers}
            design="details"
            userList={gatherings.usersList}
          />
        </div>
      </div>
    </article>
  );
}
