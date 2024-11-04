import axios from 'axios';
import submitAttendance from '@/apis/detail/post-attendance';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';

import type { DetailPageBaseType } from '../FloatingBar';

export default function AttendanceButton({ id }: DetailPageBaseType) {
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');

  const handleGatheringsCancel = async () => {
    try {
      if (typeof id !== 'string') {
        Toast('error', '유효하지 않은 ID입니다.');
        return;
      }
      await submitAttendance(id);
      Toast('success', '참여 완료하였습니다.');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Toast('error', '문제가 발생했습니다.');
      } else {
        Toast('error', e instanceof Error ? e.message : '모임 참여 중 문제가 발생했습니다.');
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
              if (token) {
                void handleGatheringsCancel();
                closeModal();
              }
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className="mx-16 mt-16">{token ? '참여 하시겠습니까?' : '로그인이 필요합니다.'}</div>
      </Modal>
    </div>
  );
}
