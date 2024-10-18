import type { ClassValue } from 'clsx';
import cx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind CSS className을 병합해주고 클래스 우선순위를 관리합니다.
 * @param inputs 클래스명
 * @returns 병합된 클래스명
 */

export const cn = (...inputs: ClassValue[]) => twMerge(cx(inputs));
