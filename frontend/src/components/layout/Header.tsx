import { useState } from 'react';
import { Bell, Search, User, ChevronDown, Command, X, Settings, LogOut, HelpCircle, Check, AlertTriangle, Info, Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

// Mock notifications data
const mockNotifications = [
    {
        id: '1',
        type: 'alert',
        title: 'Critical: Overdue Maintenance',
        message: 'Turbine T-04 is 72h past scheduled service',
        time: '2m ago',
        read: false,
    },
    {
        id: '2',
        type: 'warning',
        title: 'Inventory Alert',
        message: 'Bearing SKF-6205 stock below reorder threshold',
        time: '1h ago',
        read: false,
    },
    {
        id: '3',
        type: 'info',
        title: 'Report Ready',
        message: 'December maintenance efficiency report generated',
        time: '3h ago',
        read: true,
    },
    {
        id: '4',
        type: 'success',
        title: 'Work Order Completed',
        message: 'Compressor repair #2847 marked as complete',
        time: '5h ago',
        read: true,
    },
];

export function Header({ title, subtitle }: HeaderProps) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        setIsProfileOpen(false);
        logout();
        navigate('/login');
    };

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
            <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-sm">
                <div className="px-8 py-5">
                    <div className="flex items-center justify-between">
                        {/* Title Area */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">{title}</h1>
                            {subtitle && (
                                <p className="text-sm text-slate-500 mt-0.5 font-medium">{subtitle}</p>
                            )}
                        </motion.div>

                        {/* Action Area */}
                        <div className="flex items-center gap-4">
                            {/* Search Bar */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="relative hidden lg:block"
                            >
                                <div className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-xl w-80 
                                    border transition-all duration-300
                                    ${isSearchFocused
                                        ? 'bg-white border-primary/50 shadow-lg shadow-primary/10'
                                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                                    }
                                `}>
                                    <Search className={`w-4 h-4 transition-colors ${isSearchFocused ? 'text-primary' : 'text-slate-400'}`} />
                                    <input
                                        type="text"
                                        placeholder="Search assets, teams, requests..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setIsSearchFocused(false)}
                                        className="bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400 w-full font-medium"
                                    />
                                    {searchQuery ? (
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="p-1 hover:bg-slate-200 rounded transition-colors"
                                        >
                                            <X className="w-3 h-3 text-slate-500" />
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-1 px-2 py-1 bg-slate-200 rounded-lg">
                                            <Command className="w-3 h-3 text-slate-500" />
                                            <span className="text-[10px] font-bold text-slate-500">K</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Notifications */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="relative"
                            >
                                <button
                                    onClick={() => {
                                        setIsNotificationsOpen(!isNotificationsOpen);
                                        setIsProfileOpen(false);
                                    }}
                                    className="relative p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl transition-all group"
                                >
                                    <Bell className="w-5 h-5 text-slate-500 group-hover:text-slate-700 transition-colors" />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                            <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping opacity-75" />
                                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                <AnimatePresence>
                                    {isNotificationsOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsNotificationsOpen(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 top-full mt-2 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                            >
                                                {/* Header */}
                                                <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-slate-800">Notifications</h3>
                                                        {unreadCount > 0 && (
                                                            <span className="px-2 py-0.5 text-xs font-bold bg-primary/20 text-primary rounded-full">
                                                                {unreadCount} new
                                                            </span>
                                                        )}
                                                    </div>
                                                    {unreadCount > 0 && (
                                                        <button
                                                            onClick={markAllAsRead}
                                                            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                                                        >
                                                            Mark all as read
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Notifications List */}
                                                <div className="max-h-96 overflow-y-auto">
                                                    {notifications.length > 0 ? (
                                                        notifications.map((notification) => (
                                                            <div
                                                                key={notification.id}
                                                                onClick={() => markAsRead(notification.id)}
                                                                className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50/50' : ''
                                                                    }`}
                                                            >
                                                                <div className="flex items-start gap-3">
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getNotificationBg(notification.type)}`}>
                                                                        {getNotificationIcon(notification.type)}
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <p className={`text-sm font-medium ${notification.read ? 'text-slate-400' : 'text-slate-800'}`}>
                                                                                {notification.title}
                                                                            </p>
                                                                            {!notification.read && (
                                                                                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                                                                            )}
                                                                        </div>
                                                                        <p className="text-xs text-slate-500 mt-0.5">{notification.message}</p>
                                                                        <div className="flex items-center gap-1 mt-1.5 text-slate-400">
                                                                            <Clock className="w-3 h-3" />
                                                                            <span className="text-[10px]">{notification.time}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="px-4 py-8 text-center">
                                                            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                                            <p className="text-sm text-slate-500">No notifications</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                <div className="px-4 py-3 border-t border-slate-200">
                                                    <button className="w-full flex items-center justify-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                                                        View all notifications
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </motion.div>

                            {/* Divider */}
                            <div className="w-px h-10 bg-slate-200" />

                            {/* Profile Dropdown */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.3 }}
                                className="relative"
                            >
                                <button
                                    onClick={() => {
                                        setIsProfileOpen(!isProfileOpen);
                                        setIsNotificationsOpen(false);
                                    }}
                                    className="flex items-center gap-3 pl-3 pr-2 py-1.5 rounded-xl hover:bg-slate-100 transition-all group"
                                >
                                    <div className="text-right hidden sm:block">
                                        <p className="text-sm font-semibold text-slate-800">{user?.name || 'Guest'}</p>
                                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                                            {user?.role || 'User'}
                                        </p>
                                    </div>
                                    <div className="relative">
                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-primary/20 ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                                            {user?.name ? getInitials(user.name) : <User className="w-5 h-5" />}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success border-2 border-white rounded-full" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <>
                                            {/* Backdrop */}
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsProfileOpen(false)}
                                            />

                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 top-full mt-2 w-64 py-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50"
                                            >
                                                {/* User Info */}
                                                <div className="px-4 py-3 border-b border-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                                                            {user?.name ? getInitials(user.name) : <User className="w-6 h-6" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-slate-800">{user?.name || 'Guest'}</p>
                                                            <p className="text-xs text-slate-500">{user?.email || 'guest@example.com'}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Menu Items */}
                                                <div className="py-2">
                                                    <button
                                                        onClick={() => {
                                                            setIsProfileOpen(false);
                                                            setIsSettingsOpen(true);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <User className="w-4 h-4" />
                                                        <span>Profile Settings</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsProfileOpen(false);
                                                            setIsPreferencesOpen(true);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <Settings className="w-4 h-4" />
                                                        <span>Preferences</span>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setIsProfileOpen(false);
                                                            setIsHelpOpen(true);
                                                        }}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                                                    >
                                                        <HelpCircle className="w-4 h-4" />
                                                        <span>Help & Support</span>
                                                    </button>
                                                </div>

                                                {/* Logout */}
                                                <div className="pt-2 border-t border-slate-200">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger/10 transition-colors"
                                                    >
                                                        <LogOut className="w-4 h-4" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Profile Settings Modal */}
            <AnimatePresence>
                {isSettingsOpen && (
                    <SettingsModal onClose={() => setIsSettingsOpen(false)} user={user} />
                )}
            </AnimatePresence>

            {/* Preferences Modal */}
            <AnimatePresence>
                {isPreferencesOpen && (
                    <PreferencesModal onClose={() => setIsPreferencesOpen(false)} />
                )}
            </AnimatePresence>

            {/* Help & Support Modal */}
            <AnimatePresence>
                {isHelpOpen && (
                    <HelpModal onClose={() => setIsHelpOpen(false)} />
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
    user: any;
}

function SettingsModal({ onClose, user }: SettingsModalProps) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        department: '',
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                            <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Profile Settings</h2>
                            <p className="text-xs text-slate-500">Manage your account information</p>
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
                <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                            {user?.name ? getInitials(user.name) : <User className="w-10 h-10" />}
                        </div>
                        <div>
                            <button className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                                Change Avatar
                            </button>
                            <p className="text-xs text-slate-500 mt-1">JPG, PNG or GIF. Max 2MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-colors"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-colors"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1.5">Department</label>
                            <input
                                type="text"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary/50 focus:bg-white transition-colors"
                                placeholder="Engineering"
                            />
                        </div>
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
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

// =============================================
// PREFERENCES MODAL COMPONENT
// =============================================

interface PreferencesModalProps {
    onClose: () => void;
}

function PreferencesModal({ onClose }: PreferencesModalProps) {
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        pushNotifications: true,
        weeklyReport: false,
        darkMode: true,
        compactView: false,
    });

    const togglePreference = (key: keyof typeof preferences) => {
        setPreferences({ ...preferences, [key]: !preferences[key] });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                            <h2 className="text-lg font-bold text-slate-800">Preferences</h2>
                            <p className="text-xs text-slate-500">Customize your experience</p>
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
                <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Notifications</h3>

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

                    <div className="pt-4 border-t border-slate-200 space-y-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Display</h3>

                        <ToggleItem
                            label="Dark Mode"
                            description="Use dark theme"
                            checked={preferences.darkMode}
                            onChange={() => togglePreference('darkMode')}
                        />
                        <ToggleItem
                            label="Compact View"
                            description="Reduce spacing in lists"
                            checked={preferences.compactView}
                            onChange={() => togglePreference('compactView')}
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
                        Save Preferences
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
                className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-slate-300'
                    }`}
            >
                <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'left-6' : 'left-1'
                        }`}
                />
            </button>
        </div>
    );
}

// =============================================
// HELP & SUPPORT MODAL COMPONENT
// =============================================

interface HelpModalProps {
    onClose: () => void;
}

function HelpModal({ onClose }: HelpModalProps) {
    const helpItems = [
        {
            icon: '📖',
            title: 'Documentation',
            description: 'Read the full documentation',
            link: '/docs',
        },
        {
            icon: '💬',
            title: 'Live Chat',
            description: 'Chat with our support team',
            link: '#',
        },
        {
            icon: '📧',
            title: 'Email Support',
            description: 'support@gearguard.com',
            link: 'mailto:support@gearguard.com',
        },
        {
            icon: '🐛',
            title: 'Report a Bug',
            description: 'Help us improve the platform',
            link: '#',
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                            <HelpCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Help & Support</h2>
                            <p className="text-xs text-slate-500">Get help with GearGuard</p>
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
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        {helpItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                className="p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors group"
                            >
                                <span className="text-2xl mb-2 block">{item.icon}</span>
                                <h3 className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                            </a>
                        ))}
                    </div>

                    <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">🎓</span>
                            <div>
                                <h3 className="font-semibold text-slate-800">Need training?</h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Schedule a free training session with our team to get the most out of GearGuard.
                                </p>
                                <button className="mt-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                    Schedule Training →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-200 text-center">
                    <p className="text-xs text-slate-500">
                        Can't find what you're looking for? <a href="mailto:support@gearguard.com" className="text-primary hover:underline">Contact us</a>
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
