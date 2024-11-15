import { useState } from 'react';
import Image from 'next/image';
import instance from '@/apis/api';
import { userStore } from '@/store/userStore';
import type { DetailData } from '@/types/detail';
import { useMutation } from '@tanstack/react-query';

import DateChip from '../shared/chip/DateChip';
import { ProgressBar } from '../shared/progress-bar';
import Tag from '../shared/Tag';
import { Toast } from '../shared/Toast';

export function GatheringCard({ gatherings }: { gatherings: DetailData }) {
  const gatheringDate = new Date(gatherings.gatheringDate);
  const dueDate = new Date(gatherings.dueDate);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  // const today = new Date();
  const [isHearted, setIsHearted] = useState<boolean>(gatherings.hearted);
  // const isToday = today.getFullYear() === dueDate.getFullYear() && today.getMonth() === dueDate.getMinutes() && today.getDate() === dueDate.getDate();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) {
        Toast('warning', '로그인 이후에 사용할 수 있습니다.');
      } else if (!isHearted) {
        await instance.post(`/api/gatherings/${gatherings.gatheringId}/heart`);
      } else {
        await instance.delete(`/api/gatherings/${gatherings.gatheringId}/heart`);
      }
    },
    onSuccess: () => {
      if (!isLoggedIn) {
        return;
      }
      setIsHearted(!isHearted);
      Toast('success', isHearted ? '찜한 모임에서 제거되었습니다.' : '찜한 모임에 추가되었습니다.');
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });
  return (
    <article className="mx-4 grid grid-cols-1 gap-5 tablet:grid-cols-2 pc:grid-cols-2">
      <div>
        <div className="relative min-h-[343px]">
          <Image
            alt="모임 이미지"
            src={gatherings.gatheringImage}
            fill
            className="rounded-2xl object-cover duration-100"
            sizes="(max-width: 820px) 50vw, (max-width: 1240px) 50vw, 50vw"
          />
          <div className="absolute right-0 top-0">
            <Tag Hour={dueDate.getHours()} Type="detail" finish={dueDate.getTime() < new Date().getTime() && true} />
          </div>
        </div>
        <div className="mt-5 hidden tablet:block pc:mt-6 pc:block">
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
            <p className="text-lg font-semibold">{gatherings.groupName}</p>
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
            <button type="button" onClick={() => mutation.mutate()}>
              <Image src={isHearted ? '/icons/heart-red.svg' : '/icons/heart-outline.svg'} alt="찜하기 버튼" width={28} height={28} />
            </button>
            {gatherings.heartCounts}
          </div>
        </div>
        <hr className="mt-6 border border-dashed border-gray-50 duration-200 pc:mt-11" />
        <div className="mt-5 tablet:hidden pc:mt-6">
          <ProgressBar
            maxValue={gatherings.maxUsers}
            mainValue={gatherings.minUsers}
            value={gatherings.currentUsers}
            design="details"
            userList={gatherings.usersList}
          />
        </div>
        <section className="mt-6 tablet:mt-9 pc:mt-10">
          <h1 className="mb-3 text-2lg font-bold">모임설명</h1>
          <p className="whitespace-pre-line rounded-2xl border border-blue-100 px-4 py-2.5">{gatherings.content}</p>
        </section>
      </div>
    </article>
  );
}
