import { useState, useEffect } from 'react';
import {
    Wrench,
    Users,
    ClipboardList,
    AlertTriangle,
    CheckCircle,
    Clock,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    Plus,
    ExternalLink,
    MoreHorizontal,
    Filter,
    Calendar,
    Activity,
    Zap,
    Target,
    Bell,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge, PriorityBadge } from '../components/ui/Badge';
import type { DashboardStats, MaintenanceRequest } from '../types';
import { getRelativeTime } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Data
const mockStats: DashboardStats = {
    totalEquipment: 2847,
    operationalEquipment: 2689,
    totalTeams: 24,
    totalRequests: 15840,
    pendingRequests: 47,
    completedRequests: 15678,
    overdueRequests: 8,
    underMaintenance: 0,
    newRequests: 0,
    inProgressRequests: 0
};

const mockRecentRequests: Partial<MaintenanceRequest>[] = [
    {
        id: '1',
        subject: 'Compressor Turbine Delta-7 Bearing Failure',
        type: 'CORRECTIVE',
        priority: 'CRITICAL',
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        subject: 'Main Server Room HVAC Quarterly Service',
        type: 'PREVENTIVE',
        priority: 'MEDIUM',
        status: 'NEW',
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        subject: 'Conveyor Line 4 Belt Tensioner Replacement',
        type: 'CORRECTIVE',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '4',
        subject: 'Hydraulic Press HP-12 Annual Calibration',
        type: 'PREVENTIVE',
        priority: 'LOW',
        status: 'REPAIRED',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '5',
        subject: 'Generator B-7 Fuel System Inspection',
        type: 'PREVENTIVE',
        priority: 'MEDIUM',
        status: 'NEW',
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export function Dashboard() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('7d');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const healthScore = Math.round((mockStats.operationalEquipment / mockStats.totalEquipment) * 100);
    const completionRate = Math.round((mockStats.completedRequests / mockStats.totalRequests) * 100);

    return (
        <div className="pb-16 min-h-screen">
            <Header
                title="Operations Hub"
                subtitle="Real-time maintenance intelligence and asset health monitoring"
            />

            <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={containerVariants}
                className="px-8 mt-8 space-y-8"
            >
                {/* Top Row: Key Metrics */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        label="Total Assets"
                        value={mockStats.totalEquipment.toLocaleString()}
                        sublabel={`${mockStats.operationalEquipment.toLocaleString()} operational`}
                        icon={<Wrench className="w-5 h-5" />}
                        trend={{ value: '+12', direction: 'up' }}
                        color="primary"
                        progress={healthScore}
                    />
                    <StatCard
                        label="Active Teams"
                        value={mockStats.totalTeams}
                        sublabel="All teams deployed"
                        icon={<Users className="w-5 h-5" />}
                        trend={{ value: '+3', direction: 'up' }}
                        color="info"
                    />
                    <StatCard
                        label="Pending Requests"
                        value={mockStats.pendingRequests}
                        sublabel={`${mockStats.overdueRequests} overdue`}
                        icon={<ClipboardList className="w-5 h-5" />}
                        trend={{ value: '-8', direction: 'down' }}
                        color="warning"
                        alert={mockStats.overdueRequests > 5}
                    />
                    <StatCard
                        label="Completion Rate"
                        value={`${completionRate}%`}
                        sublabel={`${mockStats.completedRequests.toLocaleString()} resolved`}
                        icon={<CheckCircle className="w-5 h-5" />}
                        trend={{ value: '+2.4%', direction: 'up' }}
                        color="success"
                    />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Left Column: Live Feed & Charts */}
                    <div className="xl:col-span-2 space-y-8">
                        {/* Live Monitoring Section */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white">Live Work Orders</h2>
                                        <p className="text-xs text-slate-500">Real-time maintenance tracking</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                        <Filter className="w-4 h-4 text-slate-400" />
                                    </button>
                                    <Link to="/app/requests" className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
                                        View All
                                        <ExternalLink className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {mockRecentRequests.map((request, index) => (
                                    <motion.div
                                        key={request.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <WorkOrderCard request={request} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Equipment Health Chart */}
                        <motion.div variants={itemVariants}>
                            <HealthIndexChart timeframe={selectedTimeframe} onTimeframeChange={setSelectedTimeframe} />
                        </motion.div>
                    </div>

                    {/* Right Column: Actions & Alerts */}
                    <div className="space-y-8">
                        {/* Quick Actions */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                                Quick Operations
                            </h3>
                            <div className="space-y-3">
                                <Link to="/app/requests">
                                    <Button className="w-full h-14 rounded-2xl justify-between group">
                                        <span className="flex items-center gap-3">
                                            <Plus className="w-5 h-5" />
                                            Create Work Order
                                        </span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Button>
                                </Link>
                                <Link to="/app/equipment">
                                    <Button variant="outline" className="w-full h-14 rounded-2xl justify-between border-white/5 hover:bg-white/5 group">
                                        <span className="flex items-center gap-3">
                                            <Wrench className="w-5 h-5" />
                                            Register New Asset
                                        </span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Button>
                                </Link>
                                <Link to="/app/calendar">
                                    <Button variant="outline" className="w-full h-14 rounded-2xl justify-between border-white/5 hover:bg-white/5 group">
                                        <span className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5" />
                                            Schedule Maintenance
                                        </span>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>

                        {/* System Alerts */}
                        <motion.div variants={itemVariants}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">
                                    System Alerts
                                </h3>
                                <span className="w-6 h-6 rounded-full bg-danger/20 text-danger text-xs font-bold flex items-center justify-center">
                                    3
                                </span>
                            </div>
                            <div className="space-y-3">
                                <AlertCard
                                    type="danger"
                                    title="Critical: Overdue Maintenance"
                                    description="8 assets require immediate attention. Turbine T-04 is 72h past scheduled service."
                                    time="2m ago"
                                />
                                <AlertCard
                                    type="warning"
                                    title="Inventory Alert"
                                    description="Bearing SKF-6205 stock below reorder threshold (15 remaining)."
                                    time="1h ago"
                                />
                                <AlertCard
                                    type="info"
                                    title="Performance Report Ready"
                                    description="December maintenance efficiency report generated and available for review."
                                    time="3h ago"
                                />
                            </div>
                        </motion.div>

                        {/* Team Performance */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">
                                Top Performing Teams
                            </h3>
                            <div className="glass-card rounded-2xl p-5 space-y-4">
                                {[
                                    { name: 'Mechanical Alpha', score: 98, tasks: 47 },
                                    { name: 'Electrical Systems', score: 95, tasks: 38 },
                                    { name: 'HVAC Specialists', score: 92, tasks: 29 }
                                ].map((team, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center text-white font-bold text-sm">
                                            #{i + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="font-semibold text-white text-sm truncate">{team.name}</span>
                                                <span className="text-xs font-bold text-success">{team.score}%</span>
                                            </div>
                                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${team.score}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                    className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// =============================================
// STAT CARD COMPONENT
// =============================================

interface StatCardProps {
    label: string;
    value: string | number;
    sublabel: string;
    icon: React.ReactNode;
    trend?: { value: string; direction: 'up' | 'down' };
    color: 'primary' | 'info' | 'warning' | 'success';
    progress?: number;
    alert?: boolean;
}

function StatCard({ label, value, sublabel, icon, trend, color, progress, alert }: StatCardProps) {
    const colorStyles = {
        primary: {
            bg: 'bg-primary/10',
            text: 'text-primary',
            glow: 'shadow-primary/10'
        },
        info: {
            bg: 'bg-info/10',
            text: 'text-info',
            glow: 'shadow-info/10'
        },
        warning: {
            bg: 'bg-warning/10',
            text: 'text-warning',
            glow: 'shadow-warning/10'
        },
        success: {
            bg: 'bg-success/10',
            text: 'text-success',
            glow: 'shadow-success/10'
        }
    };

    const styles = colorStyles[color];

    return (
        <div className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${alert ? 'border-danger/30' : ''}`}>
            {/* Decorative gradient */}
            <div className={`absolute top-0 right-0 w-32 h-32 ${styles.bg} blur-3xl opacity-50 group-hover:opacity-75 transition-opacity`} />

            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${styles.bg} flex items-center justify-center ${styles.text}`}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${trend.direction === 'up' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                            }`}>
                            {trend.direction === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                            {trend.value}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
                    <p className="text-xs text-slate-600">{sublabel}</p>
                </div>

                {progress !== undefined && (
                    <div className="mt-4">
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className={`h-full rounded-full bg-gradient-to-r ${progress >= 90 ? 'from-success to-emerald-400' :
                                        progress >= 70 ? 'from-primary to-blue-400' :
                                            'from-warning to-yellow-400'
                                    }`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// =============================================
// WORK ORDER CARD COMPONENT
// =============================================

interface WorkOrderCardProps {
    request: Partial<MaintenanceRequest>;
}

function WorkOrderCard({ request }: WorkOrderCardProps) {
    const priorityColors = {
        CRITICAL: 'from-danger/20 to-red-800/20 text-danger border-danger/20',
        HIGH: 'from-warning/20 to-orange-800/20 text-warning border-warning/20',
        MEDIUM: 'from-primary/20 to-blue-800/20 text-primary border-primary/20',
        LOW: 'from-slate-500/20 to-slate-800/20 text-slate-400 border-slate-500/20'
    };

    return (
        <div className="group glass-card rounded-2xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-center gap-5">
                {/* Priority Indicator */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center font-bold text-lg border ${priorityColors[request.priority as keyof typeof priorityColors] || priorityColors.MEDIUM}`}>
                    {request.priority?.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors truncate mb-1">
                        {request.subject}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getRelativeTime(request.createdAt || '')}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <span className="uppercase tracking-wider">{request.type}</span>
                    </div>
                </div>

                {/* Badges & Actions */}
                <div className="flex items-center gap-3">
                    <PriorityBadge priority={request.priority!} />
                    <StatusBadge status={request.status!} />
                    <button className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all">
                        <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    );
}

// =============================================
// ALERT CARD COMPONENT
// =============================================

interface AlertCardProps {
    type: 'danger' | 'warning' | 'info';
    title: string;
    description: string;
    time: string;
}

function AlertCard({ type, title, description, time }: AlertCardProps) {
    const typeStyles = {
        danger: {
            bg: 'bg-danger/5',
            border: 'border-danger/20',
            icon: 'bg-danger/20 text-danger',
            title: 'text-danger'
        },
        warning: {
            bg: 'bg-warning/5',
            border: 'border-warning/20',
            icon: 'bg-warning/20 text-warning',
            title: 'text-warning'
        },
        info: {
            bg: 'bg-primary/5',
            border: 'border-primary/20',
            icon: 'bg-primary/20 text-primary',
            title: 'text-primary'
        }
    };

    const styles = typeStyles[type];

    return (
        <div className={`rounded-2xl p-4 ${styles.bg} border ${styles.border}`}>
            <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.icon}`}>
                    <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm font-bold ${styles.title}`}>{title}</h4>
                        <span className="text-[10px] text-slate-600 whitespace-nowrap">{time}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                </div>
            </div>
        </div>
    );
}

// =============================================
// HEALTH INDEX CHART COMPONENT
// =============================================

interface HealthIndexChartProps {
    timeframe: string;
    onTimeframeChange: (tf: string) => void;
}

function HealthIndexChart({ timeframe, onTimeframeChange }: HealthIndexChartProps) {
    const timeframes = ['24h', '7d', '30d', '90d'];
    const chartData = [65, 72, 68, 78, 74, 82, 79, 85, 81, 88, 84, 91];

    return (
        <div className="glass-card rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Equipment Health Index</h3>
                    <p className="text-sm text-slate-500">Overall operational efficiency trending</p>
                </div>
                <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl">
                    {timeframes.map((tf) => (
                        <button
                            key={tf}
                            onClick={() => onTimeframeChange(tf)}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${timeframe === tf
                                    ? 'bg-primary text-white'
                                    : 'text-slate-500 hover:text-white'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Area */}
            <div className="h-48 flex items-end gap-3">
                {chartData.map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${value}%` }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="w-full rounded-t-lg bg-gradient-to-t from-primary/40 to-primary relative group cursor-pointer"
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-surface-dark text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {value}%
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                        <span className="text-xs text-slate-500">Health Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-success" />
                        <span className="text-xs text-slate-500">Target: 85%</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-success text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12% vs last period</span>
                </div>
            </div>
        </div>
    );
}
