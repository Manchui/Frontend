export default function MainContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex min-h-screen w-full flex-col items-center pt-[40px] mobile:px-[30px] tablet:pt-[60px]">{children}</div>;
}
