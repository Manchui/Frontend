/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable radix */

import { useEffect, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import instance from '@/apis/api';
import { CapacityDropdown } from '@/components/Create/CapacityDropdown';
import { CategoryDropdown } from '@/components/Create/CategoryDropdown';
import { DescriptionInput } from '@/components/Create/DescriptionInput';
import { GroupNameInput } from '@/components/Create/GroupNameInput';
import ImageUploader from '@/components/Create/ImageUploader';
import { LocationDropdown } from '@/components/Create/LocationDropdown';
import Calendar from '@/components/shared/Calendar';
import { Toast } from '@/components/shared/Toast';

type TimeChip = {
  disable: boolean;
  time: number;
};

export default function CreatePage() {
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedMinNum, setSelectedMinNum] = useState<string | null>(null);
  const [selectedMaxNum, setSelectedMaxNum] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<{
    selectedDate?: string | null; // 검사 날짜 추가
  }>({});
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeChips, setTimeChips] = useState<TimeChip[]>([...Array.from({ length: 10 }, (_, i) => ({ time: 9 + i, disable: true }))]);
  const exampleCurrentDate = new Date();

  const [isChipEnabled, setIsChipEnabled] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [error, setError] = useState('');

  // 날짜 초기화 함수
  const handleDateReset = () => {
    setSelectedDates({ selectedDate: null });
    setSelectedTime('');
    setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: true })));
  };

  // 시간 선택 함수 - 단일 선택
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleDateApply = () => {
    if (!selectedDates.selectedDate) return;

    const selectedDate = new Date(selectedDates.selectedDate);
    const hoursLater29 = new Date(exampleCurrentDate.getTime() + 29 * 60 * 60 * 1000);
    const nextDay = new Date(exampleCurrentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // 29시간 후가 같은 날에 있다면, 그 이후로 활성화
    if (selectedDate.toDateString() === hoursLater29.toDateString() && hoursLater29.getHours() < 18) {
      setTimeChips((prevChips) =>
        prevChips.map((chip) => ({
          ...chip,
          disable: chip.time <= hoursLater29.getHours(),
        })),
      );
    }

    // 29시간 후가 오후 6시 이후일 경우: 날짜 초기화 및 에러 표시
    else if (
      (selectedDate.toDateString() === hoursLater29.toDateString() && hoursLater29.getHours() >= 18) ||
      (selectedDate.toDateString() === nextDay.toDateString() && exampleCurrentDate.getHours() >= 19)
    ) {
      Toast('error', '모임 생성은 이틀뒤부터 가능합니다.');

      handleDateReset();
    }
    // 29시간 후가 다음날 9시 이전이면 해당 날짜의 모든 시간대를 활성화
    else if (selectedDate > hoursLater29 || hoursLater29.getHours() < 9) {
      setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: false })));
    } else {
      setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: true })));
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    let formattedDateTime = '';

    // 날짜와 시간 결합
    if (selectedDates.selectedDate && selectedTime) {
      formattedDateTime = `${selectedDates.selectedDate} ${selectedTime}:00`;
    }

    data.append('groupName', name || ''); // 텍스트 값
    data.append('gatheringContent', description || ''); // 텍스트 값
    data.append('category', selectedCategory || ''); // 텍스트 값
    data.append('location', selectedLocation || ''); // 텍스트 값

    data.append('minUsers', JSON.stringify(Number(selectedMinNum))); // 숫자 값
    data.append('maxUsers', JSON.stringify(Number(selectedMaxNum))); // 숫자 값
    data.append('gatheringDate', formattedDateTime); // 텍스트 값

    // 이미지 파일 추가
    if (selectedImage) {
      data.append('gatheringImage', selectedImage); // File 객체
    }

    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart-form-data',
    //   },
    //   body: JSON.stringify({
    //     data,
    //   }),
    // };

    try {
      await instance.post('/api/gathering', data, {
        headers: {
          // 'Content-Type': 'multipart/form-data',
          // 자동으로 form-data 설정됨
        },
      });
    } catch (err: any) {
      setError(err);
      Toast('error', '서버연걸실패하였습니다.');
    }

    if (
      !name ||
      !description ||
      !selectedCategory ||
      !selectedLocation ||
      !selectedMinNum ||
      !selectedMaxNum ||
      !selectedDates ||
      !selectedTime ||
      !selectedImage
    ) {
      const missingFields = [];

      if (!name) missingFields.push('모임 이름');
      if (!description) missingFields.push('설명');
      if (!selectedCategory) missingFields.push('카테고리');
      if (!selectedLocation) missingFields.push('위치');
      if (!selectedMinNum) missingFields.push('최소 인원 수');
      if (!selectedMaxNum) missingFields.push('최대 인원 수');
      if (!selectedDates) missingFields.push('날짜');
      if (!selectedTime) missingFields.push('시간');
      if (!selectedImage) missingFields.push('이미지');

      Toast('warning', `${missingFields.join(', ')}는 필수입니다.`);
    }
  };
  return (
    <>
      <header className="mb-5 mt-[60px] flex h-[97px] w-full items-center justify-center bg-blue-800 mobile:mb-10 mobile:h-[118px] tablet:h-[161px]">
        <h1 className="text-lg font-semibold text-white mobile:font-bold tablet:text-2xl">만취 모임 만들기</h1>
      </header>
      <div className="mx-auto flex max-w-[343px] flex-col items-center justify-center px-3 mobile:max-w-[744px] tablet:max-w-[1000px]">
        <main className="w-full space-y-6 mobile:space-y-10">
          <GroupNameInput name={name} setName={setName} />

          <CategoryDropdown setSelectedCategory={setSelectedCategory} />

          <DescriptionInput description={description} setDescription={setDescription} />

          <LocationDropdown setSelectedLocation={setSelectedLocation} />

          <CapacityDropdown
            selectedMaxNum={selectedMaxNum}
            selectedMinNum={selectedMinNum}
            setSelectedMinNum={setSelectedMinNum}
            setSelectedMaxNum={setSelectedMaxNum}
          />

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 날짜 </h2>
            <div className="flex h-[322px] w-full flex-col items-center justify-center rounded-lg border border-blue-200 shadow">
              <Calendar selectionType="single" onDateChange={setSelectedDates} />
              <div className="-mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleDateReset}
                  className="h-10 w-[120px] rounded-xl border-2 border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
                >
                  초기화하기
                </button>
                <button
                  type="button"
                  onClick={handleDateApply}
                  className={`h-10 w-[120px] rounded-xl ${selectedDates.selectedDate ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500'}`}
                >
                  적용하기
                </button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">오전</h2>
            <div className="scrollbar-hide flex shrink-0 space-x-1.5 overflow-x-auto">
              {timeChips.slice(0, 3).map((chip) => (
                <button
                  type="button"
                  key={chip.time}
                  onClick={() => !chip.disable && handleTimeSelect(`${chip.time}:00`)}
                  disabled={chip.disable}
                  className={clsx(
                    'relative h-8 w-[60px] shrink-0 rounded-lg border text-sm font-medium text-gray-900',
                    selectedTime === `${chip.time}:00` ? 'bg-blue-600 text-white' : 'bg-blue-50',
                    chip.disable && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {chip.time}:00
                </button>
              ))}
            </div>

            <h2 className="mb-3 text-base font-semibold text-gray-900">오후</h2>
            <div className="scrollbar-hide flex shrink-0 space-x-1.5 overflow-x-auto">
              {timeChips.slice(3).map((chip) => (
                <button
                  type="button"
                  key={chip.time}
                  onClick={() => !chip.disable && handleTimeSelect(`${chip.time}:00`)}
                  disabled={chip.disable}
                  className={clsx(
                    'relative h-8 w-[60px] shrink-0 rounded-lg border text-sm font-medium text-gray-900',
                    selectedTime === `${chip.time}:00` ? 'bg-blue-600 text-white' : 'bg-blue-50',
                    chip.disable && 'cursor-not-allowed opacity-50',
                  )}
                >
                  {chip.time}:00
                </button>
              ))}
            </div>
          </div>
          <ImageUploader setSelectedImage={setSelectedImage} />
        </main>
        <footer className="my-8 flex w-full gap-2">
          <button
            type="button"
            onClick={handleDateReset}
            className="h-10 w-full rounded-xl border border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
          >
            취소
          </button>
          <button type="button" onClick={handleSubmit} className="h-10 w-full rounded-xl bg-blue-800 text-white hover:bg-blue-700">
            등록하기
          </button>
        </footer>
      </div>
    </>
  );
}
