import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { MarketingNavbar } from '../components/layout/MarketingNavbar';
import { MarketingFooter } from '../components/layout/MarketingFooter';

const ecosystemNodes = [
    {
        name: 'Field Teams',
        icon: 'solar:users-group-rounded-bold-duotone',
        desc: 'Mobile-first interfaces for technical squads on the ground.'
    },
    {
        name: 'Industrial IOT',
        icon: 'solar:scanner-bold-duotone',
        desc: 'Direct integration with SCADA and PLC systems via secure protocols.'
    },
    {
        name: 'Supply Chain',
        icon: 'solar:delivery-bold-duotone',
        desc: 'Real-time parts inventory sync with certified vendors.'
    },
    {
        name: 'Management',
        icon: 'solar:chart-2-bold-duotone',
        desc: 'High-level strategic insights for executive decision making.'
    }
];

export function EcosystemPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-primary/30 font-sans">
            <MarketingNavbar />

            <main className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-32">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="section-number mb-6 block"
                        >
                            // GLOBAL_ECOSYSTEM
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight leading-none mb-8"
                        >
                            A Unified <span className="text-primary">Ecosystem.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg text-zinc-500 font-bold leading-relaxed"
                        >
                            GearGuard connects every node of your industrial operation, from localized sensors to global management centers, creating a living network of efficiency.
                        </motion.p>
                    </div>

                    <div className="relative mb-32">
                        <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full" />
                        <div className="relative glass-panel rounded-[4rem] p-12 overflow-hidden border-zinc-800/50 flex flex-col md:flex-row items-center justify-around gap-12">
                            {ecosystemNodes.map((node, i) => (
                                <motion.div
                                    key={node.name}
                                    initial={{ opacity: 0, rotateY: 30 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center space-y-4 max-w-[200px]"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 shadow-2xl group hover:border-primary transition-all">
                                        <Icon icon={node.icon} className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{node.name}</h3>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{node.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                        <div className="p-12 space-y-6">
                            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Seamless Integration</h2>
                            <p className="text-zinc-500 font-medium leading-relaxed">
                                Our open API architecture allows you to plug into existing ERP systems like SAP, Oracle, and Microsoft Dynamics without re-training your entire staff.
                            </p>
                        </div>
                        <div className="p-12 space-y-6">
                            <h2 className="text-3xl font-display font-bold text-white tracking-tight">Security-First Protocol</h2>
                            <p className="text-zinc-500 font-medium leading-relaxed">
                                End-to-end encrypted data streams ensure that your operational secrets remain yours, protected by military-grade AES-256 standards.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <MarketingFooter />
        </div>
    );
}
