import React from 'react';
import { cn } from '@/lib/utils';

interface SkeuoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const SkeuoInput = React.forwardRef<HTMLInputElement, SkeuoInputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase px-1">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <div className="absolute left-4 text-slate-400 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'skeuo-input-field w-full px-4 py-3 text-sm text-slate-800 placeholder-slate-400 transition-all',
              icon && 'pl-11',
              error && 'border-rose-400 focus:border-rose-500',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-xs text-rose-500 px-1 font-medium">{error}</span>}
      </div>
    );
  }
);

SkeuoInput.displayName = 'SkeuoInput';
