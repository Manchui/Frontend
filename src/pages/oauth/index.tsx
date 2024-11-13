import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { kakaoLogin } from '@/apis/userApi';

function OAuth() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (!router.isReady || !code) return;

    async function data() {
      if (code) {
        void await kakaoLogin(code as string);
      }
    }
    data().catch((error) => {
      console.error('Error during OAuth process:', error);
    });
  }, [router.isReady, code]);

  return (<div>

    <div className='flex flex-col  items-center '>
      <div>OAuth 진행 중...</div>
      <div>OAuth 진행 중...</div>
      <div>OAuth 진행 중...</div>
      <div>OAuth 진행 중...</div>
      <div>OAuth 진행 중...</div>

    </div>
  </div>);
}

export default OAuth;
