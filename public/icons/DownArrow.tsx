import type { Props } from '@/components/shared/Svg';
import { Svg } from '@/components/shared/Svg';

export interface ChevronIconProps extends Props {
  direction?: 'up' | 'right' | 'down' | 'left';
}

const DIRECTION_DEGREE = {
  up: 180,
  right: 270,
  down: 0,
  left: 90,
} as const;

// down-white, down-arrow 이용해서 커스텀 가능하게 만들었습니다. DownArrow 변경해주시면 svg 파일은 삭제하겠습니다.
export default  function DownArrow({
  direction = 'right',
  color = '#FFFFFF',
  className,
  ...props
}: ChevronIconProps) {
  const rotationDegree = DIRECTION_DEGREE[direction];

  return (
    <Svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    style={{ transform: `rotate(${rotationDegree}deg)` }}
    {...props}
    >
    <path d="M12.7151 15.4653C12.3975 15.7654 11.9008 15.7654 11.5832 15.4653L5.8047 10.006C5.26275 9.49404 5.6251 8.58286 6.37066 8.58286L17.9276 8.58286C18.6732 8.58286 19.0355 9.49404 18.4936 10.006L12.7151 15.4653Z" />
  </Svg>
  );
}
