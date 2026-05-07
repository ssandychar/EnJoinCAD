'use client';

import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

interface TopbarProps {
  onNewRequest: () => void;
}

export function Topbar({ onNewRequest }: TopbarProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 h-14 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-3">
        {/* Logo mark */}
        <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1.2" fill="white" />
            <rect x="8" y="1" width="5" height="5" rx="1.2" fill="white" opacity="0.6" />
            <rect x="1" y="8" width="5" height="5" rx="1.2" fill="white" opacity="0.6" />
            <rect x="8" y="8" width="5" height="5" rx="1.2" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold text-slate-800">Team Request Hub</span>
        <span className="text-xs text-slate-400 pl-3 ml-0 border-l border-slate-200">
          Sales Operations
        </span>
      </div>
      <Button variant="primary" size="md" onClick={onNewRequest}>
        <Plus size={15} />
        New request
      </Button>
    </header>
  );
}
