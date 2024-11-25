/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getUserInfo } from '@/apis/user/getUser';
import Drawer from '@/components/Drawer';
import Notification from '@/components/shared/GNB/Notification';
import Toggle from '@/components/shared/GNB/Toggle';
import { formatDate } from '@/libs/formatDate';
import { userStore } from '@/store/userStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function GNB() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const isLoggedIn = userStore((state) => state.isLoggedIn);
  const logoutStore = userStore((state) => state.logout);
  const login = userStore((state) => state.login);
  const [isOpen, setIsOpen] = useState(false);

  const userinfo = userStore((state) => state.user);
  const updateUser = userStore((state) => state.updateUser);

  const { data } = useQuery({
    queryKey: ['queryUserInfo'],
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 6,
  });
  function toggleDrawer() {
    if (isOpen) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (data && accessToken) {
      updateUser({
        email: data.res?.email || '',
        id: data.res?.id || '',
        image: data.res?.image || '/images/profile.svg',
        name: data.res?.name || '',
        createdAt: formatDate(data.res?.createdAt || '') || '',
      });
      login();
    } else {
      logoutStore();
    }
  }, [login, data, logoutStore, queryClient, updateUser]);

  return (
    <nav className="fixed top-0 z-[9999] w-full bg-white">
      <div className="mx-auto flex h-[60px] max-w-[1500px] items-center justify-between px-4 tablet:px-6 pc:px-10" onClick={toggleDrawer}>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          <Link href="/main">
            <Image src="/logo/logo.png" alt="로고" width={73} height={35} />
          </Link>
        </div>
        <div className="hidden flex-grow tablet:flex tablet:justify-start">
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

        <div className="-mr-2 flex flex-grow justify-end tablet:-mr-4 tablet:hidden">
          <Drawer isLoggedIn={isLoggedIn ?? false} userData={userinfo} setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="hidden w-[154px] flex-grow tablet:flex tablet:justify-end">
          {isLoggedIn ? (
            <div className="flex size-10 w-full items-center justify-end gap-4 rounded-full">
              <Notification />
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
      </div>
    </nav>
  );
}
