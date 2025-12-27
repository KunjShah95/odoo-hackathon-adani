import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar() {
    return (
        <nav className="fixed top-8 w-full z-50 px-6">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between glass-panel rounded-3xl px-10 h-20 border-white/5 relative overflow-hidden group">
                {/* Tactical Beam on Hover */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-beam" />

                <Link to="/" className="flex items-center gap-4 relative">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                        <Icon icon="solar:shield-bold-duotone" className="text-white w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-display font-black tracking-tighter text-white uppercase italic leading-none">
                            GearGuard
                        </span>
                        <span className="text-[8px] font-mono font-black text-zinc-600 tracking-[0.3em] uppercase mt-1">OS_V4.2.0</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                    <Link to="/capabilities" className="hover:text-primary transition-all relative group/link">
                        CAPABILITIES
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-500" />
                    </Link>
                    <Link to="/ecosystem" className="hover:text-primary transition-all relative group/link">
                        ECOSYSTEM
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-500" />
                    </Link>
                    <Link to="/enterprise" className="hover:text-primary transition-all relative group/link">
                        ENTERPRISE
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-500" />
                    </Link>
                    <Link to="/app/docs" className="hover:text-primary transition-all relative group/link">
                        DOCS
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover/link:w-full transition-all duration-500" />
                    </Link>
                </div>

                <div className="flex items-center gap-10">
                    <Link to="/login" className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">LOGIN</Link>
                    <Link to="/register">
                        <Button className="h-12 px-8 rounded-xl bg-white text-black hover:bg-zinc-200 shadow-xl transition-all font-display font-black text-[10px] italic uppercase tracking-widest">
                            AUTH_INIT
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
