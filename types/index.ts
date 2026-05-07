export type CustomerType = 'New Customer' | 'Existing Customer';
export type SalesTeam = 'APAC Sales' | 'EMEA Sales' | 'Americas Sales' | 'SMB Sales' | 'Enterprise Sales';
export type RequestCategory = 'Cloud Adoption' | 'Technical' | 'Marketing';
export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'New' | 'In Progress' | 'In Review' | 'Done';

export interface Request {
  id: string;
  title: string;
  customerType: CustomerType;
  salesTeam: SalesTeam;
  category: RequestCategory;
  priority: Priority;
  status: Status;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RequestFilters {
  customerType?: CustomerType | 'all';
  salesTeam?: SalesTeam | 'all';
  category?: RequestCategory | 'all';
  priority?: Priority | 'all';
  status?: Status | 'all';
  search?: string;
}

export interface DashboardStats {
  total: number;
  newCustomer: number;
  existingCustomer: number;
  highPriority: number;
  byCategory: Record<RequestCategory, { new: number; existing: number }>;
  byTeam: Record<SalesTeam, number>;
  byStatus: Record<Status, number>;
}
