import { useEffect } from 'react';

declare global {
  interface Window {
    kakao: {
      maps: {
        LatLng: new (lat: number, lng: number) => object;
        Map: new (container: HTMLElement, options: object) => object;
        Marker: new (options: { image?: object; position: object }) => { setMap: (map: object | null) => void };
        MarkerImage: new (src: string, size: object, options?: object) => object;
        Point: new (x: number, y: number) => object;
        Size: new (width: number, height: number) => object;
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
  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = true;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      if (!window.kakao) return;

      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(lat || 37.566363, lng || 126.992572),
          level: zoom || 3,
        };
        // eslint-disable-next-line no-new
        const map = new window.kakao.maps.Map(container, options);
        const markerImageSrc = 'https://i.ibb.co/CVvvn3s/free-icon-veterinarian-5695706.png';
        const markerImageSize = new window.kakao.maps.Size(50, 50);
        const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

        const markerPosition = new window.kakao.maps.LatLng(lat || 37.566363, lng || 126.992572);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
      document.head.removeChild(kakaoMapScript);
    };
  }, [apiKey, lat, lng, zoom]);

  return (
    <div className="relative z-0 h-[323px] max-w-screen-tablet">
      <div id="map" className="absolute size-full rounded-2xl" />
    </div>
  );
}
