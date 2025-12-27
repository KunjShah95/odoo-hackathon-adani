import { useState } from 'react';
import { Icon } from '@iconify/react';
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

const columns: { id: RequestStatus; title: string; color: string; icon: string }[] = [
    { id: 'NEW', title: 'Pending Triage', color: 'bg-blue-500', icon: 'solar:inbox-bold-duotone' },
    { id: 'IN_PROGRESS', title: 'Active Repairs', color: 'bg-amber-500', icon: 'solar:settings-bold-duotone' },
    { id: 'REPAIRED', title: 'Quality Check', color: 'bg-emerald-500', icon: 'solar:check-circle-bold-duotone' },
    { id: 'SCRAP', title: 'Decommission', color: 'bg-rose-500', icon: 'solar:trash-bin-trash-bold-duotone' },
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
            <div className="px-8 py-4 flex items-center justify-between bg-surface-light/30 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-2xl border border-white/5 text-xs font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer">
                        <Icon icon="solar:layers-bold-duotone" className="w-4 h-4 text-primary" />
                        View: Kanban Board
                        <Icon icon="solar:alt-arrow-down-bold" className="w-3 h-3" />
                    </div>
                    <div className="relative group w-80">
                        <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter by subject or hardware..."
                            className="w-full pl-10 pr-4 h-10 bg-transparent border-none outline-none text-xs font-medium text-white placeholder:text-zinc-600"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-10 rounded-xl px-4 text-xs font-bold border-white/5 hover:bg-white/5">
                        <Icon icon="solar:filter-bold-duotone" className="w-4 h-4 mr-2" />
                        Advanced Filter
                    </Button>
                    <Button size="sm" className="h-10 rounded-xl px-6 text-xs font-bold shadow-lg shadow-primary/20" onClick={() => setIsModalOpen(true)}>
                        <Icon icon="solar:add-circle-bold" className="w-4 h-4 mr-2" />
                        Post Request
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-1 overflow-x-auto p-8 custom-scrollbar bg-zinc-950/50">
                <div className="flex gap-8 h-full min-w-max pb-4">
                    {columns.map(column => (
                        <div key={column.id} className="w-[380px] flex flex-col h-full rounded-[2rem] bg-surface-light/20 border border-white/5 overflow-hidden backdrop-blur-sm">
                            {/* Column Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center bg-zinc-900/80 border border-white/5 shadow-inner")}>
                                            <Icon icon={column.icon} className={cn("w-5 h-5", column.color.replace('bg-', 'text-'))} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-xs uppercase tracking-widest text-white">{column.title}</h3>
                                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">Operational Stream</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black py-1 px-3 bg-zinc-900/80 border border-white/5 rounded-full text-zinc-400 shadow-inner">
                                        {getFilteredRequests(column.id).length}
                                    </span>
                                </div>
                                <div className={cn("h-1 w-full rounded-full opacity-20", column.color)} />
                            </div>

                            {/* Column Content */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {getFilteredRequests(column.id).map(request => (
                                    <div key={request.id} className="group p-5 bg-zinc-900/40 border border-white/5 hover:border-primary/30 rounded-2xl transition-all duration-500 shadow-xl hover:shadow-primary/5 cursor-grab active:cursor-grabbing hover:-translate-y-1">
                                        {/* Card Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex flex-wrap gap-2">
                                                <PriorityBadge priority={request.priority} />
                                                <Badge variant={request.type === 'CORRECTIVE' ? 'danger' : 'info'} size="sm" className="text-[8px] tracking-widest font-black">
                                                    {request.type}
                                                </Badge>
                                            </div>
                                            <button className="p-1.5 text-zinc-600 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                                                <Icon icon="solar:menu-dots-bold" className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Title */}
                                        <h4 className="font-bold text-white mb-2 leading-tight group-hover:text-primary transition-colors">{request.subject}</h4>
                                        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">{request.description}</p>

                                        {/* Hardware Link */}
                                        <div className="px-3 py-2 bg-zinc-950/50 rounded-xl border border-white/5 mb-4 flex items-center justify-between group/hw cursor-pointer hover:bg-zinc-900 transition-colors">
                                            <div className="flex items-center gap-2 overflow-hidden">
                                                <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Icon icon="solar:box-bold-duotone" className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                                <span className="text-[10px] font-bold text-zinc-400 truncate tracking-tight group-hover/hw:text-white transition-colors">{request.equipment.name}</span>
                                            </div>
                                            <Icon icon="solar:alt-arrow-right-bold" className="w-3 h-3 text-zinc-600 group-hover:text-primary transition-colors" />
                                        </div>

                                        {/* Card Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-500">
                                                <Icon icon="solar:clock-circle-bold-duotone" className="w-3.5 h-3.5 text-primary" />
                                                {getRelativeTime(request.createdAt)}
                                            </div>
                                            {request.assignedTo ? (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-zinc-500 hidden group-hover:block transition-all">{request.assignedTo.name}</span>
                                                    <div
                                                        className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shadow-2xl ring-2 ring-zinc-900 transition-transform hover:scale-110"
                                                        style={{ backgroundColor: stringToColor(request.assignedTo.name) }}
                                                        title={request.assignedTo.name}
                                                    >
                                                        {getInitials(request.assignedTo.name)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-xl bg-zinc-900/50 border border-dashed border-white/10 flex items-center justify-center group/assign cursor-pointer hover:border-primary/50 transition-colors">
                                                    <Icon icon="solar:user-plus-bold" className="w-4 h-4 text-zinc-600 group-hover:text-primary" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {getFilteredRequests(column.id).length === 0 && (
                                    <div className="h-48 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-[2rem] bg-zinc-900/20">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-900/50 flex items-center justify-center mb-3 border border-white/5">
                                            <Icon icon="solar:layers-minimalistic-bold-duotone" className="w-6 h-6 text-zinc-700" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">No Active Logs</span>
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

                    <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-4 shadow-inner">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon icon="solar:calendar-bold-duotone" className="text-primary w-6 h-6" />
                        </div>
                        <div>
                            <h5 className="font-bold text-sm text-white">Preventive Mode</h5>
                            <p className="text-[10px] text-zinc-500">Toggle for scheduled service instead of active repair.</p>
                        </div>
                        <input type="checkbox" className="ml-auto w-6 h-6 rounded-lg bg-zinc-900 border-white/10 text-primary focus:ring-primary/50" />
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
