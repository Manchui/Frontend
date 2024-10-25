import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DrawerProps {
  isLoggedIn: boolean;
  profileImageUrl?: string;
}

export default function Drawer({ isLoggedIn, profileImageUrl = '/images/profile.svg' }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button type="button" onClick={toggleDrawer} className="">
        <Image src="/icons/menu.svg" alt="메뉴 " width={38} height={38} />
      </button>

      <div
        className={clsx('fixed inset-0 top-[60px] z-10 bg-black bg-opacity-50 transition-opacity', {
          'pointer-events-none opacity-0': !isOpen,
          'opacity-50': isOpen,
        })}
        onClick={toggleDrawer}
      />

      <div
        className={clsx(
          'fixed right-0 top-[60px] z-20 flex h-[calc(100vh-60px)] w-40 transform flex-col justify-between bg-white p-2 shadow-lg transition-transform duration-300',
          {
            'translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          },
        )}
      >
        <div className="mb-9">
          {isLoggedIn ? (
            <Link href="/mypage">
              <div className="flex gap-3">
                <Image src={profileImageUrl} alt="프로필" width={40} height={40} />
                <div>
                  <p className="text-sm font-semibold">username</p>
                  <p className="text-[10px] font-medium text-gray-200">abc@email.com</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm font-semibold">로그인해주세요</p>
                <Image src="/icons/arrow-right.svg" alt="오른쪽 " width={20} height={20} />
              </div>
            </Link>
          )}
        </div>

        <div className="flex-grow overflow-y-auto text-sm font-medium">
          <Link href="/main" className={router.pathname === '/main' ? 'text-yellow-500' : 'hover:text-yellow-500'}>
            <div className="h-10">모임 찾기</div>
          </Link>

          <Link href="/bookmark" className={router.pathname === '/bookmark' ? 'text-yellow-500' : 'hover:text-yellow-500'}>
            <div className="h-10">찜한 모임</div>
          </Link>

          <Link href="/review" className={router.pathname === '/review' ? 'text-yellow-500' : 'hover:text-yellow-500'}>
            <div className="h-10">모든 리뷰</div>
          </Link>
        </div>

        <Link href="/" className="block pl-2 text-sm font-semibold text-black hover:underline hover:underline-offset-2">
          로그아웃
        </Link>
      </div>
    </>
  );
}
