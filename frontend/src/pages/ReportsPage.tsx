import { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { cn } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Clock, Activity, Shield, DollarSign,
    Download, Filter, FileText, BarChart3, LineChart,
    Wrench, Zap, Monitor, Wind, Truck, RefreshCw, Search, X, CheckCircle
} from 'lucide-react';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

// Mock reports data
const mockReports = [
    {
        id: '1',
        title: 'Q4 Preventive Maintenance Audit',
        date: 'Dec 24, 2025',
        size: '2.4 MB',
        type: 'PDF' as const,
        category: 'Maintenance'
    },
    {
        id: '2',
        title: 'Asset Longevity Analysis',
        date: 'Dec 20, 2025',
        size: '1.1 MB',
        type: 'Excel' as const,
        category: 'Assets'
    },
    {
        id: '3',
        title: 'Team Productivity Report',
        date: 'Dec 15, 2025',
        size: '0.8 MB',
        type: 'PDF' as const,
        category: 'Teams'
    },
    {
        id: '4',
        title: 'Monthly Cost Analysis',
        date: 'Dec 01, 2025',
        size: '1.5 MB',
        type: 'Excel' as const,
        category: 'Finance'
    },
    {
        id: '5',
        title: 'Equipment Downtime Report',
        date: 'Nov 28, 2025',
        size: '0.6 MB',
        type: 'PDF' as const,
        category: 'Equipment'
    },
    {
        id: '6',
        title: 'Compliance Audit Summary',
        date: 'Nov 15, 2025',
        size: '3.2 MB',
        type: 'PDF' as const,
        category: 'Compliance'
    },
    {
        id: '7',
        title: 'Annual Maintenance Summary 2025',
        date: 'Nov 10, 2025',
        size: '4.5 MB',
        type: 'PDF' as const,
        category: 'Maintenance'
    },
    {
        id: '8',
        title: 'Spare Parts Inventory Report',
        date: 'Nov 05, 2025',
        size: '2.1 MB',
        type: 'Excel' as const,
        category: 'Inventory'
    },
];

