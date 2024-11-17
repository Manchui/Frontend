import Image from 'next/image';
import instance from '@/apis/api';
import { userStore } from '@/store/userStore';
import type { DetailData } from '@/types/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import DateChip from '../shared/chip/DateChip';
import { ProgressBar } from '../shared/progress-bar';
// import Tag from '../shared/Tag';
import { Toast } from '../shared/Toast';

export function GatheringCard({ gatherings }: { gatherings: DetailData }) {
  const queryClient = useQueryClient();
  const gatheringDate = new Date(gatherings.gatheringDate);
  // const dueDate = new Date(gatherings.dueDate);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) {
        Toast('warning', '로그인 이후에 사용할 수 있습니다.');
        return;
      }
      const url = `/api/gatherings/${gatherings.gatheringId}/heart`;
      await (gatherings.hearted ? instance.delete(url) : instance.post(url));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['detail'] });
      const oldData = queryClient.getQueryData<DetailData>(['detail']);

      if (oldData) {
        queryClient.setQueryData<DetailData>(['detail'], {
          ...oldData,
          hearted: !gatherings.hearted,
        });
      }

      return { oldData };
    },
    onError(error, variables, context) {
      if (context?.oldData) {
        queryClient.setQueryData(['detail'], context.oldData);
      }
      Toast('error', gatherings.hearted ? '좋아요를 누르지 않은 모임입니다.' : '이미 좋아요를 누른 모임입니다.');
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['detail'] });
      Toast('success', gatherings.hearted ? '찜한 모임에서 제거되었습니다.' : '찜한 모임에 추가되었습니다.');
    },
  });

  return (
    <article className="mx-4 grid grid-cols-1 gap-5 pt-5 tablet:grid-cols-2 tablet:pt-6 pc:grid-cols-2 pc:pt-[52px]">
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
            {/* <Tag Hour={dueDate.getHours()} Type="detail" finish={dueDate.getTime() < new Date().getTime() && true} /> */}
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
              <Image src={gatherings.hearted ? '/icons/heart-red.svg' : '/icons/heart-outline.svg'} alt="찜하기 버튼" width={28} height={28} />
            </button>
            {gatherings.heartCounts}
          </div>
        </div>
        <hr className="mt-6 border border-dashed border-gray-50" />
        <div className="mt-5 tablet:hidden pc:mt-6">
          <ProgressBar
            maxValue={gatherings.maxUsers}
            mainValue={gatherings.minUsers}
            value={gatherings.currentUsers}
            design="details"
            userList={gatherings.usersList}
          />
        </div>
        <section className="mt-6">
          <h1 className="mb-3 text-2lg font-bold">모임설명</h1>
          <p className="whitespace-pre-line break-words rounded-2xl border border-blue-100 px-4 py-2.5">{gatherings.content}</p>
        </section>
      </div>
    </article>
  );
}
