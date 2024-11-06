export default function BookmarkContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex w-full min-w-[340px] flex-col items-center justify-center pt-6 px-4  mobile:pt-[54px]">{children}</div>;
}
