import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

export function MarketingFooter() {
    return (
        <footer className="py-20 px-6 border-t border-zinc-900 relative z-10 bg-zinc-950">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-12 gap-12 mb-20">
                    <div className="col-span-12 lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <Icon icon="solar:shield-bold-duotone" className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-display font-bold text-white">GearGuard</span>
                        </div>
                        <p className="text-zinc-500 leading-relaxed max-w-xs font-light">
                            The industrial standard for asset orchestration and tactical intelligence.
                        </p>
                    </div>
                    <div className="col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { title: "Product", links: [{ label: "Capabilities", path: "/capabilities" }, { label: "Security", path: "/enterprise" }, { label: "Enterprise", path: "/enterprise" }, { label: "Pricing", path: "/enterprise" }] },
                            { title: "Company", links: [{ label: "About", path: "/ecosystem" }, { label: "Careers", path: "#" }, { label: "Blog", path: "#" }, { label: "Contact", path: "/app/docs" }] },
                            { title: "Resources", links: [{ label: "Documentation", path: "/app/docs" }, { label: "API Reference", path: "/app/docs" }, { label: "Guides", path: "/app/docs" }, { label: "Support", path: "/app/docs" }] },
                            { title: "Legal", links: [{ label: "Privacy", path: "/privacy" }, { label: "Terms", path: "/terms" }, { label: "Cookie Policy", path: "#" }, { label: "SLA", path: "#" }] }
                        ].map((col, i) => (
                            <div key={i}>
                                <h4 className="text-[11px] font-bold text-white uppercase tracking-widest mb-6">{col.title}</h4>
                                <ul className="space-y-4">
                                    {col.links.map((link, j) => (
                                        <li key={j}>
                                            <Link to={link.path} className="text-sm text-zinc-500 hover:text-primary transition-colors">{link.label}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-[11px] text-zinc-600 font-bold uppercase tracking-widest">
                        © 2025 GearGuard Inc. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        {['solar:share-circle-bold', 'solar:clapperboard-edit-bold', 'solar:letter-bold'].map((icon, i) => (
                            <a key={i} href="#" className="text-zinc-600 hover:text-white transition-colors">
                                <Icon icon={icon} className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
