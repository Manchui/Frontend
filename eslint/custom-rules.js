module.exports = {
  rules: {
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off', // 비상호작용 엘리먼트에 상호작용 역할을 할당하는 것을 허용합니다.

    'jsx-a11y/click-events-have-key-events': 'off', // click 이벤트에 key 이벤트가 없을 때 허용합니다.

    'jsx-a11y/no-noninteractive-element-interactions': 'off', // 비상호작용 엘리먼트에서 상호작용을 허용합니다.

    'no-extraneous-dependencies': 'off', // devDependencies 사용을 허용합니다.

    'jsx-a11y/no-static-element-interactions': 'off', // div에 onClick 이벤트 사용을 허용합니다.

    'no-console': 'warn', // console.log(), console.warn(), console.error()를 사용할 때 경고를 표시합니다.

    'no-var': 'error', // var 키워드를 사용하면 경고를 표시합니다.

    'indent': ['error', 2], // 코드의 들여쓰기를 2칸으로 설정합니다.

    'quotes': ['error', 'single'], // 문자열 리터럴에 대해 작은 따옴표를 사용하도록 강제합니다.

    'semi': ['error', 'always'], // 모든 문장의 끝에 세미콜론을 반드시 사용해야 합니다.

    'dot-notation': 'warn', // 가능한 경우 dot notation을 사용하도록 경고를 표시합니다.

    'no-unused-vars': 'warn', // 사용하지 않는 변수에 대해 경고를 표시합니다.
  },
};
