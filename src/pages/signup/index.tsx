/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import instance from '@/apis/api';
import Carousel from '@/components/Carousel';
import Input from '@/components/shared/Input';

/**
 * 회원가입 페이지
 * @description input 공용 컴포넌트를 이용하여 회원가입 페이지를 구성
 * @returns
 */

export default function SignupPage() {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);
  const [error, setError] = useState('');

  // 화면 크기에 따라 레이아웃 변경
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1240);
    };

    // 초기 크기 체크 및 이벤트 리스너 등록
    handleResize();
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nick.length < 3 || password.length < 8 || password !== passwordCheck || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return;
    }

    try {
      await instance.post('/api/auths/signup', {
        name: nick,
        email,
        password,
        passwordConfirm: passwordCheck,
      });
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-800">
      {isDesktop ? (
        // 1240px 이상에서 보일 PC 레이아웃
        <div className="flex w-full items-center bg-white">
          <div className="flex w-1/2 flex-col items-center space-y-6 p-24">
            <h2 className="m-auto text-4xl font-bold">회원가입</h2>
            <p className="m-auto max-w-80 text-pretty text-center text-lg">지금 바로 가입하여 취미 활동을 통해 새로운 사람들과 특별한 경험을 만들어보세요.</p>
            <form onSubmit={handleSignup} className="flex w-[500px] flex-col space-y-4">
              <div className="flex">
                <Input type="text" name="nick" onChange={(e) => setNick(e.target.value)} />
                <button type="button" className="ml-4 mt-7 h-10 w-24 rounded-xl border bg-blue-800 text-sm text-white hover:bg-blue-700">
                  중복 확인
                </button>
              </div>
              <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
              <Input type="password" name="password_check" passwordToMatch={password} onChange={(e) => setPasswordCheck(e.target.value)} />
              {error && <p className="mt-1 text-sm text-red-500">회원가입에 실패했습니다. 다시 시도해주세요.</p>}
              <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
                생성하기
              </button>
            </form>
            <p className="m-auto mt-4 text-sm">
              이미 회원이신가요?{' '}
              <Link href="/login" className="text-gray-400 underline hover:text-primary-400">
                로그인
              </Link>
            </p>
          </div>
          <div className="relative flex min-h-screen w-1/2 flex-col items-center justify-center bg-blue-800 hover:bg-blue-700">
            <Carousel />
          </div>
        </div>
      ) : (
        // 1239px 이하에서 보일 모바일 레이아웃
        <form
          onSubmit={handleSignup}
          className="flex h-screen flex-col items-center justify-center bg-white p-8 mobile:w-full tablet:h-[1000px] tablet:w-[620px] tablet:rounded-2xl"
        >
          <h2 className="mb-4 text-center text-3xl font-bold">회원가입</h2>
          <p className="mb-4 max-w-80 text-pretty text-center text-sm mobile:text-base tablet:text-lg">
            지금 바로 가입하여 취미 활동을 통해 새로운 사람들과 특별한 경험을 만들어보세요.
          </p>
          <Image src="/images/board-signuppage.png" className="size-auto" width={200} height={200} alt="board" />
          <div className="w-full space-y-4">
            <div className="flex">
              <Input type="text" name="nick" onChange={(e) => setNick(e.target.value)} />
              <button type="button" className="ml-4 mt-7 h-10 w-24 rounded-xl border bg-blue-800 text-sm text-white hover:bg-blue-700">
                중복 확인
              </button>
            </div>
            <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" name="password_check" passwordToMatch={password} onChange={(e) => setPasswordCheck(e.target.value)} />
          </div>
          {error && <p className="mt-1 text-sm text-red-500">회원가입에 실패했습니다. 다시 시도해주세요.</p>}
          <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
            생성하기
          </button>
          <p className="mt-4 text-center text-sm mobile:text-base">
            이미 회원이신가요?{' '}
            <Link href="/login" className="text-gray-400 underline hover:text-primary-400">
              로그인
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
