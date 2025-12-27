import prisma from '../config/database.js';

export const getAllRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        include: {
            equipment: true,
            team: true,
            createdBy: {
                select: { id: true, name: true, email: true },
            },
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

export const getRequestById = async (id: string) => {
    return await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: {
            equipment: true,
            team: true,
            createdBy: {
                select: { id: true, name: true, email: true },
            },
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};

// Create request with auto-fill from equipment (category and team)
export const createRequest = async (data: any) => {
    // If equipmentId is provided, auto-fill the team from equipment
    if (data.equipmentId && !data.teamId) {
        const equipment = await prisma.equipment.findUnique({
            where: { id: data.equipmentId },
            select: { maintenanceTeamId: true, category: true },
        });

        if (equipment?.maintenanceTeamId) {
            data.teamId = equipment.maintenanceTeamId;
        }
    }

    return await prisma.maintenanceRequest.create({
        data,
        include: {
            equipment: true,
            team: true,
        },
    });
};

export const updateRequest = async (id: string, data: any) => {
    return await prisma.maintenanceRequest.update({
        where: { id },
        data,
    });
};

// Update status with workflow validation
export const updateRequestStatus = async (id: string, status: any, userId?: string, duration?: number) => {
    const request = await prisma.maintenanceRequest.findUnique({
        where: { id },
        include: { team: true },
    });

    if (!request) {
        throw new Error('Request not found');
    }

    // If moving to IN_PROGRESS and has a team, user must be a team member
    if (status === 'IN_PROGRESS' && request.teamId && userId) {
        const isMember = await prisma.teamMember.findUnique({
            where: {
                userId_teamId: {
                    userId,
                    teamId: request.teamId,
                },
            },
        });

        if (!isMember) {
            throw new Error('Only team members can work on this request');
        }
    }

    // Prepare update data
    const updateData: any = { status };

    // When completing (REPAIRED), record duration and completion date
    if (status === 'REPAIRED') {
        updateData.completedDate = new Date();
        if (duration !== undefined) {
            updateData.duration = duration;
        }
    }

    // When moving to SCRAP, also mark equipment as SCRAPPED
    if (status === 'SCRAP') {
        await prisma.equipment.update({
            where: { id: request.equipmentId },
            data: { status: 'SCRAPPED' },
        });
    }

    return await prisma.maintenanceRequest.update({
        where: { id },
        data: updateData,
        include: {
            equipment: true,
            team: true,
        },
    });
};

// Assign request to technician with team validation
export const assignRequest = async (requestId: string, assignedToId: string) => {
    const request = await prisma.maintenanceRequest.findUnique({
        where: { id: requestId },
        select: { teamId: true },
    });

    if (!request) {
        throw new Error('Request not found');
    }

    // If request has a team, assignee must be a member
    if (request.teamId) {
        const isMember = await prisma.teamMember.findUnique({
            where: {
                userId_teamId: {
                    userId: assignedToId,
                    teamId: request.teamId,
                },
            },
        });

        if (!isMember) {
            throw new Error('Assignee must be a member of the maintenance team');
        }
    }

    return await prisma.maintenanceRequest.update({
        where: { id: requestId },
        data: {
            assignedToId,
            status: 'IN_PROGRESS', // Auto-update status when assigned
        },
        include: {
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
    });
};

export const getCalendarRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        where: {
            scheduledDate: { not: null },
        },
        select: {
            id: true,
            subject: true,
            scheduledDate: true,
            type: true,
            priority: true,
            status: true,
        },
    });
};

export const getKanbanRequests = async () => {
    return await prisma.maintenanceRequest.findMany({
        select: {
            id: true,
            subject: true,
            priority: true,
            status: true,
            equipmentId: true,
            assignedToId: true,
            teamId: true,
            equipment: {
                select: { name: true, category: true },
            },
            team: {
                select: { id: true, name: true },
            },
        },
    });
};

// Get requests that a user can work on (based on team membership)
export const getRequestsForUser = async (userId: string) => {
    // Get user's teams
    const userTeams = await prisma.teamMember.findMany({
        where: { userId },
        select: { teamId: true },
    });

    const teamIds = userTeams.map(t => t.teamId);

    // Return requests where:
    // 1. Request has no team (anyone can work on it)
    // 2. Request's team is one of user's teams
    return await prisma.maintenanceRequest.findMany({
        where: {
            OR: [
                { teamId: null },
                { teamId: { in: teamIds } },
            ],
        },
        include: {
            equipment: true,
            team: true,
            assignedTo: {
                select: { id: true, name: true, email: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });
};

