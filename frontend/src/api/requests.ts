import client from './client.js';
import type { MaintenanceRequest } from '../types/index.js';

export const getAllRequests = async (): Promise<MaintenanceRequest[]> => {
    const { data } = await client.get<MaintenanceRequest[]>('/requests');
    return data;
};

export const getRequestById = async (id: string): Promise<MaintenanceRequest> => {
    const { data } = await client.get<MaintenanceRequest>(`/requests/${id}`);
    return data;
};

export const createRequest = async (requestData: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> => {
    const { data } = await client.post<MaintenanceRequest>('/requests', requestData);
    return data;
};

export const updateRequest = async (id: string, requestData: Partial<MaintenanceRequest>): Promise<MaintenanceRequest> => {
    const { data } = await client.patch<MaintenanceRequest>(`/requests/${id}`, requestData);
    return data;
};

export const updateRequestStatus = async (id: string, status: string): Promise<MaintenanceRequest> => {
    const { data } = await client.patch<MaintenanceRequest>(`/requests/${id}/status`, { status });
    return data;
};

export const getCalendarRequests = async (): Promise<any[]> => {
    const { data } = await client.get<any[]>('/requests/calendar');
    return data;
};

export const getKanbanRequests = async (): Promise<any[]> => {
    const { data } = await client.get<any[]>('/requests/kanban');
    return data;
};

// Update status with duration (for completing requests with hours spent)
export const updateRequestStatusWithDuration = async (
    id: string,
    status: string,
    duration?: number
): Promise<MaintenanceRequest> => {
    const { data } = await client.patch<MaintenanceRequest>(`/requests/${id}/status`, {
        status,
        duration
    });
    return data;
};

// Assign request to a technician
export const assignRequest = async (id: string, assignedToId: string): Promise<MaintenanceRequest> => {
    const { data } = await client.patch<MaintenanceRequest>(`/requests/${id}/assign`, { assignedToId });
    return data;
};

// Get requests for current user's teams
export const getMyRequests = async (): Promise<MaintenanceRequest[]> => {
    const { data } = await client.get<MaintenanceRequest[]>('/requests/my-requests');
    return data;
};
