import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-500">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          id={id}
          className={cn(
            'h-9 w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-800',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'hover:border-slate-300 transition-colors placeholder:text-slate-400',
            icon ? 'pl-9 pr-3' : 'px-3',
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
