import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        {/* 다른 메타 태그들 */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
