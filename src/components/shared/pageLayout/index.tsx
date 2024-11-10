import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import GNB from '@/components/shared/GNB';
import Loading from '@/components/shared/Loading';
import { useAuthBoundary } from '@/hooks/useAuthBoundary';
import { useLoading } from '@/hooks/useLoading';

type LayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
};

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
  const router = useRouter();
  const loading = useLoading();
  const pathname = usePathname();

  useAuthBoundary();

  const shouldShowHeader = pathname !== '/' && showHeader; // 로그인 & 회원가입도 헤더 없으면 더 깔끔하지 않을까 싶습니다
  // const shouldShowFooter = pathname !== '/' && !pathname.startsWith('/signup') && !pathname.startsWith('/login') && showFooter;

  return (
    <>
      {shouldShowHeader && <GNB />}
      {loading ? (
        <Loading />
      ) : (
        <AnimatePresence mode="wait">
          <motion.div key={router.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {children}
            {/* {shouldShowFooter && <Footer />} Footer 나중에 계발하면 넣을 생각입니다! */}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
