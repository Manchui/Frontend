/* eslint-disable tailwindcss/no-custom-classname */
import type { ChangeEvent, FormEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import * as m from 'framer-motion/m';
import Search from 'public/icons/Search';
import { useKeyword, useSetKeyword, useSetPage } from '@/store/useFilterStore';

export default function SearchBar() {
  const keyword = useKeyword();
  const setPage = useSetPage();
  const setKeyword = useSetKeyword();

  const [searchValue, setSearchValue] = useState<string | undefined>(keyword || '');

  const ref = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true });

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
    <m.form
      ref={ref}
      style={{
        transform: isInView ? 'none' : 'translateX(10px)',
        opacity: isInView ? 1 : 0,
        transition: 'all 1s ease-in-out',
      }}
      className="flex gap-1 border-b border-b-black"
      onSubmit={handleSearchSubmit}
    >
      <label htmlFor="input" className="cursor-pointer">
        <Search color="black" className="size-6 mobile:size-8" />
      </label>
      <input
        id="input"
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="만취에서 찾고 계신 모임이 있나요?"
        className="w-search-180-240 bg-background text-13-16-response font-semibold outline-none placeholder:text-13-16-response placeholder:text-black/60"
      />
    </m.form>
  );
}
