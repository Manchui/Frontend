import type { DetailData, UsersList } from '@/types/detail';

import AttendanceButton from './button/AttendanceButton';
import { CancelButton } from './button/CancelButton';
import { Button } from '../shared/button';

export interface DetailPageBaseType {
  gatherings: DetailData;
  id: string | string[] | undefined;
}

interface FloatingBarProps extends DetailPageBaseType {
  maxUsers: number;
  usersList: UsersList[];
}

export function FloatingBar({ gatherings, id, usersList, maxUsers }: FloatingBarProps) {
  const myUserName = localStorage.getItem('userName');
  const findUserId = usersList.find((user) => user.name === myUserName);
  const isDisabled = usersList.length === maxUsers;

  return (
    <footer className="fixed inset-x-0 bottom-0 flex min-h-[84px] items-center justify-between border-t bg-white px-10 py-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-[#111827]">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</span>
        <span className="text-sm font-medium text-[#111827]">프로그램을 통해 지친 몸과 마음을 회복해봐요</span>
      </div>
      {findUserId ? (
        <CancelButton gatherings={gatherings} id={id} />
      ) : isDisabled ? (
        <Button label="참여하기" size="primary" variant="primary" disabled />
      ) : (
        <AttendanceButton gatherings={gatherings} id={id} />
      )}
    </footer>
  );
}
