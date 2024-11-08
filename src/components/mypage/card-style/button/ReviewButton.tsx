import { useState } from 'react';
import createReview from '@/apis/mypage/post-reviews';
import { Button } from '@/components/shared/button';
import Modal from '@/components/shared/Modal';
import Rating from '@/components/shared/Rating';
import { Toast } from '@/components/shared/Toast';
import { useModal } from '@/hooks/useModal';
import type { GatheringList } from '@/types/mypage';
import { useMutation } from '@tanstack/react-query';

export default function ReviewButton({ data }: { data: GatheringList }) {
  const { isOpen, openModal, closeModal } = useModal();
  const [value, setValue] = useState('');
  const [isScore, setIsScore] = useState(0);
  const [isError, setIsError] = useState('');

  const mutation = useMutation({
    mutationFn: () => createReview(data.gatheringId, value, isScore),
    onSuccess: () => {
      Toast('success', '리뷰 작성 했습니다.');
    },
    onError: (error) => {
      setIsError(error.message);
      Toast('error', error.message);
    },
  });
  const errorMessage = isError === '리뷰' ? `${isError}을 입력하세요.` : isError;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textAreaValue = e.target.value;
    setValue(textAreaValue);
  };

  return (
    <div>
      <Button onClick={openModal} label="리뷰 작성하기" size="small" variant="primary" />
      <Modal
        buttons={[
          {
            label: '취소',
            onClick: () => closeModal(),
          },
          {
            label: '리뷰 등록하기',
            onClick: () => {
              mutation.mutate();
              closeModal();
            },
          },
        ]}
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div className="mx-6 mt-10 space-y-6">
          <div>
            <span className="text-2lg font-semibold">리뷰 쓰기 </span>
          </div>
          <div className="space-y-3 text-2lg font-semibold">
            <span>만족스러운 경험이었나요?</span>
            <Rating score={isScore} onChange={setIsScore} />
          </div>
          <div className="space-y-3">
            <span className="text-2lg font-semibold">경험에 대해 남겨주세요.</span>
            <textarea
              value={value}
              placeholder="남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다."
              className="h-[120px] w-full resize-none rounded-xl bg-blue-50 p-2 px-4"
              onChange={handleChange}
            />
            {isError && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">{errorMessage}</p>}
          </div>
        </div>
      </Modal>
    </div>
  );
}
