import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export const Select = forwardRef(({
  label,
  options = [],
  error,
  className,
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 font-sans">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold uppercase tracking-wider text-slate-700 select-none"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        ref={ref}
        className={cn(
          'w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 cursor-pointer',
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300/90 hover:border-slate-400 focus:border-blue-500 focus:ring-blue-100',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-xs text-rose-600 font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
