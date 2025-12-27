import { Request, Response, NextFunction } from 'express';
import * as requestsService from '../services/requests.service.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getAllRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const request = await requestsService.getRequestById(id);
        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }
        res.json(request);
    } catch (error) {
        next(error);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const createdById = req.user.userId;
        const request = await requestsService.createRequest({
            ...req.body,
            createdById,
        });
        res.status(201).json(request);
    } catch (error) {
        next(error);
    }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const request = await requestsService.updateRequest(id, req.body);
        res.json(request);
    } catch (error) {
        next(error);
    }
};

// Update status with team workflow validation
export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status, duration } = req.body;
        // @ts-ignore - Pass userId for team membership validation
        const userId = req.user?.userId;

        const request = await requestsService.updateRequestStatus(id, status, userId, duration);
        res.json(request);
    } catch (error: any) {
        // Handle team validation errors with 403 Forbidden
        if (error.message?.includes('team member')) {
            return res.status(403).json({ message: error.message });
        }
        next(error);
    }
};

// Assign request to a technician with team validation
export const assign = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { assignedToId } = req.body;

        if (!assignedToId) {
            return res.status(400).json({ message: 'assignedToId is required' });
        }

        const request = await requestsService.assignRequest(id, assignedToId);
        res.json(request);
    } catch (error: any) {
        // Handle team validation errors with 403 Forbidden
        if (error.message?.includes('member of the maintenance team')) {
            return res.status(403).json({ message: error.message });
        }
        if (error.message === 'Request not found') {
            return res.status(404).json({ message: error.message });
        }
        next(error);
    }
};

// Get requests the current user can work on (based on their team memberships)
export const getMyRequests = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-ignore
        const userId = req.user.userId;
        const requests = await requestsService.getRequestsForUser(userId);
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getCalendar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getCalendarRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

export const getKanban = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requests = await requestsService.getKanbanRequests();
        res.json(requests);
    } catch (error) {
        next(error);
    }
};

