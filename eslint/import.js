module.exports = {
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['simple-import-sort', 'import', 'import-name'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  // 패키지명을 camelCase화해서 사용하도록 강제하여 코드의 일관성을 유지합니다.
  // 예외적으로 react와 clsx는 별도의 명명 규칙을 따릅니다.
  rules: {
    'import-name/all-imports-name': [
      'error',
      {
        clsx: 'cx',
      },
    ],

    // 유사한 항목을 그룹으로 묶어서 import를 정렬합니다.
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^\\u0000'], // Side effect imports: side effect가 있는 import를 가장 먼저 위치시킵니다.

          ['^react', '^\\w', '^zustand', '^@'], // 패키지들: 'react' 관련 패키지가 먼저 오고, 그 다음 기타 패키지들 및 recoil, @로 시작하는 패키지들.

          ['^@/_types', '^@/_constants'], // Types 및 Constants: @/types와 @/constants로 시작하는 항목들.

          ['@/_stores', '^@/_hooks'], // Recoil imports 및 Hooks: @/recoil과 @/hooks로 시작하는 항목들.

          ['^@/_libs', '^@/_utils'], // Libs 및 Utils: @/libs와 @/utils로 시작하는 항목들.

          ['^@/_components'], // Components: @/components로 시작하는 항목들.

          ['^\\./', '^\\.\\./'], // Relative imports: 같은 폴더의 import가 먼저 오고, 상위 폴더의 import가 그 다음에 옵니다.

          ['^.+\\.svg$'], // SVG 아이콘: .svg 파일들.

          ['^.+\\.json$'], // JSON 파일들.

          ['^.+\\.scss$'], // 스타일 파일들.
        ],
      },
    ],

    'simple-import-sort/exports': 'error', // export를 정렬하여 가독성을 높입니다.

    'import/first': 'error', // import 문을 문서의 상단에 위치시켜 코드 구조를 일관되게 유지합니다.

    'import/newline-after-import': 'error', // import 문 다음에 빈 줄을 삽입하여 코드의 가독성을 높입니다.

    'import/no-duplicates': 'error', // 중복된 import를 허용하지 않습니다.

    // import할 때 js/jsx/ts/tsx 파일에는 확장자를 붙이지 않고, json 파일에는 항상 확장자를 붙이도록 합니다.
    'import/extensions': [
      'error',
      {
        ignorePackages: true,
        pattern: {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
          json: 'always',
        },
      },
    ],

    // import 플러그인으로도 정렬을 강제할 수 있지만, order group 지정을 더 간편하게 할 수 있는 simple-import-sort 플러그인을 대신 사용합니다
    'import/order': 'off',

    // 한 파일에 여러 개의 export가 늘어날 가능성을 고려하여 default export를 사용하지 않습니다.
    // 이는 명명된 export를 사용하여 모듈의 재사용성을 높이고, 코드의 가독성을 향상시킵니다.
    'import/prefer-default-export': 'off',
  },
};
