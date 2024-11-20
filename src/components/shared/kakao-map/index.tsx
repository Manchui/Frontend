import { useEffect } from 'react';

import { Toast } from '../Toast';

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => object;
        Map: new (container: HTMLElement, options: object) => object;
        load: (callback: () => void) => void;
      };
    };
  }
}

interface MapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
}

export function KakaoMap({ lat, lng, zoom }: MapProps) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
    if (!apiKey) {
      Toast('error', 'Kakao Map API Key is missing!');
      return;
    }
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;
        const options = {
          center: new window.kakao.maps.LatLng(lat || 33.450701, lng || 126.570667),
          level: zoom || 3,
        };
        // eslint-disable-next-line no-new
        new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [lat, lng, zoom]);

  return (
    <div className="h-[323px] max-w-screen-tablet">
      <div id="map" className="size-full rounded-2xl" />
    </div>
  );
}
