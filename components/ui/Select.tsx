import { cn } from '@/lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-slate-500">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'hover:border-slate-300 transition-colors cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
