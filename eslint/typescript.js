const path = require('path');

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [path.resolve(__dirname, '../tsconfig.json')],
        tsconfigRootDir: path.resolve(__dirname, '../'),
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        // TypeScript ESLint 권장 설정 적용
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',

        // interface member 순서를 정렬하는 규칙을 적용합니다.
        // '@typescript-eslint/member-ordering'는 auto fix가 안되는 이슈가 있음, 대신 typescript-sort-keys를 사용합니다.
        'plugin:typescript-sort-keys/recommended',
        'next/typescript',
      ],
      rules: {
        // function definition은 hoisting되기 때문에 define 되기 전에 사용해도 됩니다.
        // React component 등에서, 메인(default export) 컴포넌트를 위에 정의하고 private 컴포넌트를 밑에 정의하는 패턴에서 유용합니다.
        '@typescript-eslint/no-unsafe-assignment': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
          },
        ],

        '@typescript-eslint/consistent-type-imports': 'error', // Type 만 사용하는 경우 import 문에 type을 명시적으로 붙여줍니다.

        '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수의 return type은 명시적으로 적는 대신 타입 추론을 이용합니다.

        // Promise 는 async/await 또는 then/catch 로 처리되야 합니다.
        '@typescript-eslint/no-floating-promises': [
          'error',
          {
            ignoreVoid: true,
          },
        ],

        // void 연산자를 사용하지 않습니다.
        'no-void': [
          'error',
          {
            allowAsStatement: true,
          },
        ],

        // typescript Enum 을 사용할 때 eslint에서는 에러가 나는 걸 방지합니다.
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        // type이 잘못 추론됐을 때 쉽게 개발할 수 있도록 no-null-assertion(!)을 허용합니다.
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/camelcase': 'off',
        'camelcase': 'off',

        // void를 반환하는 함수로 예상되는 JSX 속성으로 전달된 비동기 함수 검사를 비활성화
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],

        // 인터페이스, 타입 이름은 무조건 PascalCase로 작성되도록 합니다.
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
          {
            selector: 'typeAlias',
            format: ['PascalCase'],
          },
        ],
        // 사용하지 않는 변수를 경고로 표시합니다.
        '@typescript-eslint/no-unused-vars': 'warn',

        // 'as'를 사용한 타입 단언이 발생할 때마다 경고를 발생시키며, 객체 리터럴에 대해서는 타입 단언을 허용하지 않습니다.
        '@typescript-eslint/consistent-type-assertions': [
          'warn',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'never',
          },
        ],
      },
    },
  ],
};
