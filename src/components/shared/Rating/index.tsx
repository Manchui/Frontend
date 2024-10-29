import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

type RatingProps = {
  onChange?: (newScore: number) => void;
  score: number;
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
    const halfHeartFill = Math.round(currentScore % 1) / 2;

    return (
      <div
        key={index}
        className={clsx(
          'relative size-6 cursor-pointer',
          index === hoveredScore && 'scale-110 transition-all duration-100 ease-in-out',
          hoveredScore === null && 'scale-100 transition-all duration-100 ease-in-out',
        )}
        onMouseEnter={onChange ? () => setHoveredScore(index) : undefined}
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
        {index <= fullHearts ? (
          <Image src="/icons/heart-active-noround.svg" alt="Heart Icon" layout="fill" className="absolute inset-0" />
        ) : (
          <Image src="/icons/heart-inactive-noround.svg" alt="Heart Icon" layout="fill" className="absolute inset-0" />
        )}

        {isHalfHeart &&
          (halfHeartFill === 0.5 ? (
            <Image src="/icons/heart-active-half-noround.svg" alt="Heart Icon" layout="fill" className="absolute inset-0" />
          ) : (
            <Image src="/icons/heart-inactive-noround.svg" alt="Heart Icon" layout="fill" className="absolute inset-0" />
          ))}
      </div>
    );
  };
  return <div className="flex gap-[2px]">{Array.from({ length: 5 }, (_, i) => renderHeart(i + 1))}</div>;
}
