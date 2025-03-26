import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ShakeWrapperProps {
  children: ReactNode;
  shouldShake?: boolean;
  className?: string;
}

export function ShakeWrapper({
  children,
  shouldShake,
  className,
}: ShakeWrapperProps) {
  return (
    <div
      className={cn(
        'transition-all duration-300',
        shouldShake && 'animate-shake',
        className
      )}
    >
      {children}
    </div>
  );
}
