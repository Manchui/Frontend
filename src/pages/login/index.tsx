/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useCallback, useEffect } from 'react';
import { getUserInfo } from '@/apis/user/getUser';
import Carousel from '@/components/loginSignup/Carousel';
import LoginForm from '@/components/loginSignup/LoginForm';
import { SEO } from '@/components/shared/SEO';
import useInternalRouter from '@/hooks/useInternalRouter';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';
import { useQuery } from '@tanstack/react-query';

/**
 * 로그인 페이지
 * @description input 공용 컴포넌트를 이용하여 로그인 페이지를 구성
 * @returns
 */

export default function LoginPage() {
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const router = useInternalRouter();

  const { data, refetch } = useQuery({
    queryKey: ['queryUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 6,
  });

  // TODO: type error 수정 필요
  const saveUserInfo = useCallback(() => {
    void refetch();
    console.log('refetch is called');
    userUpdate({
      email: data?.res?.email || '',
      id: data?.res?.id || '',
      image: data?.res?.image || '/images/together-findpage-large.png',
      name: data?.res?.name || '',
      createdAt: data?.res?.createdAt ? formatDate(data?.res.createdAt) : '',
    });
    void router.push('/main');
  }, [refetch, userUpdate, data?.res?.email, data?.res?.id, data?.res?.image, data?.res?.name, data?.res?.createdAt, router]);

  useEffect(() => {
    if (isLoggedIn) {
      saveUserInfo();
    }
  }, [data, isLoggedIn, saveUserInfo]);

  return (
    <>
      <SEO title="manchui-login" />
      <main className="flex h-screen flex-row bg-white pc:w-full pc:bg-white">
        <section className="flex w-full flex-col items-center justify-center pc:w-1/2 pc:space-y-8">
          <LoginForm />
        </section>
        <aside className="relative hidden h-full w-1/2 flex-col items-center justify-center bg-blue-800 pc:flex">
          <Carousel />
        </aside>
      </main>
    </>
  );
}
