import { useEffect,useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import Input from '@/components/shared/Input';
// import axios from 'axios';

export default function LoginPage() {
  // const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1240);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      sessionStorage.setItem('id', email);
      setLoading(false);
      // router.push('/main');
      // const response = axios.post('/apis/api.ts', { email, password }, { withCredentials: true });
    }, 1000);
  }

  return (
    <div className="flex min-h-screen justify-center bg-black">
      {isDesktop ? (
        // 1240px 이상에서 보일 PC 레이아웃
        <div className="flex w-full items-center rounded-2xl bg-white">
          <div className="flex w-1/2 flex-col items-center space-y-6 p-24">
            <h2 className="m-auto text-4xl font-bold">로그인</h2>
            <p className="m-auto text-center text-lg">
              지금 바로 로그인하여 취미 활동을 통해 새로운 사람들과 <br /> 소통하며 특별한 경험을 만들어보세요.
            </p>
            <form onClick={handleLogin} className="flex w-[500px] flex-col space-y-4">
              <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
              <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" disabled={loading} className={`mt-4 w-full rounded-xl ${loading ? 'bg-gray-300' : 'bg-black'} py-2 text-lg text-white`}>
                {loading ? '처리 중...' : '로그인'}
              </button>
            </form>
            <p className="m-auto mt-4 text-sm">
              만취가 처음이신가요?{' '}
              <Link href="/login" className="text-gray-400 underline">
                회원가입
              </Link>
            </p>
          </div>
          <div className="relative flex min-h-screen w-1/2 items-center justify-center bg-black">
            <Image src='/images/children-signup.png' className="size-auto" width={300} height={200} alt="nintendo" />
          </div>
        </div>
      ) : (
        // 1239px 이하에서 보일 모바일 레이아웃
        <form onClick={handleLogin} className="m-4 flex flex-col items-center rounded-2xl bg-white p-8 mobile:w-3/4 tablet:w-[620px]">
          <h2 className="mb-4 text-center text-xl font-bold mobile:text-2xl tablet:text-3xl">회원가입</h2>
          <p className="mb-4 text-center text-sm mobile:text-base tablet:text-lg">
            지금 바로 로그인하여 <br /> 특별한 경험을 만들어보세요.
          </p>
          <Image src='/images/children-signup.png' className="size-auto" width={200} height={200} alt="nintendo" />
          <div className="w-full space-y-4">
            <Input type="email" name="id" onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" disabled={loading} className={`mt-4 w-full rounded-xl ${loading ? 'bg-gray-300' : 'bg-black'} py-2 text-lg text-white`}>
            {loading ? '처리 중...' : '로그인'}
          </button>
          <p className="mt-4 text-center text-sm mobile:text-base">
            만취가 처음이신가요?{' '}
            <Link href="/signup" className="text-gray-400 underline">
              회원가입
            </Link>
          </p>
        </form>
      )}
    </div>
  );
}
