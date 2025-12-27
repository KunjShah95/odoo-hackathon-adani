// User & Authentication Types
export interface User {
    id: string;
    email: string;
    name: string;
    role: Role;
    department?: string;
    createdAt: string;
    updatedAt: string;
}

export type Role = 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'USER';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends LoginCredentials {
    name: string;
    department?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

// Equipment Types
export interface Equipment {
    id: string;
    name: string;
    serialNumber: string;
    category: Category;
    department: string;
    location: string;
    purchaseDate: string;
    warrantyExpiry?: string;
    status: EquipmentStatus;
    assignedToId?: string;
    assignedTo?: User;
    maintenanceTeamId?: string;
    maintenanceTeam?: MaintenanceTeam;
    requestCount?: number;
    createdAt: string;
    updatedAt: string;
}

export type Category =
    | 'MACHINERY'
    | 'VEHICLE'
    | 'IT_EQUIPMENT'
    | 'ELECTRICAL'
    | 'HVAC'
    | 'PLUMBING'
    | 'OTHER';

export type EquipmentStatus =
    | 'OPERATIONAL'
    | 'UNDER_MAINTENANCE'
    | 'SCRAPPED'
    | 'DECOMMISSIONED';

export interface EquipmentFormData {
    name: string;
    serialNumber: string;
    category: Category;
    department: string;
    location: string;
    purchaseDate: string;
    warrantyExpiry?: string;
    assignedToId?: string;
    maintenanceTeamId?: string;
}

// Maintenance Team Types
export interface MaintenanceTeam {
    id: string;
    name: string;
    specialization: string;
    description?: string;
    members: TeamMember[];
    equipmentCount?: number;
    createdAt: string;
    updatedAt: string;
}

export interface TeamMember {
    id: string;
    userId: string;
    teamId: string;
    role: TeamRole;
    user: User;
}

export type TeamRole = 'LEAD' | 'MEMBER';

export interface TeamFormData {
    name: string;
    specialization: string;
    description?: string;
}

// Maintenance Request Types
export interface MaintenanceRequest {
    id: string;
    subject: string;
    description: string;
    type: RequestType;
    priority: Priority;
    status: RequestStatus;
    scheduledDate?: string;
    completedDate?: string;
    duration?: number;
    equipmentId: string;
    equipment: Equipment;
    teamId?: string;
    team?: MaintenanceTeam;
    createdById: string;
    createdBy: User;
    assignedToId?: string;
    assignedTo?: User;
    createdAt: string;
    updatedAt: string;
}

export type RequestType = 'CORRECTIVE' | 'PREVENTIVE';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type RequestStatus = 'NEW' | 'IN_PROGRESS' | 'REPAIRED' | 'SCRAP';

export interface RequestFormData {
    subject: string;
    description: string;
    type: RequestType;
    priority: Priority;
    equipmentId: string;
    teamId?: string;
    assignedToId?: string;
    scheduledDate?: string;
}

// Dashboard Statistics
export interface DashboardStats {
    totalEquipment: number;
    operationalEquipment: number;
    totalTeams: number;
    totalRequests: number;
    pendingRequests: number;
    completedRequests: number;
    overdueRequests: number;
}

// Kanban Types
export interface KanbanColumn {
    id: RequestStatus;
    title: string;
    requests: MaintenanceRequest[];
}

// Calendar Types
export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    type: RequestType;
    priority: Priority;
    status: RequestStatus;
}

// API Response Types
export interface ApiResponse<T> {
    data: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// Filter Types
export interface EquipmentFilters {
    category?: Category;
    status?: EquipmentStatus;
    department?: string;
    search?: string;
}

export interface RequestFilters {
    type?: RequestType;
    status?: RequestStatus;
    priority?: Priority;
    teamId?: string;
    search?: string;
}
