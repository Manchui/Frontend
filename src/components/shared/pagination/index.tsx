import { NextButton, PageList, PrevButton } from '@/components/shared/Pagination/Button';

export default function Pagination({ page, totalPage, handlePageChange }: { handlePageChange: (page: number) => void; page: number; totalPage: number }) {
  return (
    <div className="flex-center gap-2 py-4">
      <PrevButton page={page} handlePageChange={handlePageChange} />
      <PageList page={page} totalPage={totalPage} handlePageChange={handlePageChange} />
      <NextButton page={page} totalPage={totalPage} handlePageChange={handlePageChange} />
    </div>
  );
}
