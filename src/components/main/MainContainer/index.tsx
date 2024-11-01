export default function MainContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full flex-col items-center justify-center pt-[40px] mobile:px-[30px] tablet:pt-0">{children}</div>;
}
