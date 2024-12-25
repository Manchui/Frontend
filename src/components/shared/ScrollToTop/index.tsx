import { useEffect } from 'react';
import { useRouter } from 'next/router';

// 페이지 전환, 즉 pathname이 변경될 때 마다 최상단이 아니라 이전 페이지에 영향을 받는 상황이 생기는 경우가 종종 발생하기 때문에
// 스크롤을 최상단으로 올려주는 컴포넌트를 만들어줌
export default function ScrollToTop() {
  const { pathname } = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
