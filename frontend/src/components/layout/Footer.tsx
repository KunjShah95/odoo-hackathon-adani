import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="py-32 px-6 border-t border-white/5 relative z-10 bg-[#050505]">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-12 gap-16 mb-32">
                    <div className="col-span-12 lg:col-span-5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                                <Icon icon="solar:shield-bold-duotone" className="text-white w-6 h-6" />
                            </div>
                            <span className="text-2xl font-display font-black text-white uppercase italic tracking-tighter">GearGuard</span>
                        </div>
                        <p className="text-zinc-600 text-sm font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                            The definitive standard for industrial orchestration. Engineered for the elite operator.
                        </p>

                        <div className="mt-12 flex items-center gap-8">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">Network_Status</span>
                                <span className="text-xs font-black text-success mt-1 uppercase tracking-widest">Global_Active</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">Current_Rev</span>
                                <span className="text-xs font-black text-white mt-1 uppercase tracking-widest">4.2.0_STABLE</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { title: "System", links: [{ label: "Capabilities", path: "/capabilities" }, { label: "Ecosystem", path: "/ecosystem" }, { label: "Enterprise", path: "/enterprise" }] },
                            { title: "Node", links: [{ label: "Registry", path: "/app/equipment" }, { label: "Timeline", path: "/app/calendar" }, { label: "Ops_Live", path: "/app/requests" }] },
                            { title: "Protocols", links: [{ label: "Documentation", path: "/app/docs" }, { label: "API_Link", path: "/app/docs" }, { label: "Support", path: "/app/docs" }] },
                            { title: "Directive", links: [{ label: "Privacy", path: "/privacy" }, { label: "Terms", path: "/terms" }, { label: "SLA", path: "#" }] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-10 group flex items-center gap-2">
                                    <span className="w-1.5 h-px bg-primary" />
                                    {col.title}
                                </h4>
                                <ul className="space-y-6">
                                    {col.links.map((link, j) => (
                                        <li key={j}>
                                            <Link to={link.path} className="text-[10px] font-black text-zinc-600 hover:text-primary transition-all uppercase tracking-widest block hover:translate-x-1 duration-300">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.4em]">
                        © 2025 GearGuard_Systems_Inc. All_Units_Reserved.
                    </div>
                    <div className="flex gap-10">
                        {['solar:share-circle-bold-duotone', 'solar:clapperboard-edit-bold-duotone', 'solar:letter-bold-duotone'].map((icon, i) => (
                            <a key={i} href="#" className="text-zinc-800 hover:text-primary transition-all duration-500 hover:scale-125">
                                <Icon icon={icon} className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
