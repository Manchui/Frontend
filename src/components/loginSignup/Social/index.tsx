import Image from 'next/image';

const SOCIALS = [
  {
    name: 'kakao',
    color: 'bg-[#FAE100]',
    logo: '/logo/kakao.svg',
    url: process.env.NEXT_PUBLIC_KAKAO_URL as string,
  },
  {
    name: 'naver',
    color: 'bg-[#02C75A]',
    logo: '/logo/naver.svg',
    url: process.env.NEXT_PUBLIC_NAVER_URL as string,
  },
  {
    name: 'google',
    color: 'bg-[#FFFFFF]',
    logo: '/logo/google.svg',
    url: process.env.NEXT_PUBLIC_GOOGLE_URL as string,
  },
];

export default function Social() {
  const handleSocialLogin = (name: string, url: string) => {
    sessionStorage.setItem('social', name);
    window.location.href = url;
  };

  return (
    <div className='flex flex-col items-center'>
      <p className="font-thin">SNS계정으로 간편 로그인/회원가입</p>
      <div className="mt-2 flex gap-3">
        {SOCIALS.map(({ name, color, logo, url }) => (
          <button
            key={name}
            type="button"
            onClick={() => handleSocialLogin(name, url)}
            className={`flex size-14 items-center justify-center rounded-full border border-background ${color} shadow-md`}
          >
            <Image src={logo} alt="logo" width={80} height={80} />
          </button>
        ))}
      </div>
    </div>
  );
}
