import type { Dispatch, SetStateAction } from 'react';
import Header from '@/components/main/HeaderSection/Header';
import SearchBar from '@/components/main/HeaderSection/SearchBar';

interface HeaderSectionProps {
  searchValue: string;
  selectedCategory: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

export default function HeaderSection({ searchValue, setSearchValue, selectedCategory }: HeaderSectionProps) {
  return (
    <div className="flex w-full items-center justify-around text-title-response font-bold mobile:justify-between">
      <Header selectedCategory={selectedCategory} />
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
    </div>
  );
}
