import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Priority, Status, CustomerType } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPriorityStyles(priority: Priority) {
  switch (priority) {
    case 'High':
      return 'bg-red-50 text-red-700 border-red-100';
    case 'Medium':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'Low':
      return 'bg-green-50 text-green-700 border-green-100';
  }
}

export function getStatusStyles(status: Status) {
  switch (status) {
    case 'New':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'In Progress':
      return 'bg-blue-50 text-blue-700 border-blue-100';
    case 'In Review':
      return 'bg-purple-50 text-purple-700 border-purple-100';
    case 'Done':
      return 'bg-green-50 text-green-700 border-green-100';
  }
}

export function getCustomerTypeStyles(type: CustomerType) {
  return type === 'New Customer'
    ? 'bg-blue-50 text-blue-700 border-blue-100'
    : 'bg-emerald-50 text-emerald-700 border-emerald-100';
}

export function formatDate(dateString: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString));
}

export function formatRelativeDate(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(dateString);
}
