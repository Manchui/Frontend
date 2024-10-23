import Calendar from '@/components/shared/Calendar';
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';

export default function MainPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flet h-screen items-center justify-center">
      <button type="button" onClick={openModal} className="flex h-screen w-full items-center justify-center">
        캘린더열기
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="min-w-[472px] py-10">
          <Calendar selectionType='single' />
          <Calendar selectionType='range' />
        </div>
      </Modal>
    </div>
  );
}
