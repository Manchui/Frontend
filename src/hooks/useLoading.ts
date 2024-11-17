import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import useInternalRouter from '@/hooks/useInternalRouter';

/**
 * useLoading 훅은 페이지 전환 시 로딩 상태를 관리하여 로딩 화면을 특정 조건에서만 보여주도록 합니다.
 * 이미 방문한 페이지는 loadedPages에 기록되어, 다음 방문시 로딩 화면이 생략됩니다.
 *
 * @returns {boolean} - 현재 로딩 중인지 여부를 불리언 값으로 나타냅니다.
 *
 * @see {https://velog.io/@minew1995/JavaScript-new-Set} - JavaScript new Set() 참고 사이트
 * @see {https://velog.io/@pds0309/nextjs-router-event%EB%A1%9C-%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%9D%B4%ED%83%88-%EB%B0%A9%EC%A7%80-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0} - - Next.js 라우터 이벤트를 이용한 페이지 이탈 방지
 */

export const useLoading = () => {
  const router = useInternalRouter();
  const [loading, setLoading] = useState(false);
  const [loadedPages, setLoadedPages] = useState(new Set()); // 로드된 페이지 추적

  useEffect(() => {
    const start = (url: string) => {
      // 혹시나 예외 처리로 쿼리 스트링이 포함된 URL은 로딩 화면을 보이지 않도록 처리 했습니다.
      if (!loadedPages.has(url) && !url.includes('?') && !url.includes('#')) {
        setLoading(true);
      }
    };

    const end = (url: string) => {
      setLoading(false); // 로딩 종료 시 setLoading false
      setLoadedPages((prev) => new Set(prev).add(url)); // 현재 페이지를 로드된 페이지에 추가
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [loadedPages, router.events]);

  return loading;
};
