import type { ComponentProps } from 'react';
import cx from 'clsx';

interface ButtonProps extends ComponentProps<'button'> {
  /** 버튼 내용 */
  label: string;
  /** 버튼 크기 */
  size: 'primary' | 'small' | 'large';
  /** 버튼 스타일 */
  variant: 'primary' | 'danger' | 'white';
}

/**
 * 버튼 컴포넌트
 * 
 * @example
  <Button disabled variant="primary" label="Button" size="primary" />
  * 
  * @param label 버튼 안에 들어갈 글자
  * @param size 버튼 사이즈
  * @param variant 버튼 스타일
  * @param ...props 그 외 필요한 버튼 속성들을 추가할 수 있습니다.
  */
export function Button({ variant = 'primary', label, size, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cx(
        'flex cursor-pointer items-center justify-center rounded-xl px-[30px] py-[10px] text-sm duration-200 hover:scale-[1.02] active:scale-[0.9] disabled:scale-100 disabled:cursor-not-allowed md:text-base',
        {
          'bg-blue-800 text-white hover:bg-blue-700 disabled:bg-gray-400': variant === 'primary',
          'bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-400': variant === 'danger',
          'border border-blue-800 bg-white text-blue-800 hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400': variant === 'white',
          '': size === 'primary',
          'h-[40px] w-[120px]': size === 'small',
          'h-[44px] w-[332px]': size === 'large',
        },
      )}
      {...props}
    >
      {label}
    </button>
  );
}
