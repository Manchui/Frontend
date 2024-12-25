import { userStore } from '@/store/userStore';
import type { DetailData } from '@/types/detail';

import AttendanceButton from './button/AttendanceButton';
import { CancelButton } from './button/CancelButton';
import ShareButton from './button/ShareButton';
import { Button } from '../shared/button';

export interface DetailPageBaseType {
  gatherings: DetailData;
  id: number;
}

export function FloatingBar({ gatherings, id }: DetailPageBaseType) {
  const myUserName = userStore((state) => state.user.name);
  const findUserId = gatherings.usersList.find((user) => user.name === myUserName);
  const isDisabled = gatherings.usersList.length === gatherings.maxUsers;
  const isClosed = gatherings.closed;

  return (
    <footer className="fixed inset-x-0 bottom-0 flex min-h-[84px] items-center justify-between border-t border-blue-100 bg-white px-10 py-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-blue-800">당신의 취미가 특별해지는 시간 🎮</span>
        <span className="text-sm font-medium text-blue-800">모임 참여로 새로운 즐거움을 발견하세요.</span>
      </div>
      {isClosed ? (
        <Button label="마감되었습니다" size="primary" variant="primary" disabled />
      ) : findUserId ? (
        <div className="flex gap-2">
          <CancelButton gatherings={gatherings} id={id} />
          <ShareButton />
        </div>
      ) : isDisabled ? (
        <Button label="마감되었습니다" size="primary" variant="primary" disabled />
      ) : (
        <AttendanceButton gatherings={gatherings} id={id} />
      )}
    </footer>
  );
}
