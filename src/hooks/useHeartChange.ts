import instance from '@/apis/api';
import { Toast } from '@/libs/validateForm';
import { userStore } from '@/store/userStore';
import type { DetailData } from '@/types/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const MUTATION_KEY = 'detail';

export const useHeartChange = (gatherings: DetailData) => {
  const queryClient = useQueryClient();
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!isLoggedIn) {
        Toast('warning', '로그인 이후에 사용할 수 있습니다.');
        return;
      }
      const url = `/api/gatherings/${gatherings.gatheringId}/heart`;
      await (gatherings.hearted ? instance.delete(url) : instance.post(url));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['detail'] }),
    onError(error) {
      Toast('error', error.message);
    },
    onSuccess: async () => {
      if (!isLoggedIn) return;
      await queryClient.invalidateQueries({ queryKey: ['detail'] });
      Toast('success', gatherings.hearted ? '찜한 모임에서 제거되었습니다.' : '찜한 모임에 추가되었습니다.');
    },
    mutationKey: [MUTATION_KEY],
  });

  return mutation;
};
