import axios from 'axios';
import submitAttendance from '@/apis/detail/post-attendance';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';

import type { DetailPageBaseType } from '../FloatingBar';

export default function AttendanceButton({ id }: DetailPageBaseType) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleGatheringsCancel = async () => {
    try {
      if (typeof id === 'string') {
        await submitAttendance(id);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Toast('error', '문제가 발생했습니다.');
      } else {
        Toast('error', '참여 예약 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <Button onClick={openModal} label="참여하기" size="primary" variant="primary" />
      <Modal
        buttons={[
          {
            label: '확인',
            onClick: () => {
              void handleGatheringsCancel();
              closeModal();
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className="mx-6 mt-16">참여 하시겠습니까?</div>
      </Modal>
    </div>
  );
}
