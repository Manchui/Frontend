import FeatureSection from '@/components/landing/FeatureSection';
import ImageSection from '@/components/landing/ImageSection';
import LandingMain from '@/components/landing/LandingMain';
import PopularList from '@/components/landing/PopularList';
import QNA from '@/components/landing/QNA';
import ReviewSection from '@/components/landing/ReviewSection';

export default function Home() {
  return (
    <div className="bg-background">
      <LandingMain />
      <FeatureSection />
      <PopularList />
      <ImageSection />
      <ReviewSection />
      <QNA />
    </div>
  );
}
