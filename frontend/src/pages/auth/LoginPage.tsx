import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { motion } from 'framer-motion';

const springTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
};

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        email: 'admin@gearguard.com',
        password: 'password',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(formData);
            navigate('/app');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden font-sans">
            {/* Background Layers */}
            <div className="fixed inset-0 dot-grid pointer-events-none opacity-[0.05]" />

            {/* Left Side: Industrial Showcase */}
            <div className="hidden lg:flex flex-col justify-center px-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 border-r border-white/5" />

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={springTransition}
                    className="relative z-10"
                >
                    <Link to="/" className="inline-flex items-center gap-4 mb-20 group">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)] group-hover:scale-110 transition-transform duration-500">
                            <Icon icon="solar:shield-bold-duotone" className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-black text-white tracking-tighter">GearGuard</span>
                    </Link>

                    <h1 className="text-7xl font-black text-white leading-[0.9] tracking-tighter mb-10">
                        Enter the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Control Plane.</span>
                    </h1>

                    <p className="text-2xl text-zinc-500 max-w-lg leading-tight mb-16 font-medium italic">
                        "Precision orchestration for high-value assets. Transform hardware noise into tactical intelligence."
                    </p>

                    <div className="grid grid-cols-2 gap-12 border-t border-white/[0.05] pt-12">
                        {[
                            { value: 'LIVE', label: 'OPERATIONAL_STATUS', color: 'text-emerald-500' },
                            { value: 'v4.2.0', label: 'SYSTEM_VERSION', color: 'text-primary' },
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className={`text-2xl font-black ${stat.color} mb-2 tracking-widest`}>{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Abstract Visual Element */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10 blur-[100px] bg-primary rounded-full -mr-40 -mb-40" />
            </div>

            {/* Right Side: Authentication */}
            <div className="flex flex-col justify-center items-center p-8 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={springTransition}
                    className="w-full max-w-md"
                >
                    <div className="mb-16">
                        <div className="lg:hidden flex mb-12">
                            <Link to="/" className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Icon icon="solar:shield-bold-duotone" className="w-7 h-7 text-white" />
                            </Link>
                        </div>
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.5em] block mb-4 italic">// AUTH_GATEWAY</span>
                        <h2 className="text-5xl font-black text-white tracking-tighter mb-2 leading-none">Initialize Session</h2>
                        <p className="text-zinc-500 font-bold">Verified credentials required for sector access.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-6 bg-rose-500/10 border border-rose-500/20 rounded-[2rem] flex items-center gap-4"
                        >
                            <Icon icon="solar:danger-bold-duotone" className="text-rose-500 w-6 h-6 shrink-0" />
                            <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
                                ERROR_CODE: AUTH_REJECTED <br />
                                {error}
                            </div>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 ml-1 italic">Command_Identity (Email)</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:user-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full h-20 pl-16 pr-6 bg-zinc-900/50 border border-white/5 rounded-[2rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-bold text-lg placeholder:text-zinc-700"
                                    placeholder="operator@system.sys"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between px-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700 italic">Access_Cipher</label>
                                <Link to="/forgot-password" className="text-[10px] font-black text-zinc-600 hover:text-primary tracking-widest transition-colors">CIPHER_RECOVERY</Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 group-focus-within:opacity-100 transition-opacity">
                                    <Icon icon="solar:lock-password-bold-duotone" className="w-6 h-6 text-primary" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-20 pl-16 pr-16 bg-zinc-900/50 border border-white/5 rounded-[2rem] outline-none focus:border-primary/50 focus:bg-zinc-900 transition-all text-white font-mono text-xl tracking-[0.5em] placeholder:text-zinc-700"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-700 hover:text-primary transition-colors"
                                >
                                    <Icon icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-24 rounded-[2.5rem] text-xl font-black group relative overflow-hidden transition-all duration-500 shadow-[0_0_60px_rgba(99,102,241,0.1)] hover:shadow-[0_0_80px_rgba(99,102,241,0.2)]"
                            disabled={isLoading}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {isLoading ? (
                                    <Icon icon="solar:restart-bold-duotone" className="w-8 h-8 animate-spin" />
                                ) : (
                                    <>
                                        INITIALIZE_PROTOCOL
                                        <Icon icon="solar:power-bold" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </>
                                )}
                            </span>
                        </Button>
                    </form>

                    <p className="mt-16 text-center text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">
                        Unit unassigned? <Link to="/register" className="text-primary hover:text-white transition-colors underline underline-offset-8 decoration-primary/30">Request Provisioning</Link>
                    </p>

                    <div className="mt-24 flex items-center justify-center gap-8 opacity-10 border-t border-white/[0.03] pt-12 grayscale">
                        <Icon icon="solar:shield-check-bold" className="w-8 h-8" />
                        <Icon icon="solar:mask-h-bold-duotone" className="w-8 h-8" />
                        <Icon icon="solar:key-minimalistic-square-2-bold-duotone" className="w-8 h-8" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
