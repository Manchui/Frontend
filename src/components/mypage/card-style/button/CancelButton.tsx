import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import type { GatheringList } from '@/types/mypage';
import { useMutation } from '@tanstack/react-query';

export default function MyPageCancelButton({
  isClosed,
  data,
  category,
  handleRemoveItem,
}: {
  category: string;
  data: GatheringList;
  handleRemoveItem: (id: number) => void;
  isClosed: boolean;
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');
  const isName = token && category === '내가 만든 모임';

  const mutation = useMutation({
    mutationFn: () => deleteCancellation(data.gatheringId),
    onSuccess: () => {
      Toast('success', '신청이 취소 되었습니다!');
      handleRemoveItem(data.gatheringId);
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  return (
    <div>
      <Button
        disabled={isClosed}
        onClick={openModal}
        label={isName ? '모임 취소하기' : '참여 취소하기'}
        size="small"
        variant={isClosed ? 'primary' : 'white'}
      />
      <Modal
        buttons={[
          {
            label: '취소',
            onClick: () => closeModal(),
          },
          {
            label: '확인',
            onClick: () => {
              if (isName) {
                closeModal();
              } else {
                mutation.mutate();
              }
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        {isName ? (
          <div className="mx-16 mt-10 text-center">
            <div className="text-xl font-semibold text-amber-500">{data.groupName}</div>
            <br />
            모임 삭제 기능은 준비 중 입니다. 😥
          </div>
        ) : (
          <div className="mx-16 mt-10 text-center">
            <div className="text-xl font-semibold text-amber-500">{data.groupName}</div>
            <br />
            모임을 취소하시겠습니까?
            <br />
            언제든 다시 참여할 수 있어요!
          </div>
        )}
      </Modal>
    </div>
  );
}
