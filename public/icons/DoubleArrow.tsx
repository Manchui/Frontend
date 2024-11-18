import { Props, Svg } from 'public/icons/SVG';


export interface ChevronIconProps extends Props {
  direction?: 'up' | 'right' | 'down' | 'left';
}


const DIRECTION_DEGREE = {
  up: 90,
  right: 180,
  down: 270,
  left: 0,
} as const;

export default  function DoubleArrow({
  direction = 'right',
  color = '#FFFFFF',
  className,
  ...props
}: ChevronIconProps) {
  const rotationDegree = DIRECTION_DEGREE[direction];

  return (
    <Svg 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    fill={color} 
    className={className}
    style={{ transform: `rotate(${rotationDegree}deg)` }}
    {...props}
    >
    <path d="M7.83,15l8.58-8.59a2,2,0,0,0-2.82-2.82l-10,10a2,2,0,0,0,0,2.82l10,10a2,2,0,0,0,2.82-2.82Z"/><path d="M19.83,15l8.58-8.59a2,2,0,0,0-2.82-2.82l-10,10a2,2,0,0,0,0,2.82l10,10a2,2,0,0,0,2.82-2.82Z"/>
  </Svg>
  );
}
