import { useState } from 'react';
import {
    Plus,
    Search,
    Clock,
    User as UserIcon,
    MoreVertical,
    Layers,
    Calendar,
    Filter,
    ArrowRight,
    ChevronDown,
} from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Badge, PriorityBadge } from '../components/ui/Badge';
import { Modal, ModalActions } from '../components/ui/Modal';
import { Input, TextArea } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { REQUEST_TYPE_OPTIONS, PRIORITY_OPTIONS } from '../utils/constants';
import { getRelativeTime, getInitials, stringToColor, cn } from '../utils/helpers';
import type { MaintenanceRequest, RequestStatus } from '../types';

const mockRequests: MaintenanceRequest[] = [
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
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const columns: { id: RequestStatus; title: string; color: string }[] = [
    { id: 'NEW', title: 'Pending Triage', color: 'bg-blue-500' },
    { id: 'IN_PROGRESS', title: 'Active Repairs', color: 'bg-warning' },
    { id: 'REPAIRED', title: 'Quality Check', color: 'bg-success' },
    { id: 'SCRAP', title: 'Decommission', color: 'bg-danger' },
];

export function RequestsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const getFilteredRequests = (status: RequestStatus) =>
        mockRequests.filter(req =>
            req.status === status &&
            (req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                req.equipment.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <Header
                title="Maintenance Board"
                subtitle="Manage the lifecycle of service requests across columns."
            />

            {/* Toolbar */}
            <div className="px-8 py-4 flex items-center justify-between bg-white/[0.01] border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5 text-xs font-bold text-slate-400">
                        <Layers className="w-3.5 h-3.5" />
                        View: Kanban Board
                        <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                    <div className="relative group w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Filter by subject or hardware..."
                            className="w-full pl-10 pr-4 h-10 bg-transparent border-none outline-none text-xs font-medium text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 text-xs font-bold border-white/5">
                        <Filter className="w-3.5 h-3.5 mr-2" />
                        Advanced Filter
                    </Button>
                    <Button size="sm" className="h-10 rounded-xl px-6 text-xs font-bold shadow-lg shadow-primary/20" onClick={() => setIsModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Post Request
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto p-8 custom-scrollbar">
                <div className="flex gap-8 h-full min-w-max pb-4">
                    {columns.map(column => (
                        <div key={column.id} className="w-[380px] flex flex-col h-full rounded-3xl bg-white/[0.02] border border-white/5 overflow-hidden">
                            {/* Column Header */}
                            <div className="p-6 pb-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-2 h-2 rounded-full", column.color)} />
                                        <h3 className="font-black text-sm uppercase tracking-widest text-white">{column.title}</h3>
                                    </div>
                                    <span className="text-[10px] font-black py-1 px-2.5 bg-white/5 rounded-full text-slate-400">
                                        {getFilteredRequests(column.id).length}
                                    </span>
                                </div>
                                <div className={cn("h-1 w-full rounded-full opacity-20", column.color)} />
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {getFilteredRequests(column.id).map(request => (
                                    <div key={request.id} className="group p-5 bg-surface border border-white/5 hover:border-primary/50 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-primary/5 cursor-grab active:cursor-grabbing">
                                        {/* Card Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                <PriorityBadge priority={request.priority} />
                                                <Badge variant={request.type === 'CORRECTIVE' ? 'danger' : 'info'} size="sm" className="text-[8px] tracking-widest">
                                                    {request.type}
                                                </Badge>
                                            </div>
                                            <button className="p-1.5 text-slate-600 hover:text-white transition-colors opacity-0 group-hover:opacity-100 italic">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Title */}
                                        <h4 className="font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{request.subject}</h4>
                                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">{request.description}</p>

                                        {/* Hardware Link */}
                                        <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/5 mb-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-[10px] text-primary font-black">HW</div>
                                                <span className="text-[10px] font-bold text-slate-400 truncate tracking-tight">{request.equipment.name}</span>
                                            </div>
                                            <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-primary transition-colors" />
                                        </div>

                                        {/* Card Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                {getRelativeTime(request.createdAt)}
                                            </div>
                                            {request.assignedTo ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-500 hidden group-hover:block transition-all">{request.assignedTo.name}</span>
                                                    <div
                                                        className="w-7 h-7 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shadow-lg ring-2 ring-white/10"
                                                        style={{ backgroundColor: stringToColor(request.assignedTo.name) }}
                                                        title={request.assignedTo.name}
                                                    >
                                                        {getInitials(request.assignedTo.name)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-7 h-7 rounded-xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center">
                                                    <UserIcon className="w-3.5 h-3.5 text-slate-600" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {getFilteredRequests(column.id).length === 0 && (
                                    <div className="h-32 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl opacity-30">
                                        <Layers className="w-8 h-8 mb-2" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">No Active Logs</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Post Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Post Service Request">
                <div className="space-y-6 pt-4">
                    <Input label="Short Subject" placeholder="e.g. Compressor High Torque Alarm" />
                    <TextArea label="Brief Diagnosis" placeholder="Describe the symptoms and any error codes..." rows={4} />

                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Urgency Level" options={PRIORITY_OPTIONS} />
                        <Select label="Request Type" options={REQUEST_TYPE_OPTIONS} />
                    </div>

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4">
                        <Calendar className="text-primary w-6 h-6" />
                        <div>
                            <h5 className="font-bold text-sm text-white">Preventive Mode</h5>
                            <p className="text-[10px] text-slate-500">Toggle for scheduled service instead of active repair.</p>
                        </div>
                        <input type="checkbox" className="ml-auto w-5 h-5 accent-primary" />
                    </div>

                    <ModalActions>
                        <Button variant="outline" onClick={() => setIsModalOpen(false)}>Discard</Button>
                        <Button onClick={() => setIsModalOpen(false)}>Create Work Order</Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
