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
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  // TODO: doubleCheck이라는 변수명은 의미를 알기 어렵습니다. isDuplicatedNickname이나 isNicknameDuplicated 등으로 변경해주세요.
  const router = useInternalRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDuplicatedNickname) {
      Toast('error', '중복 확인을 해주세요.');
      return;
    }
    // NOTE: 현재는 오류가 있으면 토스트가 뜬 후에 signup이 호출됩니다.
    // 3가지 오류가 있을때 -> 3번 토스트가 뜨고 signup이 호출됩니다.
    // 일반적으로는 오류를 하나만 띄우고, 그 오류를 해결하도록 유도하는 것이 좋습니다. 그리고 signup이 호출되는 것은 오류가 없을때입니다.
    // 일반적인 동작대로 수정하려면 아래처럼 코드가 수정되어야 합니다. validate 함수들은 모두 에러 메세지 혹은 null을 리턴하도록 변경했습니다.
    // validateForm.ts 변경사항도 함께 참고해주세요.
    const validateFunctions= [
      () => validate.isValidNickname(nick),
      () => validate.isValidPassword(password),
      () => validate.isPasswordMatching(password, passwordCheck),
      () => validate.isValidEmailFormat(email),
    ];
    let errorMessage: string | null = null;
    validateFunctions.forEach((func) => {
        // NOTE: errorMessage가 이미 존재한다면 추가적인 검증을 하지 않아도 됩니다.
        if (errorMessage) {
          return;
        }
        const _errorMessage = func();
        if (_errorMessage) {
            errorMessage = _errorMessage;
        }
    });

    if (errorMessage) {
      // NOTE: 에러 메세지가 있을때 토스트를 띄웁니다.
      Toast('error', errorMessage);
      return;
    } else {
      // NOTE: 에러 메세지가 없을때 signup을 호출합니다.
      const result = await signup(nick, email, password, passwordCheck);
      if (result) {
        void router.push('/login');
      }
    }
  };

  // TODO: 닉네임 중복 확인하는 코드라면 함수 이름이 handleDoubleCheck이 아니라 handleCheckNickname이 더 적합할 것 같습니다.
  // handleDoubleCheck -> handleCheckNickname or handleCheckNicknameDuplication
  const handleCheckNickname = async () => {
    const nickVal = validate.isValidNickname(nick);
    if (!nickVal) {
      return;
    }

    const res = await checkName(nick);
    setIsDuplicatedNickname(res);
  };
  return (
    <form onSubmit={handleSignup} className="flex flex-col items-center bg-white p-8 tablet:w-[600px] tablet:rounded-2xl">
      <Image src="/logo/logo.png" alt="로고" width={250} height={150} className="mb-10 cursor-pointer" onClick={() => router.push('/main')} priority />
      <Social />
      <hr className="my-8 w-full" />
      <div className="w-full space-y-4">
        <div className="flex">
          <Input type="text" name="nick" onChange={(e) => setNick(e.target.value)} />
          <button
            type="button"
            onClick={handleCheckNickname}
            className="ml-4 mt-6 h-[44px] w-24 rounded-xl border bg-blue-800 text-sm text-white hover:bg-blue-700"
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
        이미 회원이신가요?{' '}
        <Link href="/login" className="text-gray-400 underline hover:font-bold hover:text-blue-700">
          로그인
        </Link>
      </p>
    </form>
  );
}
