/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/apis/userApi';
import Drawer from '@/components/Drawer';
import Toggle from '@/components/shared/GNB/Toggle';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';

export default function GNB() {
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
          updateUser({
            email: userData.res?.email || '',
            id: userData.res?.id || '',
            image: userData.res?.image || '/images/profile.svg',
            name: userData.res?.name || '',
            createdAt: formatDate(userData.res?.createdAt || '') || '',
          });
          login();
        } else {
          logout();
        }
      } else {
        logout();
      }
    };
    void axiosUserData();
  }, [login, logout, updateUser]);

  return (
    <nav className="fixed top-0 z-[9999] flex h-[60px] w-full items-center justify-between border-b border-gray-50 bg-white px-4 tablet:px-6 pc:px-10">
      <div className="absolute left-1/2 -translate-x-1/2 transform">
        <Link href="/">
          <Image src="/logo/logo.png" alt="로고" width={73} height={35} />
        </Link>
      </div>
      <div className="hidden flex-grow pc:flex pc:justify-start">
        <div className="hidden items-center gap-3 text-[16px] font-semibold text-black tablet:flex">
          <Link href="/main" className={clsx('relative flex h-10 w-16 items-center justify-center', 'group')}>
            모임 찾기
            <span
              className={clsx(
                'absolute bottom-0 left-1/2 h-[2.5px] -translate-x-1/2 transform bg-blue-800 transition-all duration-300 ease-linear',
                router.pathname === '/main' ? 'w-full' : 'w-0',
                'group-hover:w-full',
              )}
            />
          </Link>
          <Link href="/review" className={clsx('relative flex h-10 w-16 items-center justify-center', 'group')}>
            모든 리뷰
            <span
              className={clsx(
                'absolute bottom-0 left-1/2 h-[2.5px] -translate-x-1/2 transform bg-black transition-all duration-300 ease-linear',
                router.pathname === '/review' ? 'w-full' : 'w-0',
                'group-hover:w-full',
              )}
            />
          </Link>
          <Link href="/bookmark" className={clsx('relative flex h-10 w-16 items-center justify-center', 'group')}>
            찜한 모임
            <span
              className={clsx(
                'absolute bottom-0 left-1/2 h-[2.5px] -translate-x-1/2 transform bg-black transition-all duration-300 ease-linear',
                router.pathname === '/bookmark' ? 'w-full' : 'w-0',
                'group-hover:w-full',
              )}
            />
          </Link>
        </div>
      </div>

      <div className="-mr-2 flex flex-grow justify-end tablet:-mr-4 pc:hidden">
        <Drawer isLoggedIn={isLoggedIn ?? false} userData={userinfo} />
      </div>
      <div className="hidden w-[154px] flex-grow pc:flex pc:justify-end">
        {isLoggedIn ? (
          <div className="size-10 rounded-full">
            <Toggle userData={userinfo} />
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/signup" className={clsx('group relative flex h-10 w-14 items-center justify-center text-base font-semibold')}>
              회원가입
              <span
                className={clsx(
                  'absolute bottom-0 left-1/2 h-[2.5px] -translate-x-1/2 transform bg-black transition-all duration-300 ease-linear',
                  router.pathname === '/signup' ? 'w-full' : 'w-0',
                  'group-hover:w-full',
                )}
              />
            </Link>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="rounded-full border-2 border-blue-800 bg-white px-4 py-[7.5px] text-base font-semibold text-black transition-colors duration-500 hover:bg-blue-800 hover:text-white"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
