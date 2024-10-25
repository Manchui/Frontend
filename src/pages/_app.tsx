import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import Gnb from '@/components/shared/gnbtest';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Gnb />
      <Component {...pageProps} />
    </>
  );
}
