import Image from 'next/image';
import type { DetailData } from '@/types/detail';

import DateChip from '../shared/chip/DateChip';
import { ProgressBar } from '../shared/progress-bar';
import Tag from '../shared/Tag';

export function GatheringCard({ PAGE_DATA }: { PAGE_DATA: DetailData }) {
  const gatheringDate = new Date(PAGE_DATA.gatheringDate);

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-blue-800 py-[22px] tablet:flex-row tablet:pb-7 tablet:pt-6 pc:flex-row pc:pb-[34px] pc:pt-[27px]">
      <div className="relative h-[180px] w-[343px] tablet:h-[240px] tablet:w-[360px] pc:h-[270px] pc:w-[486px]">
        <Image
          alt="모임 이미지"
          src={PAGE_DATA.gatheringImage}
          width={486}
          height={270}
          style={{ objectFit: 'cover' }}
          className="size-full rounded-[18px] border-2 duration-100"
        />
        <div className="absolute right-0 top-0">
          <Tag Hour={5} Type="detail" />
        </div>
      </div>
      <div className="h-[240px] w-[343px] rounded-2xl border bg-white py-[20.5px] duration-100 tablet:h-[240px] tablet:w-[360px] pc:h-[270px] pc:w-[486px] pc:py-6">
        <div className="mx-6">
          <p className="text-lg font-semibold">{PAGE_DATA.groupName}</p>
          <p className="mb-3 mt-[2px] text-sm font-medium text-blue-800">{PAGE_DATA.location}</p>
          <DateChip dateTime={gatheringDate} />
          <hr className="mt-6 border-dashed pc:mt-[43px]" />
        </div>
        <div className="mx-6 mt-5 pc:mt-6">
          <ProgressBar
            maxValue={PAGE_DATA.maxUsers}
            mainValue={PAGE_DATA.minUsers}
            value={PAGE_DATA.participantUsers}
            design="details"
            userList={PAGE_DATA.usersList}
          />
        </div>
      </div>
    </div>
  );
}
