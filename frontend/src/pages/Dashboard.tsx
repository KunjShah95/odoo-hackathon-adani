import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import type { DashboardStats, MaintenanceRequest } from '../types';
import { getRelativeTime, cn } from '../utils/helpers';

const mockStats: DashboardStats = {
    totalEquipment: 156,
    operationalEquipment: 142,
    underMaintenance: 14,
    totalTeams: 8,
    totalRequests: 324,
    newRequests: 12,
    inProgressRequests: 14,
    completedRequests: 298,
};

const mockRecentRequests: Partial<MaintenanceRequest>[] = [
    {
        id: '1',
        subject: 'Compressor Turbine Delta Failure',
        type: 'CORRECTIVE',
        priority: 'CRITICAL',
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        subject: 'Main Server Room AC Service',
        type: 'PREVENTIVE',
        priority: 'MEDIUM',
        status: 'NEW',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        subject: 'Conveyor Line 4 Belt Replacement',
        type: 'CORRECTIVE',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '4',
        subject: 'Hydraulic Press Calibration',
        type: 'PREVENTIVE',
        priority: 'LOW',
        status: 'REPAIRED',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
];

const containerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

export function Dashboard() {
    return (
        <div className="pb-12 min-h-screen bg-zinc-950">
            <Header
                title="Command Center"
                subtitle="Operational Overview"
            />

            <motion.div
                initial="initial"
                animate="animate"
                variants={containerVariants}
                className="px-8 mt-10 space-y-12"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Total Assets"
                        value={mockStats.totalEquipment}
                        icon="solar:box-minimalistic-bold-duotone"
                        trend={`${mockStats.operationalEquipment} Active`}
                        color="bg-primary"
                    />
                    <StatCard
                        label="Deployed Teams"
                        value={mockStats.totalTeams}
                        icon="solar:users-group-rounded-bold-duotone"
                        trend="Ready for Dispatch"
                        color="bg-indigo-600"
                    />
                    <StatCard
                        label="New Requests"
                        value={mockStats.newRequests}
                        icon="solar:clipboard-list-bold-duotone"
                        trend={`${mockStats.inProgressRequests} In Progress`}
                        color="bg-amber-600"
                    />
                    <StatCard
                        label="Resolved Units"
                        value={mockStats.completedRequests}
                        icon="solar:check-circle-bold-duotone"
                        trend="98.2% Efficiency"
                        color="bg-emerald-600"
                    />
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Activity Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between border-b border-zinc-800/50 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/20" />
                                <h2 className="text-xl font-display font-bold text-white tracking-tight">
                                    Operational Stream
                                </h2>
                            </div>
                            <Link to="/app/requests" className="text-primary text-[10px] font-bold hover:underline tracking-widest flex items-center gap-2 uppercase">
                                Full Board <Icon icon="solar:arrow-right-up-linear" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {mockRecentRequests.map((request) => (
                                <motion.div
                                    variants={itemVariants}
                                    key={request.id}
                                    className="group p-5 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/50 hover:border-primary/30 rounded-2xl transition-all duration-300 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className={cn(
                                            "w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm border transition-colors",
                                            request.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                                request.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                    'bg-primary/10 text-primary border-primary/20'
                                        )}>
                                            {request.priority?.substring(0, 1)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors tracking-tight">{request.subject}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">REF_{request.id}00X</span>
                                                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wide">{getRelativeTime(request.createdAt || '')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:flex flex-col items-end gap-1.5">
                                            <PriorityBadge priority={request.priority!} />
                                            <StatusBadge status={request.status!} />
                                        </div>
                                        <Link
                                            to={`/app/requests/${request.id}`}
                                            className="p-2.5 rounded-xl bg-zinc-800/50 text-zinc-500 hover:text-primary hover:bg-primary/10 border border-zinc-800 hover:border-primary/30 transition-all"
                                        >
                                            <Icon icon="solar:alt-arrow-right-linear" className="w-5 h-5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Command & Alerts */}
                    <div className="space-y-12">
                        <section className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 ml-1">Directives</h3>
                            <div className="grid gap-3">
                                <Link to="/app/requests" className="w-full">
                                    <Button className="w-full h-14 rounded-xl justify-between group px-5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white transition-all">
                                        <span className="font-bold tracking-tight">Initiate Request</span>
                                        <Icon icon="solar:add-circle-bold-duotone" className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/app/equipment" className="w-full">
                                    <Button variant="outline" className="w-full h-14 rounded-xl justify-between border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 group px-5">
                                        <span className="font-bold tracking-tight text-white group-hover:text-primary transition-colors">Catalog Asset</span>
                                        <Icon icon="solar:pen-new-square-bold-duotone" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 ml-1">System Interrupts</h3>
                            <div className="space-y-3">
                                <AlertItem
                                    icon="solar:danger-bold-duotone"
                                    type="danger"
                                    title="Critical Maintenance"
                                    desc="3 core turbine nodes requesting immediate alignment."
                                />
                                <AlertItem
                                    icon="solar:bomb-bold-duotone"
                                    type="warning"
                                    title="Inventory Depleted"
                                    desc="Consumable mechanical filters at 12% capacity."
                                />
                                <AlertItem
                                    icon="solar:info-square-bold-duotone"
                                    type="primary"
                                    title="Analytics Ready"
                                    desc="Weekly performance vector analysis generated."
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

interface StatCardProps {
    label: string;
    value: number;
    icon: string;
    trend: string;
    color: string;
}

function StatCard({ label, value, icon, trend, color }: StatCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="group p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900/50 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
        >
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-6">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 text-white",
                        color
                    )}>
                        <Icon icon={icon} className="w-5 h-5" />
                    </div>
                    <Icon icon="solar:chart-2-linear" className="w-4 h-4 text-zinc-800 group-hover:text-primary transition-colors" />
                </div>
                <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-1 tracking-tight">{value}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{label}</p>
                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary tracking-wide bg-primary/5 border border-primary/10 py-1.5 px-3 rounded-lg w-fit">
                        <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                        {trend}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

interface AlertItemProps {
    type: 'danger' | 'warning' | 'primary';
    title: string;
    desc: string;
    icon: string;
}

function AlertItem({ type, title, desc, icon }: AlertItemProps) {
    const styles: Record<string, string> = {
        danger: 'border-rose-500/20 bg-rose-500/5 text-rose-400',
        warning: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
        primary: 'border-primary/20 bg-primary/5 text-primary',
    };

    return (
        <div className={cn(
            "p-4 rounded-xl border transition-all hover:bg-zinc-900/50 duration-300",
            styles[type]
        )}>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-1">
                <Icon icon={icon} className="w-4 h-4" />
                {title}
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed font-light">{desc}</p>
        </div>
    );
}
