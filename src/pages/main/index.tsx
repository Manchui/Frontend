import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';

export default function MainPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button type="button" onClick={openModal}>
        모달열기
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="md:w-[540px] md:px-[33px] m-auto px-[90px] pb-[28px] pt-[26px] text-right text-[18px]">
          <p className="pb-[43px] pt-[53px] text-center font-semibold">모달 컴포넌트</p>
          <span className="md:justify-end flex justify-center gap-2 font-semibold">
            <button type="button" className="h-[42px] w-[138px] rounded-[8px] bg-black text-white">
              확인
            </button>
            <button type="button" className="h-[42px] w-[138px] rounded-[8px] border border-black bg-white text-black" onClick={closeModal}>
              취소
            </button>
          </span>
        </div>
      </Modal>
    </div>
  );
}
