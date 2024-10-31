/* eslint-disable tailwindcss/no-custom-classname */
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function SearchBar({ searchValue, setSearchValue }: SearchBarProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 검색값 변화 확인
    setSearchValue(e.target.value);
    // console.log('searchValue', searchValue);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    // 검색값 제출
    e.preventDefault();
    if (searchValue !== '') {
      // console.log('제출성공');
      setSearchValue('');
    }
  };

  return (
    <form className="flex gap-1 border-b font-medium hover:border-b-blue-800" onSubmit={handleSearchSubmit}>
      <label htmlFor="input" className="cursor-pointer">
        <Image src="/icons/main/search.svg" alt="검색창" width={24} height={24} className="tablet:size-8" />
      </label>
      <input
        id="input"
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="만취에서 찾고 계신 모임이 있나요?"
        className="placeholder:text-13-18-response w-search-180-240 bg-background text-13-16-response text-gray-400 outline-none focus:text-blue-800"
      />
    </form>
  );
}
