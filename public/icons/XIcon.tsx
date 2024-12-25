import type { Props } from '@/components/shared/Svg';
import { Svg } from '@/components/shared/Svg';

export default  function XIcon({
  color = '#FFFFFF',
  className,
  ...props
}: Props) {

  return (
    <Svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    {...props}
    >
    <path d="M5 5L19.5 19.5" stroke="#3B3B3B" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M19.5 5L5 19.5" stroke="#3B3B3B" strokeWidth="1.8" strokeLinecap="round"/>
  </Svg>  
  );
}
