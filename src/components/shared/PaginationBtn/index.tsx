import { NextButton, PageList, PrevButton } from '@/components/shared/PaginationBtn/Button';

export default function PaginationBtn({ page, totalPage }: { page: number; totalPage: number }) {
  return (
    <div className="flex-center gap-2 py-4">
      <PrevButton page={page} />
      <PageList page={page} totalPage={totalPage} />
      <NextButton page={page} totalPage={totalPage} />
    </div>
  );
}
