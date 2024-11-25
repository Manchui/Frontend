import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/apis/user/postUser';
import Notification from '@/components/shared/GNB/Notification';
import { userStore } from '@/store/userStore';
import { useQueryClient } from '@tanstack/react-query';

interface DrawerProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userData: {
    email: string | null;
    id: string | null;
    image: string;
    name: string | null;
  };
}

export default function Drawer({ isLoggedIn, userData, setIsOpen, isOpen }: DrawerProps) {
  const queryClient = useQueryClient();
  const [, setIsMobile] = useState(false);

  const router = useRouter();

  const isLoggedIns = userStore((state) => state.isLoggedIn);

  function toggleDrawer() {
    setIsOpen(!isOpen);
  }

  const handleLogout = async () => {
    if (isLoggedIn) {
      await logout(queryClient);
      setIsOpen(false);
      void router.push('/main');
    }
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  // 화면사이즈에 따라 닫히게

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 820) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setIsOpen]);

  return (
    <div className="flex items-center">
      {isLoggedIn && <Notification />}
      <button type="button" onClick={toggleDrawer} className="relative flex size-10 items-center justify-center">
        <div className={clsx('absolute transition-all duration-300 ease-in-out', isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100')}>
          <Image src="/icons/menu.svg" alt="메뉴" width={38} height={38} />
        </div>

        <div className={clsx('absolute transition-all duration-300 ease-in-out', isOpen ? 'rotate-90 opacity-100' : '-rotate-90 opacity-0')}>
          <Image src="/icons/x.svg" alt="닫기" width={20} height={20} />
        </div>
      </button>

      <div
        className={clsx('fixed inset-0 top-[60px] z-10 h-full min-h-screen bg-black bg-opacity-50 transition-opacity', {
          'pointer-events-none opacity-0': !isOpen,
          'opacity-50': isOpen,
        })}
        onClick={toggleDrawer}
      />

      <div
        className={clsx(
          'fixed right-0 top-[60px] z-20 flex size-full min-h-[calc(100vh-60px)] transform flex-col bg-blue-800 shadow-lg transition-transform duration-300 mobile:w-[375px]',
          {
            'translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          },
        )}
      >
        <header>
          {isLoggedIn ? (
            <div className="flex items-center justify-between gap-3 border-b border-blue-400 p-4">
              <div className="flex gap-2">
                <div className="shadow-custom-md relative size-10 rounded-full bg-slate-50 focus:outline-none">
                  <Image className="size-10 rounded-full object-cover" src={userData.image || '/icons/person-rounded.png'} alt="프로필" fill />
                </div>
                <div className="max-w-[160px]">
                  <p className="truncate text-sm font-semibold text-white">{userData.name}</p>
                  <p className="truncate text-[10px] font-medium text-gray-200">{userData.email}</p>
                </div>
              </div>
              <Link
                href="/mypage"
                onClick={closeDrawer}
                className="h-6 w-[100px] rounded-full border-2 border-white text-center text-sm font-semibold text-white duration-200 hover:bg-blue-900"
              >
                마이페이지
              </Link>
            </div>
          ) : (
            <Link href="/login" onClick={closeDrawer}>
              <div className="flex items-center justify-between gap-3 border-b border-blue-400 px-4 py-5 text-white">
                <p className="text-base font-medium">로그인해주세요</p>
                <Image src="/icons/arrow-right-white.svg" alt="오른쪽 " width={24} height={24} />
              </div>
            </Link>
          )}
        </header>

        <section className="p-4 text-white">
          <p className="px-2 text-xl font-semibold text-white">모임</p>
          <div className="flex-grow overflow-y-auto pt-4 text-base font-medium">
            <div
              className={clsx(
                'flex w-full cursor-pointer items-center justify-start space-x-2 border-b border-blue-600 px-4 py-3 duration-300',
                router.pathname === '/main' ? 'bg-blue-700' : 'hover:bg-blue-900',
              )}
              onClick={() => {
                void router.push('/main');
                closeDrawer();
              }}
            >
              <Image src="/icons/search.svg" alt="메뉴" width={20} height={20} />
              <span>모임 찾기</span>
            </div>
            <div
              className={clsx(
                'flex w-full cursor-pointer items-center justify-start space-x-2 border-b border-blue-600 px-4 py-3 duration-300',
                router.pathname === '/review' ? 'bg-blue-700' : 'hover:bg-blue-900',
              )}
              onClick={() => {
                void router.push('/review');
                closeDrawer();
              }}
            >
              <Image src="/icons/review.svg" alt="메뉴" width={20} height={20} />
              <span> 모든 리뷰</span>
            </div>

            <div
              className={clsx(
                'flex w-full cursor-pointer items-center justify-start space-x-2 border-b border-blue-600 px-4 py-3 duration-300',
                router.pathname === '/bookmark' ? 'bg-blue-700' : 'hover:bg-blue-900',
              )}
              onClick={() => {
                void router.push('/bookmark');
                closeDrawer();
              }}
            >
              <Image src="/icons/bookmark.svg" alt="메뉴" width={20} height={20} />
              <span> 찜한 모임</span>
            </div>
          </div>
        </section>
        {isLoggedIns && (
          <button type="button" onClick={handleLogout} className="fixed bottom-20 flex flex-row content-between items-center px-4">
            <Image src="/icons/exit.svg" className="size-6" alt="프로필" width={24} height={24} />
            <p className="ml-1 text-base font-medium text-white">로그아웃</p>
          </button>
        )}
      </div>
    </div>
  );
}
