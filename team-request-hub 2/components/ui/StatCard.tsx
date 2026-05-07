import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number | string;
  sub?: string;
  accent?: 'blue' | 'green' | 'red' | 'default';
  badge?: React.ReactNode;
}

export function StatCard({ label, value, sub, accent = 'default', badge }: StatCardProps) {
  const valueColor = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    red: 'text-red-600',
    default: 'text-slate-800',
  }[accent];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <p className="text-xs font-medium text-slate-500 mb-1.5">{label}</p>
      <p className={cn('text-3xl font-semibold leading-none', valueColor)}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-2">{sub}</p>}
      {badge && <div className="mt-2">{badge}</div>}
    </div>
  );
}
