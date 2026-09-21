import React from 'react';

export const SkeletonLoader = ({ count = 3, className = 'h-16 w-full' }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`animate-shimmer rounded-xl bg-slate-200/60 ${className}`}
        />
      ))}
    </div>
  );
};
