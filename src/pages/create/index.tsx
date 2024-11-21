/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable radix */

import { useState } from 'react';
import clsx from 'clsx';
import router from 'next/router';
import { instance } from '@/apis/api';
import { CapacityDropdown } from '@/components/create/CapacityDropdown';
import { CategoryDropdown } from '@/components/create/CategoryDropdown';
import { DescriptionInput } from '@/components/create/DescriptionInput';
import { GroupNameInput } from '@/components/create/GroupNameInput';
import ImageUploader from '@/components/create/ImageUploader';
import { LocationDropdown } from '@/components/create/LocationDropdown';
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
    selectedDate?: string | null;
  }>({});
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeChips, setTimeChips] = useState<TimeChip[]>([...Array.from({ length: 10 }, (_, i) => ({ time: 9 + i, disable: true }))]);

  const exampleCurrentDate = new Date();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const fields = [
    { value: name, label: '모임 이름' },
    { value: description, label: '모임 설명' },
    { value: selectedCategory, label: '카테고리' },
    { value: selectedLocation, label: '장소' },
    { value: selectedMinNum, label: '최소 인원' },
    { value: selectedMaxNum, label: '최대 인원' },
    { value: selectedDates.selectedDate, label: '날짜' },
    { value: selectedTime, label: '시간' },
    { value: selectedImage, label: '이미지' },
  ];
  const handleInputChange = (fieldName: string) => (value: any) => {
    switch (fieldName) {
      case '모임 이름':
        setName(value);
        break;
      case '모임 설명':
        setDescription(value);
        break;
      case '카테고리':
        setSelectedCategory(value);
        break;
      case '장소':
        setSelectedLocation(value);
        break;
      case '최소 인원':
        setSelectedMinNum(value);
        break;
      case '최대 인원':
        setSelectedMaxNum(value);
        break;
      case '날짜':
        setSelectedDates({ selectedDate: value });
        break;
      case '시간':
        setSelectedTime(value);
        break;
      case '이미지':
        setSelectedImage(value);
        break;
      default:
        break;
    }

    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }
    if (fieldName === '모임 이름' && value) {
      if (value.length < 3 || value.length > 10) {
        setErrors((prev) => ({ ...prev, [fieldName]: '3자 이상 10자 이하로 입력하세요.' }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: '' }));
      }
    }
    if (fieldName === '모임 설명' && value) {
      if (value.length < 10 || value.length > 255) {
        setErrors((prev) => ({ ...prev, [fieldName]: '10자 이상 255자 이하로 입력하세요.' }));
      } else {
        setErrors((prev) => ({ ...prev, [fieldName]: '' }));
      }
    }
  };

  const handleDateReset = () => {
    setSelectedDates({ selectedDate: null });
    setSelectedTime('');
    setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: true })));
  };

  const handleDateSelect = (data: { rangeStart?: string }) => {
    const { rangeStart } = data;

    if (rangeStart) {
      setSelectedDates({ selectedDate: rangeStart });
      handleInputChange('날짜')(rangeStart);
    }
  };
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    handleInputChange('시간')(time);
  };

  const handleDateApply = () => {
    if (!selectedDates.selectedDate) return;

    const selectedDate = new Date(selectedDates.selectedDate);
    const hoursLater29 = new Date(exampleCurrentDate.getTime() + 29 * 60 * 60 * 1000);

    const nextDay = new Date(exampleCurrentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // 1. 셀렉된 날짜가 29시간 후보다 큰 경우
    if (selectedDate > hoursLater29) {
      setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: false })));
    }

    // 2. 셀렉된 날짜가 29시간 후보다 작은 경우
    else if (selectedDate.toDateString() < hoursLater29.toDateString()) {
      Toast('error', '모임 생성은 이틀 뒤부터 가능합니다.');
      handleDateReset();
    }

    // 3. 셀렉된 날짜와 29시간 후가 같은 경우
    else {
      const currentHour = exampleCurrentDate.getHours();
      const hoursLater29Hour = hoursLater29.getHours();

      // 29시간 후의 시간이 9시부터 18시 사이일 때
      if (hoursLater29Hour >= 9 && hoursLater29Hour < 18) {
        setTimeChips((prevChips) =>
          prevChips.map((chip) => ({
            ...chip,
            disable: chip.time <= hoursLater29Hour,
          })),
        );
      } else if (currentHour >= 19 && currentHour < 24) {
        Toast('error', '모임 생성은 이틀 뒤부터 가능합니다.');
        handleDateReset();
      } else if (currentHour >= 0 && currentHour < 9) {
        setTimeChips((prevChips) => prevChips.map((chip) => ({ ...chip, disable: false })));
      }
      // 29시간 후의 시간이 18시 이후일 때
      else if (hoursLater29Hour >= 18) {
        Toast('error', '모임 생성은 이틀 뒤부터 가능합니다.');
        handleDateReset();
      }
    }
  };

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    let hasRequiredErrors = false;
    const validationErrors: string[] = [];

    fields.forEach((field) => {
      if (!field.value) {
        newErrors[field.label] = `${field.label}`;
        hasRequiredErrors = true;
      }
    });

    if (name && (name.length < 3 || name.length > 10)) {
      newErrors['모임 이름'] = '3자 이상 10자 이하로 입력하세요.';
      validationErrors.push('모임 이름은 3자 이상 10자 이하로 ');
    }

    if (description && (description.length < 10 || description.length > 255)) {
      newErrors['모임 설명'] = '10자 이상 255자 이하로 입력하세요.';
      validationErrors.push('모임 설명은 10자 이상 255자 이하로 ');
    }

    if (hasRequiredErrors || validationErrors.length > 0) {
      setErrors(newErrors);
      if (hasRequiredErrors) {
        const requiredErrorMessage = Object.keys(newErrors)
          .map((key) => newErrors[key])
          .filter((message) => message.length < 10)
          .join(', ');
        Toast('error', `${requiredErrorMessage}은(는) 필수입니다.`);
        return true;
      }
      if (validationErrors.length > 0) {
        const validationErrorsMessage = validationErrors.join(', ');
        Toast('error', `${validationErrorsMessage} 입력해야 합니다.`);
      }

      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = validateFields();
    if (hasErrors) {
      return;
    }
    const data = new FormData();
    let formattedDateTime = '';

    if (selectedDates.selectedDate && selectedTime) {
      const dateOnly = selectedDates.selectedDate.split('T')[0];
      const [hour] = selectedTime.split(':');
      const formattedHour = hour.padStart(2, '0');

      formattedDateTime = `${dateOnly} ${formattedHour}:00:00`;
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
      await instance.post('/api/gatherings', data, {
        headers: {
          // 'Authorization': localStorage.getItem('accessToken'),
          'Content-Type': 'multipart/form-data',
          // 자동으로 form-data 설정됨
        },
      });
      Toast('success', '모임 생성 성공');
      void router.push('/');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message ||
        (err.response?.status === 403
          ? '권한이 없습니다. 다시 로그인해 주세요.'
          : err.response?.status === 404
            ? '요청한 리소스를 찾을 수 없습니다.'
            : err.response?.status >= 500
              ? '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
              : err.message || '알 수 없는 오류가 발생했습니다');

      Toast('error', errorMessage);
    }
  };

  return (
    <>
      <header className="mt-[60px] flex h-[97px] w-full items-center justify-center bg-blue-800 mobile:mb-10 mobile:h-[118px] tablet:h-[161px]">
        <h1 className="text-lg font-semibold text-white mobile:font-bold tablet:text-2xl">만취 모임 만들기</h1>
      </header>
      <div className="mx-auto mb-8 mt-5 flex max-w-[343px] flex-col items-center justify-center px-3 mobile:max-w-[744px] tablet:max-w-[1000px]">
        <form onSubmit={handleSubmit} className="w-full space-y-6 mobile:space-y-10">
          <GroupNameInput name={name} setName={handleInputChange('모임 이름')} error={errors['모임 이름']} />

          <CategoryDropdown setSelectedCategory={handleInputChange('카테고리')} error={errors['카테고리']} />

          <DescriptionInput description={description} setDescription={handleInputChange('모임 설명')} error={errors['모임 설명']} />

          <LocationDropdown setSelectedLocation={handleInputChange('장소')} error={errors['장소']} />

          <CapacityDropdown
            selectedMaxNum={selectedMaxNum}
            selectedMinNum={selectedMinNum}
            setSelectedMinNum={handleInputChange('최소 인원')}
            setSelectedMaxNum={handleInputChange('최대 인원')}
            errorMin={errors['최소 인원']}
            errorMax={errors['최대 인원']}
          />

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 날짜 </h2>
            <div className="flex h-[322px] w-full flex-col items-center justify-center rounded-lg border border-blue-200 shadow">
              <Calendar selectionType="single" onDateChange={handleDateSelect} startDate={selectedDates.selectedDate as string} />
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
            {errors['날짜'] && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">날짜를 선택하세요.</p>}
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">오전</h2>
            <div className="scrollbar-hide mb-3 flex shrink-0 space-x-1.5 overflow-x-auto">
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
            {errors['시간'] && <p className="-mb-5 mt-1 text-sm font-medium text-red-500">시간을 선택하세요.</p>}
          </div>

          <ImageUploader setSelectedImage={handleInputChange('이미지')} error={errors['이미지']} />
          <footer className="my-8 flex w-full gap-2">
            <button
              type="button"
              onClick={handleDateReset}
              className="h-10 w-full rounded-xl border border-blue-800 bg-white text-blue-800 hover:border-blue-400 hover:text-blue-400"
            >
              취소
            </button>
            <button type="submit" className="h-10 w-full rounded-xl bg-blue-800 text-white hover:bg-blue-700">
              등록하기
            </button>
          </footer>
        </form>
      </div>
    </>
  );
}
