import { useEffect } from 'react';
import { getUserInfo } from '@/apis/user/getUser';
import Carousel from '@/components/loginLogout/Carousel';
import LoginForm from '@/components/loginLogout/LoginForm';
import { SEO } from '@/components/shared/SEO';
import useInternalRouter from '@/hooks/useInternalRouter';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';

/**
 * 로그인 페이지
 * @description input 공용 컴포넌트를 이용하여 로그인 페이지를 구성
 * @returns
 */

export default function LoginPage() {
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const router = useInternalRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const userData = await getUserInfo();
        userUpdate({
          email: userData.res?.email || '',
          id: userData.res?.id || '',
          image: userData.res?.image || '/images/together-findpage-large.png',
          name: userData.res?.name || '',
          createdAt: userData.res?.createdAt ? formatDate(userData.res.createdAt) : '',
        });
        void router.push('/main');
      }
    };
    void fetchUserData();
  }, [isLoggedIn, router, userUpdate]);

  return (
    <>
      <SEO title="manchui-login" />
      <div className="flex h-screen flex-row bg-white pc:w-full pc:bg-white">
        <div className="flex w-full flex-col items-center justify-center pc:w-1/2 pc:space-y-8">
          <LoginForm />
        </div>
        <div className="relative hidden h-full w-1/2 flex-col items-center justify-center bg-blue-800 pc:flex">
          <Carousel />
        </div>
      </div>
    </>
  );
}
