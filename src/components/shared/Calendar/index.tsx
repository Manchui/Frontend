import Image from 'next/image';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';
import { useState } from 'react';
import RenderCalendar from '@/components/shared/Calendar/RenderCalendar';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const handleDateSelection = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="flet h-screen items-center justify-center">
      <button type="button" onClick={openModal} className="flex h-screen w-full items-center justify-center">
        캘린더열기
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-10">
          {/* 나중에 제거하기 */}
          <div className="min-h-[326px] min-w-[336px] rounded-xl border border-gray-200 px-11 py-6">
            <div className="flex items-center justify-between">
              <Image
                src="./assets/icons/left.svg"
                alt="Previous Btn"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              />
              <span className="text-sm font-medium text-gray-800">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Image
                src="./assets/icons/right.svg"
                alt="Previous Btn"
                width={24}
                height={24}
                className="cursor-pointer"
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
              />
            </div>
            <div className="mt-3 grid grid-cols-7 gap-[2px]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-semibold text-gray-800">
                  {day}
                </div>
              ))}
              <RenderCalendar currentDate={currentDate} handleDateSelection={handleDateSelection} selectedDate={selectedDate} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
