import { useEffect, useState } from 'react';
import { IS_SERVER } from '@/constants/server';

/**
 * useMediaQuery는 특정 미디어 쿼리가 일치하는지 여부를 확인하고, 창 크기 변화에 따라 실시간으로 상태를 업데이트하는 커스텀 훅입니다.
 *
 * @param {string} query - CSS 미디어 쿼리 문자열 (예: '(min-width: 820px)')를 받습니다
 * @returns {boolean} - 주어진 미디어 쿼리가 현재 창 크기와 일치하면 true, 일치하지 않으면 false를 반환합니다.
 */

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (IS_SERVER) {
      return undefined;
    }

    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(matchMedia.matches);
    };
    handleChange();

    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};
