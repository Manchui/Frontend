/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Image from 'next/image';
import Calendar from '@/components/shared/Calendar';
import LongDropdown from '@/components/shared/Dropdown/LongDropdown';



const API_BASE_URL = axios.create({
  baseURL: 'http://localhost:3001/create', // 테스트
});
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
  const [isChipEnabled, setIsChipEnabled] = useState(false);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const [formData, setFormData] = useState<any>({});

  const category = ['운동', '영화', '공부', '문화/예술', '게임', '여행', '맛집', '음악'];
  const location = ['건대 입구', '을지로 3가', '신림', '홍대 입구', '성수', '여의도', '강남', '영등포', '잠실', '이태원'];
  const Num = Array.from({ length: 99 }).map((_, index) => (index + 2).toString());
  const currentTime = new Date();

  const handleDateApply = () => {
    const selectedDateObj = selectedDates.selectedDate && new Date(selectedDates.selectedDate);
    if (selectedDateObj && selectedDateObj > currentTime) {
      setIsChipEnabled(true);
    } else {
      
      alert('모임 생성은 최소 2일전부터 생성이 가능합니다.');
      setSelectedDates({ selectedDate: null });
      setIsChipEnabled(false);
    }
  };

  const handleDateReset = () => {
    setSelectedDates({ selectedDate: null });
    setSelectedTime(null);
    setIsChipEnabled(false);
  };

  const handleTimeSelect = (time: string) => {
    if (isChipEnabled) setSelectedTime(time);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleMinChange = (value: string) => setSelectedMinNum(value);
  const handleMaxChange = (value: string) => setSelectedMaxNum(value);
  // 이미지 삭제 핸들러
  // const handleImageRemove = () => {
  //   setSelectedImage(null);
  //   setPreviewImage(null);
  //   if (fileInputRef.current) fileInputRef.current.value = '';
  // };
  useEffect(() => {
    setFormData({
      groupName: name,
      gatheringContent: description,
      category: selectedCategory,
      location: selectedLocation,
      minUsers: 1, 
      maxUsers: 1, 
      gatheringDate: selectedDates.selectedDate,
      time: selectedTime,
      gatheringImage: selectedImage,
    });
  }, [name, description, selectedCategory, selectedLocation, selectedMinNum, selectedMaxNum, selectedDates, selectedTime, selectedImage]);

  const handleSubmit = async (): Promise<void> => {
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
    
    data.append('minUsers', JSON.stringify(5)); // 숫자 값
    data.append('maxUsers', JSON.stringify(5)); // 숫자 값
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
      await axios.post('http://13.125.48.255:8080/api/gathering', data, {
        headers: {
            // 'Content-Type': 'multipart/form-data',
            // 자동으로 form-data 설정됨
        },
      
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('등록 실패:', error.message);
      } else {
        console.error('등록 실패: 알 수 없는 에러', error);
      }
    }
    data.forEach((value, key) => {
      console.log(key, ':', value);
    });
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

      alert(`${missingFields.join(', ')}는 필수입니다.`);
    }
  };
  return (
    <>
      <header className="mb-5 mt-[60px] flex h-[97px] w-full items-center justify-center bg-blue-800 mobile:mb-10 mobile:h-[118px] tablet:h-[161px]">
        <h1 className="text-lg font-semibold text-white mobile:font-bold tablet:text-2xl">만취 모임 만들기</h1>
      </header>
      <div className="mx-auto flex max-w-[343px] flex-col items-center justify-center px-3 mobile:max-w-[744px] tablet:max-w-[1000px]">
        <main className="w-full space-y-6 mobile:space-y-10">
          <div>
            <h2 className="text-base font-semibold text-gray-900"> 모임 이름 </h2>
            <input
              placeholder=" 모임 이름을 작성해주세요"
              className="mt-3 h-11 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 text-sm font-medium"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 선택 서비스 </h2>

            <LongDropdown listDropdown={category} placeholder="서비스 카테고리를 정해주세요." onListChange={setSelectedCategory} />
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 모임 설명 </h2>
            <textarea
              placeholder=" 모임에 대한 설명을 작성해주세요."
              className="min-h-40 w-full rounded-xl border border-blue-100 bg-blue-50 pl-2 pt-3 text-sm font-medium"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 장소 </h2>

            <LongDropdown listDropdown={location} placeholder="모임 위치를 정해주세요." onListChange={setSelectedLocation} />
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900"> 모집 정원 </h2>
            <div className="flex w-full flex-col justify-center gap-2 mobile:flex-row mobile:justify-between tablet:gap-12">
              <div className="flex flex-1 items-center">
                <p className="mr-2 whitespace-nowrap text-sm font-medium">최소 인원 </p>
                <div className="flex-1">
                  <LongDropdown
                    listDropdown={Num}
                    placeholder="최소 정원을 정해주세요."
                    onListChange={handleMinChange}
                    maxValue={selectedMaxNum ? parseInt(selectedMaxNum) : undefined} 
                  />
                </div>
              </div>
              <div className="flex flex-1 items-center">
                <p className="mr-2 whitespace-nowrap text-sm font-medium">최대 인원 </p>
                <div className="flex-1">
                  <LongDropdown
                    listDropdown={Num}
                    placeholder="최대 정원을 정해주세요."
                    onListChange={handleMaxChange}
                    minValue={selectedMinNum ? parseInt(selectedMinNum) : undefined} 
                  />
                </div>
              </div>
            </div>
          </div>

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

            <div className="scrollbar-hidden flex shrink-0 space-x-1.5 overflow-x-auto">
              {Array.from({ length: 3 }, (_, index) => 9 + index).map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => handleTimeSelect(`${time}:00`)}
                  className={clsx(
                    'relative h-8 w-[60px] shrink-0 rounded-lg border text-sm font-medium text-gray-900',
                    selectedTime === `${time}:00` ? 'bg-blue-600 text-white' : 'bg-blue-50',
                    !isChipEnabled && 'cursor-not-allowed opacity-50',
                  )}
                  disabled={!isChipEnabled}
                >
                  {time}:00
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-semibold text-gray-900">오후</h2>

            <div className="scrollbar-hidden flex shrink-0 space-x-1.5 overflow-x-auto">
              {Array.from({ length: 7 }, (_, index) => 12 + index).map((time) => (
                <button
                  type="button"
                  key={time}
                  onClick={() => handleTimeSelect(`${time}:00`)}
                  className={clsx(
                    'relative h-8 w-[60px] shrink-0 rounded-lg border text-sm font-medium text-gray-900',
                    selectedTime === `${time}:00` ? 'bg-blue-600 text-white' : 'bg-blue-50',
                    !isChipEnabled && 'cursor-not-allowed opacity-50',
                  )}
                  disabled={!isChipEnabled}
                >
                  {time}:00
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <h2 className="mb-3 text-base font-semibold text-gray-900">이미지</h2>
              <span className="text-sm text-gray-400">({previewImage ? '1' : '0'}/1)</span>
            </div>

            <div className="scrollbar-hidden -mt-3 flex items-center space-x-3 overflow-x-auto">
              <button
                type="button"
                className="flex size-[100px] shrink-0 flex-col items-center justify-center rounded-lg border border-blue-200 text-sm font-medium text-blue-800 mobile:size-[150px] my-3"
                onClick={handleButtonClick}
              >
                <Image src="/icons/+.svg" alt="+" width={18} height={18} className="mb-2" />
                이미지 등록
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }} 
              />
              {previewImage && (
                <div className="relative my-3 size-[100px] shrink-0 rounded-lg border border-blue-200 mobile:size-[150px]">
                  <Image
                    src={previewImage}
                    alt="예시 이미지"
                    layout="fill" 
                    objectFit="cover" 
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-black opacity-60"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreviewImage(null);
                    }}
                  >
                    <Image src="/icons/x-white.svg" alt="닫기" width={12} height={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
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
