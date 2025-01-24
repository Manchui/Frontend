import type { NextPageContext } from 'next';

function Error({ statusCode }: { statusCode?: number }) {
  // statusCode가 있으면 서버측 에러이고 없으면 클라이언트측 에러입니다.

  return (
    <main className="relative min-h-screen">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
        <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-gray-800 p-3 text-sm font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-black md:text-3xl">
            {statusCode === 500 ? '서버 에러가 발생했습니다' : '페이지를 찾을 수 없습니다'}
          </h1>
          <p className="mt-4 font-semibold text-gray-500">
            {statusCode} 에러가 발생했습니다.
            <br />
            잠시 후 다시 시도해주세요 :)
          </p>

          <button type="button" onClick={() => window.history.back()} className="mt-6 rounded-xl bg-blue-500 px-10 py-2 duration-300 hover:bg-blue-600">
            재시도
          </button>
        </div>
      </div>
    </main>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
