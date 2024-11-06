import axios from 'axios';
import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';

import type { DetailPageBaseType } from '../FloatingBar';

export function CancelButton({ id, gatherings }: DetailPageBaseType) {
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');
  const name = localStorage.getItem('name');

  const handleGatheringsCancel = async () => {
    try {
      if (typeof id === 'string') {
        await deleteCancellation(id);
        Toast('success', '참여 취소 완료하였습니다.');
        window.location.reload();
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
      <Button onClick={openModal} label={token && name === gatherings.name ? '모임 취소하기' : '참여 취소하기'} size="small" variant="white" />
      <Modal
        buttons={[
          {
            label: '취소',
            onClick: () => closeModal(),
          },
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
        <div className="mx-16 mt-10 text-center">
          {token && name === gatherings.name ? (
            <div>
              <div className="text-xl font-semibold text-amber-500">{gatherings.groupName}</div>
              <br />
              모임을 취소하시겠습니까?
              <br />
              되돌릴 수 없어요 😥
            </div>
          ) : (
            <div>
              <div className="text-xl font-semibold text-amber-500">{gatherings.groupName}</div>
              <br />
              예약을 취소하시겠습니까?
              <br />
              다시 예약 할 수 있어요!
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
