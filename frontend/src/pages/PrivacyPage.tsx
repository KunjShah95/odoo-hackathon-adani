import { Icon } from '@iconify/react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function PrivacyPage() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-primary/30 font-sans">
            <Navbar />

            <div className="pt-48 pb-32 px-8 md:px-24 max-w-7xl mx-auto">
                <div className="max-w-3xl">
                    <h1 className="text-6xl font-display font-bold text-white mb-8">Privacy Protocol</h1>
                    <p className="text-zinc-500 font-bold mb-12 uppercase tracking-widest leading-relaxed">// VERSION_2025_A</p>

                    <div className="space-y-12 mb-20">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Tactical Data Collection</h2>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                GearGuard only collects the minimum required telemetry to ensure your industrial assets remain operational. This includes hardware serial numbers, performance logs, and operator identification for audit trails.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Encryption Standards</h2>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                All data is encrypted in transit and at rest using AES-256 and TLS 1.3 standards. Your operational intelligence is compartmentalized and never shared with external third parties without explicit authorization.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">Operator Rights</h2>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                As a data controller, you have the right to request full export of your logs, deletion of legacy records, and an audit of access protocols at any time through our Enterprise support channel.
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
