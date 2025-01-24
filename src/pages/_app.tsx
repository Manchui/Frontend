import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify-custom.css';

import { type ReactElement, type ReactNode } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { domAnimation, LazyMotion } from 'framer-motion';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import PageLayout from '@/components/shared/pageLayout';
import QueryProvider from '@/provider/QueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type AppPropsWithLayout = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export default function App({ Component, pageProps: { dehydratedState, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <PageLayout>{page}</PageLayout>);

  return (
    <QueryProvider dehydratedState={dehydratedState}>
      <ErrorBoundary>
        <LazyMotion features={domAnimation}>
          {/* LazyMotion을 사용해 Framer Motion 구성요소의 전체 기능을 동기 or 비동기로 로드해서 번들 크기를 줄여줍니다 */}
          <ToastContainer limit={1} transition={Zoom} />
          {getLayout(<Component {...pageProps} />)}
          {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen />}
        </LazyMotion>
      </ErrorBoundary>
    </QueryProvider>
  );
}
