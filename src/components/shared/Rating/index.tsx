import Image from 'next/image';
import { useEffect, useState } from 'react';

type ratingProps = {
  score: number;
  onChange?: (newRating: number) => void;
};

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
            onMouseOver={() => setHoveredScore(i)}
            onMouseLeave={() => setHoveredScore(null)}
            onClick={onChange ? () => onChange(i) : undefined}
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
