import { Request, DashboardStats, RequestFilters } from '@/types';

export const SALES_TEAMS = [
  'APAC Sales',
  'EMEA Sales',
  'Americas Sales',
  'SMB Sales',
  'Enterprise Sales',
] as const;

export const REQUEST_CATEGORIES = [
  'Cloud Adoption',
  'Technical',
  'Marketing',
] as const;

export const PRIORITIES = ['High', 'Medium', 'Low'] as const;
export const STATUSES = ['New', 'In Progress', 'In Review', 'Done'] as const;

export const sampleRequests: Request[] = [
  {
    id: '1',
    title: 'Cloud migration scoping for prospect in SG',
    customerType: 'New Customer',
    salesTeam: 'APAC Sales',
    category: 'Cloud Adoption',
    priority: 'High',
    status: 'In Progress',
    description: 'New prospect in Singapore exploring full cloud migration. Needs architecture workshop and TCO analysis.',
    createdAt: '2025-04-28T09:00:00Z',
    updatedAt: '2025-05-02T14:30:00Z',
  },
  {
    id: '2',
    title: 'Technical demo for Fortune 500 prospect',
    customerType: 'New Customer',
    salesTeam: 'Americas Sales',
    category: 'Technical',
    priority: 'High',
    status: 'New',
    description: 'Executive-level technical demo required for Fortune 500 evaluation. Must include live environment.',
    createdAt: '2025-05-01T10:15:00Z',
    updatedAt: '2025-05-01T10:15:00Z',
  },
  {
    id: '3',
    title: 'Co-branded campaign assets for new logo pursuit',
    customerType: 'New Customer',
    salesTeam: 'EMEA Sales',
    category: 'Marketing',
    priority: 'Medium',
    status: 'In Review',
    description: 'Need co-branded materials for a strategic deal in the UK financial sector.',
    createdAt: '2025-04-25T08:30:00Z',
    updatedAt: '2025-05-03T11:00:00Z',
  },
  {
    id: '4',
    title: 'Starter architecture guide for SMB onboarding',
    customerType: 'New Customer',
    salesTeam: 'SMB Sales',
    category: 'Cloud Adoption',
    priority: 'Low',
    status: 'Done',
    description: 'Simple reference architecture needed for new SMB customers getting started.',
    createdAt: '2025-04-20T12:00:00Z',
    updatedAt: '2025-04-30T09:45:00Z',
  },
  {
    id: '5',
    title: 'Security review for enterprise prospect',
    customerType: 'New Customer',
    salesTeam: 'Enterprise Sales',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    description: 'Prospect requires a full security and compliance review before sign-off. Infosec team involvement needed.',
    createdAt: '2025-04-29T14:00:00Z',
    updatedAt: '2025-05-04T10:20:00Z',
  },
  {
    id: '6',
    title: 'Localised collateral for JP market entry',
    customerType: 'New Customer',
    salesTeam: 'APAC Sales',
    category: 'Marketing',
    priority: 'Medium',
    status: 'New',
    description: 'Japan market requires fully localised sales collateral including one-pager and slide deck.',
    createdAt: '2025-05-05T07:00:00Z',
    updatedAt: '2025-05-05T07:00:00Z',
  },
  {
    id: '7',
    title: 'Resolve latency issues for Tier-1 account',
    customerType: 'Existing Customer',
    salesTeam: 'Americas Sales',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    description: 'Tier-1 customer reporting significant latency degradation on their production workloads. Urgent escalation.',
    createdAt: '2025-05-03T16:00:00Z',
    updatedAt: '2025-05-06T08:00:00Z',
  },
  {
    id: '8',
    title: 'Expansion workshop — multi-region setup',
    customerType: 'Existing Customer',
    salesTeam: 'EMEA Sales',
    category: 'Cloud Adoption',
    priority: 'Medium',
    status: 'In Review',
    description: 'Customer expanding from single-region to multi-region. Requesting a dedicated workshop session.',
    createdAt: '2025-04-27T11:30:00Z',
    updatedAt: '2025-05-04T15:00:00Z',
  },
  {
    id: '9',
    title: 'Case study content for renewal campaign',
    customerType: 'Existing Customer',
    salesTeam: 'Enterprise Sales',
    category: 'Marketing',
    priority: 'Low',
    status: 'Done',
    description: 'Approved customer willing to participate in a case study tied to upcoming renewal conversation.',
    createdAt: '2025-04-18T09:00:00Z',
    updatedAt: '2025-04-28T14:00:00Z',
  },
  {
    id: '10',
    title: 'API integration support for upsell motion',
    customerType: 'Existing Customer',
    salesTeam: 'SMB Sales',
    category: 'Technical',
    priority: 'Medium',
    status: 'New',
    description: 'Customer interested in adding API integrations as part of a product upsell. Needs technical guidance.',
    createdAt: '2025-05-06T10:00:00Z',
    updatedAt: '2025-05-06T10:00:00Z',
  },
];

// In-memory store (replace with a database in production)
let requestStore: Request[] = [...sampleRequests];

export function getRequests(filters?: RequestFilters): Request[] {
  let results = [...requestStore];

  if (filters?.customerType && filters.customerType !== 'all') {
    results = results.filter((r) => r.customerType === filters.customerType);
  }
  if (filters?.salesTeam && filters.salesTeam !== 'all') {
    results = results.filter((r) => r.salesTeam === filters.salesTeam);
  }
  if (filters?.category && filters.category !== 'all') {
    results = results.filter((r) => r.category === filters.category);
  }
  if (filters?.priority && filters.priority !== 'all') {
    results = results.filter((r) => r.priority === filters.priority);
  }
  if (filters?.status && filters.status !== 'all') {
    results = results.filter((r) => r.status === filters.status);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.salesTeam.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    );
  }

  return results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addRequest(data: Omit<Request, 'id' | 'createdAt' | 'updatedAt'>): Request {
  const now = new Date().toISOString();
  const request: Request = {
    ...data,
    id: String(Date.now()),
    createdAt: now,
    updatedAt: now,
  };
  requestStore = [request, ...requestStore];
  return request;
}

export function updateRequest(id: string, updates: Partial<Request>): Request | null {
  const index = requestStore.findIndex((r) => r.id === id);
  if (index === -1) return null;
  requestStore[index] = {
    ...requestStore[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return requestStore[index];
}

export function deleteRequest(id: string): boolean {
  const index = requestStore.findIndex((r) => r.id === id);
  if (index === -1) return false;
  requestStore.splice(index, 1);
  return true;
}

export function getDashboardStats(): DashboardStats {
  const all = requestStore;
  const newCust = all.filter((r) => r.customerType === 'New Customer');
  const existCust = all.filter((r) => r.customerType === 'Existing Customer');

  const byCategory = REQUEST_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = {
      new: newCust.filter((r) => r.category === cat).length,
      existing: existCust.filter((r) => r.category === cat).length,
    };
    return acc;
  }, {} as DashboardStats['byCategory']);

  const byTeam = SALES_TEAMS.reduce((acc, team) => {
    acc[team] = all.filter((r) => r.salesTeam === team).length;
    return acc;
  }, {} as DashboardStats['byTeam']);

  const byStatus = STATUSES.reduce((acc, status) => {
    acc[status] = all.filter((r) => r.status === status).length;
    return acc;
  }, {} as DashboardStats['byStatus']);

  return {
    total: all.length,
    newCustomer: newCust.length,
    existingCustomer: existCust.length,
    highPriority: all.filter((r) => r.priority === 'High').length,
    byCategory,
    byTeam,
    byStatus,
  };
}
