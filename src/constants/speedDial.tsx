import type { ReactNode } from 'react';
import SpeedCreate from '@/components/main/SpeedDial/SpeedCreate';
import SpeedIntroduce from '@/components/main/SpeedDial/SpeedIntroduce';
import SpeedReview from '@/components/main/SpeedDial/SpeedReview';
import type { InternalPaths } from '@/hooks/useInternalRouter';

interface SpeedDialButton {
  icon: ReactNode;
  label: string;
  link: InternalPaths;
}

export const SPEED_DIAL_BUTTONS: SpeedDialButton[] = [
  {
    label: '개발자 소개',
    icon: <SpeedIntroduce color="lightgray" />,
    link: '/introduce',
  },
  {
    label: '모든 리뷰',
    icon: <SpeedReview color="lightgray" />,
    link: '/review',
  },
  {
    label: '모임 만들기',
    icon: <SpeedCreate color="lightgray" />,
    link: '/create',
  },
];
