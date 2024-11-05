import Lottie from 'lottie-react';

import loadingBox from '@/../public/lottie/loading-box.json';

export default function Loading() {
  return (
    <div className="pb-[96px] pt-[100px]">
      <Lottie className="m-auto size-96" animationData={loadingBox} />
    </div>
  );
}
