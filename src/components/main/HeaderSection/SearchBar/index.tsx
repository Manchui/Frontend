/* eslint-disable tailwindcss/no-custom-classname */
import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

interface SearchBarProps {
  keyword?: string;
  onSearchSubmit: (submitValue: string) => void;
  setPage?: Dispatch<SetStateAction<number>>;
}

export default function SearchBar({ keyword, onSearchSubmit, setPage }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState<string | undefined>(keyword || '');

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchValue(value);

      // 검색어가 비어 있으면 refetch
      if (!value) onSearchSubmit(value);
    },
    [onSearchSubmit],
  );

  const handleSearchSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (searchValue && searchValue !== '') {
        onSearchSubmit(searchValue);
        if (setPage) setPage(1);
      }
    },
    [onSearchSubmit, searchValue, setPage],
  );

  useEffect(() => {
    if (keyword !== undefined) setSearchValue(keyword);
  }, [keyword]);

  return (
    <form className="flex gap-1 border-b font-medium hover:border-b-gray-300" onSubmit={handleSearchSubmit}>
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
