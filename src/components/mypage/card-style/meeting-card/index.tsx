// import { Bagel_Fat_One } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { CancelButton } from '@/components/detail/button/CancelButton';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { List } from '@/types/mypage';

import MyPageCancelButton from '../button/CancelButton';
import ReviewButton from '../button/ReviewButton';

export function MeetingCard({ MeetingData, category }: { MeetingData: List; category: string }) {
  // const bagelFatOne = Bagel_Fat_One({ weight: '400', subsets: ['latin'] });

  return (
    <div className="grid grid-cols-1 px-1 pt-6 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {MeetingData.content.map((list, i) => {
        const dateObj = new Date(list.gatheringDate);
        const addCss = list.groupName.length > 12 && 'w-52';

        return (
          <div key={i}>
            <article className="mx-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
              <div className="group flex flex-col justify-center gap-4 border-b-2 border-dashed border-gray-50 pb-5 phablet:items-start tablet:flex-row pc:flex-row">
                <div className="relative">
                  {list.gatheringImage ? (
                    <Image
                      alt="testImage"
                      src={list.gatheringImage}
                      width={311}
                      height={156}
                      style={{ width: '280px', height: '156px', objectFit: 'cover' }}
                      className="mx-auto flex-shrink-0 overflow-hidden rounded-lg"
                    />
                  ) : (
                    <div className="relative mx-auto h-[156px] w-[280px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-200" />
                  )}
                  {(list.isClosed || list.maxUsers === list.participantUsers || list.isCanceled) && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-80">
                      {/* <span className={`text-full-response font-bold text-full ${bagelFatOne.className}`}>{list.isClosed ? 'CLOSED' : 'FULL'}</span> */}
                      <span className="text-full-response font-bold text-full">
                        {list.isClosed || list.isCanceled ? 'CLOSED' : list.maxUsers === list.participantUsers ? 'FULL' : ''}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-grow flex-col items-start justify-between gap-2 tablet:h-[156px] tablet:pt-0">
                  {category === '나의 모임' && (
                    <div className="flex select-none gap-2">
                      <State stateProp={list.isClosed ? 'completed' : 'planed'} />
                      <State stateProp={list.isOpened ? 'confirmed' : 'pending'} />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <div className={`truncate text-2lg font-semibold tablet:w-auto pc:w-auto ${addCss}`}>{list.groupName}</div>
                      <span className="text-2lg font-semibold">|</span>
                      <span className="text-md font-medium text-blue-700">{list.location}</span>
                    </div>
                    <div className="flex select-none gap-3 text-md font-medium text-[#374151]">
                      <span>
                        {`${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`} · {`${dateObj.getHours()}:00`}
                      </span>
                      <span className="flex gap-1">
                        <Image src="/icons/person-black.svg" alt="icon" width={16} height={16} />
                        {list.participantUsers}/{list.maxUsers}
                      </span>
                    </div>
                  </div>
                  {category === '나의 모임' && <MyPageCancelButton data={list} />}
                  {category === '내가 만든 모임' && (
                    <div className="flex gap-2">
                      <CancelButton id={list.gatheringId} gatherings={list} />
                      <Link href={`/detail/${list.gatheringId}`}>
                        <Button label="자세히 보기" size="small" variant="primary" />
                      </Link>
                    </div>
                  )}
                  {category === '작성 가능한 리뷰' && <ReviewButton data={list} />}
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
