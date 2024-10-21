import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Drawer from '../../Drawer'; // Drawer 컴포넌트 임포트

interface GnbProps {
  isLoggedIn?: boolean;
  profileImageUrl?: string;
}

/**
 * GNB 컴포넌트
 *
 * @property {boolean} isLoggedIn - 로그인 확인 여부
 * @property {string} profileImageUrl - 프로필 이미지
 */
export default function GNB({ isLoggedIn = false, profileImageUrl = '/images/profile.svg' }: GnbProps) {
  const router = useRouter();

  return (
    <nav className="flex h-14 w-full items-center justify-between bg-yellow-500 px-6 py-4 tablet:px-6 pc:px-36">
      <Link href="/">
        <Image src="/logo/logo.png" alt="로고" width={56} height={27} />
      </Link>

      <div className="flex flex-grow justify-center">
        <div className="hidden items-center gap-6 text-[16px] font-semibold text-white tablet:flex">
          <Link href="/main" className={`transition-colors duration-100 ${router.pathname === '/main' ? 'text-black' : 'hover:text-black'}`}>
            모임 찾기
          </Link>
          <Link href="/bookmark" className={`transition-colors duration-100 ${router.pathname === '/bookmark' ? 'text-black' : 'hover:text-black'}`}>
            찜한 모임
          </Link>
          <Link href="/mypage" className={`transition-colors duration-100 ${router.pathname === '/mypage' ? 'text-black' : 'hover:text-black'}`}>
            모든 리뷰
          </Link>
        </div>
      </div>

      <div className="flex items-center">
        <div className="block tablet:hidden">
          <Drawer />
        </div>
        {isLoggedIn === false && <Image src={profileImageUrl} alt="로고" width={40} height={40} className="hidden tablet:block" />}
        {isLoggedIn === true && (
          <button className="hidden rounded-md bg-white px-4 py-2 font-semibold text-yellow-500 transition-colors duration-100 hover:bg-black tablet:block">
            만취 시작하기
          </button>
        )}
      </div>
    </nav>
  );
}
