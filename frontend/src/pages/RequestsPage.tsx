import { useState, useCallback } from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Badge, PriorityBadge } from '../components/ui/Badge';
import { Modal, ModalActions } from '../components/ui/Modal';
import { Input, TextArea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { REQUEST_TYPE_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';
import { getRelativeTime, getInitials, stringToColor, cn } from '../utils/helpers';
import type { MaintenanceRequest, RequestStatus, Equipment } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Clock, User, Wrench, CheckCircle, AlertTriangle, GripVertical, Filter, Inbox, Settings as SettingsIcon, Trash2, AlertCircle } from 'lucide-react';

// Helper to check if request is overdue (more than 24 hours old and not completed)
const isOverdue = (request: MaintenanceRequest): boolean => {
    if (request.status === 'REPAIRED' || request.status === 'SCRAP') return false;
    const createdAt = new Date(request.createdAt).getTime();
    const now = Date.now();
    const hoursSinceCreation = (now - createdAt) / (1000 * 60 * 60);
    // Consider overdue if more than 24 hours old for CRITICAL/HIGH, 72 hours for others
    if (request.priority === 'CRITICAL') return hoursSinceCreation > 4;
    if (request.priority === 'HIGH') return hoursSinceCreation > 24;
    return hoursSinceCreation > 72;
};

// Mock equipment with team assignments for auto-fill
interface EquipmentWithTeam {
    id: string;
    name: string;
    serialNumber: string;
    category: 'MACHINERY' | 'VEHICLE' | 'IT_EQUIPMENT' | 'ELECTRICAL' | 'HVAC' | 'PLUMBING' | 'OTHER';
    department: string;
    maintenanceTeamId: string | null;
    maintenanceTeamName: string | null;
}

const mockEquipmentList: EquipmentWithTeam[] = [
    { id: '1', name: 'Conveyor Line 4', serialNumber: 'CB-004', category: 'MACHINERY', department: 'Production', maintenanceTeamId: 'team-1', maintenanceTeamName: 'Mechanical Team' },
    { id: '2', name: 'HVAC Unit 12', serialNumber: 'HV-012', category: 'HVAC', department: 'Facilities', maintenanceTeamId: 'team-3', maintenanceTeamName: 'HVAC Specialists' },
    { id: '3', name: 'Hydraulic Press', serialNumber: 'HP-101', category: 'MACHINERY', department: 'Heavy Ops', maintenanceTeamId: 'team-1', maintenanceTeamName: 'Mechanical Team' },
    { id: '4', name: 'Fire System Zone A', serialNumber: 'FS-ZA-001', category: 'OTHER', department: 'Facilities', maintenanceTeamId: 'team-5', maintenanceTeamName: 'Facilities' },
    { id: '5', name: 'Backup Generator Unit 2', serialNumber: 'BG-002', category: 'ELECTRICAL', department: 'Facilities', maintenanceTeamId: 'team-2', maintenanceTeamName: 'Electrical Team' },
    { id: '6', name: 'CNC Milling Machine', serialNumber: 'CNC-2024-001', category: 'MACHINERY', department: 'Production', maintenanceTeamId: 'team-1', maintenanceTeamName: 'Mechanical Team' },
    { id: '7', name: 'Main Server Rack', serialNumber: 'SRV-001', category: 'IT_EQUIPMENT', department: 'IT', maintenanceTeamId: 'team-4', maintenanceTeamName: 'IT Support' },
    { id: '8', name: 'Industrial Forklift #3', serialNumber: 'FL-003', category: 'VEHICLE', department: 'Logistics', maintenanceTeamId: 'team-1', maintenanceTeamName: 'Mechanical Team' },
];

// Category display mapping
const categoryLabels: Record<string, string> = {
    MACHINERY: 'Machinery',
    VEHICLE: 'Vehicle',
    IT_EQUIPMENT: 'IT Equipment',
    ELECTRICAL: 'Electrical',
    HVAC: 'HVAC',
    PLUMBING: 'Plumbing',
    OTHER: 'Other',
};

// Initial mock data with scheduledDate for due calculations
const initialMockRequests: MaintenanceRequest[] = [
    {
        id: '1',
        subject: 'Main Conveyor Belt Misalignment',
        description: 'The belt is shifting to the left during heavy load cycles.',
        type: 'CORRECTIVE',
        priority: 'CRITICAL',
        status: 'NEW',
        equipmentId: '1',
        equipment: { id: '1', name: 'Conveyor Line 4', serialNumber: 'CB-004', category: 'MACHINERY', department: 'Production', location: 'Section G', purchaseDate: '', status: 'UNDER_MAINTENANCE', createdAt: '', updatedAt: '' },
        createdById: '1',
        createdBy: { id: '1', name: 'John Doe', email: 'john@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
        scheduledDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago - overdue for CRITICAL
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        subject: 'Quarterly HVAC Calibration',
        description: 'Routine maintenance and filter replacement scheduled for Zone B.',
        type: 'PREVENTIVE',
        priority: 'MEDIUM',
        status: 'NEW',
        equipmentId: '2',
        equipment: { id: '2', name: 'HVAC Unit 12', serialNumber: 'HV-012', category: 'HVAC', department: 'Facilities', location: 'Roof', purchaseDate: '', status: 'OPERATIONAL', createdAt: '', updatedAt: '' },
        createdById: '2',
        createdBy: { id: '2', name: 'Jane Admin', email: 'jane@corp.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        subject: 'Hydraulic Press Leakage',
        description: 'Minor fluid leak detected at the main cylinder seal.',
        type: 'CORRECTIVE',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        equipmentId: '3',
        equipment: { id: '3', name: 'Hydraulic Press', serialNumber: 'HP-101', category: 'MACHINERY', department: 'Heavy Ops', location: 'Bay 2', purchaseDate: '', status: 'UNDER_MAINTENANCE', createdAt: '', updatedAt: '' },
        createdById: '1',
        createdBy: { id: '1', name: 'John Doe', email: 'john@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
        assignedTo: { id: '3', name: 'Mike Mechanic', email: 'mike@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
        scheduledDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 48 hours ago - overdue
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        subject: 'Annual Fire Suppression Inspection',
        description: 'Complete inspection and testing of fire suppression system.',
        type: 'PREVENTIVE',
        priority: 'HIGH',
        status: 'REPAIRED',
        equipmentId: '4',
        equipment: { id: '4', name: 'Fire System Zone A', serialNumber: 'FS-ZA-001', category: 'OTHER', department: 'Facilities', location: 'All Floors', purchaseDate: '', status: 'OPERATIONAL', createdAt: '', updatedAt: '' },
        createdById: '2',
        createdBy: { id: '2', name: 'Jane Admin', email: 'jane@corp.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
        assignedTo: { id: '4', name: 'Fire Safety Team', email: 'safety@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
        createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '5',
        subject: 'Obsolete Generator Disposal',
        description: 'Generator has reached end of life and needs to be scrapped.',
        type: 'CORRECTIVE',
        priority: 'LOW',
        status: 'SCRAP',
        equipmentId: '5',
        equipment: { id: '5', name: 'Backup Generator Unit 2', serialNumber: 'BG-002', category: 'ELECTRICAL', department: 'Facilities', location: 'Basement', purchaseDate: '', status: 'SCRAPPED', createdAt: '', updatedAt: '' },
        createdById: '2',
        createdBy: { id: '2', name: 'Jane Admin', email: 'jane@corp.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
        createdAt: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const columns: { id: RequestStatus; title: string; color: string; icon: typeof Inbox; bgColor: string }[] = [
    { id: 'NEW', title: 'New Requests', color: 'primary', icon: Inbox, bgColor: 'bg-primary/10' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: 'warning', icon: SettingsIcon, bgColor: 'bg-warning/10' },
    { id: 'REPAIRED', title: 'Completed', color: 'success', icon: CheckCircle, bgColor: 'bg-success/10' },
    { id: 'SCRAP', title: 'Scrapped', color: 'danger', icon: Trash2, bgColor: 'bg-danger/10' },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
};

export function RequestsPage() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>(initialMockRequests);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isScrapModalOpen, setIsScrapModalOpen] = useState(false);
    const [pendingScrapRequest, setPendingScrapRequest] = useState<MaintenanceRequest | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [draggedItem, setDraggedItem] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warning' | 'error' } | null>(null);

    // Duration recording modal state (for completing requests)
    const [isDurationModalOpen, setIsDurationModalOpen] = useState(false);
    const [pendingCompleteRequest, setPendingCompleteRequest] = useState<MaintenanceRequest | null>(null);
    const [hoursSpent, setHoursSpent] = useState('');

    // Form state for new request with auto-fill capability
    const [newRequestForm, setNewRequestForm] = useState({
        subject: '',
        description: '',
        priority: '',
        type: '',
        equipmentId: '',
        // Auto-filled fields
        category: '',
        teamId: '',
        teamName: '',
    });

    // Reset form when modal closes
    const resetForm = () => {
        setNewRequestForm({
            subject: '',
            description: '',
            priority: '',
            type: '',
            equipmentId: '',
            category: '',
            teamId: '',
            teamName: '',
        });
    };

    // Auto-fill handler when equipment is selected
    const handleEquipmentChange = (equipmentId: string) => {
        const equipment = mockEquipmentList.find(e => e.id === equipmentId);
        if (equipment) {
            setNewRequestForm(prev => ({
                ...prev,
                equipmentId,
                category: equipment.category,
                teamId: equipment.maintenanceTeamId || '',
                teamName: equipment.maintenanceTeamName || '',
            }));
        } else {
            setNewRequestForm(prev => ({
                ...prev,
                equipmentId: '',
                category: '',
                teamId: '',
                teamName: '',
            }));
        }
    };

    const showNotification = (message: string, type: 'success' | 'warning' | 'error' = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const getFilteredRequests = useCallback((status: RequestStatus) =>
        requests.filter(req =>
            req.status === status &&
            (req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.equipment.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            (!priorityFilter || req.priority === priorityFilter)
        ), [requests, searchQuery, priorityFilter]);

    // Handle moving request to new status (drag & drop or button click)
    const moveRequest = useCallback((requestId: string, newStatus: RequestStatus) => {
        const request = requests.find(r => r.id === requestId);
        if (!request || request.status === newStatus) return;

        // If moving to SCRAP, show confirmation modal
        if (newStatus === 'SCRAP') {
            setPendingScrapRequest(request);
            setIsScrapModalOpen(true);
            return;
        }

        // If moving to REPAIRED, show duration recording modal
        if (newStatus === 'REPAIRED') {
            setPendingCompleteRequest(request);
            setIsDurationModalOpen(true);
            setHoursSpent('');
            return;
        }

        setRequests(prev => prev.map(req => {
            if (req.id === requestId) {
                // Update equipment status based on request status change
                const updatedEquipment: Equipment = { ...req.equipment };
                if (newStatus === 'IN_PROGRESS') {
                    updatedEquipment.status = 'UNDER_MAINTENANCE';
                }
                return {
                    ...req,
                    status: newStatus,
                    equipment: updatedEquipment,
                    updatedAt: new Date().toISOString()
                };
            }
            return req;
        }));

        showNotification(`Request moved to ${columns.find(c => c.id === newStatus)?.title}`, 'success');
    }, [requests]);

    // Complete request with duration recording
    const confirmComplete = useCallback(() => {
        if (!pendingCompleteRequest) return;

        const duration = parseFloat(hoursSpent) || 0;

        setRequests(prev => prev.map(req => {
            if (req.id === pendingCompleteRequest.id) {
                const updatedEquipment: Equipment = {
                    ...req.equipment,
                    status: 'OPERATIONAL'
                };
                return {
                    ...req,
                    status: 'REPAIRED' as RequestStatus,
                    equipment: updatedEquipment,
                    duration: duration,
                    completedDate: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }
            return req;
        }));

        showNotification(
            `✅ Request completed! Hours spent: ${duration}h`,
            'success'
        );
        setIsDurationModalOpen(false);
        setPendingCompleteRequest(null);
        setHoursSpent('');
    }, [pendingCompleteRequest, hoursSpent]);

    // Confirm scrapping equipment
    const confirmScrap = useCallback(() => {
        if (!pendingScrapRequest) return;

        setRequests(prev => prev.map(req => {
            if (req.id === pendingScrapRequest.id) {
                // Mark equipment as SCRAPPED
                const updatedEquipment: Equipment = {
                    ...req.equipment,
                    status: 'SCRAPPED'
                };
                return {
                    ...req,
                    status: 'SCRAP' as RequestStatus,
                    equipment: updatedEquipment,
                    updatedAt: new Date().toISOString()
                };
            }
            return req;
        }));

        showNotification(
            `⚠️ Equipment "${pendingScrapRequest.equipment.name}" has been marked as SCRAPPED and is no longer usable.`,
            'warning'
        );
        setIsScrapModalOpen(false);
        setPendingScrapRequest(null);
    }, [pendingScrapRequest]);

    // Drag handlers
    const handleDragStart = (requestId: string) => {
        setDraggedItem(requestId);
    };

    const handleDragEnd = () => {
        setDraggedItem(null);
    };

    const handleDrop = (targetStatus: RequestStatus) => {
        if (draggedItem) {
            moveRequest(draggedItem, targetStatus);
            setDraggedItem(null);
        }
    };

    const totalRequests = requests.length;
    const pendingCount = getFilteredRequests('NEW').length + getFilteredRequests('IN_PROGRESS').length;
    const overdueCount = requests.filter(r => isOverdue(r)).length;

    return (
        <div className="h-screen flex flex-col">
            <Header
                title="Work Orders"
                subtitle="Kanban-style maintenance request management with drag & drop"
            />

            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={cn(
                            "fixed top-24 left-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl border backdrop-blur-xl",
                            notification.type === 'success' && "bg-success/20 border-success/30 text-success",
                            notification.type === 'warning' && "bg-warning/20 border-warning/30 text-warning",
                            notification.type === 'error' && "bg-danger/20 border-danger/30 text-danger"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
                            {notification.type === 'error' && <AlertCircle className="w-5 h-5" />}
                            <span className="font-medium">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toolbar */}
            <div className="px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-4 border-b border-white/[0.05]">
                <div className="flex items-center gap-6 w-full lg:w-auto">
                    {/* Stats */}
                    <div className="hidden md:flex items-center gap-4 px-4 py-2 bg-white/[0.02] rounded-xl border border-white/[0.06]">
                        <div className="text-center">
                            <div className="text-lg font-bold text-white">{totalRequests}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total</div>
                        </div>
                        <div className="w-px h-8 bg-white/[0.06]" />
                        <div className="text-center">
                            <div className="text-lg font-bold text-warning">{pendingCount}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Pending</div>
                        </div>
                        {overdueCount > 0 && (
                            <>
                                <div className="w-px h-8 bg-white/[0.06]" />
                                <div className="text-center">
                                    <div className="text-lg font-bold text-danger animate-pulse">{overdueCount}</div>
                                    <div className="text-[10px] text-danger uppercase tracking-wider">Overdue</div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Search */}
                    <div className="relative group flex-1 lg:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full pl-11 pr-4 h-11 bg-white/[0.03] border border-white/[0.06] rounded-xl outline-none focus:border-primary/50 text-sm text-white transition-all placeholder:text-slate-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <Select
                        options={[{ value: '', label: 'All Priorities' }, ...PRIORITY_OPTIONS]}
                        value={priorityFilter}
                        onChange={setPriorityFilter}
                        placeholder="Priority"
                        className="w-40"
                    />
                    <Button variant="outline" className="h-11">
                        <Filter className="w-4 h-4 mr-2" />
                        More Filters
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} className="h-11">
                        <Plus className="w-4 h-4 mr-2" />
                        New Request
                    </Button>
                </div>
            </div>

            {/* Drag & Drop Instructions */}
            <div className="px-8 py-3 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-b border-white/[0.03]">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <GripVertical className="w-3.5 h-3.5" />
                    <span>Drag cards between columns to update status • Cards with red indicator are overdue</span>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto p-8">
                <div className="flex gap-6 h-full min-w-max">
                    {columns.map((column) => {
                        const columnRequests = getFilteredRequests(column.id);
                        const ColumnIcon = column.icon;
                        const isDragOver = draggedItem && requests.find(r => r.id === draggedItem)?.status !== column.id;

                        return (
                            <motion.div
                                key={column.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.add('ring-2', 'ring-primary/50');
                                }}
                                onDragLeave={(e) => {
                                    e.currentTarget.classList.remove('ring-2', 'ring-primary/50');
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('ring-2', 'ring-primary/50');
                                    handleDrop(column.id);
                                }}
                                className={cn(
                                    "w-[360px] flex flex-col h-full rounded-2xl transition-all duration-200",
                                    isDragOver && "bg-primary/5"
                                )}
                            >
                                {/* Column Header */}
                                <div className="flex items-center justify-between mb-5 px-1">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            'w-10 h-10 rounded-xl flex items-center justify-center',
                                            column.bgColor
                                        )}>
                                            <ColumnIcon className={cn('w-5 h-5', `text-${column.color}`)} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{column.title}</h3>
                                            <p className="text-xs text-slate-500">{columnRequests.length} items</p>
                                        </div>
                                    </div>
                                    {column.id === 'SCRAP' && (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-danger/10 rounded-lg border border-danger/20">
                                            <AlertTriangle className="w-3 h-3 text-danger" />
                                            <span className="text-[10px] text-danger font-medium">Equipment Retired</span>
                                        </div>
                                    )}
                                </div>

                                {/* Column Content */}
                                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                    <AnimatePresence mode="popLayout">
                                        {columnRequests.map((request, i) => (
                                            <motion.div
                                                key={request.id}
                                                layout
                                                variants={itemVariants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                transition={{ delay: i * 0.03 }}
                                                draggable
                                                onDragStart={() => handleDragStart(request.id)}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <RequestCard
                                                    request={request}
                                                    isOverdue={isOverdue(request)}
                                                    onMoveToNext={(status) => moveRequest(request.id, status)}
                                                    currentStatus={column.id}
                                                />
                                            </motion.div>
                                        ))}

                                        {columnRequests.length === 0 && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={cn(
                                                    "h-40 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors",
                                                    isDragOver
                                                        ? "border-primary/50 bg-primary/5"
                                                        : "border-white/[0.06] bg-white/[0.01]"
                                                )}
                                            >
                                                <ColumnIcon className={cn(
                                                    "w-8 h-8 mb-3 transition-colors",
                                                    isDragOver ? "text-primary" : "text-slate-700"
                                                )} />
                                                <span className={cn(
                                                    "text-sm transition-colors",
                                                    isDragOver ? "text-primary" : "text-slate-600"
                                                )}>
                                                    {isDragOver ? "Drop here" : "No requests"}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Create Request Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title="Create Work Order"
                subtitle="Submit a new maintenance request"
            >
                <div className="space-y-6">
                    <Input
                        label="Subject"
                        placeholder="Brief description of the issue"
                        value={newRequestForm.subject}
                        onChange={(e) => setNewRequestForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                    <TextArea
                        label="Description"
                        placeholder="Provide detailed information about the problem..."
                        rows={4}
                        value={newRequestForm.description}
                        onChange={(e) => setNewRequestForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <Select
                            label="Priority"
                            options={PRIORITY_OPTIONS}
                            placeholder="Select priority"
                            value={newRequestForm.priority}
                            onChange={(val) => setNewRequestForm(prev => ({ ...prev, priority: val }))}
                        />
                        <Select
                            label="Type"
                            options={REQUEST_TYPE_OPTIONS}
                            placeholder="Select type"
                            value={newRequestForm.type}
                            onChange={(val) => setNewRequestForm(prev => ({ ...prev, type: val }))}
                        />
                    </div>

                    {/* Equipment Selection with Auto-Fill */}
                    <div className="space-y-4">
                        <Select
                            label="Equipment"
                            options={mockEquipmentList.map(eq => ({
                                value: eq.id,
                                label: `${eq.name} (${eq.serialNumber})`
                            }))}
                            placeholder="Select equipment"
                            value={newRequestForm.equipmentId}
                            onChange={handleEquipmentChange}
                        />

                        {/* Auto-filled fields (read-only display) */}
                        {newRequestForm.equipmentId && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3"
                            >
                                <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    Auto-Filled from Equipment
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Category</div>
                                        <div className="text-sm font-medium text-white flex items-center gap-2">
                                            <Wrench className="w-4 h-4 text-primary" />
                                            {categoryLabels[newRequestForm.category] || newRequestForm.category}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Assigned Team</div>
                                        <div className="text-sm font-medium text-white flex items-center gap-2">
                                            <User className="w-4 h-4 text-warning" />
                                            {newRequestForm.teamName || 'No team assigned'}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-500 mt-2">
                                    ℹ️ Only members of <span className="text-warning font-medium">{newRequestForm.teamName}</span> can be assigned to this request.
                                </p>
                            </motion.div>
                        )}
                    </div>

                    <ModalActions>
                        <Button variant="ghost" onClick={() => {
                            setIsModalOpen(false);
                            resetForm();
                        }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                // Create the new request (mock implementation)
                                showNotification('Work order created successfully!', 'success');
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            disabled={!newRequestForm.subject || !newRequestForm.equipmentId || !newRequestForm.priority}
                        >
                            Create Request
                        </Button>
                    </ModalActions>
                </div>
            </Modal>

            {/* Scrap Confirmation Modal */}
            <Modal
                isOpen={isScrapModalOpen}
                onClose={() => {
                    setIsScrapModalOpen(false);
                    setPendingScrapRequest(null);
                }}
                title="⚠️ Confirm Equipment Scrap"
                subtitle="This action will mark the equipment as no longer usable"
            >
                <div className="space-y-6">
                    <div className="p-4 bg-danger/10 border border-danger/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-danger flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-danger mb-1">Warning: Irreversible Action</h4>
                                <p className="text-sm text-slate-400">
                                    Moving this request to <strong className="text-danger">Scrap</strong> will:
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-slate-400">
                                    <li>• Mark the equipment as <strong className="text-danger">SCRAPPED</strong></li>
                                    <li>• Flag the equipment as no longer usable</li>
                                    <li>• Log this action in the maintenance history</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {pendingScrapRequest && (
                        <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Equipment Details</div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Name:</span>
                                    <span className="text-white font-medium">{pendingScrapRequest.equipment.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Serial:</span>
                                    <span className="text-white font-mono">{pendingScrapRequest.equipment.serialNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Request:</span>
                                    <span className="text-white">{pendingScrapRequest.subject}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <ModalActions>
                        <Button variant="ghost" onClick={() => {
                            setIsScrapModalOpen(false);
                            setPendingScrapRequest(null);
                        }}>
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            onClick={confirmScrap}
                            className="bg-danger hover:bg-danger/80"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Confirm Scrap
                        </Button>
                    </ModalActions>
                </div>
            </Modal>

            {/* Duration Recording Modal - For completing requests */}
            <Modal
                isOpen={isDurationModalOpen}
                onClose={() => {
                    setIsDurationModalOpen(false);
                    setPendingCompleteRequest(null);
                    setHoursSpent('');
                }}
                title="✅ Complete Maintenance Request"
                subtitle="Record the hours spent on this repair"
            >
                <div className="space-y-6">
                    <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-success mb-1">Great Work!</h4>
                                <p className="text-sm text-slate-400">
                                    Please record the total hours spent on this repair before marking it complete.
                                </p>
                            </div>
                        </div>
                    </div>

                    {pendingCompleteRequest && (
                        <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                            <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Request Details</div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Subject:</span>
                                    <span className="text-white font-medium">{pendingCompleteRequest.subject}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Equipment:</span>
                                    <span className="text-white">{pendingCompleteRequest.equipment.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Priority:</span>
                                    <span className="text-white">{pendingCompleteRequest.priority}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            Hours Spent (Duration)
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                placeholder="e.g., 2.5"
                                value={hoursSpent}
                                onChange={(e) => setHoursSpent(e.target.value)}
                                className="w-full pl-12 pr-16 py-4 bg-white/[0.03] border border-white/[0.06] rounded-xl text-lg text-white placeholder:text-slate-600 focus:outline-none focus:border-success/50 transition-colors"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">hours</span>
                        </div>
                        <p className="mt-2 text-xs text-slate-600">
                            Enter the total time spent on diagnostics, repair, and testing.
                        </p>
                    </div>

                    <ModalActions>
                        <Button variant="ghost" onClick={() => {
                            setIsDurationModalOpen(false);
                            setPendingCompleteRequest(null);
                            setHoursSpent('');
                        }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={confirmComplete}
                            disabled={!hoursSpent || parseFloat(hoursSpent) <= 0}
                            className="bg-success hover:bg-success/80"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Complete
                        </Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}

// =============================================
// REQUEST CARD COMPONENT
// =============================================

interface RequestCardProps {
    request: MaintenanceRequest;
    isOverdue: boolean;
    onMoveToNext: (status: RequestStatus) => void;
    currentStatus: RequestStatus;
}

function RequestCard({ request, isOverdue: overdueStatus, onMoveToNext, currentStatus }: RequestCardProps) {
    const getNextStatus = (): RequestStatus | null => {
        switch (currentStatus) {
            case 'NEW': return 'IN_PROGRESS';
            case 'IN_PROGRESS': return 'REPAIRED';
            default: return null;
        }
    };

    const nextStatus = getNextStatus();
    const nextStatusLabel = nextStatus === 'IN_PROGRESS' ? 'Start Work' : nextStatus === 'REPAIRED' ? 'Mark Complete' : null;

    return (
        <div className={cn(
            "glass-card rounded-2xl overflow-hidden group cursor-grab active:cursor-grabbing transition-all relative",
            overdueStatus ? "border-danger/50 hover:border-danger/70" : "hover:border-primary/30"
        )}>
            {/* Overdue Indicator - Red Strip */}
            {overdueStatus && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-danger via-red-500 to-danger animate-pulse" />
            )}

            {/* Scrap Indicator */}
            {currentStatus === 'SCRAP' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600" />
            )}

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {/* Drag Handle */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-4 h-4 text-slate-600" />
                        </div>
                        <PriorityBadge priority={request.priority} />
                        <Badge variant={request.type === 'CORRECTIVE' ? 'danger' : 'success'} size="xs">
                            {request.type}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        {overdueStatus && (
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-danger/20 rounded-md border border-danger/30 animate-pulse">
                                <AlertTriangle className="w-3 h-3 text-danger" />
                                <span className="text-[9px] text-danger font-semibold">OVERDUE</span>
                            </div>
                        )}
                        <span className="text-[10px] text-slate-600 font-mono">#{request.id}</span>
                    </div>
                </div>

                {/* Title */}
                <h4 className={cn(
                    "font-semibold mb-2 transition-colors line-clamp-2",
                    overdueStatus ? "text-danger" : "text-white group-hover:text-primary"
                )}>
                    {request.subject}
                </h4>

                {/* Equipment */}
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Wrench className="w-3.5 h-3.5" />
                    <span className="truncate">{request.equipment.name}</span>
                    {request.equipment.status === 'SCRAPPED' && (
                        <Badge variant="danger" size="xs">Scrapped</Badge>
                    )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className={cn("w-3.5 h-3.5", overdueStatus && "text-danger")} />
                        <span className={cn(overdueStatus && "text-danger font-medium")}>
                            {getRelativeTime(request.createdAt)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Quick Action Button */}
                        {nextStatus && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onMoveToNext(nextStatus);
                                }}
                                className={cn(
                                    "opacity-0 group-hover:opacity-100 px-2 py-1 rounded-lg text-[10px] font-medium transition-all",
                                    nextStatus === 'IN_PROGRESS'
                                        ? "bg-warning/20 text-warning hover:bg-warning/30 border border-warning/20"
                                        : "bg-success/20 text-success hover:bg-success/30 border border-success/20"
                                )}
                            >
                                {nextStatusLabel}
                            </button>
                        )}

                        {/* Technician Avatar */}
                        {request.assignedTo ? (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-600 hidden group-hover:block">
                                    {request.assignedTo.name}
                                </span>
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-lg border border-white/10"
                                    style={{ backgroundColor: stringToColor(request.assignedTo.name) }}
                                    title={`Assigned to: ${request.assignedTo.name}`}
                                >
                                    {getInitials(request.assignedTo.name)}
                                </div>
                            </div>
                        ) : (
                            <button
                                className="w-8 h-8 rounded-lg bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors"
                                title="Assign technician"
                            >
                                <User className="w-4 h-4 text-slate-600" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

