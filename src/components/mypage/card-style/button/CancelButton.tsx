import deleteCancellation from '@/apis/detail/delete-cancel';
import { Button } from '@/components/shared/button';
import { Toast } from '@/components/shared/Toast';
import { useMutation } from '@tanstack/react-query';

export default function CancelButton({ id }: { id: number }) {
  const mutation = useMutation({
    mutationFn: () => deleteCancellation(id),
    onSuccess: (data) => {
      console.log('취소 성공 data: ', data);
    },
    onError: (error) => {
      Toast('error', error.message);
    },
  });

  return <Button onClick={() => mutation.mutate()} label="취소하기" size="primary" variant="white" />;
}
