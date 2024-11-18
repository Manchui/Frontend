import Head from 'next/head';
import { BASE_URL } from '@/constants/url';
import useInternalRouter from '@/hooks/useInternalRouter';

const DEFAULT_OG_IMAGE = '/logo/logo.png';

interface Props {
  /**
   * @description description에 적용될 문자열 입니다.
   * @default '내가 찾던 모든 모임에 자유롭게 들어가고 사람들과 소통할 수 있는 서비스'
   */
  description?: string;
  /**
   * @description og:image에 적용될 문자열 입니다.
   * @default '/logo/logo.png'
   */
  ogImage?: string;
  /**
   * @description title에 적용될 문자열 입니다. 넣은 문자열 뒤에 ' | 만취'가 붙습니다.
   * @default '만 명이 함께하는 취미 활동 Manchui'
   */
  title?: string;
}

export function SEO({ title, description, ogImage }: Props) {
  const router = useInternalRouter();
  const URL = BASE_URL + router.asPath;

  const TITLE = title ? `${title} | 만취` : '만 명이 함께하는 취미 활동 Manchui';
  const DESCRIPTION = description || '내가 찾던 모든 모임에 자유롭게 들어가고 사람들과 소통할 수 있는 서비스';
  const IMAGE = ogImage || DEFAULT_OG_IMAGE;
  const WIDTH = '300';
  const HEIGHT = '150';

  return (
    <Head>
      <title>{TITLE}</title>
      <link rel="canonical" href={URL} />
      <meta name="description" content={DESCRIPTION} />
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:url" content={URL} />
      <meta property="og:image:width" content={WIDTH} />
      <meta property="og:image:height" content={HEIGHT} />

      {/* for twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={IMAGE} />
    </Head>
  );
}
