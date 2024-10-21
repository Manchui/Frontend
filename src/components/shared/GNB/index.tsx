import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Drawer from '../../Drawer'; // Drawer 컴포넌트 임포트

interface GnbProps {
  isLoggedIn?: boolean;
  profileImageUrl?: string;
}

export default function GNB({ isLoggedIn = false, profileImageUrl = '/images/profile.svg' }: GnbProps) {
  const router = useRouter();

  return (
    <nav className="flex h-14 w-full items-center justify-between bg-yellow-500 px-6 py-4 tablet:px-6 pc:px-36">
      <Link href="/">
        <Image src="/logo/logo.png" alt="로고" width={56} height={27} />
      </Link>

      <div className="flex flex-grow justify-center">
        <div className="hidden items-center gap-6 text-[16px] font-semibold text-white tablet:flex">
          <Link href="/main" className={`transition-colors duration-200 ${router.pathname === '/main' ? 'text-black' : 'hover:text-black'}`}>
            모임 찾기
          </Link>
          <Link href="/bookmark" className={`transition-colors duration-200 ${router.pathname === '/bookmark' ? 'text-black' : 'hover:text-black'}`}>
            찜한 모임
          </Link>
          <Link href="/mypage" className={`transition-colors duration-200 ${router.pathname === '/mypage' ? 'text-black' : 'hover:text-black'}`}>
            모든 리뷰
          </Link>
        </div>
      </div>

      <div className="flex items-center">
        <div className="block tablet:hidden">
          <Drawer />
        </div>
        <div className="hidden tablet:block">
          <StartButton />
        </div>
      </div>
    </nav>
  );
}

function StartButton() {
  return <button className="rounded-md bg-white px-4 py-2 font-semibold text-yellow-500 transition-colors duration-200 hover:bg-black">만취 시작하기</button>;
}
