import type { SetStateAction } from 'react';
import { useRouter } from 'next/router';

interface MyPageCategoryListProps {
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
}

// NOTE: URL 적는 걸로 생각하며 작성
const categories: { [key: string]: string } = {
  '나의 모임': 'MeetingData',
  '나의 리뷰': 'MyGatherData',
  '내가 만든 모임': 'MyMakeData',
};

export default function MyPageCategoryList({ category, setCategory }: MyPageCategoryListProps) {
  const router = useRouter();
  const { query } = router;

  const handleCategoryChange = (categoryId: string) => {
    if (category !== categoryId) {
      setCategory(categoryId);
      void router.push(`/mypage?category=${categoryId}`, undefined, { shallow: true });
    }
  };

  // NOTE: 카테고리 선택시 임시 스타일(변경 예정)
  const getButtonClass = (categoryId: string) =>
    categoryId === query.category ? 'flex-1 py-1.5 border-b-2 border-blue-800' : 'flex-1 hover:text-gray-500 text-blue-400 py-1.5 border-blue-100';

  return (
    <div className="flex select-none items-center justify-between text-sub-response font-semibold">
      {Object.keys(categories).map((item) => (
        <button
          key={item}
          onClick={() => {
            handleCategoryChange(item);
          }}
          className={`border-b-2 ${getButtonClass(item)}`}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
