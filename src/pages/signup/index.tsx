import { useEffect } from 'react';
import Carousel from '@/components/loginLogout/Carousel';
import SignupForm from '@/components/loginLogout/SignupForm';
import { SEO } from '@/components/shared/SEO';
import useInternalRouter from '@/hooks/useInternalRouter';
import { userStore } from '@/store/userStore';

/**
 * 회원가입 페이지
 * @description input 공용 컴포넌트를 이용하여 회원가입 페이지를 구성
 * @returns
 */

export default function SignupPage() {
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const router = useInternalRouter();

  useEffect(() => {
    if (isLoggedIn) {
      void router.push('/main'); // 예시로 대시보드 페이지로 리디렉션
    }
  }, [isLoggedIn, router]);

  return (
    <>
      <SEO title="manchui-signup" />
      <div className="flex h-screen bg-white pc:w-full pc:bg-white">
        <div className="flex w-full flex-col items-center justify-center pc:w-1/2 pc:space-y-6">
          <SignupForm />
        </div>
        <div className="relative hidden h-full w-1/2 flex-col items-center justify-center bg-blue-800 pc:flex">
          <Carousel />
        </div>
      </div>
    </>
  );
}
