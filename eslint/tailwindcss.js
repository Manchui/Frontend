module.exports = {
  plugins: ['tailwindcss'],
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/classnames-order': 'warn', //클래스명을 일관되게 정렬합니다.

    'tailwindcss/enforces-negative-arbitrary-values': 'warn', //-top-[5px] 대신 top-[-5px] 같은 형식을 사용하도록 강제합니다.

    'tailwindcss/enforces-shorthand': 'warn', //여러 클래스명을 단축형으로 합칩니다.

    //Tailwind CSS v2에서 v3로의 마이그레이션을 돕습니다.
    //본 프로젝트에서는 Tailwind CSS v3를 사용하므로 이 규칙은 불필요합니다.
    'tailwindcss/migration-from-tailwind-2': 'off',

    'tailwindcss/no-arbitrary-value': 'off', // 임의 값 사용을 금지합니다. 기본값은 꺼져있습니다.

    'tailwindcss/no-custom-classname': 'warn', //Tailwind CSS의 클래스명과 whitelist에 지정된 값만 허용합니다.

    'tailwindcss/no-contradicting-classname': 'warn', //동일한 속성을 여러 번 타겟팅하는 상충되는 클래스명을 피합니다.

    'tailwindcss/no-unnecessary-arbitrary-value': 'warn', //구성 기반의 클래스명으로 대체할 수 있는 경우 임의 값 사용을 피합니다.
  },
  settings: {
    tailwindcss: {
      callees: [], // 'classnames', 'clsx', 'cva', 'cn'
      whitelist: [],
    },
  },
};
