import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Wrench,
    Users,
    ClipboardList,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Shield,
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useState } from 'react';

const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/equipment', label: 'Equipment', icon: Wrench },
    { path: '/app/teams', label: 'Teams', icon: Users },
    { path: '/app/requests', label: 'Requests', icon: ClipboardList },
    { path: '/app/calendar', label: 'Calendar', icon: Calendar },
    { path: '/app/reports', label: 'Reports', icon: BarChart3 },
];

interface SidebarProps {
    onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={cn(
                'h-screen bg-surface border-r border-white/5 flex flex-col transition-all duration-300 relative z-50 shadow-2xl',
                collapsed ? 'w-20' : 'w-72'
            )}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 h-24 border-b border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/30">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                {!collapsed && (
                    <div className="animate-fade-in truncate">
                        <h1 className="text-xl font-bold text-white tracking-tight">GearGuard</h1>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Asset Intelligence</p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-10 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={cn(
                                'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
                                isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            )}
                        >
                            <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-white' : 'group-hover:text-primary transition-colors')} />
                            {!collapsed && (
                                <span className="font-semibold text-sm animate-fade-in">{item.label}</span>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/5 bg-white/[0.01] space-y-1">
                <button className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/5 transition-all group">
                    <Settings className="w-5 h-5 flex-shrink-0 group-hover:rotate-45 transition-transform" />
                    {!collapsed && <span className="font-semibold text-sm">Settings</span>}
                </button>
                <button
                    onClick={onLogout}
                    className="flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl text-slate-400 hover:text-danger hover:bg-danger/10 transition-all"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && <span className="font-semibold text-sm">Logout</span>}
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-28 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center shadow-lg border-2 border-surface transition-transform hover:scale-110 active:scale-95 z-[60]"
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    );
}
