/* eslint-disable tailwindcss/no-custom-classname */
import { type ChangeEvent, type FormEvent, useState } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  keyword?: string;
  onSearchSubmit: (submitValue: string) => void;
}

export default function SearchBar({ keyword, onSearchSubmit }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string | undefined>(keyword || '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);

    // 검색값 없으면 refetch
    if (!e.target.value) onSearchSubmit(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (searchValue && searchValue !== '') {
      onSearchSubmit(searchValue);
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
