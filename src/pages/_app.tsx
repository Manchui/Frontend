import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/toastify-custom.css';

import type { ReactElement, ReactNode } from 'react';
import { useState } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import PageLayout from '@/components/shared/pageLayout';
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
            staleTime: 60 * 1000,
            gcTime: 3 * 60 * 1000,
          },
        },
      }),
  );

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="내가 찾던 모든 모임에 자유롭게 들어가고 사람들과 소통할 수 있는 서비스" />
        <meta property="og:title" content="만취" />
        <meta property="og:description" content="내가 찾던 모든 모임에 자유롭게 들어가고 사람들과 소통할 수 있는 서비스" />
        <meta property="og:image" content="/logo/logo.png" />
        <meta property="og:url" content="https://manchui.vercel.app/" />
        <link rel="icon" href="/logo/logo.png" type="image/png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ToastContainer limit={1} transition={Zoom} />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
