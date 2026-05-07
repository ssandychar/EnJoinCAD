import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all',
        'focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
        {
          'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:scale-[0.98]':
            variant === 'primary',
          'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300 active:scale-[0.98]':
            variant === 'secondary',
          'text-slate-600 hover:bg-slate-100 focus:ring-slate-300':
            variant === 'ghost',
          'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:scale-[0.98]':
            variant === 'danger',
        },
        {
          'h-7 px-3 text-xs': size === 'sm',
          'h-9 px-4 text-sm': size === 'md',
          'h-11 px-6 text-sm': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
