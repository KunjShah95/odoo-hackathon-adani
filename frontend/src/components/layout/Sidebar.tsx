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
    Shield,
    Bell,
    Sparkles,
    X,
    Check,
    AlertTriangle,
    Info,
    Clock,
} from 'lucide-react';
import { cn } from '../../utils/helpers';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { path: '/app', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { path: '/app/equipment', label: 'Equipment', icon: Wrench, badge: null },
    { path: '/app/teams', label: 'Teams', icon: Users, badge: null },
    { path: '/app/requests', label: 'Requests', icon: ClipboardList, badge: 12 },
    { path: '/app/calendar', label: 'Calendar', icon: Calendar, badge: null },
    { path: '/app/reports', label: 'Reports', icon: BarChart3, badge: 'New' },
];

// Mock notifications
const mockNotifications = [
    {
        id: '1',
        type: 'alert',
        title: 'Critical: Equipment Failure',
        message: 'Turbine T-04 requires immediate attention',
        time: '5m ago',
        read: false,
    },
    {
        id: '2',
        type: 'warning',
        title: 'Maintenance Due',
        message: 'Scheduled maintenance for 12 assets tomorrow',
        time: '1h ago',
        read: false,
    },
    {
        id: '3',
        type: 'success',
        title: 'Work Order Completed',
        message: 'Repair #2847 marked as complete by Team Alpha',
        time: '2h ago',
        read: true,
    },
    {
        id: '4',
        type: 'info',
        title: 'New Report Available',
        message: 'Q4 Performance Report is ready for review',
        time: '3h ago',
        read: true,
    },
];

