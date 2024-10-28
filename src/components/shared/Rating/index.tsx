import clsx from 'clsx';
import { useState } from 'react';

type RatingProps = {
  score: number;
  onChange?: (newScore: number) => void;
};

/**
 * Rating 컴포넌트
 *
 * @example const [newRating, setNewRating] = useState(0);
 * @param {number} score - 별점 점수 최대 5, newRating
 * @param {(newScore: number) => void} onChange - 점수 매기는 함수, setNewRating
 */
export default function Rating({ score, onChange }: RatingProps) {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const currentScore = hoveredScore !== null ? hoveredScore : score;

  const renderHeart = (index: number) => {
    const fullHearts = Math.floor(currentScore);
    const isHalfHeart = index === fullHearts + 1;
    const halfHeartFill = currentScore % 1;

    return (
      <div
        key={index}
        className={clsx(
          'relative h-6 w-6 cursor-pointer',
          index === hoveredScore && 'scale-110 transition-all duration-100 ease-in-out',
          hoveredScore === null && 'scale-100 transition-all duration-100 ease-in-out',
        )}
        onMouseOver={onChange ? () => setHoveredScore(index) : undefined}
        onMouseLeave={onChange ? () => setHoveredScore(null) : undefined}
        onClick={
          onChange
            ? () => {
                onChange(index);
                setHoveredScore(null);
              }
            : undefined
        }
      >
        <svg className="absolute inset-0 text-gray-200" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="currentColor"
          />
        </svg>

        {index <= fullHearts && (
          <svg className="absolute inset-0 text-yellow-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        )}

        {isHalfHeart && (
          <svg
            className="absolute inset-0 text-yellow-400"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              clipPath: `inset(0 ${100 - halfHeartFill * 100}% 0 0)`,
            }}
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    );
  };

  return <div className="flex gap-[2px]">{Array.from({ length: 5 }, (_, i) => renderHeart(i + 1))}</div>;
}
