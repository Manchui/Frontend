import { toast, type ToastOptions, type ToastPosition } from 'react-toastify';

/**
 * Toast 옵션 설정
 *
 * @property {ToastPosition} position - 토스트의 위치
 * @property {number} autoClose - 자동으로 닫히는 시간 (밀리초)
 * @property {boolean} hideProgressBar - 진행 표시줄 숨기기 여부
 * @property {boolean} closeOnClick - 클릭 시 닫기 여부
 * @property {boolean} pauseOnHover - 호버 시 일시정지 여부
 * @property {boolean} draggable - 드래그 가능 여부
 * @property {boolean} pauseOnFocusLoss - 백그라운드 알림 자동 닫힘 여부
 * @property {boolean} closeButton - 알림에 닫기 버튼 표시
 */

const option: ToastOptions = {
  position: 'top-center' as ToastPosition,
  autoClose: 1500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
  closeButton: false,
};

/**
 * Toast 컴포넌트 - 알림 메시지를 표시하는 컴포넌트
 *
 * @param {'success' | 'error' | 'info' | 'warning'} type - 알림 유형 (success - 성공, error - 에러, info - 정보, warning - 경고)
 * @param {string} message - 표시할 메시지 내용
 * @example
 * Toast('success', '성공 알림입니다!');
 * Toast('error', '에러 알림입니다!');
 * Toast('info', '정보 알림입니다!');
 * Toast('warning', '경고 알림입니다!');
 */

export const Toast = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        ...option,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="min-w-[20px]">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      });
      break;
    case 'error':
      toast.error(message, {
        ...option,
        icon: (
          <div className="rounded-full border-[1.5px] border-white p-1">
            <svg className="size-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </div>
        ),
      });
      break;
    case 'info':
      toast.info(message, {
        ...option,
        icon: (
          <svg className="size-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        ),
      });
      break;
    case 'warning':
      toast.warn(message, {
        ...option,
        icon: (
          <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
            />
          </svg>
        ),
      });
      break;
    default:
      break;
  }
};
