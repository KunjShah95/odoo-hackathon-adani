import { Icon } from '@iconify/react';
import { Header } from '../components/layout/Header';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const docSections = [
    {
        title: 'Getting Started',
        icon: 'solar:rocket-bold-duotone',
        items: [
            { label: 'System Architecture', desc: 'Overview of GearGuard\'s core components and data flow.' },
            { label: 'Operator Basics', desc: 'Essential workflows for equipment tracking and request management.' },
            { label: 'Role Permissions', desc: 'Understanding Admin vs Technician access levels.' },
        ]
    },
    {
        title: 'Asset Management',
        icon: 'solar:box-minimalistic-bold-duotone',
        items: [
            { label: 'Registering Assets', desc: 'How to correctly catalog new equipment and serial numbers.' },
            { label: 'Maintenance Cycles', desc: 'Setting up recurring preventive maintenance intervals.' },
            { label: 'Scrap & Decommission', desc: 'Proper protocol for retiring end-of-life hardware.' },
        ]
    },
    {
        title: 'Field Operations',
        icon: 'solar:settings-bold-duotone',
        items: [
            { label: 'Kanban Mastery', desc: 'Managing the lifecycle of maintenance requests on the board.' },
            { label: 'Team Dispatch', desc: 'Assigning and coordinating maintenance squads effectively.' },
            { label: 'Resource Logging', desc: 'Accurately tracking parts, time, and diagnosis in reports.' },
        ]
    }
];

export function DocumentationPage() {
    const location = useLocation();
    const isPublic = location.pathname === '/docs';

    return (
        <div className={`min-h-screen bg-zinc-950 text-zinc-200 selection:bg-primary/30 font-sans ${isPublic ? '' : 'pb-12 h-screen overflow-y-auto custom-scrollbar'}`}>
            {isPublic && <Navbar />}

            {!isPublic ? (
                <Header
                    title="Knowledge Base"
                    subtitle="System documentation and operational manuals."
                />
            ) : (
                <div className="pt-48 px-8 max-w-7xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="section-number mb-6 block"
                    >
                        // SYSTEM_DOCUMENTATION
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight mb-16 leading-[0.9]"
                    >
                        Knowledge <br />
                        <span className="text-primary italic">Architecture.</span>
                    </motion.h1>
                </div>
            )}

            <div className={`px-8 ${isPublic ? 'max-w-7xl mx-auto mb-32' : 'mt-10'} space-y-12 animate-fade-in`}>
                {/* Hero Section */}
                <div className="relative p-12 bg-primary/5 rounded-[3rem] border border-primary/20 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48 transition-all group-hover:bg-primary/20" />

                    <div className="relative z-10 max-w-2xl">
                        <span className="section-number mb-6 block">// DOCS_V4.2</span>
                        <h2 className="text-4xl font-black text-white leading-tight mb-6">
                            Master the <span className="text-primary italic">Precision</span> of Industrial Maintenance.
                        </h2>
                        <p className="text-zinc-500 font-bold leading-relaxed mb-8">
                            Comprehensive guides designed to help your team maintain operational excellence through data-driven hardware management.
                        </p>

                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                                Download PDF Manual
                            </button>
                            <button className="px-8 py-4 bg-zinc-900 border border-white/5 text-zinc-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                                Video Tutorials
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {docSections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-8 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                                <Icon icon={section.icon} className="w-7 h-7 text-primary" />
                            </div>

                            <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{section.title}</h3>

                            <div className="space-y-6">
                                {section.items.map((item) => (
                                    <div key={item.label} className="group/item cursor-pointer">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-sm font-bold text-zinc-300 group-hover/item:text-primary transition-colors">{item.label}</h4>
                                            <Icon icon="solar:arrow-right-up-linear" className="w-3 h-3 text-zinc-700 group-hover/item:text-primary transition-colors" />
                                        </div>
                                        <p className="text-[10px] text-zinc-600 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Support Card */}
                <div className="p-8 bg-zinc-900/50 border border-zinc-800/50 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center border border-success/20">
                            <Icon icon="solar:chat-round-dots-bold-duotone" className="w-8 h-8 text-success" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg">Need immediate tactical support?</h4>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Our engineers are standing by for critical system assistance.</p>
                        </div>
                    </div>
                    <button className="px-10 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                        Open Support Ticket
                    </button>
                </div>
            </div>

            {isPublic && <Footer />}
        </div>
    );
}
