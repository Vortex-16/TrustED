import React from 'react';
import { cn } from '@/lib/utils';

interface SkeuoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'inset' | 'glass';
  children: React.ReactNode;
  className?: string;
}

export const SkeuoCard: React.FC<SkeuoCardProps> = ({
  variant = 'raised',
  children,
  className,
  ...props
}) => {
  const variantClass =
    variant === 'raised'
      ? 'skeuo-card p-6'
      : variant === 'inset'
      ? 'skeuo-inset p-6'
      : 'skeuo-glass rounded-3xl p-6';

  return (
    <div className={cn(variantClass, className)} {...props}>
      {children}
    </div>
  );
};
