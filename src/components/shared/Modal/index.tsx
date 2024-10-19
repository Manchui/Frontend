import { type ReactNode, useState } from 'react';
import ReactDOM from 'react-dom';

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Modal 컴포넌트
 *
 * @property {boolean} isOpen - Modal Open 여부
 * @property {() => void} onClose - Modal Close 함수
 * @property {React.ReactNode} children - render props 방식으로, 모달 내부의 콘텐츠를 렌더링하는 함수. handleClose를 인자로 받아서 모달을 닫을 수 있음
 */

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [animation, setAnimation] = useState<'animate-modal-open' | 'animate-modal-close'>('animate-modal-open');

  const handleClose = () => {
    setAnimation('animate-modal-close');

    setTimeout(() => {
      onClose();
      setAnimation('animate-modal-open');
    }, 350);
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // 배경 클릭 시 모달 닫기
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 ${animation}`} onClick={handleBackgroundClick}>
      <div className="rounded-xl bg-white drop-shadow-2xl">{children}</div>
    </div>,
    document.body,
  );
}
