import dynamic from 'next/dynamic';

import loadingBox from '@/../public/lottie/loading-box.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function Loading() {
  return (
    <div className="pb-[96px] pt-[100px]">
      <Lottie className="m-auto size-96" animationData={loadingBox} />
    </div>
  );
}
