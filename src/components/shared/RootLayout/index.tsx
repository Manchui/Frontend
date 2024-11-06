interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="min-w-[320px] bg-background">
      <div className="mx-auto min-h-screen w-full max-w-[1200px]">{children}</div>
    </main>
  );
}
