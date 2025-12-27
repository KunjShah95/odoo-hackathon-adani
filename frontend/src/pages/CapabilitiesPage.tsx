import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';

const capabilities = [
    {
        title: 'Real-time Telemetry',
        desc: 'Streaming data from industrial sensors directly to your dashboard with sub-millisecond latency.',
        icon: 'solar:pulse-bold-duotone',
        features: ['Protobuf support', 'Edge computing', 'Custom thresholds']
    },
    {
        title: 'Predictive Analytics',
        desc: 'Advanced ML models trained on 50PB of industrial data to predict failures before they happen.',
        icon: 'solar:graph-up-bold-duotone',
        features: ['98% Prediction rate', 'RUL estimation', 'Anomaly detection']
    },
    {
        title: 'Inventory Orchestration',
        desc: 'Automated parts management that syncs with your maintenance schedule and supply chain.',
        icon: 'solar:box-minimalistic-bold-duotone',
        features: ['Auto-reorder', 'SKU tracking', 'Smart warehousing']
    },
    {
        title: 'Team Dispatching',
        desc: 'Intelligent workload balancing for field engineers based on expertise and location.',
        icon: 'solar:users-group-rounded-bold-duotone',
        features: ['Geofencing', 'Skill-based matching', 'Live tracking']
    }
];

export function CapabilitiesPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-primary/30 font-sans">
            <MarketingNavbar />

            <main className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-3xl mb-32">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-number mb-6 block"
                        >
                            // CORE_CAPABILITIES
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight mb-8 leading-[0.9]"
                        >
                            Engineering <br />
                            <span className="text-primary italic">Absolute</span> Control.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-zinc-500 font-bold leading-relaxed"
                        >
                            Our platform isn't just a dashboard; it's a high-performance engine designed to eliminate industrial friction and maximize uptime across your entire asset portfolio.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 rounded-[3rem] bg-zinc-900/30 border border-zinc-800/50 hover:border-primary/30 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon icon={cap.icon} className="w-32 h-32" />
                                </div>

                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 transition-transform">
                                    <Icon icon={cap.icon} className="w-8 h-8 text-primary" />
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">{cap.title}</h3>
                                <p className="text-zinc-500 font-bold leading-relaxed mb-8">{cap.desc}</p>

                                <div className="flex flex-wrap gap-2">
                                    {cap.features.map(f => (
                                        <span key={f} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <MarketingFooter />
        </div>
    );
}
