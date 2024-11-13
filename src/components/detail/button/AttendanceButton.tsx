import { useRouter } from 'next/router';
import submitAttendance from '@/apis/detail/post-attendance';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { DetailPageBaseType } from '../FloatingBar';

export default function AttendanceButton({ id, gatherings }: DetailPageBaseType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isOpen, openModal, closeModal } = useModal();
  const token = localStorage.getItem('accessToken');

  const mutation = useMutation({
    mutationFn: () => submitAttendance(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['detail'] });
      Toast('success', '참여 완료하였습니다.');
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  return (
    <div>
      <Button onClick={openModal} label="참여하기" size="primary" variant="primary" />
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
                mutation.mutate();
                closeModal();
              } else {
                void router.push('/login');
              }
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className="mx-16 mt-10 text-center">
          {token ? (
            <div>
              <div className="text-xl font-semibold text-amber-500">{gatherings.groupName}</div>
              <br />
              모임에 참여 하시겠습니까?
              <br />
              언제든 취소할 수 있어요!
            </div>
          ) : (
            '로그인이 필요합니다!'
          )}
        </div>
      </Modal>
    </div>
  );
}
