import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none select-none rounded-xl font-sans group';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 hover:from-blue-800 hover:to-indigo-700 text-white shadow-md shadow-blue-900/15 hover:shadow-lg hover:shadow-blue-900/25 hover:-translate-y-0.5 focus:ring-blue-500 active:translate-y-0',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-slate-400 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border border-slate-300/90 bg-white hover:bg-slate-50 hover:border-slate-400 text-slate-700 shadow-xs hover:shadow-md hover:-translate-y-0.5 focus:ring-blue-500 active:translate-y-0',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-900/15 hover:shadow-lg hover:-translate-y-0.5 focus:ring-rose-500 active:translate-y-0',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 focus:ring-slate-400',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-4.5 py-2.2 text-sm gap-2',
    lg: 'px-6 py-2.8 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
      ) : null}

      <span>{children}</span>

      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
      )}
    </button>
  );
};
