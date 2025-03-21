import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  isPresaleActive: boolean;
  isGraduated: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusBadge({
  isPresaleActive,
  isGraduated,
  className,
  size = 'md',
}: StatusBadgeProps) {
  const status =
    isPresaleActive && !isGraduated
      ? 'ACTIVE'
      : !isPresaleActive && isGraduated
      ? 'GRADUATED'
      : 'FAILED';

  const statusStyles = {
    ACTIVE: 'bg-green-600/30 text-green-400',
    GRADUATED: 'bg-blue-600/30 text-blue-400',
    FAILED: 'bg-red-600/30 text-red-400',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex font-bold rounded-md',
        statusStyles[status as keyof typeof statusStyles],
        sizeStyles[size],
        className
      )}
    >
      {status}
    </span>
  );
}
