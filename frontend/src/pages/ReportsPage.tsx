import { Header } from '../components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import {
    BarChart3,
    TrendingUp,
    PieChart,
    Activity,
    Box,
    Download,
    Calendar as CalendarIcon,
    Filter,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export function ReportsPage() {
    return (
        <div className="pb-12">
            <Header
                title="Operation Intelligence"
                subtitle="Analytical insights into facility uptime and maintenance efficiency."
            />

            <div className="px-8 mt-8 space-y-10 animate-fade-in">
                {/* Top KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard title="MTTR" value="4.2h" trend="-12%" isGood={true} desc="Mean Time To Repair" />
                    <KPICard title="Uptime" value="98.8%" trend="+0.5%" isGood={true} desc="System-wide Reliability" />
                    <KPICard title="Compliance" value="92%" trend="-3.2%" isGood={false} desc="PM Schedule Adherence" />
                    <KPICard title="Cost/Asset" value="$142" trend="+2%" isGood={false} desc="Avg Maintenance Spend" />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Productivity Chart Stub */}
                    <Card className="p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-white">Workload Efficiency</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Resolved vs Reported Requests</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Download size={14} /></button>
                                <button className="w-8 h-8 rounded-lg bg-white/5 text-slate-500 flex items-center justify-center"><Filter size={14} /></button>
                            </div>
                        </div>

                        <div className="h-64 flex items-end gap-3 justify-between">
                            {[40, 65, 45, 90, 75, 55, 85, 30, 95, 60, 45, 80].map((h, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div
                                        className="w-full bg-primary/10 group-hover:bg-primary/30 transition-all rounded-t-lg relative"
                                        style={{ height: `${h}%` }}
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]" />
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-primary text-[10px] font-black px-1.5 py-0.5 rounded pointer-events-none">
                                            {h}%
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">M{i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Distribution stub */}
                    <Card className="p-8">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h3 className="text-xl font-black text-white">Asset Distribution</h3>
                                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Lifecycle Health by Category</p>
                            </div>
                            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                                Details <ArrowUpRight size={12} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <DistributionRow label="Mechanical Hardware" percentage={65} color="bg-primary" />
                            <DistributionRow label="Electrical Units" percentage={42} color="bg-blue-400" />
                            <DistributionRow label="IT Infrastructure" percentage={95} color="bg-indigo-500" />
                            <DistributionRow label="HVAC Systems" percentage={28} color="bg-warning" />
                            <DistributionRow label="Transportation" percentage={52} color="bg-indigo-400" />
                        </div>
                    </Card>
                </div>

                {/* Featured Report List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-3">
                        <Activity className="text-primary w-5 h-5" />
                        Generated Intelligence
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <ReportFileCard title="Q4 Preventive Audit" date="Dec 24, 2025" size="2.4 MB" />
                        <ReportFileCard title="Asset Longevity Study" date="Dec 20, 2025" size="1.1 MB" />
                        <ReportFileCard title="Team Productivity (Dec)" date="Jan 01, 2026" size="0.8 MB" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function KPICard({ title, value, trend, isGood, desc }: any) {
    return (
        <div className="p-6 bg-surface border border-white/5 rounded-3xl hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{title}</span>
                <div className={cn(
                    "flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ring-1 ring-inset",
                    isGood ? "bg-success/10 text-success ring-success/20" : "bg-danger/10 text-danger ring-danger/20"
                )}>
                    {isGood ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {trend}
                </div>
            </div>
            <div className="text-4xl font-black text-white mb-2">{value}</div>
            <p className="text-[10px] font-bold text-slate-600">{desc}</p>
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.01] rounded-full -mr-4 -mt-4 blur-xl group-hover:bg-primary/5 transition-colors" />
        </div>
    );
}

function DistributionRow({ label, percentage, color }: any) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>{label}</span>
                <span>{percentage}% Operable</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${percentage}%` }} />
            </div>
        </div>
    );
}

function ReportFileCard({ title, date, size }: any) {
    return (
        <div className="p-5 bg-white/[0.03] hover:bg-white/[0.05] border border-white/5 rounded-2xl flex items-center justify-between group transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                    <BarChart3 size={20} />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{title}</h4>
                    <p className="text-[10px] font-bold text-slate-600">{date} • {size}</p>
                </div>
            </div>
            <Download size={16} className="text-slate-700 group-hover:text-white transition-colors" />
        </div>
    );
}
