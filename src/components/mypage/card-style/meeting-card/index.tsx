import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { GatheringList, List, ReviewableList } from '@/types/mypage';

import MyPageCancelButton from '../button/CancelButton';
import ReviewButton from '../button/ReviewButton';

export function MeetingCard({ MeetingData, category }: { MeetingData: List; category: string }) {
  return (
    <div className="grid grid-cols-1 px-1 pt-6 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {MeetingData.content.map((list, i) => (
        <Meeting key={i} MeetingData={list} category={category} />
      ))}
    </div>
  );
}

function Meeting({ MeetingData, category }: { MeetingData: GatheringList | ReviewableList; category: string }) {
  const dateObj = new Date(MeetingData.gatheringDate);
  const isClosed = 'isClosed' in MeetingData && MeetingData.isClosed;
  const isFull = 'maxUsers' in MeetingData && 'participantUsers' in MeetingData && MeetingData.maxUsers === MeetingData.participantUsers;
  const isCanceled = 'isCanceled' in MeetingData && MeetingData.isCanceled;

  const meetingStatus = isClosed ? 'CLOSED' : isFull ? 'FULL' : '';

  const meetingState = category === '나의 모임' && (
    <div className="flex select-none gap-2">
      <State stateProp={isClosed ? 'completed' : 'planed'} />
      <State stateProp={'isOpened' in MeetingData && MeetingData.isOpened ? 'confirmed' : 'pending'} />
    </div>
  );

  const meetingDetails = (
    <div>
      <div className="flex items-center gap-2">
        <div className="truncate text-2lg font-semibold tablet:w-auto pc:w-auto">{MeetingData.groupName}</div>
        <span className="text-2lg font-semibold">|</span>
        <span className="text-md font-medium text-blue-700">{MeetingData.location}</span>
      </div>
      <div className="flex select-none gap-3 text-md font-medium text-[#374151]">
        <span>
          {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:00`}
        </span>
        <span className="flex gap-1">
          <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
          {`${('participantUsers' in MeetingData && MeetingData.participantUsers) || 0}/${('maxUsers' in MeetingData && MeetingData.maxUsers) || 0}`}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <article className="mx-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
        <div className="group flex flex-col justify-center gap-4 border-b-2 border-dashed border-gray-50 pb-5 phablet:items-start tablet:flex-row pc:flex-row">
          <div className="relative">
            {MeetingData.gatheringImage ? (
              <Image
                alt="testImage"
                src={MeetingData.gatheringImage}
                width={311}
                height={156}
                style={{ width: '280px', height: '156px', objectFit: 'cover' }}
                className="mx-auto flex-shrink-0 overflow-hidden rounded-lg"
              />
            ) : (
              <div className="relative mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
            )}
            {(isClosed || isFull || isCanceled) && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-80">
                <span className="text-full-response font-bold text-full">{meetingStatus}</span>
              </div>
            )}
          </div>

          <div className="flex flex-grow flex-col items-start justify-between gap-2 tablet:h-[156px] tablet:pt-0">
            {meetingState}
            {meetingDetails}

            {'deletedAt' in MeetingData && category === '나의 모임' && <MyPageCancelButton data={MeetingData} />}
            {'deletedAt' in MeetingData && category === '내가 만든 모임' && (
              <div className="flex gap-2">
                <MyPageCancelButton data={MeetingData} />
                <Link href={`/detail/${MeetingData.gatheringId}`}>
                  <Button label="자세히 보기" size="small" variant="primary" />
                </Link>
              </div>
            )}
            {'deletedAt' in MeetingData && category === '작성 가능한 리뷰' && <ReviewButton data={MeetingData} />}
          </div>
        </div>
      </article>
    </div>
  );
}
