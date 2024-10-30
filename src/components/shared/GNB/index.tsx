import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Drawer from '../../Drawer';

interface GnbProps {
  isLoggedIn?: boolean; // boolean 타입 선언
  user: {
    email: string | null;
    id: string | null;
    img: string;
    nick: string | null;
  };
}

export default function GNB({ user, isLoggedIn}: GnbProps) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 flex h-[60px] w-full items-center justify-between border-b border-gray-100 bg-white px-4 tablet:px-6 pc:px-10">
      <div className="hidden flex-grow tablet:flex tablet:justify-start">
        <div className="hidden items-center gap-6 text-[16px] font-semibold text-black tablet:flex pc:gap-[30px]">
          <Link href="/main" className={clsx('transition-colors duration-200', router.pathname === '/main' ? 'text-yellow-500' : 'hover:text-yellow-500')}>
            모임 찾기
          </Link>
          <Link
            href="/bookmark"
            className={clsx('transition-colors duration-200', router.pathname === '/bookmark' ? 'text-yellow-500' : 'hover:text-yellow-500')}
          >
            찜한 모임
          </Link>
          <Link href="/review" className={clsx('transition-colors duration-200', router.pathname === '/review' ? 'text-yellow-500' : 'hover:text-yellow-500')}>
            모든 리뷰
          </Link>
        </div>
      </div>
      <div className="flex flex-grow justify-start tablet:justify-center">
        <Link href="/">
          <Image src="/logo/logo.png" alt="로고" width={73} height={35} />
        </Link>
      </div>

      <div className="flex flex-grow justify-center tablet:hidden">
        <p className="text-sm font-semibold text-black">
          {router.pathname === '/main' ? '모임 찾기' : router.pathname === '/bookmark' ? '찜한모임' : router.pathname === '/review' ? '모든 리뷰' : ''}
        </p>
      </div>

      <div className="flex flex-grow justify-end tablet:hidden">
        <Drawer isLoggedIn={isLoggedIn ?? false} userData={user} />
      </div>
      <div className="hidden w-[154px] flex-grow tablet:flex tablet:justify-end">
        {isLoggedIn ? (
          <Image src={user.img} alt="프로필" width={40} height={40} />
        ) : (
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/signup')}
              className="border-b-2 border-b-black text-base font-semibold transition-colors duration-200 hover:border-yellow-500 hover:text-yellow-500"
            >
              회원가입
            </button>
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="rounded-full border-2 border-black bg-white px-4 py-[7.5px] text-base font-semibold text-black transition-colors duration-200 hover:border-yellow-500 hover:text-yellow-500"
            >
              로그인
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
