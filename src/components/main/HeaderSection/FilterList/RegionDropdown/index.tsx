import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Toast } from '@/components/shared/Toast';
import { REGION_DATA } from '@/constants/filter';
import { useAlertStore } from '@/store/useAlertStore';
import { useLocation, useSetLocation } from '@/store/useFilterStore';

const Alert = dynamic(() => import('@/components/shared/Alert'), { ssr: false });

export default function RegionDropdown() {
  const { openAlert, closeAlert } = useAlertStore();

  const location = useLocation();
  const setLocation = useSetLocation();

  const handleInitClick = () => {
    setLocation(undefined);
    closeAlert();
    Toast('info', '지역 필터가 초기화되었습니다.');
  };

  const handleRegionSelect = (value: string) => {
    setLocation(value);
    closeAlert();
    Toast('success', `${value} 지역이 선택되었습니다.`);
  };

  return (
    <>
      <button
        type="button"
        onClick={openAlert}
        className={`relative flex h-9 shrink-0 items-center gap-1 rounded-lg border border-gray-100 px-3 duration-300 ${location ? 'bg-blue-800 text-white' : 'hover:bg-gray-50'}`}
      >
        {location || '지역'}
        <Image
          src="/icons/down-arrow.svg"
          alt="드롭다운 화살표"
          width={16}
          height={16}
          priority
          loading="eager"
          className={`duration-300 ${location && 'rotate-180 invert'}`}
        />
      </button>
      <Alert type="region">
        <ul className="max-h-48 w-[250px] cursor-pointer overflow-y-auto text-sm font-semibold tablet:text-base">
          <li onClick={handleInitClick} className="p-2 hover:bg-gray-50">
            전체
          </li>
          {REGION_DATA.map((value) => (
            <li key={value} onClick={() => handleRegionSelect(value)} className="p-2 hover:bg-gray-50">
              {value}
            </li>
          ))}
        </ul>
      </Alert>
    </>
  );
}
