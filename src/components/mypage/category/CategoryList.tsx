import { useEffect, useState } from 'react';
import * as m from 'framer-motion/m';
import { useRouter } from 'next/router';

interface MyPageCategoryListProps {
  category: string;
  setCategory: (newCategory: string) => void;
}

const categories: string[] = ['나의 모임', '나의 리뷰', '내가 만든 모임'];

export default function MyPageCategoryList({ category, setCategory }: MyPageCategoryListProps) {
  const [selectedTab, setSelectedTab] = useState(categories[0]);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!category) {
      setCategory(categories[0]);
      void router.push(`/mypage?category=${categories[0]}`, undefined, { shallow: true });
    }
  }, [category, setCategory, router]);

  const handleCategoryChange = (categoryId: string) => {
    if (category !== categoryId) {
      setCategory(categoryId);
      setSelectedTab(categoryId);
      void router.push(`/mypage?category=${categoryId}`, undefined, { shallow: true });
    }
  };

  const getButtonClass = (categoryId: string) => (categoryId === query.category || categoryId === category ? '' : 'hover:text-gray-500 text-blue-400 ');

  return (
    <div className="relative">
      <article className="flex select-none items-center justify-between text-center text-sub-response font-semibold">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => handleCategoryChange(item)}
            className={`relative flex-1 border-b-2 border-blue-100 py-1.5 ${getButtonClass(item)}`}
          >
            <div className="py-1.5">{item}</div>
          </button>
        ))}
      </article>
      <m.div
        className="absolute bottom-0 h-[2px] rounded-full bg-blue-800"
        animate={{
          x: `${categories.indexOf(selectedTab) * 100}%`,
          width: '33.33%',
        }}
        initial={false}
        transition={{ type: 'spring', stiffness: 300, damping: 40 }}
      />
    </div>
  );
}
