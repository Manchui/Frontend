import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

type ratingProps = {
  score: number;
  onChange?: (newscore: number) => void;
};

/**
 * Rating 컴포넌트
 *
 * @example const [newRating, setNewRating] = useState(0);
 * @param {number} score - 별점 점수 최대 5, newRating
 * @param {(newscore: number) => void} onChange - 점수 매기는 함수 , setNewRating
 */
export default function Rating({ score, onChange }: ratingProps) {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  function handleRating() {
    const currentScore = hoveredScore !== null ? hoveredScore : score;
    const ratingStars = [];

    for (let i = 1; i <= 5; i++) {
      ratingStars.push(
        <li key={i}>
          <Image
            src={i <= currentScore ? '/icons/heart-active-noround.svg' : '/icons/heart-inactive-noround.svg'}
            width={24}
            height={24}
            alt="별"
            className={clsx(
              i === hoveredScore && 'scale-110 transition-all duration-100 ease-in-out',
              hoveredScore === null && 'scale-100 transition-all duration-100 ease-in-out',
            )}
            onMouseOver={onChange ? () => setHoveredScore(i) : undefined}
            onMouseLeave={onChange ? () => setHoveredScore(null) : undefined}
            onClick={
              onChange
                ? () => {
                    onChange(i);
                    setHoveredScore(null);
                  }
                : undefined
            }
            style={{ cursor: onChange ? 'pointer' : 'default' }}
          />
        </li>,
      );
    }

    return ratingStars;
  }

  return (
    <div>
      <ul className="flex gap-[2px]">{handleRating()}</ul>
    </div>
  );
}
