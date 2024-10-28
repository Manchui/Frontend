interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="mt-[60px] bg-background">
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </main>
  );
}
