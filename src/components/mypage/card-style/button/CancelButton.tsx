import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import type { GatheringList } from '@/types/mypage';
import { useMutation } from '@tanstack/react-query';

export default function MyPageCancelButton({ data }: { data: GatheringList }) {
  const { isOpen, openModal, closeModal } = useModal();
  const myCategory = localStorage.getItem('my-category');
  const mutation = useMutation({
    mutationFn: () => deleteCancellation(data.gatheringId),
    onSuccess: () => {
      Toast('success', '모임 취소 성공했습니다.');
      window.location.reload();
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  return (
    <div>
      <Button onClick={() => openModal()} label={myCategory === '나의 모임' ? '참여 취소하기' : '취소하기'} size="small" variant="white" />
      <Modal
        buttons={[
          {
            label: '취소',
            onClick: () => closeModal(),
          },
          {
            label: '확인',
            onClick: () => {
              mutation.mutate();
              closeModal();
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className="mx-16 mt-10 text-center">
          <div className="text-xl font-semibold text-amber-500">{data.groupName}</div>
          <br />
          예약을 취소하시겠습니까?
          <br />
          다시 예약 할 수 있어요!
        </div>
      </Modal>
    </div>
  );
}
