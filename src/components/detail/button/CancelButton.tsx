import axios from 'axios';
import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';

import type { DetailPageBaseType } from '../FloatingBar';

export function CancelButton({ id }: DetailPageBaseType) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleGatheringsCancel = async () => {
    try {
      if (typeof id === 'string') {
        await deleteCancellation(id);
        Toast('success', '참여 취소 완료하였습니다.');
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Toast('error', '문제가 발생했습니다.');
      } else {
        Toast('error', e instanceof Error ? e.message : '참여 취소 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div>
      <Button onClick={openModal} label="참여 취소하기" size="small" variant="white" />
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
        <div className="mx-16 mt-16">예약을 취소하시겠습니까?</div>
      </Modal>
    </div>
  );
}
