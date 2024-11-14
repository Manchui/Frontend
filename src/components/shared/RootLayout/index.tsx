import * as m from 'framer-motion/m';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <m.main initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="min-w-[320px] bg-background">
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </m.main>
  );
}
