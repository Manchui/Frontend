import { useState } from 'react';
import Image from 'next/image';
// Input 사용 시 필요한 props
// name: input의 이름
// type: input의 타입
// passwordToMatch: 비밀번호 확인 시 비교할 비밀번호
// onChange: input 값 변경 시 실행할 함수
interface InputProps {
  name: string;
  type: string;
  passwordToMatch?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function Input({ name, type, passwordToMatch, onChange }: InputProps) {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true); // 유효성 검사
  const [isVisible, setIsVisible] = useState(false); // 비밀번호 보이기/숨기기 상태
  const setting = {
    name: {
      labelName: '이름',
      placeholderText: '이름을 입력해주세요.',
      invalidText: '이름은 3자 이상이어야 합니다.',
      validate: (val: string) => val.length >= 3,
    },
    id: {
      labelName: '아이디',
      placeholderText: '이메일을 입력해주세요.',
      invalidText: '이메일 형식이 올바르지 않습니다.',
      validate: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    },
    password: {
      labelName: '비밀번호',
      placeholderText: '비밀번호를 입력해주세요.',
      invalidText: '비밀번호는 8자 이상이어야 합니다.',
      validate: (val: string) => val.length >= 8,
    },
    password_check: {
      labelName: '비밀번호 확인',
      placeholderText: '비밀번호를 다시 입력해주세요.',
      invalidText: '비밀번호가 일치하지 않습니다.',
      validate: (val: string) => val == passwordToMatch,
    },
  };
  const { placeholderText, invalidText, validate, labelName } = setting[name] || {};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setIsValid(validate ? validate(inputValue) : true);
    if (onChange) {
      onChange(e);
    }
  };
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="relative w-full">
      <label htmlFor={type}>{labelName}</label>
      <input
        id={type}
        placeholder={placeholderText[type]}
        name={type}
        type={type === 'password' && isVisible ? 'text' : type}
        value={value}
        onChange={handleChange}
        className={`w-full rounded-xl border-2 bg-gray-100 p-2 px-4 ${isValid ? 'border-gray-300 focus:border-blue-500' : 'border-red-500 focus:border-red-500'}`}
      />
      {type === 'password' && (
        <button type="button" onClick={toggleVisibility} className="absolute right-2 top-8 text-gray-600">
          {isVisible ? (
            <Image src="icons/visibility-on.svg" alt="eye-on" width={24} height={24} />
          ) : (
            <Image src="icons/visibility-off.svg" alt="eye-off" width={24} height={24} />
          )}
        </button>
      )}
      {!isValid && <p className="mt-1 text-sm text-red-500">{invalidText}</p>}
    </div>
  );
}
