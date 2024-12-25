import { type ReactNode, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import * as m from 'framer-motion/m';
import GNB from '@/components/shared/GNB';
import Loading from '@/components/shared/Loading';
import { IS_SERVER } from '@/constants/server';
import { useAuthBoundary } from '@/hooks/useAuthBoundary';
import useInternalRouter from '@/hooks/useInternalRouter';
import { useLoading } from '@/hooks/useLoading';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
};

const useIsomorphicLayoutEffect = !IS_SERVER ? useLayoutEffect : useEffect;

/**
 * 페이지 컴포넌트를 감싸는 레이아웃 컴포넌트로 GNB(Header)와 Footer의 렌더링 여부를 관리하며, 페이지 전환 시 애니메이션 효과를 제공합니다.
 *
 * @param {ReactNode} children - 페이지 컴포넌트
 * @param {boolean} [showHeader=true] - GNB(Header) 렌더링 여부 (기본값은 true)
 * @param {boolean} [showFooter=true] - footer 렌더링 여부 (기본값은 true) (추후 Footer 추가 작업할 예정)
 *
 * @returns {JSX.Element} GNB와 애니메이션 효과가 적용된 레이아웃을 반환하며, 로딩 중에는 `Loading` 컴포넌트를 표시합니다.
 */

export default function PageLayout({ children, showHeader = true }: LayoutProps) {
  const [isClient, setIsClient] = useState(false);
  const [is404, setIs404] = useState(false);

  const router = useInternalRouter();
  const loading = useLoading();

  useAuthBoundary();

  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    setIs404(router.pathname === '/404');
  }, [router.pathname]);

  const shouldShowHeader = useMemo(
    () =>
      isClient &&
      !is404 &&
      router.pathname !== '/' &&
      router.pathname !== '/faq' &&
      router.pathname !== '/login' &&
      router.pathname !== '/signup' &&
      router.pathname !== '/introduce' &&
      router.pathname !== '/noticeboard' &&
      showHeader,
    [isClient, is404, router.pathname, showHeader],
  );
  // const shouldShowFooter = pathname !== '/' && !pathname.startsWith('/signup') && !pathname.startsWith('/login') && showFooter;

  return (
    <>
      {shouldShowHeader && <GNB />}
      <AnimatePresence mode="wait">
        {loading ? (
          <Loading />
        ) : (
          <m.div key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {children}
            {/* {shouldShowFooter && <Footer />} Footer 나중에 계발하면 넣을 생각입니다! */}
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
