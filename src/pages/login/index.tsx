/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import instance from '@/apis/api';
import { getUserInfo } from '@/apis/userApi';
import Carousel from '@/components/loginLogout/Carousel';
import Input from '@/components/shared/Input';
import { Toast } from '@/components/shared/Toast';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';

/**
 * 로그인 페이지
 * @description input 공용 컴포넌트를 이용하여 로그인 페이지를 구성
 * @returns
 */

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const login = userStore((state) => state.login);
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

    try {
      const res = await instance.post('/api/auths/signin', {
        email,
        password,
      });
      localStorage.setItem('accessToken', res.headers.authorization);
      Toast('success', res.data.message);
      login();
    } catch (err: any) {
      Toast('error', err.response.data.message);
    }
  };

  return (
    <div className="flex h-screen flex-row bg-white pc:w-full pc:bg-white">
      <div className="m-0 mt-[60px] flex w-full flex-shrink-0 flex-col items-center justify-center overflow-y-scroll pc:w-1/2 pc:space-y-8">
        {/* pc용 */}
        <h2 className="hidden text-4xl font-bold pc:flex">로그인</h2>
        <p className="m-auto hidden max-w-80 text-pretty text-center text-lg pc:flex">
          지금 바로 로그인하여 취미 활동을 통해 새로운 사람들과 특별한 경험을 만들어보세요.
        </p>
        {/* pc용 end */}
        <form onSubmit={handleLogin} className="m-0 flex h-fit flex-col items-center border-0 bg-white p-8 tablet:w-[620px] tablet:rounded-2xl">
          <h2 className="mb-4 text-center text-3xl font-bold pc:m-auto pc:hidden pc:text-4xl">로그인</h2>
          <div className="w-full space-y-4">
            <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
            로그인
          </button>
          <p className="mt-4 text-center text-sm mobile:text-base">
            이미 회원이신가요?{' '}
            <Link href="/signup" className="text-gray-400 underline hover:font-bold hover:text-blue-700">
              회원가입
            </Link>
          </p>
        </form>
      </div>
      <div className="relative hidden h-full w-1/2 flex-col items-center justify-center bg-blue-800 pc:flex">
        <Carousel />
      </div>
    </div>
  );
}
