import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Toast } from '@/components/shared/Toast';
import { useAlertStore } from '@/store/useAlertStore';
import { useSetDateEnd, useSetDateStart } from '@/store/useFilterStore';

const Alert = dynamic(() => import('@/components/shared/Alert'), { loading: () => null, ssr: false });
const Calendar = dynamic(() => import('@/components/shared/Calendar'), {
  loading: () => <div className="flex size-[250px] items-center justify-center border border-blue-800">Loading...</div>,
  ssr: false,
});

export default function DateDropdown() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isApplyDisabled, setIsApplyDisabled] = useState<boolean>(false);

  const setDateStart = useSetDateStart();
  const setDateEnd = useSetDateEnd();

  const { openDateAlert, closeDateAlert } = useAlertStore();

  const handleDateChange = (data: { rangeEnd?: string; rangeStart?: string }) => {
    if (data.rangeStart) {
      setStartDate(data.rangeStart);
      setEndDate(null);
      setIsApplyDisabled(false);
    }
    if (data.rangeEnd) {
      setEndDate(data.rangeEnd);
      setIsApplyDisabled(false);
    }
  };

  const handleSubmit = useCallback(() => {
    if (startDate && endDate) {
      setDateStart(startDate);
      setDateEnd(endDate);
      setIsApplyDisabled(true);
      closeDateAlert();
      Toast('success', '날짜가 적용되었습니다.');
    } else {
      Toast('error', '날짜 범위를 선택하세요');
    }
  }, [closeDateAlert, endDate, setDateEnd, setDateStart, startDate]);

  const handleInitClick = useCallback(() => {
    if (!startDate && !endDate) {
      Toast('error', '날짜를 선택하세요');
      return;
    }

    if (startDate && endDate) {
      setStartDate(null);
      setEndDate(null);
      setDateStart(undefined);
      setDateEnd(undefined);
      setIsApplyDisabled(false);
      closeDateAlert();
      Toast('info', '날짜 선택이 초기화되었습니다.');
    }
  }, [startDate, endDate, setDateStart, setDateEnd, closeDateAlert]);

  return (
    <>
      <button
        type="button"
        onClick={openDateAlert}
        className={`relative flex h-9 shrink-0 items-center gap-1 rounded-lg border border-gray-100 px-3 duration-300 ${
          startDate && endDate ? 'bg-blue-800 text-white' : 'hover:bg-gray-50'
        }`}
      >
        {startDate && endDate ? (
          <span>
            {startDate.replace(/-/g, '.')} - {endDate.replace(/-/g, '.')}
          </span>
        ) : (
          <>
            <span className="hidden tablet:block">모임</span>
            <span>날짜</span>
          </>
        )}
        <Image
          src="/icons/down-arrow.svg"
          alt="드롭다운 화살표"
          width={16}
          height={16}
          priority
          loading="eager"
          className={`duration-300 ${startDate && endDate && 'rotate-180 invert'}`}
        />
      </button>
      <Alert type="date">
        <div className="flex flex-col gap-4 p-2 tablet:p-4">
          <Calendar selectionType="range" onDateChange={handleDateChange} startDate={startDate} endDate={endDate} isApplyDisabled={isApplyDisabled} />
          <div className="flex h-[40px] justify-center gap-2 text-sm font-semibold tablet:text-base">
            <button type="button" onClick={handleInitClick} className="w-[120px] rounded-xl border border-blue-800 hover:bg-black/10">
              초기화 하기
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isApplyDisabled}
              className={`w-[120px] rounded-xl ${
                isApplyDisabled ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'bg-blue-800 text-white hover:bg-blue-700'
              }`}
            >
              적용하기
            </button>
          </div>
        </div>
      </Alert>
    </>
  );
}
