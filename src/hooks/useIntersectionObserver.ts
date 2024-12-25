/* eslint-disable react-hooks/exhaustive-deps */
import type { RefObject } from 'react';
import { useEffect, useState } from 'react';

export default function useIntersectionObserver(
  elementRef: RefObject<HTMLElement>,
  options: IntersectionObserverInit = {
    threshold: 0,
    root: null,
    rootMargin: '0px',
  },
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
}
