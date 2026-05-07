'use client';

import { useState } from 'react';
import { Request, CustomerType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import {
  getPriorityStyles,
  getStatusStyles,
  getCustomerTypeStyles,
  formatRelativeDate,
  cn,
} from '@/lib/utils';
import { Search, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

interface RequestTableProps {
  requests: Request[];
  onDelete?: (id: string) => void;
}

type SortKey = 'customerType' | 'salesTeam' | 'category' | 'priority' | 'status' | 'createdAt';

const FILTER_TABS: { label: string; value: CustomerType | 'all' }[] = [
  { label: 'All requests', value: 'all' },
  { label: 'New customer', value: 'New Customer' },
  { label: 'Existing customer', value: 'Existing Customer' },
];

export function RequestTable({ requests, onDelete }: RequestTableProps) {
  const [customerFilter, setCustomerFilter] = useState<CustomerType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = requests
    .filter((r) => {
      if (customerFilter !== 'all' && r.customerType !== customerFilter) return false;
      if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.salesTeam.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === 'asc' ? cmp : -cmp;
    });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp
        size={10}
        className={cn(sortKey === col && sortDir === 'asc' ? 'text-blue-600' : 'text-slate-300')}
      />
      <ChevronDown
        size={10}
        className={cn(sortKey === col && sortDir === 'desc' ? 'text-blue-600' : 'text-slate-300')}
      />
    </span>
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Table header */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCustomerFilter(tab.value)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
                  customerFilter === tab.value
                    ? tab.value === 'New Customer'
                      ? 'bg-blue-600 text-white'
                      : tab.value === 'Existing Customer'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-white'
                    : 'text-slate-500 hover:bg-slate-100'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search size={14} />}
              className="w-52"
            />
            <Select
              options={[
                { value: 'all', label: 'All priorities' },
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-36"
            />
            <Select
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'New', label: 'New' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'In Review', label: 'In Review' },
                { value: 'Done', label: 'Done' },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-36"
            />
          </div>
        </div>
      </div>

      {/* Row count */}
      <div className="px-5 py-2.5 border-b border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-400">
          {filtered.length} request{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                { key: 'customerType' as SortKey, label: 'Customer type', w: 'w-36' },
                { key: 'salesTeam' as SortKey, label: 'Sales team', w: 'w-32' },
                { key: 'category' as SortKey, label: 'Category', w: 'w-32' },
                { key: 'priority' as SortKey, label: 'Priority', w: 'w-24' },
                { key: 'status' as SortKey, label: 'Status', w: 'w-28' },
              ].map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide cursor-pointer hover:text-slate-600 select-none',
                    col.w
                  )}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                  <SortIcon col={col.key} />
                </th>
              ))}
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">
                Request title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide w-20">
                Created
              </th>
              {onDelete && <th className="w-10" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-400">
                  No requests match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-4 py-3">
                    <Badge className={cn(getCustomerTypeStyles(r.customerType))}>
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full',
                          r.customerType === 'New Customer' ? 'bg-blue-500' : 'bg-emerald-500'
                        )}
                      />
                      {r.customerType === 'New Customer' ? 'New' : 'Existing'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {r.salesTeam}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.category}</td>
                  <td className="px-4 py-3">
                    <Badge className={getPriorityStyles(r.priority)}>{r.priority}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatusStyles(r.status)}>{r.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 max-w-xs">
                    <span className="line-clamp-1">{r.title}</span>
                    {r.description && (
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{r.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400 whitespace-nowrap">
                    {formatRelativeDate(r.createdAt)}
                  </td>
                  {onDelete && (
                    <td className="px-2 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 hover:bg-red-50"
                        onClick={() => onDelete(r.id)}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
