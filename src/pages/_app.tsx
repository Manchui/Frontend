import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import GNB from '@/components/shared/GNB';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GNB />
      <Component {...pageProps} />
    </>
  );
}
