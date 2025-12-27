import {
    Wrench,
    Users,
    ClipboardList,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    ArrowRight,
    Plus,
    ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import type { DashboardStats, MaintenanceRequest } from '../types';
import { getRelativeTime } from '../utils/helpers';

const mockStats: DashboardStats = {
    totalEquipment: 156,
    operationalEquipment: 142,
    totalTeams: 8,
    totalRequests: 324,
    pendingRequests: 12,
    completedRequests: 298,
    overdueRequests: 3,
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

export function Dashboard() {
    return (
        <div className="pb-12">
            <Header
                title="Dashboard Overview"
                subtitle="Real-time operational health and maintenance intelligence."
            />

            <div className="px-8 mt-8 space-y-8 animate-fade-in">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Total Assets"
                        value={mockStats.totalEquipment}
                        icon={<Wrench />}
                        trend={`${mockStats.operationalEquipment} active`}
                        color="primary"
                    />
                    <StatCard
                        label="Specialized Teams"
                        value={mockStats.totalTeams}
                        icon={<Users />}
                        trend="Active & ready"
                        color="blue"
                    />
                    <StatCard
                        label="Pending Work"
                        value={mockStats.pendingRequests}
                        icon={<ClipboardList />}
                        trend={`${mockStats.overdueRequests} overdue`}
                        color="warning"
                    />
                    <StatCard
                        label="Resolved Tasks"
                        value={mockStats.completedRequests}
                        icon={<CheckCircle />}
                        trend="98% success rate"
                        color="success"
                    />
                </div>

                {/* Action Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold flex items-center gap-3">
                                <Clock className="text-primary w-5 h-5" />
                                Live Monitoring
                            </h2>
                            <Link to="/app/requests" className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                                View Tracking Board <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>

                        <div className="grid gap-4">
                            {mockRecentRequests.map((request) => (
                                <div key={request.id} className="group p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-2xl transition-all flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-lg ${request.priority === 'CRITICAL' ? 'bg-danger/20 text-danger' :
                                                request.priority === 'HIGH' ? 'bg-warning/20 text-warning' : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                            {request.priority?.substring(0, 1)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white group-hover:text-primary transition-colors">{request.subject}</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-1">Reported {getRelativeTime(request.createdAt || '')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <PriorityBadge priority={request.priority!} />
                                        <StatusBadge status={request.status!} />
                                        <button className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Tools */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Quick Operations</h3>
                            <div className="grid gap-3">
                                <Link to="/app/requests" className="w-full">
                                    <Button className="w-full h-14 rounded-2xl justify-between group">
                                        Create Repair Request
                                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/app/equipment" className="w-full">
                                    <Button variant="outline" className="w-full h-14 rounded-2xl justify-between border-white/5 hover:bg-white/5">
                                        Register New Asset
                                        <Wrench className="w-5 h-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">System Alerts</h3>
                            <div className="space-y-3">
                                <AlertItem
                                    type="danger"
                                    title="Overdue Maintenance"
                                    desc="3 critical turbines require immediate checkup."
                                />
                                <AlertItem
                                    type="warning"
                                    title="Inventory Low"
                                    desc="Mechanical filter stock below 15%."
                                />
                                <AlertItem
                                    type="primary"
                                    title="Team Review"
                                    desc="Electrical team performance report is ready."
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, trend, color }: any) {
    const colors: any = {
        primary: 'bg-primary text-white shadow-primary/20',
        blue: 'bg-blue-500 text-white shadow-blue-500/20',
        warning: 'bg-warning text-white shadow-warning/20',
        success: 'bg-success text-white shadow-success/20',
    };

    return (
        <div className="card group relative overflow-hidden">
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${colors[color]}`}>
                        {icon}
                    </div>
                    <TrendingUp className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">{label}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold py-1 px-2 rounded-lg bg-white/5 w-fit">
                        <div className={`w-1.5 h-1.5 rounded-full ${color === 'success' ? 'bg-success' : color === 'warning' ? 'bg-warning' : 'bg-primary'}`} />
                        {trend}
                    </div>
                </div>
            </div>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-primary/5 transition-colors" />
        </div>
    );
}

function AlertItem({ type, title, desc }: any) {
    const styles: any = {
        danger: 'border-danger/30 bg-danger/5 text-danger',
        warning: 'border-warning/30 bg-warning/5 text-warning',
        primary: 'border-primary/30 bg-primary/5 text-primary',
    };

    return (
        <div className={`p-4 rounded-2xl border ${styles[type]} space-y-1`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-3 h-3" />
                {title}
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">{desc}</p>
        </div>
    );
}
