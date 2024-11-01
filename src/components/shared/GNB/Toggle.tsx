import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/apis/userApi';

interface ToggleProps {
  user: {
    img: string;
  };
}
export default function Toggle({ user }: ToggleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animation, setAnimation] = useState<'animate-slide-down' | 'animate-slide-up'>('animate-slide-down');

  const openModal = () => {
    setIsModalOpen(true);
    setAnimation('animate-slide-down');
  };

  const closeModal = () => {
    setAnimation('animate-slide-up');
    setTimeout(() => {
    setIsModalOpen(false);
    }, 300);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="relative">
      <button type="button" onClick={isModalOpen ? closeModal : openModal} className="focuse:outline-none">
        <Image src={user.img} alt="프로필" width={40} height={40} />
      </button>
      {isModalOpen && (
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`absolute right-0 top-12 z-50 flex w-32 flex-col rounded-lg bg-white p-3 shadow-lg transition-transform ${animation}`}
      >
        <Link href="/mypage">
          <div className="flex flex-row content-between items-center">
            <Image src="/icons/mypage-gnb.png" className="size-4" alt="프로필" width={20} height={20} />
            <p className="ml-3">마이페이지</p>
          </div>
        </Link>

        <button type="button" onClick={handleLogout} className="flex flex-row content-between items-center">
          <Image src="/icons/logout-gnb.png" className="size-4" alt="프로필" width={20} height={20} />
          <p className="ml-3">로그아웃</p>
        </button>
      </div>
      )}
    </div>
  );
}
