import { useState } from 'react';
import ReactDOM from 'react-dom';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/classNames';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttons: { label: string; onClick: () => void }[];
};

const buttonStyles = cva('h-[42px] w-full min-w-[120px] rounded-xl text-base font-semibold', {
  variants: {
    variant: {
      primary: 'bg-blue-800 text-white',
      secondary: 'border border-blue-800 bg-white text-blue-800',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export default function Modal({ isOpen, onClose, children, buttons = [] }: ModalProps) {
  const [animation, setAnimation] = useState<'animate-modal-open' | 'animate-modal-close'>('animate-modal-open');

  const handleClose = () => {
    setAnimation('animate-modal-close');

    setTimeout(() => {
      onClose();
      setAnimation('animate-modal-open');
    }, 350);
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cn('fixed inset-0 z-[9999] flex items-center justify-center bg-black/30', animation)} onClick={handleBackgroundClick}>
      <div className="rounded-xl bg-white drop-shadow-2xl">
        {children}
        <div className={cn('mt-4 flex gap-2 px-7 pb-7', buttons.length === 1 ? 'justify-center' : 'justify-between')}>
          {buttons.map((button, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                button.onClick();
                handleClose();
              }}
              className={cn(
                buttonStyles({
                  variant: buttons.length === 1 ? 'primary' : i === 0 ? 'secondary' : 'primary',
                }),
              )}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body,
  );
}
