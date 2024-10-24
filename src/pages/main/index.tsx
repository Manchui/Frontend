/* eslint-disable no-alert */
import Modal from '@/components/shared/Modal';
import { useModal } from '@/hooks/useModal';

export default function MainPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button type="button" onClick={openModal}>
        모달열기
      </button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        buttons={[
          { label: '취소', onClick: () => closeModal },
          { label: '확인', onClick: () => alert('확인 클릭됨') },
        ]}
      >
        <div className="pt-7 text-center font-semibold">
          <p>정말 나가시겠어요?</p>
          <p>작성된 내용이 모두 삭제됩니다.</p>
        </div>
      </Modal>
    </div>
  );
}
