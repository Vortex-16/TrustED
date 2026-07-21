import React from 'react';
import { cn } from '@/lib/utils';

interface SkeuoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'inset';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const SkeuoButton: React.FC<SkeuoButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs rounded-full',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-4 text-base rounded-full',
  };

  const variantClasses = {
    primary: 'skeuo-btn-primary',
    secondary: 'skeuo-btn-secondary',
    accent: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-md hover:opacity-95 rounded-full',
    inset: 'skeuo-inset text-slate-700 hover:text-slate-900 active:scale-95',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none cursor-pointer',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
