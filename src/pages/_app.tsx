import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify-custom.css';

import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import type { ToastContainerProps } from 'react-toastify';
import { domAnimation, LazyMotion } from 'framer-motion';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import PageLayout from '@/components/shared/pageLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode & NextPage;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ReactQueryDevtools = dynamic(() => import('@tanstack/react-query-devtools').then((mod) => mod.ReactQueryDevtools), { ssr: false });

const DynamicToastContainer = dynamic<ToastContainerProps>(
  () =>
    Promise.all([import('react-toastify').then((mod) => mod.ToastContainer), import('react-toastify').then((mod) => mod.Zoom)])
      .then(([ToastContainerMod, ZoomMod]) => {
        function CustomToastContainer(props: ToastContainerProps) {
          return <ToastContainerMod transition={ZoomMod} {...props} />;
        }
        return CustomToastContainer;
      })
      .catch((e) => {
        console.error('Toast 컴포넌트 로딩 실패:', e);
        return () => null;
      }),
  { ssr: false, loading: () => null },
);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <PageLayout>{page}</PageLayout>);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        {/* LazyMotion을 사용해 Framer Motion 구성요소의 전체 기능을 동기 or 비동기로 로드해서 번들 크기를 줄여줍니다 */}
        <DynamicToastContainer limit={1} />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </LazyMotion>
    </QueryClientProvider>
  );
}
