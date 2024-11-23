import type { Props } from '@/components/shared/Svg';
import { Svg } from '@/components/shared/Svg';

export default  function Search({
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
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5 11C16.5 14.0376 14.0376 16.5 11 16.5C7.96243 16.5 5.5 14.0376 5.5 11C5.5 7.96243 7.96243 5.5 11 5.5C14.0376 5.5 16.5 7.96243 16.5 11ZM15.5836 16.2907C14.3556 17.3556 12.753 18 11 18C7.13401 18 4 14.866 4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.5723 17.4816 14.0236 16.6064 15.1922L20.3033 18.8891L19.2426 19.9497L15.5836 16.2907Z" />
  </Svg>  
  );
}
