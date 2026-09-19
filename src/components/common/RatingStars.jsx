import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 4.5, reviewCount, size = 'sm' }) {
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.floor(rating)
                ? 'fill-amber-400 text-amber-400'
                : star - 0.5 <= rating
                ? 'fill-amber-300 text-amber-400'
                : 'text-stone-300 fill-stone-100'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-semibold text-stone-700">
        {rating.toFixed(1)}
      </span>
      {reviewCount && (
        <span className="text-xs text-stone-400 font-normal">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
