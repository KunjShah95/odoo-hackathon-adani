import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function MarketingNavbar() {
    return (
        <nav className="fixed top-0 w-full z-50 px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-full px-8 h-14 border-zinc-800/50">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <Icon icon="solar:shield-bold-duotone" className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-display font-bold tracking-tight text-white">
                        GearGuard
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.15em] font-bold text-zinc-500">
                    <Link to="/capabilities" className="hover:text-white transition-colors">Capabilities</Link>
                    <Link to="/ecosystem" className="hover:text-white transition-colors">Ecosystem</Link>
                    <Link to="/enterprise" className="hover:text-white transition-colors">Enterprise</Link>
                </div>

                <div className="flex items-center gap-6">
                    <Link to="/login" className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Sign In</Link>
                    <Link to="/register">
                        <Button className="rounded-full px-5 h-9 text-[11px] font-bold uppercase tracking-widest bg-white text-black hover:bg-zinc-200 transition-all">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
