import Header from '@/components/main/HeaderSection/Header';
import SearchBar from '@/components/main/HeaderSection/SearchBar';

interface HeaderSectionProps {
  category?: string;
  handleSearchSubmit: (submitValue: string) => void;
  keyword?: string;
}

export default function HeaderSection({ keyword, category, handleSearchSubmit }: HeaderSectionProps) {
  return (
    <div className="flex w-full items-center justify-around text-title-response font-bold mobile:justify-between">
      <Header category={category} />
      <SearchBar keyword={keyword} onSearchSubmit={handleSearchSubmit} />
    </div>
  );
}
