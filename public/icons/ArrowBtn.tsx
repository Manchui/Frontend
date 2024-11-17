import { Props, Svg } from "public/icons/SVG";


export interface ChevronIconProps extends Props {
  direction?: 'up' | 'right' | 'down' | 'left';
}


const DIRECTION_DEGREE = {
  up: 270,
  right: 0,
  down: 90,
  left: 180,
} as const;

// arrow-right.svg 이용해서 커스텀 가능하게 만들었습니다. ArrowBtn 컴포넌트로 다 변경해주시면 svg 파일은 삭제하겠습니다.
export default  function ArrowBtn({
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
      viewBox="0 0 20 20"
      fill={color}
      className={className}
      style={{ transform: `rotate(${rotationDegree}deg)` }}
      {...props}
    >
      <g clipPath="url(#clip0_187_28417)">
        <path d="M7.1582 13.825L10.9749 10L7.1582 6.175L8.3332 5L13.3332 10L8.3332 15L7.1582 13.825Z" />
      </g>
      <defs>
      <clipPath id="clip0_187_28417">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
      </defs>
    </Svg>
  );
}
