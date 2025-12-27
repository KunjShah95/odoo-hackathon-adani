import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const tiers = [
    {
        name: 'Tactical',
        price: 'Contact Us',
        desc: 'For growing industrial units needing precise tracking.',
        features: ['Up to 500 Assets', 'Email Support', 'Basic Analytics', 'Standard Security']
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'The complete orchestration layer for global operations.',
        features: ['Unlimited Assets', '24/7 Dedicated Support', 'ML Prediction Models', 'SSO & Advanced Security', 'Custom Integrations'],
        featured: true
    }
];

export function EnterprisePage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-primary/30 font-sans">
            <Navbar />

            <main className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-32">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="section-number mb-6 block"
                            >
                                // ENTERPRISE_GRADE
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight leading-[0.9] mb-8"
                            >
                                Built for <br />
                                <span className="text-zinc-500 italic">Unrivaled</span> <br />
                                <span className="text-primary">Reliability.</span>
                            </motion.h1>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary/10 border border-primary/20 p-8 rounded-[2rem] max-w-sm"
                        >
                            <div className="flex items-center gap-4 mb-4 text-primary">
                                <Icon icon="solar:verified-check-bold-duotone" className="w-6 h-6" />
                                <span className="font-bold text-sm tracking-tight uppercase">99.999% SLA Guaranteed</span>
                            </div>
                            <p className="text-xs text-zinc-500 font-bold leading-relaxed uppercase tracking-wider">
                                We provide mission-critical availability for industries where every second of downtime costs millions.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                        {tiers.map((tier, i) => (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`p-12 rounded-[3.5rem] border ${tier.featured ? 'bg-white text-black border-white' : 'bg-zinc-900/30 text-white border-zinc-800/50'} relative overflow-hidden group`}
                            >
                                {tier.featured && (
                                    <div className="absolute top-8 right-8 px-4 py-1.5 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                                        Most Deployed
                                    </div>
                                )}

                                <h3 className="text-4xl font-bold mb-4 tracking-tighter">{tier.name}</h3>
                                <p className={`text-sm mb-12 font-bold ${tier.featured ? 'text-zinc-600' : 'text-zinc-500'} uppercase tracking-[0.2em]`}>{tier.desc}</p>

                                <div className="space-y-6 mb-12">
                                    {tier.features.map(f => (
                                        <div key={f} className="flex items-center gap-4">
                                            <Icon icon="solar:check-circle-bold-duotone" className={`w-5 h-5 ${tier.featured ? 'text-primary' : 'text-primary'}`} />
                                            <span className="font-bold text-sm tracking-tight">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-current/10">
                                    <h4 className="text-5xl font-black tracking-tighter mb-4">{tier.price}</h4>
                                    <button className={`w-full h-16 rounded-2xl text-lg font-bold transition-all ${tier.featured ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20' : 'bg-zinc-800 text-white hover:bg-zinc-700'}`}>
                                        Initialize Consultation
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Trust Banner */}
                    <div className="text-center space-y-8">
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.5em]">Trusted by Industry Leaders</p>
                        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                            <Icon icon="logos:siemens" className="h-8 w-auto" />
                            <Icon icon="logos:ge-monogram" className="h-8 w-auto filter invert" />
                            <Icon icon="logos:tesla" className="h-8 w-auto filter invert" />
                            <Icon icon="logos:bosch" className="h-8 w-auto filter invert" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
