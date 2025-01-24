import { useCallback, useState } from 'react';
import { Toast } from '@/components/shared/Toast';
import { useSetCloseDate } from '@/store/useFilterStore';

export default function CloseDateToggle() {
  const [toggleValue, setToggleValue] = useState<boolean>(false);
  const setCloseDate = useSetCloseDate();

  const handleCloseDateFilterToggle = useCallback(() => {
    setToggleValue(!toggleValue);
    setCloseDate(!toggleValue ? 'closeDate' : '');

    if (!toggleValue) {
      Toast('success', '마감순으로 정렬되었습니다.');
    } else {
      Toast('info', '최신순으로 정렬되었습니다.');
    }
  }, [setCloseDate, toggleValue]);

  return (
    <button
      type="button"
      onClick={handleCloseDateFilterToggle}
      className={`h-9 rounded-lg border border-gray-100 px-3 duration-300 ${toggleValue ? 'bg-blue-800 text-white' : 'hover:bg-gray-50'}`}
    >
      마감임박
    </button>
  );
}
