import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { checkName, signup } from '@/apis/user/postUser';
import Social from '@/components/loginSignup/Social';
import Input from '@/components/shared/Input';
import { Toast } from '@/components/shared/Toast';
import useInternalRouter from '@/hooks/useInternalRouter';
import * as validate from '@/libs/validateForm';

export default function SignupForm() {
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [doubleCheck, setDoubleCheck] = useState(false);
  const router = useInternalRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!doubleCheck) {
      Toast('error', '중복 확인을 해주세요.');
      return;
    }
    const [nickVal, passVal, matchingVal, idVal] = [
      validate.isValidNickname(nick),
      validate.isValidPassword(password),
      validate.isPasswordMatching(password, passwordCheck),
      validate.isValidEmailFormat(email),
    ];
    if (!nickVal && !passVal && !matchingVal && !idVal) {
      return;
    }

    const result = await signup(nick, email, password, passwordCheck);
    if (result) {
      void router.push('/login');
    }
  };

  const handleDoubleCheck = async () => {
    const nickVal = validate.isValidNickname(nick);
    if (!nickVal) {
      return;
    }

    const res = await checkName(nick);
    setDoubleCheck(res);
  };
  return (
    <form onSubmit={handleSignup} className="flex flex-col items-center bg-white p-8 tablet:w-[600px] tablet:rounded-2xl">
      <Image src="/logo/logo.png" alt="로고" width={250} height={150} className="mb-10 cursor-pointer" onClick={() => router.push('/main')} priority />
      <div className="w-full space-y-4">
        <div className="flex">
          <Input type="text" name="nick" onChange={(e) => setNick(e.target.value)} />
          <button
            type="button"
            onClick={handleDoubleCheck}
            className="ml-4 mt-6 h-[44px] w-24 rounded-xl bg-blue-800 text-sm font-medium text-white hover:bg-blue-700"
          >
            중복 확인
          </button>
        </div>
        <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" name="password_check" passwordToMatch={password} onChange={(e) => setPasswordCheck(e.target.value)} />
      </div>
      <button type="submit" className="mt-4 w-full rounded-xl bg-blue-800 py-2 text-lg text-white hover:bg-blue-700">
        생성하기
      </button>
      <p className="mt-4 text-center text-sm mobile:text-base">
        이미 회원이신가요?
        <Link href="/login" className="ml-1 text-gray-400 underline hover:text-blue-700">
          로그인
        </Link>
      </p>
      <hr className="my-4 w-full" />
      <Social />
    </form>
  );
}
