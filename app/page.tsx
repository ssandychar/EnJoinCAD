'use client';

import { useState, useEffect, useCallback } from 'react';
import { Request, DashboardStats } from '@/types';
import { Topbar } from '@/components/dashboard/Topbar';
import { StatCard } from '@/components/ui/StatCard';
import { CustomerBreakdown } from '@/components/dashboard/CustomerBreakdown';
import { RequestTable } from '@/components/requests/RequestTable';
import { NewRequestModal } from '@/components/requests/NewRequestModal';
import { Badge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const [reqRes, statsRes] = await Promise.all([
      fetch('/api/requests'),
      fetch('/api/requests?stats=true'),
    ]);
    const [reqs, st] = await Promise.all([reqRes.json(), statsRes.json()]);
    setRequests(reqs);
    setStats(st);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (data: Parameters<typeof fetch>[1] extends undefined ? never : object) => {
    await fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/requests/${id}`, { method: 'DELETE' });
    await fetchData();
  };

  if (loading || !stats) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-sm text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Topbar onNewRequest={() => setShowModal(true)} />

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-5">

        {/* Page heading */}
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track and manage support requests across all sales teams
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <StatCard
            label="Total requests"
            value={stats.total}
            sub="All teams combined"
          />
          <StatCard
            label="New customers"
            value={stats.newCustomer}
            accent="blue"
            badge={
              <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                New customer
              </Badge>
            }
          />
          <StatCard
            label="Existing customers"
            value={stats.existingCustomer}
            accent="green"
            badge={
              <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Existing customer
              </Badge>
            }
          />
          <StatCard
            label="High priority"
            value={stats.highPriority}
            accent="red"
            sub="Needs attention"
          />
        </div>

        {/* Customer type breakdown */}
        <CustomerBreakdown stats={stats} />

        {/* Request table */}
        <div>
          <h2 className="text-sm font-semibold text-slate-700 mb-3">All requests</h2>
          <RequestTable requests={requests} onDelete={handleDelete} />
        </div>
      </main>

      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit={handleSubmit as any}
        />
      )}
    </div>
  );
}
