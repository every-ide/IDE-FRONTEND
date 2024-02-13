import { cn } from '@/src/utils/style';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-ldark', className)}
      {...props}
    />
  );
}

export { Skeleton };
