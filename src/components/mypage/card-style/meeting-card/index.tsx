import { Bagel_Fat_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { GatheringList, ReviewableList } from '@/types/mypage';

import MyPageCancelButton from '../button/CancelButton';
import ReviewButton from '../button/ReviewButton';

const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

export function MeetingCard({
  MeetingData,
  category,
  handleRemoveItem,
}: {
  MeetingData: GatheringList[] | ReviewableList[] | undefined;
  category: string;
  handleRemoveItem: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 px-1 pt-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {MeetingData && MeetingData.map((list, i) => <Meeting key={i} MeetingData={list} category={category} handleRemoveItem={handleRemoveItem} />)}
    </div>
  );
}

function Meeting({
  MeetingData,
  category,
  handleRemoveItem,
}: {
  MeetingData: GatheringList | ReviewableList;
  category: string;
  handleRemoveItem: (id: number) => void;
}) {
  const dateObj = new Date(MeetingData.gatheringDate);
  const isClosed = 'isClosed' in MeetingData && MeetingData.isClosed;
  const isFull = 'maxUsers' in MeetingData && 'participantUsers' in MeetingData && MeetingData.maxUsers === MeetingData.participantUsers;
  const isCanceled = 'isCanceled' in MeetingData && MeetingData.isCanceled;

  const meetingStatus = isClosed ? 'CLOSED' : isFull ? 'FULL' : 'DELETE';

  const meetingState = category === '나의 모임' && (
    <div className="flex select-none gap-2">
      <State stateProp={isClosed ? 'completed' : 'planed'} />
      <State stateProp={'isOpened' in MeetingData && MeetingData.isOpened ? 'confirmed' : 'pending'} />
    </div>
  );

  const meetingDetails = (
    <section>
      <div className="flex items-center gap-2">
        <div className="truncate text-2lg font-semibold tablet:w-auto pc:w-auto">{MeetingData.groupName}</div>
        <span className="text-2lg font-semibold">|</span>
        <span className="text-md font-medium">{MeetingData.location}</span>
      </div>
      <time className="flex select-none gap-3 text-md font-medium">
        <span>
          {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:00`}
        </span>
        <span className="flex gap-1">
          <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
          {`${('participantUsers' in MeetingData && MeetingData.participantUsers) || 0}/${('maxUsers' in MeetingData && MeetingData.maxUsers) || 0}`}
        </span>
      </time>
    </section>
  );

  return (
    <section className="mx-3 flex justify-center border-b-2 border-dashed border-gray-50 px-2 py-5 tablet:justify-start pc:justify-start">
      <div className="group flex flex-col items-start justify-center gap-4 tablet:flex-row pc:flex-row">
        <div className="relative">
          {MeetingData.gatheringImage ? (
            <Image
              alt="testImage"
              src={MeetingData.gatheringImage}
              width={311}
              height={156}
              className="mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg object-cover"
            />
          ) : (
            <div className="relative mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
          )}
          {(isClosed || isFull || isCanceled) && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-80">
              <span className={`text-full-response font-bold text-full ${bagelFatOne.className}`}>{meetingStatus}</span>
            </div>
          )}
        </div>

        <div className="flex flex-grow flex-col items-start justify-between gap-2 tablet:h-[156px] tablet:pt-0">
          {meetingState}
          {meetingDetails}
          {'deletedAt' in MeetingData && category === '나의 모임' && (
            <MyPageCancelButton isClosed={isClosed} data={MeetingData} category={category} handleRemoveItem={handleRemoveItem} />
          )}
          {'deletedAt' in MeetingData && category === '내가 만든 모임' && (
            <div className="flex gap-2">
              <MyPageCancelButton isClosed={isClosed} data={MeetingData} category={category} handleRemoveItem={handleRemoveItem} />
              <Link href={`/detail/${MeetingData.gatheringId}`}>
                <Button label="자세히 보기" size="small" variant="primary" />
              </Link>
            </div>
          )}
          {'updatedAt' in MeetingData && category === '작성 가능한 리뷰' && <ReviewButton data={MeetingData} />}
        </div>
      </div>
    </section>
  );
}
