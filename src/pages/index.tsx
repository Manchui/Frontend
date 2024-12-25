import dynamic from 'next/dynamic';

const LandingMain = dynamic(() => import('@/components/Landing/LandingMain'), { loading: () => null, ssr: false });
const LandingFeature = dynamic(() => import('@/components/Landing/LandingFeature'), { loading: () => null, ssr: false });
const LandingPopularList = dynamic(() => import('@/components/Landing/LandingPopularList'), { loading: () => null, ssr: false });
const LandingPrimary = dynamic(() => import('@/components/Landing/LandingPrimary'), { loading: () => null, ssr: false });
const LandingReviewSection = dynamic(() => import('@/components/Landing/LandingReviewSection'), { loading: () => null, ssr: false });
const LandingScrollToTop = dynamic(() => import('@/components/Landing/LandingScrollToTop'), { loading: () => null, ssr: false });

export default function Home() {
  return (
    <main>
      <LandingMain />
      <LandingFeature />
      <LandingPopularList />
      <LandingPrimary />
      <LandingReviewSection />
      <LandingScrollToTop />
    </main>
  );
}
