import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { cn } from '@/utils/classNames';

interface StateProps {
  stateProp: 'planed' | 'completed' | 'confirmed' | 'pending';
}

const setting = {
  planed: {
    style: 'bg-blue-100 text-blue-800 border-blue-100',
    text: '이용 예정',
  },
  completed: {
    style: 'bg-gray-50 text-gray-500 border-gray-50',
    text: '이용 완료',
  },
  confirmed: {
    style: 'bg-blue-800 text-white border-blue-800',
    text: '개설 확정',
  },
  pending: {
    style: 'bg-white text-gray-500 border-gray-100',
    text: '개설 대기',
  },
};

const ComponentVariants = cva(
  `
  flex w-fit rounded-full border p-2 text-xs
  `,
  {
    variants: {
      stateProp: {
        planed: setting.planed.style,
        completed: setting.completed.style,
        confirmed: setting.confirmed.style,
        pending: setting.pending.style,
      },
    },
  },
);

/**
 * State Chip Component
 * @param 이용 예정 - planned
 * @param 이용 완료 - completed
 * @param 개설 확정 - confirmed
 * @param 개설 대기 - pending
 * @returns
 */

export default function State({ stateProp }: StateProps) {
  const { text } = setting[stateProp];
  return (
    <div className={cn(ComponentVariants({ stateProp }))}>
      {stateProp === 'confirmed' && (
        <Image
          src="/icons/check.svg" // 아이콘의 경로를 여기에 입력하세요
          alt="Public Icon"
          width={16}
          height={16}
          className="mr-1"
        />
      )}
      {text}
    </div>
  );
}
