/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { login } from '@/apis/user/postUser';
import Social from '@/components/loginSignup/Social';
import Input from '@/components/shared/Input';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import * as validate from '@/libs/validateForm';
import { userStore } from '@/store/userStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginStore = userStore((state) => state.login);
  const router = useInternalRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const idVal = validate.isValidEmailFormat(email);
    if (!idVal) {
      Toast('error', '이메일 형식을 확인해주세요.');
      return;
    }

    const result = await login(email, password);
    if (result) {
      loginStore();
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex h-fit flex-col items-center bg-white p-8 tablet:w-[600px] tablet:rounded-2xl">
      <Image src="/logo/logo.png" alt="로고" width={250} height={150} className="mb-10 cursor-pointer" onClick={() => router.push('/main')} priority />

      <div className="w-full space-y-4">
        <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
        로그인
      </button>

      <p className="mt-4 text-center text-sm mobile:text-base">
        회원이 아닌가요?{' '}
        <Link href="/signup" className="text-gray-400 underline hover:font-bold hover:text-blue-700">
          회원가입
        </Link>
      </p>
      <hr className="my-4 w-full" />
      <Social />
    </form>
  );
}
