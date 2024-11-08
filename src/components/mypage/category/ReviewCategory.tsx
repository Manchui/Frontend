import { useRouter } from 'next/router';

interface ReviewCategoryProps {
  category: string;
  review: string;
  setReview: (newReview: string) => void;
}

const reviewCategory: string[] = ['작성 가능한 리뷰', '작성한 리뷰'];

export default function ReviewCategory({ category, review, setReview }: ReviewCategoryProps) {
  const router = useRouter();
  const { query } = router;

  const handleCategoryChange = (categoryId: string) => {
    if (review !== categoryId) {
      setReview(categoryId);
      void router.push(`/mypage?category=${category}&reviewCategory=${categoryId}`, undefined, { shallow: true });
    }
  };

  const getButtonClass = (categoryId: string) => {
    if (query.category === '나의 리뷰') {
      if (categoryId === '작성 가능한 리뷰' && query.reviewCategory !== '작성한 리뷰') {
        return 'text-white bg-blue-800';
      }
    }
    return categoryId === query.reviewCategory ? 'text-white bg-blue-800' : 'text-blue-700 bg-blue-100';
  };

  return (
    <div className="mx-4 mt-6 flex gap-4">
      {reviewCategory.map((item) => (
        <button
          onClick={() => {
            handleCategoryChange(item);
          }}
          key={item}
          type="button"
          className={`${getButtonClass(item)} rounded-xl px-4 py-2.5 text-sm`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
