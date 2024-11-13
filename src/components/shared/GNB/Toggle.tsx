import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { logout } from '@/apis/userApi';

interface ToggleProps {
  userData: {
    image: string;
    name: string;
  };
}
export default function Toggle({ userData }: ToggleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileHover, setIsProfileHover] = useState(false);
  const [animation, setAnimation] = useState<'animate-slide-down' | 'animate-slide-up'>('animate-slide-down');
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const handleMouseEnter = () => setIsProfileHover(true);
  const handleMouseLeave = () => setIsProfileHover(false);

  const handleLogout = async () => {
    await logout();
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };
  // 화면사이즈 변경에 따라 닫히게
  useEffect(() => {
    const handleResize = () => closeModal();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 다른곳 클릭하면 모달닫히게
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="relative flex items-center justify-center" ref={dropdownRef}>
      {/* 배경 */}
      {(isModalOpen || isProfileHover) && (
        <div
          className={clsx(
            'absolute flex size-12 rounded-full transition-all duration-100 ease-in-out',
            isModalOpen ? (isProfileHover ? 'bg-gray-50 shadow-md' : 'shadow-md') : 'bg-gray-50 shadow-md',
          )}
          onClick={isModalOpen ? closeModal : openModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )}

      {/* 프로필 */}
      <button
        type="button"
        onClick={isModalOpen ? closeModal : openModal}
        className="relative z-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="rounded-full focus:outline-none">
          <Image
            className="size-10 rounded-full"
            src={userData.image || '/images/profile.svg'}
            alt="프로필"
            width={40}
            height={40}
            style={{ objectFit: 'cover' }}
          />
        </div>
      </button>

      {/* 모달 */}
      {isModalOpen && (
        <div className={`absolute -right-9 top-14 z-50 flex w-32 flex-col gap-1 rounded-lg bg-white p-2 drop-shadow-2xl transition-transform ${animation}`}>
          <Link href="/mypage" onClick={() => setIsModalOpen(false)} className="rounded-lg p-1 transition-colors duration-100 hover:bg-gray-50">
            <div className="flex flex-row content-between items-center">
              <Image src="/icons/person.svg" className="size-6" alt="프로필" width={24} height={24} />
              <p className="ml-1 text-base font-semibold text-blue-800">마이페이지</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex flex-row content-between items-center rounded-lg p-1 transition-colors duration-100 hover:bg-gray-50"
          >
            <Image src="/icons/exit-black.svg" className="size-6" alt="프로필" width={24} height={24} />
            <p className="ml-1 text-base font-semibold text-blue-800">로그아웃</p>
          </button>
        </div>
      )}
    </div>
  );
}
