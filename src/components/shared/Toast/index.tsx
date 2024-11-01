import { toast, type ToastOptions, type ToastPosition } from 'react-toastify';
import Lottie from 'lottie-react';

import CheckLottie from '@/../public/lottie/check.json';
import ErrorLottie from '@/../public/lottie/error.json';

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
      toast.success(message, { ...option, icon: <Lottie className="min-w-[30px]" animationData={CheckLottie} /> });
      break;
    case 'error':
      toast.error(message, { ...option, icon: <Lottie animationData={ErrorLottie} /> });
      break;
    case 'info':
      toast.info(message, { ...option });
      break;
    case 'warning':
      toast.warn(message, { ...option });
      break;
    default:
      break;
  }
};
