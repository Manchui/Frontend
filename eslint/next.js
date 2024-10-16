module.exports = {
  // Next.js Core Web Vitals ESLint 규칙을 추가합니다.
  // Next.js 프로젝트에서 중요한 웹 성능 지표(Core Web Vitals)를 포함한 ESLint 규칙을 적용하기 위해 사용하는 확장입니다.
  // Largest Contentful Paint (LCP), First Input Delay (FID), Cumulative Layout Shift (CLS) 등의 중요한 웹 성능 지표를 개선하기 위한 규칙을 포함합니다.
  extends: 'next/core-web-vitals',
};
