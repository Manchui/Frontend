interface SkeletonProps {
  className?: string;
}

/**
 * Skeleton 컴포넌트
 * @param className - Tailwind 클래스 (width, height, 기타 스타일링)
 */

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-slate-200 ${className}`}>
      <div className="absolute inset-0 animate-skeleton bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
    </div>
  );
}
