import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Modal, ModalActions } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { StatusBadge, Badge, PriorityBadge } from '../components/ui/Badge';
import { CATEGORY_OPTIONS, DEPARTMENT_OPTIONS, EQUIPMENT_STATUS_OPTIONS } from '../utils/constants';
import { formatDate, cn, getRelativeTime } from '../utils/helpers';
import type { Equipment, Category, MaintenanceRequest } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Wrench, Monitor, Truck, Zap, Wind, Box, MapPin, Building, Calendar, History, Grid, List, Settings, Clock, ChevronRight } from 'lucide-react';

// Mock maintenance requests for equipment
const mockEquipmentRequests: Record<string, MaintenanceRequest[]> = {
    '1': [
        {
            id: 'r1',
            subject: 'Spindle Vibration Issue',
            description: 'Unusual vibration detected during high-speed operations.',
            type: 'CORRECTIVE',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            equipmentId: '1',
            equipment: { id: '1', name: 'CNC Milling Machine V3', serialNumber: 'CNC-2024-001', category: 'MACHINERY', department: 'Production', location: 'Building A, Floor 2', purchaseDate: '2023-06-15', status: 'OPERATIONAL', createdAt: '', updatedAt: '' },
            createdById: '1',
            createdBy: { id: '1', name: 'John Doe', email: 'john@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            id: 'r2',
            subject: 'Monthly Calibration Check',
            description: 'Scheduled preventive maintenance for calibration.',
            type: 'PREVENTIVE',
            priority: 'MEDIUM',
            status: 'NEW',
            equipmentId: '1',
            equipment: { id: '1', name: 'CNC Milling Machine V3', serialNumber: 'CNC-2024-001', category: 'MACHINERY', department: 'Production', location: 'Building A, Floor 2', purchaseDate: '2023-06-15', status: 'OPERATIONAL', createdAt: '', updatedAt: '' },
            createdById: '2',
            createdBy: { id: '2', name: 'Jane Admin', email: 'jane@corp.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
            createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
    '2': [
        {
            id: 'r3',
            subject: 'Hydraulic Leak Repair',
            description: 'Fluid leak from main lift cylinder.',
            type: 'CORRECTIVE',
            priority: 'CRITICAL',
            status: 'IN_PROGRESS',
            equipmentId: '2',
            equipment: { id: '2', name: 'Industrial Forklift #3', serialNumber: 'FL-2022-003', category: 'VEHICLE', department: 'Logistics', location: 'Warehouse B', purchaseDate: '2022-03-20', status: 'UNDER_MAINTENANCE', createdAt: '', updatedAt: '' },
            createdById: '1',
            createdBy: { id: '1', name: 'John Doe', email: 'john@corp.com', role: 'TECHNICIAN', createdAt: '', updatedAt: '' },
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
    '4': [
        {
            id: 'r4',
            subject: 'Filter Replacement',
            description: 'Quarterly HVAC filter replacement.',
            type: 'PREVENTIVE',
            priority: 'LOW',
            status: 'NEW',
            equipmentId: '4',
            equipment: { id: '4', name: 'Central HVAC Unit', serialNumber: 'HVAC-2021-001', category: 'HVAC', department: 'Facilities', location: 'Rooftop South', purchaseDate: '2021-08-05', status: 'OPERATIONAL', createdAt: '', updatedAt: '' },
            createdById: '2',
            createdBy: { id: '2', name: 'Jane Admin', email: 'jane@corp.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
            createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ],
};

// Helper to get open request count for equipment
const getOpenRequestCount = (equipmentId: string): number => {
    const requests = mockEquipmentRequests[equipmentId] || [];
    return requests.filter(r => r.status === 'NEW' || r.status === 'IN_PROGRESS').length;
};

// Mock data
const mockEquipment: Equipment[] = [
    {
        id: '1',
        name: 'CNC Milling Machine V3',
        serialNumber: 'CNC-2024-001',
        category: 'MACHINERY',
        department: 'Production',
        location: 'Building A, Floor 2',
        purchaseDate: '2023-06-15',
        status: 'OPERATIONAL',
        requestCount: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Industrial Forklift #3',
        serialNumber: 'FL-2022-003',
        category: 'VEHICLE',
        department: 'Logistics',
        location: 'Warehouse B',
        purchaseDate: '2022-03-20',
        status: 'UNDER_MAINTENANCE',
        requestCount: 8,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Main Server Rack A1',
        serialNumber: 'SRV-2024-A1',
        category: 'IT_EQUIPMENT',
        department: 'IT',
        location: 'Server Room 1',
        purchaseDate: '2024-01-10',
        status: 'OPERATIONAL',
        requestCount: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        name: 'Central HVAC Unit',
        serialNumber: 'HVAC-2021-001',
        category: 'HVAC',
        department: 'Facilities',
        location: 'Rooftop South',
        purchaseDate: '2021-08-05',
        status: 'OPERATIONAL',
        requestCount: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '5',
        name: 'Power Distribution Unit',
        serialNumber: 'PDU-2023-005',
        category: 'ELECTRICAL',
        department: 'Facilities',
        location: 'Electrical Room 1',
        purchaseDate: '2023-02-28',
        status: 'OPERATIONAL',
        requestCount: 5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '6',
        name: 'Loading Dock Lift',
        serialNumber: 'LDL-2020-002',
        category: 'MACHINERY',
        department: 'Logistics',
        location: 'Dock Area B',
        purchaseDate: '2020-11-15',
        status: 'SCRAPPED',
        requestCount: 24,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// Category icon mapping
const categoryIcons: Record<Category, { icon: typeof Wrench; gradient: string; color: string }> = {
    MACHINERY: { icon: Wrench, gradient: 'from-orange-500/20 to-red-500/20', color: 'text-orange-400' },
    VEHICLE: { icon: Truck, gradient: 'from-blue-500/20 to-cyan-500/20', color: 'text-blue-400' },
    IT_EQUIPMENT: { icon: Monitor, gradient: 'from-purple-500/20 to-pink-500/20', color: 'text-purple-400' },
    ELECTRICAL: { icon: Zap, gradient: 'from-yellow-500/20 to-amber-500/20', color: 'text-yellow-400' },
    HVAC: { icon: Wind, gradient: 'from-green-500/20 to-emerald-500/20', color: 'text-green-400' },
    PLUMBING: { icon: Box, gradient: 'from-indigo-500/20 to-violet-500/20', color: 'text-indigo-400' },
    OTHER: { icon: Box, gradient: 'from-slate-500/20 to-gray-500/20', color: 'text-slate-400' },
};

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.06 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
};

export function EquipmentPage() {
    const [equipment] = useState<Equipment[]>(mockEquipment);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Smart Button Modal State
    const [isRequestsModalOpen, setIsRequestsModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    // Handler for opening the Maintenance requests modal
    const openRequestsModal = (eq: Equipment) => {
        setSelectedEquipment(eq);
        setIsRequestsModalOpen(true);
    };

    // Get requests for selected equipment
    const selectedEquipmentRequests = selectedEquipment
        ? (mockEquipmentRequests[selectedEquipment.id] || [])
        : [];

    const filtered = equipment.filter(eq => {
        const matchesSearch = eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            eq.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !categoryFilter || eq.category === categoryFilter;
        const matchesStatus = !statusFilter || eq.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const stats = [
        { label: 'Total Assets', value: equipment.length, color: 'primary' },
        { label: 'Operational', value: equipment.filter(e => e.status === 'OPERATIONAL').length, color: 'success' },
        { label: 'Maintenance', value: equipment.filter(e => e.status === 'UNDER_MAINTENANCE').length, color: 'warning' },
        { label: 'Inactive', value: equipment.filter(e => ['SCRAPPED', 'DECOMMISSIONED'].includes(e.status)).length, color: 'danger' },
    ];

    return (
        <div className="pb-16 min-h-screen">
            <Header
                title="Asset Registry"
                subtitle="Comprehensive equipment inventory and lifecycle management"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="px-8 mt-8 space-y-8"
            >
                {/* Stats Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass-card rounded-2xl p-5">
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Toolbar */}
                <motion.div
                    variants={itemVariants}
                    className="glass-panel rounded-2xl p-5 flex flex-col xl:flex-row gap-4 items-center justify-between"
                >
                    {/* Search & Filters */}
                    <div className="flex flex-1 flex-col md:flex-row gap-4 w-full">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or serial number..."
                                className="w-full pl-11 pr-4 h-12 bg-white/[0.03] border border-white/[0.06] rounded-xl outline-none focus:border-primary/50 focus:bg-white/[0.06] text-sm text-white transition-all placeholder:text-slate-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-3">
                            <Select
                                options={CATEGORY_OPTIONS}
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                placeholder="All Categories"
                                className="w-44"
                            />
                            <Select
                                options={EQUIPMENT_STATUS_OPTIONS}
                                value={statusFilter}
                                onChange={setStatusFilter}
                                placeholder="All Status"
                                className="w-44"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        {/* View Toggle */}
                        <div className="flex items-center p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    'p-2 rounded-lg transition-all',
                                    viewMode === 'grid' ? 'bg-primary text-white' : 'text-slate-500 hover:text-white'
                                )}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    'p-2 rounded-lg transition-all',
                                    viewMode === 'list' ? 'bg-primary text-white' : 'text-slate-500 hover:text-white'
                                )}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>

                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Asset
                        </Button>
                    </div>
                </motion.div>

                {/* Asset Grid */}
                {viewMode === 'grid' ? (
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((eq, _i) => {
                                const categoryStyle = categoryIcons[eq.category] || categoryIcons.OTHER;
                                const CategoryIcon = categoryStyle.icon;

                                return (
                                    <motion.div
                                        key={eq.id}
                                        layout
                                        variants={itemVariants}
                                        className="glass-card rounded-3xl overflow-hidden group cursor-pointer"
                                    >
                                        {/* Header */}
                                        <div className="p-6 pb-4">
                                            <div className="flex items-start gap-4">
                                                <div className={cn(
                                                    'w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br',
                                                    categoryStyle.gradient
                                                )}>
                                                    <CategoryIcon className={cn('w-7 h-7', categoryStyle.color)} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                                                        {eq.name}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 font-mono mt-0.5">{eq.serialNumber}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details */}
                                        <div className="px-6 py-4 space-y-3 bg-white/[0.02]">
                                            <div className="flex items-center gap-3 text-sm">
                                                <MapPin className="w-4 h-4 text-slate-600" />
                                                <span className="text-slate-400">{eq.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Building className="w-4 h-4 text-slate-600" />
                                                <span className="text-slate-400">{eq.department}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="w-4 h-4 text-slate-600" />
                                                <span className="text-slate-400">{formatDate(eq.purchaseDate)}</span>
                                            </div>
                                        </div>

                                        {/* Footer with Smart Button */}
                                        <div className="p-6 pt-4 border-t border-white/[0.05]">
                                            <div className="flex items-center justify-between mb-3">
                                                <StatusBadge status={eq.status} />
                                                <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                                    <History className="w-3.5 h-3.5" />
                                                    {eq.requestCount} total
                                                </div>
                                            </div>

                                            {/* Smart Button - Maintenance */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openRequestsModal(eq);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group/btn",
                                                    "bg-gradient-to-r from-warning/10 to-orange-500/10 hover:from-warning/20 hover:to-orange-500/20",
                                                    "border border-warning/20 hover:border-warning/40"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                                                        <Settings className="w-4 h-4 text-warning" />
                                                    </div>
                                                    <span className="text-sm font-medium text-white">Maintenance</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {/* Badge with open request count */}
                                                    {getOpenRequestCount(eq.id) > 0 && (
                                                        <span className="px-2 py-0.5 bg-warning text-black text-xs font-bold rounded-full animate-pulse">
                                                            {getOpenRequestCount(eq.id)}
                                                        </span>
                                                    )}
                                                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover/btn:text-warning transition-colors" />
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    /* List View */
                    <motion.div variants={itemVariants} className="glass-card rounded-2xl overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.05]">
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Asset</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Category</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Location</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Department</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-wider text-slate-500">Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((eq) => {
                                    const categoryStyle = categoryIcons[eq.category] || categoryIcons.OTHER;
                                    const CategoryIcon = categoryStyle.icon;

                                    return (
                                        <tr key={eq.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={cn(
                                                        'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br',
                                                        categoryStyle.gradient
                                                    )}>
                                                        <CategoryIcon className={cn('w-5 h-5', categoryStyle.color)} />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white">{eq.name}</div>
                                                        <div className="text-xs text-slate-500 font-mono">{eq.serialNumber}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-400">{eq.category.replace('_', ' ')}</td>
                                            <td className="py-4 px-6 text-sm text-slate-400">{eq.location}</td>
                                            <td className="py-4 px-6 text-sm text-slate-400">{eq.department}</td>
                                            <td className="py-4 px-6"><StatusBadge status={eq.status} /></td>
                                            <td className="py-4 px-6 text-sm text-slate-400">{eq.requestCount}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {/* Empty State */}
                {filtered.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-20 h-20 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
                            <Wrench className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No assets found</h3>
                        <p className="text-slate-500 mb-6">Try adjusting your filters or add a new asset.</p>
                        <div className="flex items-center justify-center gap-3">
                            <Button variant="outline" onClick={() => {
                                setSearchQuery('');
                                setCategoryFilter('');
                                setStatusFilter('');
                            }}>
                                Clear Filters
                            </Button>
                            <Button onClick={() => setIsModalOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Asset
                            </Button>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Add Asset Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Register New Asset"
                subtitle="Add equipment to the asset registry"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Asset Name" placeholder="Enter asset name" />
                        <Input label="Serial Number" placeholder="e.g., SN-2024-001" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Select label="Category" options={CATEGORY_OPTIONS} placeholder="Select category" />
                        <Select label="Department" options={DEPARTMENT_OPTIONS} placeholder="Select department" />
                    </div>
                    <Input label="Location" placeholder="Building, Floor, Room" />
                    <Input label="Purchase Date" type="date" />

                    <ModalActions>
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>
                            Register Asset
                        </Button>
                    </ModalActions>
                </div>
            </Modal>

            {/* Equipment Maintenance Requests Modal (Smart Button) */}
            <Modal
                isOpen={isRequestsModalOpen}
                onClose={() => {
                    setIsRequestsModalOpen(false);
                    setSelectedEquipment(null);
                }}
                title={selectedEquipment ? `Maintenance - ${selectedEquipment.name}` : 'Maintenance Requests'}
                subtitle={selectedEquipment ? `All maintenance requests for ${selectedEquipment.serialNumber}` : ''}
            >
                <div className="space-y-4">
                    {/* Equipment Info Header */}
                    {selectedEquipment && (
                        <div className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warning/20 to-orange-500/20 flex items-center justify-center">
                                    <Settings className="w-6 h-6 text-warning" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white">{selectedEquipment.name}</h4>
                                    <p className="text-xs text-slate-500 font-mono">{selectedEquipment.serialNumber}</p>
                                </div>
                                <StatusBadge status={selectedEquipment.status} />
                            </div>
                        </div>
                    )}

                    {/* Requests List */}
                    <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                        {selectedEquipmentRequests.length > 0 ? (
                            selectedEquipmentRequests.map((req) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all hover:border-primary/30 cursor-pointer",
                                        req.status === 'NEW' && "bg-primary/5 border-primary/20",
                                        req.status === 'IN_PROGRESS' && "bg-warning/5 border-warning/20",
                                        req.status === 'REPAIRED' && "bg-success/5 border-success/20",
                                        req.status === 'SCRAP' && "bg-danger/5 border-danger/20"
                                    )}
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <PriorityBadge priority={req.priority} />
                                            <Badge variant={req.type === 'CORRECTIVE' ? 'danger' : 'success'} size="xs">
                                                {req.type}
                                            </Badge>
                                        </div>
                                        <Badge
                                            variant={
                                                req.status === 'NEW' ? 'primary' :
                                                    req.status === 'IN_PROGRESS' ? 'warning' :
                                                        req.status === 'REPAIRED' ? 'success' : 'danger'
                                            }
                                            size="xs"
                                        >
                                            {req.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <h5 className="font-medium text-white mb-1">{req.subject}</h5>
                                    <p className="text-xs text-slate-500 mb-3 line-clamp-2">{req.description}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{getRelativeTime(req.createdAt)}</span>
                                        </div>
                                        <span className="font-mono">#{req.id}</span>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
                                    <Settings className="w-8 h-8 text-slate-700" />
                                </div>
                                <h4 className="font-semibold text-white mb-1">No Maintenance Requests</h4>
                                <p className="text-sm text-slate-500">This equipment has no maintenance history.</p>
                            </div>
                        )}
                    </div>

                    {/* Stats Summary */}
                    {selectedEquipmentRequests.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            <div className="text-center p-3 bg-primary/10 rounded-xl border border-primary/20">
                                <div className="text-lg font-bold text-primary">
                                    {selectedEquipmentRequests.filter(r => r.status === 'NEW').length}
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">New</div>
                            </div>
                            <div className="text-center p-3 bg-warning/10 rounded-xl border border-warning/20">
                                <div className="text-lg font-bold text-warning">
                                    {selectedEquipmentRequests.filter(r => r.status === 'IN_PROGRESS').length}
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">In Progress</div>
                            </div>
                            <div className="text-center p-3 bg-success/10 rounded-xl border border-success/20">
                                <div className="text-lg font-bold text-success">
                                    {selectedEquipmentRequests.filter(r => r.status === 'REPAIRED').length}
                                </div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Completed</div>
                            </div>
                        </div>
                    )}

                    <ModalActions>
                        <Button variant="ghost" onClick={() => {
                            setIsRequestsModalOpen(false);
                            setSelectedEquipment(null);
                        }}>
                            Close
                        </Button>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Request
                        </Button>
                    </ModalActions>
                </div>
            </Modal>
        </div>
    );
}
