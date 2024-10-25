interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <main className="bg-background">
      <div className="mx-auto h-dvh w-full max-w-[1200px]">{children}</div>
    </main>
  );
}
