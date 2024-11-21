import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify-custom.css';

import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import { domAnimation, LazyMotion } from 'framer-motion';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import PageLayout from '@/components/shared/PageLayout';
import { isProdApiUrl } from '@/utils/common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <PageLayout>{page}</PageLayout>);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: isProdApiUrl(process.env.NEXT_PUBLIC_API_URL) ? 3 : false,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        {/* LazyMotion을 사용해 Framer Motion 구성요소의 전체 기능을 동기 or 비동기로 로드해서 번들 크기를 줄여줍니다 */}
        <ToastContainer limit={1} transition={Zoom} />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </LazyMotion>
    </QueryClientProvider>
  );
}
