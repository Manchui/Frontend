import { useMemo } from 'react';
import Image from 'next/image';
import RedHeart from 'public/icons/RedHeart';
import { POSITION_COORDINATES } from '@/constants/coordinates';
import { useHeartChange } from '@/hooks/useHeartChange';
import type { DetailData } from '@/types/detail';

import DateChip from '../shared/chip/DateChip';
import { KakaoMap } from '../shared/kakao-map';
import { ProgressBar } from '../shared/progress-bar';
import Tag from '../shared/Tag';

export function GatheringCard({ gatherings }: { gatherings: DetailData }) {
  const gatheringDate = new Date(gatherings.gatheringDate);
  const mutation = useHeartChange(gatherings);
  const location = POSITION_COORDINATES.find((item) => item.location === gatherings.location);

  const dueDate = useMemo(() => {
    const date = new Date(gatherings.gatheringDate);
    date.setDate(date.getDate() - 1);
    return date;
  }, [gatherings]);

  const showTag = useMemo(() => {
    const now = new Date();
    return now >= dueDate;
  }, [dueDate]);

  return (
    <article className="mx-4 grid grid-cols-1 gap-5 pt-5 tablet:mx-8 tablet:grid-cols-2 tablet:gap-7 tablet:pt-7 pc:grid-cols-2 pc:gap-12 pc:pt-7">
      <div>
        <div className="relative min-h-[530px]">
          <Image
            alt="모임 이미지"
            src={gatherings.gatheringImage}
            fill
            className="rounded-2xl object-cover duration-100"
            sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
          />
          <div className="absolute right-0 top-0 z-10">
            {showTag && <Tag Type="detail" Hour={dueDate.getHours() - 5} finish={new Date(gatherings.dueDate).getTime() < new Date().getTime()} />}
          </div>
        </div>
        <div className="mt-5 hidden duration-200 tablet:block pc:mt-7 pc:block">
          <ProgressBar
            maxValue={gatherings.maxUsers}
            mainValue={gatherings.minUsers}
            value={gatherings.currentUsers}
            design="details"
            userList={gatherings.usersList}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div>
            <p className="mt-2 text-lg font-semibold">{gatherings.groupName}</p>
            <div className="mb-3 mt-1 text-sm font-medium text-blue-800">
              <span>{gatherings.category}</span>
              <span> | </span>
              <span>{gatherings.location}</span>
            </div>
            <DateChip dateTime={gatheringDate} />
            <div className="mt-5 flex items-center gap-1">
              <div className="relative size-7 rounded-full border border-blue-200 bg-slate-50 shadow-sm">
                <Image
                  src={gatherings.usersList[0].profileImagePath || '/icons/person-rounded.png'}
                  alt="유저이미지"
                  className="rounded-full object-cover"
                  fill
                />
              </div>
              <span>{gatherings.name}</span>
            </div>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-400">
            <RedHeart color={`${gatherings.hearted ? '#FF4D11' : '#D4D4D4'}`} className="size-7" onClick={() => mutation.mutate()} />
            {gatherings.heartCounts}
          </div>
        </div>
        <hr className="mt-8 border border-dashed border-gray-50" />
        <div className="mt-5 tablet:hidden pc:mt-6">
          <ProgressBar
            maxValue={gatherings.maxUsers}
            mainValue={gatherings.minUsers}
            value={gatherings.currentUsers}
            design="details"
            userList={gatherings.usersList}
          />
        </div>
        <section className="my-8">
          <h1 className="mb-3 text-2lg font-bold">모임설명</h1>
          <p className="min-h-52 whitespace-pre-line break-words rounded-2xl border border-blue-100 px-4 py-2.5 tablet:min-h-[280px] pc:min-h-[280px]">
            {gatherings.content}
          </p>
        </section>
        <KakaoMap lat={location?.Latitude} lng={location?.Longitude} />
      </div>
    </article>
  );
}
