import { cva } from 'class-variance-authority';
import { cn } from '@/utils/classNames';
import Image from 'next/image';

interface StateProps {
  stateProp: 'planed' | 'completed' | 'confirmed' | 'pending';
}

const setting = {
  planed: {
    style: 'bg-[#FEF5D7] text-yellow-400 border-[#FEF5D7]',
    text: '이용 예정',
  },
  completed: {
    style: 'bg-gray-50 text-gray-500 border-gray-50',
    text: '이용 완료',
  },
  confirmed: {
    style: 'text-yellow-400 border-yellow-300',
    text: '개설 확정',
  },
  pending: {
    style: 'text-gray-400',
    text: '개설 대기',
  },
};

const ComponentVariants = cva(
  `
  m-4 flex w-fit rounded-full border-[1px] p-2 text-xs
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
