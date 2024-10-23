import Image from 'next/image';
import Input from '@/components/shared/Input';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('id') as string;
    const password = formData.get('password') as string;
    const response = await axios.post('/apis/api.ts', { email, password }, { withCredentials: true });
  }
  return (
    <div className="flex min-h-screen flex-col items-center bg-[#FDF9F2]">
      <header className="m-4 text-center">
        <h1 className="text-xl font-bold">사람들과 함께</h1>
        <h2 className="text-xl font-bold">만취 모임에서 다양한 게임을 즐길 수 있어요!</h2>
      </header>
      <section className="m-4 text-center">
        <p>팀을 이뤄 협동 게임에 도전하거나,</p>
        <p>간단한 보드 게임으로 즐거운 경쟁을 펼쳐보세요.</p>
      </section>
      <Image src={'/images/nintendo-signup.png'} width={256} height={256} alt="nintendo" />
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm rounded-2xl bg-white p-2">
        <h2 className="mb-4 text-center text-lg font-bold">로그인</h2>
        <p className="mb-4 text-center">지금 바로 로그인하여 특별한 경험을 만들어보세요.</p>
        <div className="space-y-4">
          <Input type="email" name="id" />
          <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="mt-4 w-full rounded-xl bg-gray-400 py-2 text-white">
          확인
        </button>
        <p className="mt-4 text-center">
          회원가입을 안 하셨나요?{' '}
          <Link href="/signup" className="text-yellow-400">
            회원가입
          </Link>
        </p>
      </form>
    </div>
  );
}
