import Image from 'next/image';
import Link from 'next/link';
import { CancelButton } from '@/components/detail/button/CancelButton';
import { Button } from '@/components/shared/button';
import State from '@/components/shared/chip/State';
import type { List } from '@/types/mypage';

import MyPageCancelButton from '../button/CancelButton';

export function MeetingCard({ MeetingData, category }: { MeetingData: List; category: string }) {
  return (
    <div className="grid grid-cols-1 px-1 phablet:grid-cols-2 tablet:grid-cols-1 pc:grid-cols-1">
      {MeetingData.content.map((list, i) => {
        const dateObj = new Date(list.gatheringDate);
        const addCss = list.groupName.length > 12 && 'w-52';

        return (
          <div key={i}>
            <div className="border-b-2 border-dashed border-gray-50 py-1">
              <article className="m-3 flex justify-center rounded-3xl p-2 tablet:justify-start pc:justify-start">
                <div className="group flex flex-col justify-center gap-4 phablet:items-start tablet:flex-row pc:flex-row">
                  <div className="max-w-[280px] select-none overflow-hidden rounded-lg">
                    <Image
                      className="h-[156px] w-[311px] transform bg-slate-400 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      src={list.gatheringImage}
                      alt="모임 사진"
                      width={311}
                      height={156}
                      draggable="false"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  <div className="flex flex-col justify-between tablet:h-[156px]">
                    {category === '나의 모임' && (
                      <div className="flex select-none gap-2">
                        <State stateProp={list.isClosed ? 'completed' : 'planed'} />
                        <State stateProp={list.isOpened ? 'confirmed' : 'pending'} />
                      </div>
                    )}
                    <div className="mb-[18px] mt-3">
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
                    {category === '작성 가능한 리뷰' && <button type="button">리뷰 작성하기</button>}
                  </div>
                </div>
              </article>
            </div>
          </div>
        );
      })}
    </div>
  );
}
