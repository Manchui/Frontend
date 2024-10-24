import { useState } from 'react';
import Image from 'next/image';

interface InputProps {
  name: 'name' | 'id' | 'password' | 'password_check';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordToMatch?: string;
  type: 'text' | 'email' | 'password';
}

/**
 Input Component
 * @description Resuable Input Component by using parameter of name, type, passwordToMatch. 
 * onChange를 적용하여 원하는 value를 전 컴포넌트에 가져올 수 있다.
 * 추가하고 싶은 type이 있다면 setting에 추가하여 사용하면 된다.
 *
 * @param type - text, email, password
 * @param name - name, id, password, password_check
 * @param passwordToMatch type - string | x
 * 
 */

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
      validate: (val: string) => val === passwordToMatch,
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
        placeholder={placeholderText}
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
