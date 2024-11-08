import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import { useMutation } from '@tanstack/react-query';

import type { DetailPageBaseType } from '../FloatingBar';

export function CancelButton({ id, gatherings }: DetailPageBaseType) {
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');
  const name = localStorage.getItem('userName');

  const mutation = useMutation({
    mutationFn: () => deleteCancellation(id),
    onSuccess: () => {
      Toast('success', '취소 성공했습니다!');
      window.location.reload();
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  const handleOnClick = () => {
    if (name === gatherings.name && token) {
      openModal();
    } else {
      mutation.mutate();
    }
  };

  return (
    <div>
      <Button onClick={() => handleOnClick()} label={token && name === gatherings.groupName ? '모임 취소하기' : '참여 취소하기'} size="small" variant="white" />
      <Modal
        buttons={[
          {
            label: '취소',
            onClick: () => closeModal(),
          },
          {
            label: '확인',
            onClick: () => {
              if (name === gatherings.name && token) {
                mutation.mutate();
                closeModal();
              }
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        {token && name === gatherings.name ? (
          <div className="mx-16 mt-10 text-center">
            <div className="text-xl font-semibold text-amber-500">{gatherings.groupName}</div>
            <br />
            모임을 취소 기능은 준비 중 입니다. 😥
          </div>
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
}
