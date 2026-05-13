/* User & Authentication Types */
export type UserRole = 'student' | 'faculty' | 'operational' | 'hod' | 'admin' | 'system-admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  avatar?: string;
  verified: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/* Complaint & Issue Types */
export type ComplaintStatus = 'submitted' | 'verified' | 'assigned' | 'in-progress' | 'resolved' | 'closed' | 'escalated';
export type ComplaintCategory = 'facilities' | 'it' | 'security' | 'academic' | 'student-services' | 'other';
export type ComplaintPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Complaint {
  id: string;
  studentId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  location: string;
  photos: string[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  estimatedResolutionTime?: number;
  actualResolutionTime?: number;
  resolvedAt?: Date;
}

export interface ComplaintTimeline {
  id: string;
  complaintId: string;
  status: ComplaintStatus;
  changedBy: string;
  changedAt: Date;
  notes?: string;
}

/* Department & Faculty Types */
export interface Department {
  id: string;
  name: string;
  code: string;
  headId: string;
  staffCount: number;
  contactEmail: string;
}

export interface Faculty {
  id: string;
  userId: string;
  departmentId: string;
  specialization?: string;
  officeHours?: string;
}

/* Operational Task Types */
export type TaskStatus = 'pending' | 'accepted' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  complaintId: string;
  assignedTo: string;
  status: TaskStatus;
  startTime?: Date;
  endTime?: Date;
  location: string;
  notes: string;
  priority: ComplaintPriority;
  estimatedDuration: number;
  actualDuration?: number;
}

export interface SLA {
  id: string;
  taskId: string;
  category: ComplaintCategory;
  priority: ComplaintPriority;
  targetResolutionTime: number; // in hours
  warningThreshold: number; // % of time used before warning
  breached: boolean;
  breachedAt?: Date;
}

/* Escalation Types */
export type EscalationType = 'hod-review' | 'external-contractor' | 'emergency' | 'information-request';

export interface Escalation {
  id: string;
  complaintId: string;
  type: EscalationType;
  reason: string;
  assignedTo?: string;
  status: 'pending' | 'in-review' | 'resolved';
  createdAt: Date;
  resolvedAt?: Date;
}

/* Analytics Types */
export interface Analytics {
  totalComplaints: number;
  resolvedComplaints: number;
  resolutionRate: number;
  averageResolutionTime: number;
  satisfactionScore: number;
  slaCompliance: number;
  escalationCount: number;
  departmentMetrics: DepartmentMetric[];
}

export interface DepartmentMetric {
  departmentId: string;
  departmentName: string;
  complaintCount: number;
  resolutionRate: number;
  averageTime: number;
  staffCount: number;
}

/* API Response Types */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/* Filter Types */
export interface ComplaintFilter {
  status?: ComplaintStatus;
  category?: ComplaintCategory;
  priority?: ComplaintPriority;
  dateFrom?: Date;
  dateTo?: Date;
  studentId?: string;
  departmentId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

/* Notification Types */
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}
