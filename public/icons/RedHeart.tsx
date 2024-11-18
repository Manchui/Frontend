import type { Props } from '@/components/shared/Svg';
import { Svg } from '@/components/shared/Svg';

// heart-red, heart-outline 이용해서 커스텀 가능하게 만들었습니다. 변경해주시면 svg 파일은 삭제하겠습니다.
export default function RedHeart({
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
    <path d="M4.95067 13.9082L11.9033 20.4395C12.1428 20.6644 12.2625 20.7769 12.4037 20.8046C12.4673 20.8171 12.5327 20.8171 12.5963 20.8046C12.7375 20.7769 12.8572 20.6644 13.0967 20.4395L20.0493 13.9082C22.0055 12.0706 22.243 9.0466 20.5978 6.92607L20.2885 6.52734C18.3203 3.99058 14.3696 4.41601 12.9867 7.31365C12.7913 7.72296 12.2087 7.72296 12.0133 7.31365C10.6304 4.41601 6.67972 3.99058 4.71154 6.52735L4.40219 6.92607C2.75695 9.0466 2.9945 12.0706 4.95067 13.9082Z"  />
  </Svg>
  );
}
