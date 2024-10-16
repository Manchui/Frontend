import Image from 'next/image';

console.log('test');

export default function Home() {
  return (
    <div className="sm:p-20 grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 bg-black p-8 pb-20 font-[family-name:var(--font-geist-sans)] text-gray-300">
      <main className="sm:items-start row-start-2 flex size-[4px] flex-col items-center gap-8">
        <img className="dark:invert" src="https://nextjs.org/icons/next.svg" alt="Next.js logo" width={180} height={38} />
        <ol className="sm:text-left list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm">
          <li className="mb-2">
            화이팅 <div className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">eslint/prettier 설정</div>
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="sm:flex-row flex flex-col items-center gap-4">
          <a
            className="bg-foreground text-background sm:text-base sm:h-12 sm:px-5 flex h-10 items-center justify-center gap-2 rounded-full border border-solid border-transparent px-4 text-sm transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="dark:invert" src="https://nextjs.org/icons/vercel.svg" alt="Vercel logomark" width={20} height={20} />
            {/* <Image className="dark:invert" src="https://nextjs.org/icons/vercel.svg" alt="Vercel logomark" width={20} height={20} /> */}
            Deploy now
          </a>
          <a
            className="sm:text-base sm:h-12 sm:px-5 sm:min-w-44 flex h-10 items-center justify-center rounded-full border border-solid border-black/[.08] px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/file.svg" alt="File icon" width={16} height={16} />
          <Image aria-hidden src="https://nextjs.org/icons/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/window.svg" alt="Window icon" width={16} height={16} />
          <Image aria-hidden src="https://nextjs.org/icons/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image aria-hidden src="https://nextjs.org/icons/globe.svg" alt="Globe icon" width={16} height={16} />
          <Image aria-hidden src="https://nextjs.org/icons/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
