/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const login = userStore((state) => state.login);
  const userUpdate = userStore((state) => state.updateUser);
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      // 로그인 상태라면 로그인 페이지로 접근 불가
      void router.push('/'); // 예시로 대시보드 페이지로 리디렉션
      Toast('success', '이미 로그인 중입니다.');
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }
    let success = false;
    try {
      const res = await instance.post('/api/auths/signin', {
        email,
        password,
      });
      localStorage.setItem('accessToken', res.headers.authorization);
      Toast('success', res.data.message);
      login();
      success = true;
    } catch (err: any) {
      Toast('error', err.response.data.message);
    }
    if (success) {
      try {
        const userData = await getUserInfo();
        if (userData.res) {
          userUpdate({
            email: userData.res?.email || '',
            id: userData.res?.id || '',
            image: userData.res?.image || '/images/together-findpage-large.png',
            name: userData.res?.name || '',
            createdAt: formatDate(userData.res?.createdAt) || '',
          });
        }
        void router.replace('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="mt-[60px] flex h-screen min-h-[900px] flex-row bg-white tablet:bg-blue-800 pc:w-full pc:bg-white">
      <div className="m-0 flex min-h-[820px] w-full flex-shrink-0 flex-col items-center justify-center pc:w-1/2 pc:space-y-6">
        {/* pc용 */}
        <h2 className="mt-8 hidden text-4xl font-bold pc:flex">로그인</h2>
        <p className="m-auto hidden max-w-80 text-pretty text-center text-lg pc:flex">
          지금 바로 로그인하여 취미 활동을 통해 새로운 사람들과 특별한 경험을 만들어보세요.
        </p>
        {/* pc용 end */}
        <form onSubmit={handleLogin} className="m-0 flex h-fit flex-col items-center bg-white p-8 tablet:w-[620px] tablet:rounded-2xl">
          <h2 className="mb-4 text-center text-3xl font-bold pc:m-auto pc:hidden pc:text-4xl">로그인</h2>
          <p className="mb-4 max-w-80 text-pretty text-center text-sm mobile:text-base tablet:text-lg pc:hidden">
            지금 바로 로그인하여 취미 활동을 통해 새로운 사람들과 특별한 경험을 만들어보세요.
          </p>
          <Image src="/images/gameday-signuppage.png" className="size-auto" width={200} height={200} alt="game" />
          <div className="w-full space-y-4">
            <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
            로그인
          </button>
          <p className="mt-4 text-center text-sm mobile:text-base">
            이미 회원이신가요?{' '}
            <Link href="/signup" className="text-gray-400 underline hover:text-primary-400">
              회원가입
            </Link>
          </p>
        </form>
      </div>
      <div className="relative hidden h-full min-h-[820px] w-1/2 flex-col items-center justify-center bg-blue-800 pc:flex">
        <Carousel />
      </div>
    </div>
  );
}
