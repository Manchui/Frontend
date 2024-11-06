import { useEffect, useState } from 'react';
import Device from '@/constants/device';
import { useMediaQuery } from '@/hooks/useMediaQeury';

/**
 * useDeviceState는 useMediaQuery 커스텀 훅을 이용해 화면 너비에 따라 디바이스별 상태(Mobile, Tablet, PC)를 결정합니다.
 *
 * @returns {Device} 현재 디바이스 유형 (Mobile, Tablet, PC)
 */

export default function useDeviceState() {
  const [deviceState, setDeviceState] = useState(Device.Mobile);

  const isMobile = useMediaQuery('(max-width: 375px)');
  const isTablet = useMediaQuery('(min-width: 386px) and (max-width: 820px)');
  const isPC = useMediaQuery('(min-width: 821px)');

  useEffect(() => {
    if (isMobile) {
      setDeviceState(Device.Mobile);
    } else if (isTablet) {
      setDeviceState(Device.Tablet);
    } else if (isPC) {
      setDeviceState(Device.PC);
    }
  }, [isMobile, isTablet, isPC]);

  return deviceState;
}
