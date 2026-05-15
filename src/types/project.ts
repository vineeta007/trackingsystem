export interface Project {
  _id: string;
  name: string;
  clientName?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}
