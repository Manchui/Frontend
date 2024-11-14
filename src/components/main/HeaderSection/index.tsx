import Header from '@/components/main/HeaderSection/Header';
import SearchBar from '@/components/main/HeaderSection/SearchBar';

export default function HeaderSection() {
  return (
    <div className="flex w-full items-center justify-around text-title-response font-bold mobile:justify-between">
      <Header />
      <SearchBar />
    </div>
  );
}
