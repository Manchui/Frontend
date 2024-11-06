/* eslint-disable no-plusplus */
import { useEffect, useState } from 'react';
import Image from 'next/image';

type PaginationProps = {
  page: number;

  setPage: (page: number) => void;
  totalPage: number;
};

export default function Pagination({ page, totalPage, setPage }: PaginationProps) {
  const [limit, setLimit] = useState(5); // 초기값을 모바일 사이즈로 설정
  const tabletLimit = 7; // 태블릿 사이즈에서 표시할 숫자 칸 수
  const mobileLimit = 5; // 모바일 사이즈에서 표시할 숫자 칸 수

  // 화면 크기에 따라 표시할 숫자 칸 수 결정
  useEffect(() => {
    const updateLimit = () => {
      setLimit(window.innerWidth >= 768 ? tabletLimit : mobileLimit);
    };

    updateLimit(); // 초기값 설정

    window.addEventListener('resize', updateLimit); // 화면 크기 변경 시 호출

    return () => {
      window.removeEventListener('resize', updateLimit); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  const getPageRange = () => {
    const pageNumbers: (number | string)[] = [];
    const halfLimit = Math.floor(limit / 2);

    // 시작 페이지 및 끝 페이지 결정
    let startPage = Math.max(1, page - halfLimit);
    let endPage = Math.min(totalPage, page + halfLimit);

    // 전체 페이지 수가 표시할 수 있는 수보다 작을 경우
    if (totalPage <= limit) {
      startPage = 1;
      endPage = totalPage;
    }
    if (page <= halfLimit) {
      endPage = limit; // 1부터 시작
    } else if (page + halfLimit >= totalPage) {
      startPage = totalPage - limit + 1; // 끝에서부터 한정
    }

    // 페이지 번호 생성
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // 첫 페이지에 대한 '...' 추가
    if (startPage > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1); // 첫 페이지 추가
    }

    // 마지막 페이지에 대한 '...' 추가
    if (endPage < totalPage) {
      pageNumbers.push('...');
      pageNumbers.push(totalPage); // 마지막 페이지 추가
    }

    return pageNumbers;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      setPage(newPage);
    }
  };

  const pageNumbers = getPageRange(); // 페이지 번호 배열 가져오기

  return (
    <div className="flex items-center gap-1">
      {/* 이전 페이지 버튼 */}
      <button
        type="button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`size-[34px] rounded-md bg-blue-50 ${page === 1 ? 'text-blue-200' : 'text-blue-800'}`} // 비활성화 조건 추가
      >
        <Image src="icons/down.svg" width={24} height={24} alt="이전" className="rotate-90" />
      </button>

      {/* 페이지 번호 */}
      {pageNumbers.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)} // 숫자일 때만 페이지 변경
          className={`size-[34px] rounded-md bg-blue-50 ${pageNumber === page ? 'text-blue-800' : 'text-blue-200'}`}
        >
          {pageNumber} {/* ... 표시 */}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        type="button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPage}
        className={`size-[34px] rounded-md bg-blue-50 ${page >= totalPage ? 'text-blue-200' : 'text-blue-800'}`} // 비활성화 조건 추가
      >
        <Image src="icons/down.svg" width={24} height={24} alt="다음" className="-rotate-90" />
      </button>
    </div>
  );
}
