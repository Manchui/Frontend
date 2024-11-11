import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import { userStore } from '@/store/userStore';
import type { GatheringList } from '@/types/mypage';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';

export default function MyPageCancelButton({ data }: { data: GatheringList }) {
  const queryClient = new QueryClient();
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');
  const name = userStore((state) => state.user.name);
  const isName = token && name === data.groupName;

  const mutation = useMutation({
    mutationFn: () => deleteCancellation(data.gatheringId),
    onSuccess: () => {
      Toast('success', '취소 성공했습니다!');
      window.location.reload();
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Button onClick={openModal} label={isName ? '모임 취소하기' : '참여 취소하기'} size="small" variant="white" />
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
    </QueryClientProvider>
  );
}
