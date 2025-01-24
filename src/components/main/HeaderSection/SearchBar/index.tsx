import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useKeyword, useSetKeyword, useSetPage } from '@/store/useFilterStore';

export default function SearchBar() {
  const keyword = useKeyword();
  const setKeyword = useSetKeyword();

  const [searchValue, setSearchValue] = useState<string | undefined>(keyword || '');

  const setPage = useSetPage();

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchValue(value);

      // 검색어가 비어 있으면 refetch
      if (!value) setKeyword(value);
    },
    [setKeyword],
  );

  const handleSearchSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (searchValue && searchValue !== '') {
        setKeyword(searchValue);
        if (setPage) setPage(1);
      }
    },
    [searchValue, setKeyword, setPage],
  );

  useEffect(() => {
    if (keyword !== undefined) setSearchValue(keyword);
  }, [keyword]);

  return (
    <form className="flex items-center border-b border-b-gray-50 pb-1" onSubmit={handleSearchSubmit}>
      <input
        id="search"
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="모임 검색"
        className="w-32 bg-background font-semibold outline-none placeholder:text-sm placeholder:font-semibold tablet:w-48"
      />
      <label htmlFor="search" className="size-5 cursor-pointer">
        <Image src="/icons/main/search.svg" alt="검색" width={20} height={20} priority />
      </label>
    </form>
  );
}
