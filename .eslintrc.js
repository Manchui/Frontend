module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    './eslint/react.js',
    './eslint/typescript.js',
    './eslint/import.js',
    './eslint/prettier.js',
    './eslint/next.js',
    './eslint/custom-rules.js',
    './eslint/tailwindcss.js',
    'plugin:storybook/recommended',
  ],
  plugins: [],
  rules: {
    'import/no-extraneous-dependencies': 0, // 테스트 또는 개발환경을 구성하는 파일에서는 devDependency 사용을 허용합니다.
  },
};
