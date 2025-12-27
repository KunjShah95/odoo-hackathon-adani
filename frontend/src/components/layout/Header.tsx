import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';

interface HeaderProps {
    title: string;
    subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
    const { user } = useAuth();

    return (
        <header className="sticky top-0 z-40 w-full px-8 py-6 bg-surface-dark/80 backdrop-blur-xl border-b border-white/5">
            <div className="flex items-center justify-between">
                {/* Title area */}
                <div className="animate-fade-in">
                    <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>
                    )}
                </div>

                {/* Action area */}
                <div className="flex items-center gap-6">
                    {/* Search bar */}
                    <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl w-80 group focus-within:border-primary/50 transition-all">
                        <Search className="w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search assets, teams, or requests..."
                            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-600 w-full"
                        />
                    </div>

                    {/* Notifications */}
                    <button className="relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
                        <Bell className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface animate-pulse" />
                    </button>

                    {/* Profile dropdown */}
                    <div className="flex items-center gap-4 pl-6 border-l border-white/10 cursor-pointer group">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-white">{user?.name || 'Guest'}</p>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{user?.role || 'User'}</p>
                        </div>
                        <div className="relative">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 ring-2 ring-white/10 group-hover:ring-primary/50 transition-all">
                                {user?.name ? getInitials(user.name) : <User className="w-6 h-6" />}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-surface-dark rounded-full" title="Online" />
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                </div>
            </div>
        </header>
    );
}
