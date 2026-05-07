'use client';

import { useState } from 'react';
import { CustomerType, SalesTeam, RequestCategory, Priority, Status } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface NewRequestModalProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    customerType: CustomerType;
    salesTeam: SalesTeam;
    category: RequestCategory;
    priority: Priority;
    status: Status;
    description?: string;
  }) => Promise<void>;
}

export function NewRequestModal({ onClose, onSubmit }: NewRequestModalProps) {
  const [customerType, setCustomerType] = useState<CustomerType>('New Customer');
  const [salesTeam, setSalesTeam] = useState<SalesTeam>('APAC Sales');
  const [category, setCategory] = useState<RequestCategory>('Cloud Adoption');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [status, setStatus] = useState<Status>('New');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) { setError('Please enter a request title.'); return; }
    setLoading(true);
    setError('');
    try {
      await onSubmit({ title, customerType, salesTeam, category, priority, status, description });
      onClose();
    } catch {
      setError('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">New support request</h2>
            <p className="text-xs text-slate-400 mt-0.5">Submit a request to Cloud Adoption, Technical, or Marketing</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Customer Type Toggle */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-slate-500">Customer type</span>
            <div className="flex rounded-lg border border-slate-200 overflow-hidden p-0.5 bg-slate-50 gap-0.5">
              {(['New Customer', 'Existing Customer'] as CustomerType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setCustomerType(t)}
                  className={cn(
                    'flex-1 py-2 rounded-md text-xs font-medium transition-all',
                    customerType === t
                      ? t === 'New Customer'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <Input
            id="title"
            label="Request title"
            placeholder="Describe what you need..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Team & Category */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              id="salesTeam"
              label="Sales team"
              value={salesTeam}
              onChange={(e) => setSalesTeam(e.target.value as SalesTeam)}
              options={[
                { value: 'APAC Sales', label: 'APAC Sales' },
                { value: 'EMEA Sales', label: 'EMEA Sales' },
                { value: 'Americas Sales', label: 'Americas Sales' },
                { value: 'SMB Sales', label: 'SMB Sales' },
                { value: 'Enterprise Sales', label: 'Enterprise Sales' },
              ]}
            />
            <Select
              id="category"
              label="Request category"
              value={category}
              onChange={(e) => setCategory(e.target.value as RequestCategory)}
              options={[
                { value: 'Cloud Adoption', label: 'Cloud Adoption' },
                { value: 'Technical', label: 'Technical' },
                { value: 'Marketing', label: 'Marketing' },
              ]}
            />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              id="priority"
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              options={[
                { value: 'High', label: 'High' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Low', label: 'Low' },
              ]}
            />
            <Select
              id="status"
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              options={[
                { value: 'New', label: 'New' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'In Review', label: 'In Review' },
                { value: 'Done', label: 'Done' },
              ]}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className="text-xs font-medium text-slate-500">
              Description <span className="text-slate-300">(optional)</span>
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="Provide additional context..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-slate-300 transition-colors placeholder:text-slate-400"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
