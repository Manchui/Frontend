import type { ComponentType, ReactNode } from 'react';
import { Suspense } from 'react';

/**
 * 컴포넌트를 Suspense로 감싸는 HOC(Higher Order Component)입니다.
 * 비동기 컴포넌트의 로딩 상태를 선언적으로 처리할 수 있게 해줍니다.
 *
 * @param {ComponentType<Props>} WrappedComponent - Suspense로 감싸질 컴포넌트
 * @param {ReactNode} options.fallback - 로딩 중에 표시될 컴포넌트
 * @returns Suspense로 감싸진 새로운 컴포넌트
 *
 * @example
 * const LoadingSuspense = withSuspense(AsyncComponent, {
 *   fallback: <LoadingSpinner />
 * });
 */

const withSuspense = <Props extends object = Record<string, never>>(WrappedComponent: ComponentType<Props>, options: { fallback: ReactNode }) => {
  function SuspendedComponent(props: Props) {
    return (
      <Suspense fallback={options.fallback}>
        <WrappedComponent {...props} />
      </Suspense>
    );
  }

  return SuspendedComponent;
};

export default withSuspense;
