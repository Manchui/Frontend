module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  plugins: ['react'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-nested-ternary': 'off', // 3항연산자 중첩 허용: 적절하게 쓰면 가독성을 해치지 않기 때문입니다

    'react/require-default-props': 'off', // typescript를 쓸거기 때문에 defaultProps 정의할 필요 없음

    'react/jsx-props-no-spreading': 'off', // props spreading 허용: 재사용성 높은 컴포넌트를 만들 때 유용합니다

    // 리액트 컴포넌트 파일을 만들 때 .jsx 나 .tsx 확장자를 사용해야만 합니다.
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],

    // label 태그는 관련 control 태그를 감싸고 있어야 합니다. (assert: 'both'를 'either'로 변경하여 유연성을 높입니다)
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      },
    ],

    // React 컴포넌트는 function 키워드를 사용하는 named function으로 선언합니다.
    // 콜백이나 함수의 반환 값으로 사용되는 unnamed component는 arrow function으로 작성합니다.
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],

    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }], // 함수의 인자나 콜백으로 사용되는 컴포넌트를 named function으로 작성하기 위해 예외를 허용합니다. (e.g. React.forwardRef)

    'react/react-in-jsx-scope': 'off', // React 17 이상에서는 JSX를 사용할 때 React를 명시적으로 import할 필요가 없습니다.

    'react/destructuring-assignment': 'warn', // React 컴포넌트 내에서 state와 props에 구조분해 할당을 사용하도록 경고합니다.

    'react/jsx-pascal-case': 'error', // React 컴포넌트 이름은 PascalCase로 작성하도록 강제합니다.

    'react/no-unused-state': 'warn', // 사용되지 않는 state가 있을 경우 경고를 표시합니다.

    'react/jsx-key': 'warn', // 반복문으로 생성하는 요소에는 key 속성을 반드시 포함해야 합니다.

    'react/self-closing-comp': 'warn', // 가능한 경우 셀프 클로징 태그를 사용하도록 경고합니다.

    'react/no-array-index-key': 'off', // 배열의 인덱스를 key로 사용하는 것을 허용합니다.
  },
};
