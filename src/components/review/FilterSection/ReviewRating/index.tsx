import { ProgressBar } from '@/components/shared/progress-bar';
import Rating from '@/components/shared/Rating';

export default function ReviewRating() {
  const SCORE = (
    <div className="mb-1 flex items-center justify-center gap-4">
      <p className="text-sm font-medium text-gray-800">5점</p>
      <div className="w-[200px]">
        <ProgressBar maxValue={5} value={2.8} design="primary" />
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-center flex-col gap-4 border-b-2 border-blue-100 pt-4 py-6 tablet:flex-row  pc:flex-row  tablet:gap-[140px] ">
      <div className="flex flex-col items-center  gap-4 ">
        
        <h1 className="text-5xl font-bold">2.8</h1>
        <Rating score={2.8} />
      
      </div>
      <div>
        {SCORE}
        {SCORE}
        {SCORE}
        {SCORE}
        {SCORE}
      </div>
    </div>
  );
}