interface SidebarProps {
    onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const location = useLocation();

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'alert':
                return <AlertTriangle className="w-4 h-4 text-danger" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4 text-warning" />;
            case 'success':
                return <Check className="w-4 h-4 text-success" />;
            default:
                return <Info className="w-4 h-4 text-primary" />;
        }
    };

    const getNotificationBg = (type: string) => {
        switch (type) {
            case 'alert':
                return 'bg-danger/10';
            case 'warning':
                return 'bg-warning/10';
            case 'success':
                return 'bg-success/10';
            default:
                return 'bg-primary/10';
        }
    };

    return (
        <>
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 80 : 280 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="h-screen bg-white border-r border-slate-200 flex flex-col relative z-50 shadow-sm"
            >
                {/* Logo Section */}
                <div className={cn(
                    "flex items-center h-20 border-b border-slate-200 relative",
                    collapsed ? "justify-center px-4" : "gap-3 px-6"
                )}>
                    <div className="relative group">
                        <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/25">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h1 className="text-lg font-bold text-slate-800 tracking-tight">GearGuard</h1>
                                <p className="text-[9px] font-semibold text-primary uppercase tracking-[0.2em]">Enterprise</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pro Banner */}
                <AnimatePresence>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pt-4"
                        >
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-600/5 border border-primary/20 relative overflow-hidden group cursor-pointer hover:border-primary/40 transition-colors">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
                                <div className="relative flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800 mb-0.5">Upgrade to Pro</p>
                                        <p className="text-[10px] text-slate-500">Unlock AI predictions</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <nav className={cn(
                    "flex-1 py-6 overflow-y-auto custom-scrollbar",
                    collapsed ? "px-3" : "px-4"
                )}>
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            const isHovered = hoveredItem === item.path;

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onMouseEnter={() => setHoveredItem(item.path)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={cn(
                                        'relative flex items-center rounded-xl transition-all duration-200',
                                        collapsed ? 'justify-center h-12 w-full' : 'gap-3 px-4 h-12',
                                        isActive
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                    )}
                                >
                                    {/* Active indicator line */}
                                    {isActive && !collapsed && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}

                                    <Icon className={cn(
                                        'w-5 h-5 flex-shrink-0 transition-colors',
                                        isActive ? 'text-white' : isHovered ? 'text-primary' : ''
                                    )} />

                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="font-semibold text-sm flex-1 truncate"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Badge */}
                                    {item.badge && !collapsed && (
                                        <span className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-lg",
                                            typeof item.badge === 'number'
                                                ? isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-warning/10 text-warning'
                                                : isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-primary/10 text-primary'
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}

                                    {/* Tooltip for collapsed state */}
                                    {collapsed && (
                                        <div className="absolute left-full ml-3 px-3 py-2 bg-white rounded-lg text-sm font-semibold text-slate-800 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-slate-200">
                                            {item.label}
                                            {item.badge && (
                                                <span className="ml-2 text-primary text-xs">({item.badge})</span>
                                            )}
                                        </div>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                {/* Footer Actions */}
                <div className={cn(
                    "border-t border-slate-200 py-4",
                    collapsed ? "px-3" : "px-4"
                )}>
                    {/* Notification button */}
                    <button
                        onClick={() => {
                            setIsNotificationsOpen(true);
                            setIsSettingsOpen(false);
                        }}
                        className={cn(
                            "w-full flex items-center rounded-xl transition-all duration-200 mb-2",
                            collapsed ? "justify-center h-12" : "gap-3 px-4 h-12",
                            "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        )}
                    >
                        <div className="relative">
                            <Bell className="w-5 h-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full" />
                            )}
                        </div>
                        {!collapsed && <span className="font-semibold text-sm">Notifications</span>}
                        {!collapsed && unreadCount > 0 && (
                            <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 bg-danger/20 text-danger rounded-md">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Settings */}
                    <button
                        onClick={() => {
                            setIsSettingsOpen(true);
                            setIsNotificationsOpen(false);
                        }}
                        className={cn(
                            "w-full flex items-center rounded-xl transition-all duration-200 group",
                            collapsed ? "justify-center h-12" : "gap-3 px-4 h-12",
                            "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        )}
                    >
                        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        {!collapsed && <span className="font-semibold text-sm">Settings</span>}
                    </button>

                    {/* Logout */}
                    <button
                        onClick={onLogout}
                        className={cn(
                            "w-full flex items-center rounded-xl transition-all duration-200",
                            collapsed ? "justify-center h-12" : "gap-3 px-4 h-12",
                            "text-slate-600 hover:text-danger hover:bg-danger/10"
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span className="font-semibold text-sm">Sign Out</span>}
                    </button>
                </div>

                {/* User Profile Section */}
                <div className={cn(
                    "border-t border-slate-200 p-4",
                    collapsed ? "px-3" : ""
                )}>
                    <div className={cn(
                        "flex items-center rounded-2xl bg-slate-50 p-3 cursor-pointer hover:bg-slate-100 transition-colors",
                        collapsed ? "justify-center" : "gap-3"
                    )}>
                        <div className="relative flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20">
                                JS
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success border-2 border-white rounded-full" />
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-slate-800 truncate">John Smith</p>
                                <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">Admin</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-24 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:border-primary hover:scale-110 active:scale-95 transition-all z-[60] group"
                >
                    <motion.div
                        animate={{ rotate: collapsed ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    </motion.div>
                </button>
            </motion.aside>

            {/* Notifications Modal */}
            <AnimatePresence>
                {isNotificationsOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsNotificationsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-800">Notifications</h2>
                                        <p className="text-xs text-slate-500">{unreadCount} unread notifications</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/10"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setIsNotificationsOpen(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-slate-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Notifications List */}
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            onClick={() => markAsRead(notification.id)}
                                            className={cn(
                                                "px-6 py-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors",
                                                !notification.read && 'bg-blue-50/50'
                                            )}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                                                    getNotificationBg(notification.type)
                                                )}>
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={cn(
                                                            "text-sm font-semibold",
                                                            notification.read ? 'text-slate-400' : 'text-slate-800'
                                                        )}>
                                                            {notification.title}
                                                        </p>
                                                        {!notification.read && (
                                                            <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5">{notification.message}</p>
                                                    <div className="flex items-center gap-1 mt-2 text-slate-600">
                                                        <Clock className="w-3 h-3" />
                                                        <span className="text-[10px]">{notification.time}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-12 text-center">
                                        <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                        <p className="text-sm text-slate-500">No notifications yet</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-slate-200">
                                <button
                                    onClick={() => setIsNotificationsOpen(false)}
                                    className="w-full py-2.5 text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors"
                                >
                                    View All Notifications
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <SettingsModal onClose={() => setIsSettingsOpen(false)} />
                )}
            </AnimatePresence>
        </>
    );
}

// =============================================
// SETTINGS MODAL COMPONENT
// =============================================

interface SettingsModalProps {
    onClose: () => void;
}

function SettingsModal({ onClose }: SettingsModalProps) {
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        weeklyReport: false,
        darkMode: true,
        compactView: false,
        autoAssign: true,
    });

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Settings className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Settings</h2>
                            <p className="text-xs text-slate-500">Configure your preferences</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5 text-slate-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Notifications Section */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Notifications</h3>

                        <ToggleItem
                            label="Email Notifications"
                            description="Receive updates via email"
                            checked={preferences.emailNotifications}
                            onChange={() => togglePreference('emailNotifications')}
                        />
                        <ToggleItem
                            label="Push Notifications"
                            description="Get real-time browser notifications"
                            checked={preferences.pushNotifications}
                            onChange={() => togglePreference('pushNotifications')}
                        />
                        <ToggleItem
                            label="Weekly Report"
                            description="Receive weekly summary email"
                            checked={preferences.weeklyReport}
                            onChange={() => togglePreference('weeklyReport')}
                        />
                    </div>

                    {/* Display Section */}
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Display</h3>

                        <ToggleItem
                            label="Dark Mode"
                            description="Use dark theme (recommended)"
                            checked={preferences.darkMode}
                            onChange={() => togglePreference('darkMode')}
                        />
                        <ToggleItem
                            label="Compact View"
                            description="Reduce spacing in lists and cards"
                            checked={preferences.compactView}
                            onChange={() => togglePreference('compactView')}
                        />
                    </div>

                    {/* Workflow Section */}
                    <div className="pt-4 border-t border-slate-200 space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Workflow</h3>

                        <ToggleItem
                            label="Auto-Assign Work Orders"
                            description="Automatically assign to available teams"
                            checked={preferences.autoAssign}
                            onChange={() => togglePreference('autoAssign')}
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                    >
                        Save Settings
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Toggle Item Component
interface ToggleItemProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}

function ToggleItem({ label, description, checked, onChange }: ToggleItemProps) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className="text-sm font-medium text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            <button
                onClick={onChange}
                className={cn(
                    "relative w-11 h-6 rounded-full transition-colors",
                    checked ? 'bg-primary' : 'bg-slate-300'
                )}
            >
                <span
                    className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                        checked ? 'left-6' : 'left-1'
                    )}
                />
            </button>
        </div>
    );
}
