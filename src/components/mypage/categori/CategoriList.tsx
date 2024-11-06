import { useRouter } from 'next/router';

interface MyPageCategoryListProps {
  category: string;
  setCategory: (newCategory: string) => void;
}

const categories: string[] = ['나의 모임', '나의 리뷰', '내가 만든 모임'];

export default function MyPageCategoryList({ category, setCategory }: MyPageCategoryListProps) {
  const router = useRouter();
  const { query } = router;

  const handleCategoryChange = (categoryId: string) => {
    if (category !== categoryId) {
      setCategory(categoryId);
      localStorage.setItem('my-category', categoryId);
      void router.push(`/mypage?category=${categoryId}`, undefined, { shallow: true });
    }
  };

  const getButtonClass = (categoryId: string) =>
    categoryId === query.category ? 'flex-1 py-1.5 border-b-2 border-blue-800' : 'flex-1 hover:text-gray-500 text-blue-400 py-1.5 border-blue-100';
  console.log('query: ', query);
  return (
    <div className="flex select-none items-center justify-between text-sub-response font-semibold">
      {categories.map((item) => (
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
