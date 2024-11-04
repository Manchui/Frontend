/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/apis/userApi';
import Drawer from '@/components/Drawer';
import Toggle from '@/components/shared/GNB/Toggle';
import { userStore } from '@/store/userStore';

export default function GNB() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const logout = userStore((state) => state.logout);
  const login = userStore((state) => state.login);

  const userinfo = userStore((state) => state.user);
  const updateUser = userStore((state) => state.updateUser);

  useEffect(() => {
    const axiosUserData = async () => {
      const accessToken: string | null = localStorage.getItem('accessToken');
      if (accessToken) {
        const userData = await getUserInfo();
        if (userData.result) {
          updateUser(userData.res || { email: '', id: '', image: '', name: '' });
          login();
          setIsLoading(false);
        } else {
          logout();
          setIsLoading(false);
        }
      } else {
        logout();
        setIsLoading(false);
      }
    };

    void axiosUserData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 z-[9999] flex h-[60px] w-full items-center justify-between border-b border-gray-100 bg-white px-4 tablet:px-6 pc:px-10">
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <Link href="/">
          <Image src="/logo/logo.png" alt="로고" width={73} height={35} />
        </Link>
      </div>
      <div className="hidden flex-grow pc:flex pc:justify-start">
        <div className="hidden items-center gap-6 text-[16px] font-semibold text-black tablet:flex pc:gap-[30px]">
          <Link
            href="/main"
            className={clsx(
              'transition-colors',
              router.pathname === '/main' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300',
            )}
          >
            모임 찾기
          </Link>
          <Link
            href="/bookmark"
            className={clsx(
              'transition-colors',
              router.pathname === '/bookmark' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300',
            )}
          >
            찜한 모임
          </Link>
          <Link
            href="/review"
            className={clsx(
              'transition-colors',
              router.pathname === '/review' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300',
            )}
          >
            모든 리뷰
          </Link>
        </div>
      </div>

      <div className="flex flex-grow justify-center pc:hidden">
        <p className="text-sm font-semibold text-black">
          {router.pathname === '/main' ? '모임 찾기' : router.pathname === '/bookmark' ? '찜한모임' : router.pathname === '/review' ? '모든 리뷰' : ''}
        </p>
      </div>

      <div className="flex flex-grow justify-end pc:hidden">
        <Drawer isLoggedIn={isLoggedIn ?? false} userData={userinfo} />
      </div>
      <div className="hidden w-[154px] flex-grow pc:flex pc:justify-end">
        {isLoggedIn ? (
          <div className="size-10 rounded-full">
            <Toggle userData={userinfo} />
          </div>
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="text-base font-semibold transition-colors duration-500 hover:border-b-2 hover:text-gray-300"
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="rounded-full border-2 border-blue-800 bg-white px-4 py-[7.5px] text-base font-semibold text-black transition-colors duration-200 hover:bg-blue-800 hover:text-white"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}