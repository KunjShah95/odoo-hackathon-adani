import { Shield, ChevronRight, Wrench, Users, BarChart3, Clock, CheckCircle, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function LandingPage() {
    return (
        <div className="min-h-screen bg-surface-dark selection:bg-primary/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-surface-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            GearGuard
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-slate-400 hover:text-white transition-colors">Features</a>
                        <a href="#teams" className="text-slate-400 hover:text-white transition-colors">Solutions</a>
                        <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-slate-400 hover:text-white font-medium px-4">Log in</Link>
                        <Link to="/register">
                            <Button className="rounded-full px-6">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="max-w-3xl animate-fade-in">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            Next Gen Asset Intelligence is Here
                        </div>

                        <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8">
                            The Ultimate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                                Maintenance Tracker
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
                            GearGuard empowers modern facilities to track assets, manage specialized teams, and automate
                            maintenance lifecycles with surgical precision.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link to="/register">
                                <Button size="lg" className="rounded-full px-10 h-16 text-lg">
                                    Start Tracking for Free
                                    <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <button className="flex items-center gap-3 text-white font-semibold group">
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/5 transition-all">
                                    <Play className="w-4 h-4 fill-white" />
                                </div>
                                Watch Product Demo
                            </button>
                        </div>
                    </div>

                    {/* Floating UI Elements Mockup */}
                    <div className="mt-20 relative animate-slide-up">
                        <div className="rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
                            <div className="h-12 border-b border-white/10 bg-white/5 flex items-center px-6 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                            </div>
                            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="h-32 rounded-xl bg-white/5 p-6 border border-white/5">
                                        <div className="flex justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Wrench className="text-primary" />
                                                <span className="font-semibold">Equipment Status</span>
                                            </div>
                                            <span className="text-success text-sm font-medium">94% Operational</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full">
                                            <div className="w-[94%] h-full bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                                            <div className="text-slate-500 text-sm mb-1">Active Teams</div>
                                            <div className="text-2xl font-bold">12</div>
                                        </div>
                                        <div className="p-5 rounded-xl bg-white/5 border border-white/5">
                                            <div className="text-slate-500 text-sm mb-1">Pending Tasks</div>
                                            <div className="text-2xl font-bold text-warning">08</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-semibold">Recent Activity</h3>
                                        <BarChart3 className="text-primary w-5 h-5" />
                                    </div>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium">Compressor Node {i * 4} Maintenance</div>
                                                    <div className="text-xs text-slate-500">Scheduled {i}h ago</div>
                                                </div>
                                                <div className="px-2 py-1 rounded bg-success/10 text-success text-[10px] font-bold uppercase">Done</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold mb-6">Built for High-Stakes Operations</h2>
                        <p className="text-slate-400 text-lg">
                            Every tool you need to eliminate downtime and maximize asset lifespan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="w-8 h-8 text-primary" />}
                            title="Asset Accountability"
                            description="Know exactly where every piece of equipment is, who uses it, and its complete service history."
                        />
                        <FeatureCard
                            icon={<Users className="w-8 h-8 text-blue-400" />}
                            title="Team Coordination"
                            description="Route requests to mechanics, electricians, or IT specialized teams automatically."
                        />
                        <FeatureCard
                            icon={<BarChart3 className="w-8 h-8 text-indigo-400" />}
                            title="Predictive Analytics"
                            description="Visualize mean-time-to-repair and preventive maintenance cycles in real-time."
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-primary/5 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    <div>
                        <div className="text-4xl font-bold mb-2">500+</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Facilities</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">12M</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Assets Tracked</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">99.9%</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Uptime</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">30%</div>
                        <div className="text-slate-500 uppercase tracking-widest text-xs font-bold">Cost Saved</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-12 md:p-20 text-center relative overflow-hidden">
                        {/* Abstract circle decoration */}
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[80px]" />
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full translate-x-1/2 translate-y-1/2 blur-[80px]" />

                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 relative">
                            Ready to Secure Your Operations?
                        </h2>
                        <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto relative">
                            Join hundreds of industry leaders using GearGuard to transform their maintenance strategy.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative">
                            <Link to="/register">
                                <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-12 h-16 text-lg rounded-full">
                                    Create Free Account
                                </Button>
                            </Link>
                            <Link to="/contact" className="text-white font-semibold hover:underline">
                                Schedule a Private Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-primary w-8 h-8" />
                            <span className="text-2xl font-bold text-white">GearGuard</span>
                        </div>
                        <p className="text-slate-500 max-w-sm">
                            The professional choice for equipment maintenance and team management since 2024.
                            Precision tracking for specialized environments.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><Link to="/features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link to="/integrations" className="hover:text-primary transition-colors">Integrations</Link></li>
                            <li><Link to="/enterprise" className="hover:text-primary transition-colors">Enterprise</Link></li>
                            <li><Link to="/solutions" className="hover:text-primary transition-colors">Solutions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-4 text-slate-500 text-sm">
                            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-sm">
                    © 2025 GearGuard Systems Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
            <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
