import { cx } from 'class-variance-authority';
// import * as m from 'framer-motion/m';

export function Tooltip({ children, tooltipText, className }: { children: React.ReactNode; className?: string; tooltipText: string }) {
  return (
    <div className={cx('group relative', className)}>
      {children}
      <div className="absolute bottom-[150%] hidden -translate-x-1/4 text-blue-50 group-hover:block">
        <div className="relative">
          <div className="whitespace-nowrap rounded-lg bg-blue-800 px-3 py-2 text-center text-[12px]">{tooltipText}</div>
          <div className="absolute left-1/2 -mt-2.5 size-3 -translate-x-1/2 rotate-45 bg-blue-800" />
        </div>
      </div>
    </div>
  );
}
