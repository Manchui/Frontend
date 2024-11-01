import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/apis/userApi';
import { userStore } from '@/store/userStore';

interface DrawerProps {
  isLoggedIn: boolean;
  userData: {
    email: string | null;
    id: string | null;
    image: string;
    name: string | null;
  };
}

export default function Drawer({ isLoggedIn, userData }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isLoggedIns = userStore((state) => state.isLoggedIn);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  // 나중에 로그아웃 API 연결 시, async await 추가
  const handleLogout = () => {
    if (isLoggedIn) {
      logout();  
    }
  };

  return (
    <div className="flex items-center">
      <button type="button" onClick={toggleDrawer}>
        <Image src="/icons/menu.svg" alt="메뉴 " width={38} height={38} />
      </button>

      <div
        className={clsx('fixed inset-0 top-[60px] z-10 h-screen bg-black bg-opacity-50 transition-opacity', {
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
                <Image src={userData.image || '/icons/person-rounded.png'} alt="profile" width={40} height={40} className="rounded-full" />
                <div>
                  <p className="text-sm font-semibold">{userData.name}</p>
                  <p className="text-[10px] font-medium text-gray-200">{userData.email}</p>
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
          <div className="h-10">
            <Link href="/main" className={router.pathname === '/main' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300'}>
              모임 찾기
            </Link>
          </div>
          <div className="h-10">
            <Link
              href="/bookmark"
              className={router.pathname === '/bookmark' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300'}
            >
              찜한 모임
            </Link>
          </div>
          <div className="h-10">
            <Link href="/review" className={router.pathname === '/review' ? 'border-b-2 text-gray-400' : 'duration-500 hover:border-b-2 hover:text-gray-300'}>
              모든 리뷰
            </Link>
          </div>
        </div>

        {isLoggedIns && (
          <button type="button" onClick={handleLogout} className="flex text-sm font-semibold text-black">
            <span className="border-b-2 border-transparent duration-500 hover:border-gray-300 hover:text-gray-300">로그아웃</span>
          </button>
        )}
      </div>
    </div>
  );
}
