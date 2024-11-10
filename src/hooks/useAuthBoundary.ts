import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import router from 'next/router';
import { Toast } from '@/components/shared/Toast';

/**
 * useAuthBoundary 훅은 localStorage에서 accessToken확인하고 토큰이 없는경우 로그인 페이지로 이동 시키고 경고 메시지 표시합니다.
 * 인증 보호 기능을 제공합니다.
 *
 * @function
 */

export const useAuthBoundary = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname && pathname.startsWith('/bookmark')) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        Toast('warning', '로그인이 필요한 서비스입니다.');
        void router.push('/login');
      }
    }
  }, [pathname]);
};
