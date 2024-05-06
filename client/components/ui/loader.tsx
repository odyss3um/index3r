import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ className, message }: { className?: string, message?: string }) => {
  return (
    <div className={cn('flex justify-center items-center space-x-4', className)}>
      <Loader2
        className={cn('my-28 h-10 w-10 text-primary animate-spin', className)}
      />
      {message && <span className="text-primary font-semibold">{message}</span>}
    </div>
  );
}


export default LoadingSpinner;