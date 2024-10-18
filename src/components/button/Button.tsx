export interface ButtonProps {
  color: 'primary' | 'test';
  /** 버튼 안에 들어갈 문자 */
  label: string;
  /** 버튼 크기 */
  size?: 'small' | 'large';
}

/** 버튼 컴포너트입니다. */
export function Button({ color = 'primary', label, ...props }: ButtonProps) {
  return (
    <button type="button" className="rounded-xl bg-slate-300 px-[35.5px] py-[10px] font-bold hover:text-stone-200" {...props}>
      {label}
      {color}
    </button>
  );
}
