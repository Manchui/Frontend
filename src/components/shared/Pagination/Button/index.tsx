/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable import/no-absolute-path */
import { useCallback, useEffect, useState } from 'react';

import PaginationArrowLeft from '/public/icons/paginationArrowLeft.svg';
import PaginationArrowRight from '/public/icons/paginationArrowRight.svg';

export function PrevButton({ page, handlePageChange }: { handlePageChange: (page: number) => void; page: number }) {
  const [disabled, setDisabled] = useState(page === 1);

  const handlePrevClick = () => {
    if (page <= 1) return;
    handlePageChange(page - 1);
  };

  useEffect(() => {
    setDisabled(page <= 1);
  }, [page]);

  return (
    <button
      type="button"
      disabled={disabled}
      className="flex-center size-10 rounded-2xl border border-cardBorder bg-blue-50 hover:bg-gray-100"
      onClick={handlePrevClick}
    >
      <div className="size-6">
        <PaginationArrowLeft width="100%" height="100%" fill={disabled ? '#A1A1A1' : '#262f33'} />
      </div>
    </button>
  );
}

export function NextButton({ page, totalPage, handlePageChange }: { handlePageChange: (page: number) => void; page: number; totalPage: number }) {
  const [disabled, setDisabled] = useState(page === totalPage);

  const handleNextClick = () => {
    if (page >= totalPage) return;
    handlePageChange(page + 1);
  };

  useEffect(() => {
    setDisabled(page >= totalPage);
  }, [page, totalPage]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleNextClick}
      className="flex-center size-10 rounded-2xl border border-cardBorder bg-blue-50 hover:bg-gray-100"
    >
      <div className="size-6">
        <PaginationArrowRight width="100%" height="100%" fill={disabled ? '#A1A1A1' : '#262f33'} />
      </div>
    </button>
  );
}

export function PageList({ page, totalPage, handlePageChange }: { handlePageChange: (page: number) => void; page: number; totalPage: number }) {
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const MAXPAGE_TO_SHOW = 5;

    let startPage = Math.max(1, page - Math.floor(MAXPAGE_TO_SHOW / 2));
    const endPage = Math.min(totalPage, startPage + MAXPAGE_TO_SHOW - 1);

    if (endPage - startPage < MAXPAGE_TO_SHOW - 1) {
      startPage = Math.max(1, endPage - MAXPAGE_TO_SHOW + 1);
    }

    for (let i = startPage; i <= endPage; i += 1) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  }, [page, totalPage]);

  const pageNumbers = getPageNumbers();

  return (
    <>
      {pageNumbers.map((pageNumber) => (
        <PageItem key={pageNumber} page={pageNumber} currentPage={page} handlePageChange={handlePageChange} />
      ))}
    </>
  );
}

export function PageItem({ page, currentPage, handlePageChange }: { currentPage: number; handlePageChange: (page: number) => void; page: number }) {
  const handlePageItemClick = () => {
    handlePageChange(page);
  };

  return (
    <button
      type="button"
      onClick={handlePageItemClick}
      className={`flex size-10 items-center justify-center rounded-2xl ${
        currentPage === page ? 'bg-blue-800 text-white hover:bg-blue-700' : 'bg-blue-50 text-blue-200 hover:bg-gray-100'
      }`}
    >
      {page}
    </button>
  );
}
