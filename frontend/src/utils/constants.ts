// Status Colors
export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
    NEW: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/50',
    },
    IN_PROGRESS: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/50',
    },
    REPAIRED: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/50',
    },
    SCRAP: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/50',
    },
    OPERATIONAL: {
        bg: 'bg-green-500/20',
        text: 'text-green-400',
        border: 'border-green-500/50',
    },
    UNDER_MAINTENANCE: {
        bg: 'bg-yellow-500/20',
        text: 'text-yellow-400',
        border: 'border-yellow-500/50',
    },
    SCRAPPED: {
        bg: 'bg-red-500/20',
        text: 'text-red-400',
        border: 'border-red-500/50',
    },
    DECOMMISSIONED: {
        bg: 'bg-gray-500/20',
        text: 'text-gray-400',
        border: 'border-gray-500/50',
    },
};

// Priority Colors
export const PRIORITY_COLORS: Record<string, { bg: string; text: string }> = {
    LOW: { bg: 'bg-slate-500/20', text: 'text-slate-400' },
    MEDIUM: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    HIGH: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    CRITICAL: { bg: 'bg-red-500/20', text: 'text-red-400' },
};

// Category Options
export const CATEGORY_OPTIONS = [
    { value: 'MACHINERY', label: 'Machinery' },
    { value: 'VEHICLE', label: 'Vehicle' },
    { value: 'IT_EQUIPMENT', label: 'IT Equipment' },
    { value: 'ELECTRICAL', label: 'Electrical' },
    { value: 'HVAC', label: 'HVAC' },
    { value: 'PLUMBING', label: 'Plumbing' },
    { value: 'OTHER', label: 'Other' },
];

// Department Options
export const DEPARTMENT_OPTIONS = [
    { value: 'Production', label: 'Production' },
    { value: 'IT', label: 'IT' },
    { value: 'Facilities', label: 'Facilities' },
    { value: 'Logistics', label: 'Logistics' },
    { value: 'Administration', label: 'Administration' },
];

// Priority Options
export const PRIORITY_OPTIONS = [
    { value: 'LOW', label: 'Low' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HIGH', label: 'High' },
    { value: 'CRITICAL', label: 'Critical' },
];

// Request Type Options
export const REQUEST_TYPE_OPTIONS = [
    { value: 'CORRECTIVE', label: 'Corrective' },
    { value: 'PREVENTIVE', label: 'Preventive' },
];

// Request Status Options
export const REQUEST_STATUS_OPTIONS = [
    { value: 'NEW', label: 'New' },
    { value: 'IN_PROGRESS', label: 'In Progress' },
    { value: 'REPAIRED', label: 'Repaired' },
    { value: 'SCRAP', label: 'Scrap' },
];

// Equipment Status Options
export const EQUIPMENT_STATUS_OPTIONS = [
    { value: 'OPERATIONAL', label: 'Operational' },
    { value: 'UNDER_MAINTENANCE', label: 'Under Maintenance' },
    { value: 'SCRAPPED', label: 'Scrapped' },
    { value: 'DECOMMISSIONED', label: 'Decommissioned' },
];

// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Navigation Items
export const NAV_ITEMS = [
    { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/equipment', label: 'Equipment', icon: 'Wrench' },
    { path: '/teams', label: 'Teams', icon: 'Users' },
    { path: '/requests', label: 'Requests', icon: 'ClipboardList' },
    { path: '/calendar', label: 'Calendar', icon: 'Calendar' },
    { path: '/reports', label: 'Reports', icon: 'BarChart3' },
];
