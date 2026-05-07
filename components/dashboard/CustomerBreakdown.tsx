'use client';

import { DashboardStats, RequestCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CustomerBreakdownProps {
  stats: DashboardStats;
}

function CategoryBar({
  label,
  count,
  total,
  color,
}: {
  label: RequestCategory;
  count: number;
  total: number;
  color: 'blue' | 'green';
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const barColor = color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500';

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500 w-28 shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-medium text-slate-600 w-4 text-right">{count}</span>
    </div>
  );
}

export function CustomerBreakdown({ stats }: CustomerBreakdownProps) {
  const categories: RequestCategory[] = ['Cloud Adoption', 'Technical', 'Marketing'];

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* New Customer */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">New customer</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
              <span className="text-xs text-blue-600 font-medium">Active pursuit</span>
            </div>
          </div>
          <span className="text-2xl font-semibold text-blue-600">{stats.newCustomer}</span>
        </div>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <CategoryBar
              key={cat}
              label={cat}
              count={stats.byCategory[cat].new}
              total={stats.newCustomer}
              color="blue"
            />
          ))}
        </div>
      </div>

      {/* Existing Customer */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-0.5">Existing customer</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs text-emerald-600 font-medium">Retention & growth</span>
            </div>
          </div>
          <span className="text-2xl font-semibold text-emerald-600">{stats.existingCustomer}</span>
        </div>
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <CategoryBar
              key={cat}
              label={cat}
              count={stats.byCategory[cat].existing}
              total={stats.existingCustomer}
              color="green"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
