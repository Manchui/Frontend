import { useModal } from '@/hooks/useModal';
import type { UsersList } from '@/types/detail';

import { Button } from '../shared/button';
import Modal from '../shared/Modal';

interface FloatingBarProps {
  maxUsers: number;
  usersList: UsersList[];
}

export function FloatingBar({ usersList, maxUsers }: FloatingBarProps) {
  // NOTE: 임시 값
  const myUserId = 'cdef-3456';
  const findUserId = usersList.find((user) => user.userId === myUserId);
  const isDisabled = usersList.length === maxUsers;

  const { isOpen, openModal, closeModal } = useModal();
  return (
    <footer className="fixed inset-x-0 bottom-0 flex min-h-[84px] items-center justify-between border-t bg-white px-10 py-5">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-[#111827]">더 건강한 나와 팀을 위한 프로그램 🏃‍️️</span>
        <span className="text-sm font-medium text-[#111827]">프로그램을 통해 지친 몸과 마음을 회복해봐요</span>
      </div>
      {isDisabled ? (
        <Button label="참여하기" size="primary" variant="primary" disabled />
      ) : findUserId ? (
        <Button onClick={openModal} label="참여 취소하기" size="primary" variant="white" />
      ) : (
        <Button onClick={openModal} label="참여하기" size="primary" variant="primary" />
      )}
      <Modal buttons={[{ label: '확인', onClick: () => closeModal }]} isOpen={isOpen} onClose={closeModal}>
        {findUserId ? <div className="mx-6 mt-16">예약을 취소하시겠습니까?</div> : <div className="mx-6 mt-16">로그인이 필요합니다.</div>}
      </Modal>
    </footer>
  );
}
