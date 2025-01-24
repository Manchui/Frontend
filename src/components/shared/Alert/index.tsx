import { createPortal } from 'react-dom';
import { useAlertStore } from '@/store/useAlertStore';

interface AlertProps {
  children: React.ReactNode;
  type?: 'region' | 'date';
}

export default function Alert({ children, type = 'region' }: AlertProps) {
  const { isAlertOpen, isDateAlertOpen, closeAlert, closeDateAlert } = useAlertStore();

  // type에 따라 서로 다른 상태와 핸들러 선택
  const isOpen = type === 'region' ? isAlertOpen : isDateAlertOpen;
  const closeHandler = type === 'region' ? closeAlert : closeDateAlert;

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeHandler();
      }}
    >
      <div className="rounded-xl bg-white p-4 shadow-2xl">{children}</div>
    </div>,
    document.body,
  );
}
