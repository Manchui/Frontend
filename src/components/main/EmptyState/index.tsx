import Lottie from 'lottie-react';
import { MessageWithLink } from '@/components/main/CardSection';
import { useSetCategory } from '@/store/useFilterStore';

import Empty from 'public/lottie/empty.json';

export default function EmptyState() {
  const setCategory = useSetCategory();

  return (
    <div className="absolute left-1/2 w-full -translate-x-1/2">
      <Lottie animationData={Empty} className="h-empty fill-background" />
      <MessageWithLink onClick={() => setCategory('')} message="아직 등록된 모임이 없어요" buttonText="더 둘러보기" />
    </div>
  );
}
