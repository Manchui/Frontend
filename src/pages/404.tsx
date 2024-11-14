import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  const handleBack = () => {
    void router.back();
  };

  const handleHome = () => {
    void router.push('/');
  };

  return (
    <section className="bg-white">
      <div className="container mx-auto flex min-h-screen items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-gray-800 p-3 text-sm font-medium text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-black md:text-3xl">페이지를 찾을 수 없습니다</h1>
          <p className="mt-4 font-semibold text-gray-500">
            요청하신 페이지가 존재하지 않습니다.
            <br />
            아래 링크를 통해 이동해보세요 :)
          </p>

          <div className="mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto">
            <button
              type="button"
              onClick={handleBack}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-700 sm:w-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>

              <span>이전 페이지로</span>
            </button>

            <button
              type="button"
              onClick={handleHome}
              className="flex w-1/2 shrink-0 gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-blue-500 sm:w-auto"
            >
              홈으로 가기
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 rotate-180">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
