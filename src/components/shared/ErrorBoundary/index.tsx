import type { ErrorInfo } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallbackComponent?: React.ReactNode;
}

interface State {
  hasError: boolean; // 에러가 발생했는지 여부
}

// ErrorBoundary는 라이프 사이클을 사용해야 하기 때문에 클래스형 컴포넌트를 사용해야 할 수 밖에 없습니다.
class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // 1. 이 라이프 사이클에서 에러가 발생하면 컴포넌트를 업데이트를 하면서 리턴된 값을 가지고 state를 업데이트 합니다.
    // 2. 이렇게 업데이트된 state는
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { fallbackComponent, children } = this.props;

    // 3. 다시 리렌더링이 될 거고 이 당시에 state를 바라보고 에러가 발생을 했다면 아래 컴포넌트로 대체를 해줍니다.
    if (hasError) {
      if (fallbackComponent != null) return fallbackComponent;

      // 공통 에러 컴포넌트
      return (
        <main className="relative min-h-screen">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white">
            <div className="mx-auto flex w-full max-w-sm flex-col items-center text-center">
              <p className="rounded-full bg-gray-800 p-3 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </p>
              <h1 className="mt-3 min-w-[400px] text-2xl text-black">알 수 없는 문제가 발생했습니다.</h1>
              <p className="mt-4 font-semibold text-gray-600">잠시 후 다시 시도해주세요 :)</p>

              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="mt-6 rounded-xl bg-blue-500 px-10 py-2 duration-300 hover:bg-blue-600"
              >
                재시도
              </button>
            </div>
          </div>
        </main>
      );
    }

    // 4. 에러가 발생하지 않았다면 기존에 우리가 그려주고 싶은 컴포넌트를 그려주는 역할을 합니다.
    return children;
  }
}

export default ErrorBoundary;