export function ReportsPage() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [downloadingId, setDownloadingId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const timeframes = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: '1y', label: '1 Year' },
    ];

    const categories = ['All', 'Maintenance', 'Assets', 'Teams', 'Finance', 'Equipment', 'Compliance', 'Inventory'];

    // Filter reports based on search query and category
    const filteredReports = useMemo(() => {
        return mockReports.filter(report => {
            const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                report.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                report.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || selectedCategory === 'All' || report.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    // Handle download
    const handleDownload = async (reportId: string, title: string, type: string) => {
        setDownloadingId(reportId);

        // Simulate download delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create a fake file download
        const content = `This is a simulated ${type} report: ${title}`;
        const blob = new Blob([content], { type: type === 'PDF' ? 'application/pdf' : 'application/vnd.ms-excel' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s+/g, '_')}.${type === 'PDF' ? 'pdf' : 'xlsx'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDownloadingId(null);
        showNotification(`${title} downloaded successfully!`);
    };

    // Handle export all
    const handleExportAll = async () => {
        setDownloadingId('all');
        await new Promise(resolve => setTimeout(resolve, 2000));

        const content = 'Combined Report Export\n\n' + mockReports.map(r => `- ${r.title} (${r.date})`).join('\n');
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'GearGuard_Complete_Report.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        setDownloadingId(null);
        showNotification('All reports exported successfully!');
    };

    const showNotification = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="pb-16 min-h-screen relative">
            <Header
                title="Analytics & Reports"
                subtitle="Performance metrics & actionable insights"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="px-8 mt-8 space-y-8"
            >
                {/* Toolbar */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2 p-1 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                        {timeframes.map(tf => (
                            <button
                                key={tf.value}
                                onClick={() => setSelectedTimeframe(tf.value)}
                                className={cn(
                                    'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                                    selectedTimeframe === tf.value
                                        ? 'bg-primary text-white'
                                        : 'text-slate-500 hover:text-white'
                                )}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                        <Button variant="outline">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                        </Button>
                        <Button
                            onClick={handleExportAll}
                            disabled={downloadingId === 'all'}
                        >
                            {downloadingId === 'all' ? (
                                <>
                                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                    Exporting...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    Export Report
                                </>
                            )}
                        </Button>
                    </div>
                </motion.div>

                {/* KPI Cards */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        title="Mean Time to Repair"
                        value="4.2h"
                        trend={{ value: '-12%', isPositive: true }}
                        description="Average repair duration"
                        icon={Clock}
                    />
                    <KPICard
                        title="System Uptime"
                        value="98.8%"
                        trend={{ value: '+0.5%', isPositive: true }}
                        description="Overall equipment reliability"
                        icon={Activity}
                    />
                    <KPICard
                        title="PM Compliance"
                        value="92%"
                        trend={{ value: '-3.2%', isPositive: false }}
                        description="Preventive maintenance adherence"
                        icon={Shield}
                    />
                    <KPICard
                        title="Cost per Asset"
                        value="$142"
                        trend={{ value: '+2%', isPositive: false }}
                        description="Average maintenance spend"
                        icon={DollarSign}
                    />
                </motion.div>

                {/* Charts Row */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Workload Chart */}
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Workload Distribution</h3>
                                <p className="text-sm text-slate-500">Work orders completed per week</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                                    <BarChart3 className="w-4 h-4 text-slate-500" />
                                </button>
                                <button className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all">
                                    <LineChart className="w-4 h-4 text-slate-500" />
                                </button>
                            </div>
                        </div>

                        <div className="h-64 flex items-end gap-3">
                            {[40, 65, 45, 90, 75, 55, 85, 30, 95, 60, 45, 80].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                    <div className="w-full bg-white/[0.02] rounded-xl h-full flex items-end relative">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1, delay: i * 0.05, ease: 'easeOut' }}
                                            className="w-full bg-gradient-to-t from-primary/30 to-primary/10 group-hover:from-primary/50 group-hover:to-primary/20 rounded-xl relative transition-all"
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-surface-light border border-white/[0.08] text-primary text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap">
                                                {h}%
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-medium">W{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Asset Health */}
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Asset Health Index</h3>
                                <p className="text-sm text-slate-500">Equipment status by category</p>
                            </div>
                            <Button variant="ghost" size="sm">
                                View Details
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <HealthRow icon={Wrench} label="Mechanical" percentage={65} color="primary" />
                            <HealthRow icon={Zap} label="Electrical" percentage={42} color="blue" />
                            <HealthRow icon={Monitor} label="IT Equipment" percentage={95} color="purple" />
                            <HealthRow icon={Wind} label="HVAC" percentage={28} color="warning" />
                            <HealthRow icon={Truck} label="Vehicles" percentage={72} color="success" />
                        </div>
                    </div>
                </motion.div>

                {/* Pivot/Graph Report - Number of Requests per Team and Equipment Category */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Requests per Team */}
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Requests per Team</h3>
                                <p className="text-sm text-slate-500">Maintenance workload distribution</p>
                            </div>
                            <Badge variant="primary" size="sm">Pivot Report</Badge>
                        </div>

                        <div className="space-y-4">
                            {[
                                { team: 'Mechanical Team', count: 28, color: 'bg-primary', percentage: 35 },
                                { team: 'Electrical Team', count: 22, color: 'bg-blue-500', percentage: 27.5 },
                                { team: 'HVAC Specialists', count: 18, color: 'bg-green-500', percentage: 22.5 },
                                { team: 'IT Support', count: 8, color: 'bg-purple-500', percentage: 10 },
                                { team: 'Facilities', count: 4, color: 'bg-warning', percentage: 5 },
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-3 h-3 rounded-full", item.color)} />
                                            <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                                                {item.team}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-white">{item.count}</span>
                                            <span className="text-xs text-slate-600">({item.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.percentage}%` }}
                                            transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                            className={cn('h-full rounded-full', item.color)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                            <span className="text-xs text-slate-500">Total Requests: 80</span>
                            <Button variant="ghost" size="sm">
                                <Download className="w-3.5 h-3.5 mr-1.5" />
                                Export
                            </Button>
                        </div>
                    </div>

                    {/* Requests per Equipment Category */}
                    <div className="glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-1">Requests per Category</h3>
                                <p className="text-sm text-slate-500">Equipment type breakdown</p>
                            </div>
                            <Badge variant="success" size="sm">Graph Report</Badge>
                        </div>

                        {/* Donut Chart Visualization */}
                        <div className="flex items-center gap-8">
                            {/* Donut Chart */}
                            <div className="relative w-40 h-40 flex-shrink-0">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    {[
                                        { category: 'MACHINERY', count: 32, color: '#f97316', offset: 0 },
                                        { category: 'VEHICLE', count: 18, color: '#3b82f6', offset: 40 },
                                        { category: 'ELECTRICAL', count: 14, color: '#eab308', offset: 62.5 },
                                        { category: 'HVAC', count: 12, color: '#22c55e', offset: 80 },
                                        { category: 'IT_EQUIPMENT', count: 4, color: '#a855f7', offset: 95 },
                                    ].map((item, i) => {
                                        const dashLength = (item.count / 80) * 251.2;
                                        const dashOffset = -(item.offset / 100) * 251.2;
                                        return (
                                            <motion.circle
                                                key={i}
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                fill="none"
                                                stroke={item.color}
                                                strokeWidth="16"
                                                strokeDasharray={`${dashLength} 251.2`}
                                                strokeDashoffset={dashOffset}
                                                initial={{ strokeDasharray: "0 251.2" }}
                                                animate={{ strokeDasharray: `${dashLength} 251.2` }}
                                                transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                            />
                                        );
                                    })}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-white">80</span>
                                    <span className="text-xs text-slate-500">Total</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex-1 space-y-3">
                                {[
                                    { category: 'Machinery', count: 32, color: 'bg-orange-500' },
                                    { category: 'Vehicle', count: 18, color: 'bg-blue-500' },
                                    { category: 'Electrical', count: 14, color: 'bg-yellow-500' },
                                    { category: 'HVAC', count: 12, color: 'bg-green-500' },
                                    { category: 'IT Equipment', count: 4, color: 'bg-purple-500' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between group cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-2.5 h-2.5 rounded-sm", item.color)} />
                                            <span className="text-xs text-slate-400 group-hover:text-white transition-colors">
                                                {item.category}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold text-white">{item.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                            <span className="text-xs text-slate-500">Data from last 30 days</span>
                            <Button variant="ghost" size="sm">
                                <Download className="w-3.5 h-3.5 mr-1.5" />
                                Export
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Reports List with Search */}
                <motion.div variants={itemVariants}>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <h3 className="text-lg font-bold text-white">Generated Reports</h3>

                        {/* Search and Filter */}
                        <div className="flex items-center gap-3">
                            {/* Search Input */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 py-2.5 w-72 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
                                    >
                                        <X className="w-3 h-3 text-slate-500" />
                                    </button>
                                )}
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory || 'All'}
                                onChange={(e) => setSelectedCategory(e.target.value === 'All' ? null : e.target.value)}
                                className="px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 transition-colors cursor-pointer"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat} className="bg-surface-dark text-white">
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-4 text-sm text-slate-500">
                        Showing {filteredReports.length} of {mockReports.length} reports
                        {searchQuery && <span> matching "<span className="text-primary">{searchQuery}</span>"</span>}
                        {selectedCategory && selectedCategory !== 'All' && (
                            <span> in <span className="text-primary">{selectedCategory}</span></span>
                        )}
                    </div>

                    {/* Reports Grid */}
                    {filteredReports.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredReports.map((report) => (
                                <ReportCard
                                    key={report.id}
                                    id={report.id}
                                    title={report.title}
                                    date={report.date}
                                    size={report.size}
                                    type={report.type}
                                    category={report.category}
                                    isDownloading={downloadingId === report.id}
                                    onDownload={() => handleDownload(report.id, report.title, report.type)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card rounded-2xl p-12 text-center">
                            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-white mb-2">No reports found</h4>
                            <p className="text-sm text-slate-500">
                                Try adjusting your search or filter criteria
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedCategory(null);
                                }}
                                className="mt-4 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            {/* Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 50, x: '-50%' }}
                        className="fixed bottom-8 left-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-success/10 border border-success/20 rounded-2xl shadow-2xl"
                    >
                        <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-success" />
                        </div>
                        <span className="text-sm font-medium text-white">{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// =============================================
// KPI CARD COMPONENT
// =============================================

interface KPICardProps {
    title: string;
    value: string;
    trend: { value: string; isPositive: boolean };
    description: string;
    icon: typeof Clock;
}

function KPICard({ title, value, trend, description, icon: Icon }: KPICardProps) {
    return (
        <div className="glass-card rounded-2xl p-6 group hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold',
                    trend.isPositive
                        ? 'bg-success/10 text-success'
                        : 'bg-danger/10 text-danger'
                )}>
                    {trend.isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {trend.value}
                </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm font-medium text-slate-400 mb-1">{title}</div>
            <p className="text-xs text-slate-600">{description}</p>
        </div>
    );
}

// =============================================
// HEALTH ROW COMPONENT
// =============================================

interface HealthRowProps {
    icon: typeof Wrench;
    label: string;
    percentage: number;
    color: 'primary' | 'blue' | 'purple' | 'warning' | 'success';
}

function HealthRow({ icon: Icon, label, percentage, color }: HealthRowProps) {
    const colorClasses = {
        primary: 'bg-primary text-primary',
        blue: 'bg-blue-500 text-blue-400',
        purple: 'bg-purple-500 text-purple-400',
        warning: 'bg-warning text-warning',
        success: 'bg-success text-success',
    };

    return (
        <div className="group">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center">
                        <Icon className={cn('w-4 h-4', colorClasses[color].split(' ')[1])} />
                    </div>
                    <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                        {label}
                    </span>
                </div>
                <span className="text-sm font-bold text-white">{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-white/[0.03] rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={cn('h-full rounded-full', colorClasses[color].split(' ')[0])}
                />
            </div>
        </div>
    );
}

// =============================================
// REPORT CARD COMPONENT
// =============================================

interface ReportCardProps {
    id: string;
    title: string;
    date: string;
    size: string;
    type: 'PDF' | 'Excel';
    category: string;
    isDownloading: boolean;
    onDownload: () => void;
}

function ReportCard({ title, date, size, type, isDownloading, onDownload }: ReportCardProps) {
    return (
        <div className="glass-card rounded-2xl p-5 flex items-center justify-between group hover:border-primary/30 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:border-primary/30 transition-all">
                    <FileText className="w-6 h-6 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <div>
                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                        {title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <span>{date}</span>
                        <span>•</span>
                        <span>{size}</span>
                        <Badge variant={type === 'PDF' ? 'danger' : 'success'} size="xs">
                            {type}
                        </Badge>
                    </div>
                </div>
            </div>
            <button
                onClick={onDownload}
                disabled={isDownloading}
                className={cn(
                    "p-2.5 rounded-xl border transition-all",
                    isDownloading
                        ? "bg-primary/10 border-primary/20 cursor-wait"
                        : "bg-white/[0.03] border-white/[0.06] opacity-0 group-hover:opacity-100 hover:bg-primary/10 hover:border-primary/30"
                )}
            >
                {isDownloading ? (
                    <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                ) : (
                    <Download className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                )}
            </button>
        </div>
    );
}
