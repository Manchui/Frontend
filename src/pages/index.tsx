import { CardList } from '@/components/landing/CardList';
import { IntroduceReview } from '@/components/landing/IntroduceReview';
import IntroduceService from '@/components/landing/IntroduceService';
import MainIntro from '@/components/landing/MainIntro';

export default function Home() {
  return (
    <div className="bg-background">
      <div className="mx-auto min-h-screen min-w-[330px] max-w-screen-pc overflow-hidden pt-[100px]">
        <MainIntro />
        <IntroduceService />
        <IntroduceReview />
      </div>
      <CardList />
    </div>
  );
}
