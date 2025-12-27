import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Building, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { DEPARTMENT_OPTIONS } from '../../utils/constants';

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await register(formData);
            navigate('/app');
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden">
            {/* Right Side: Form (Flipped) */}
            <div className="flex flex-col justify-center items-center p-8 bg-surface-dark relative order-2 lg:order-1">
                <div className="w-full max-w-md animate-slide-up">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-black text-white mb-3">Deploy Infrastructure</h2>
                        <p className="text-slate-500 font-medium">Join the asset intelligence network.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        className="w-full pl-10 pr-4 h-12 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 transition-all text-white text-sm"
                                        placeholder="John Smith"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 h-12 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 transition-all text-white text-sm"
                                        placeholder="john@corp.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Department</label>
                            <div className="relative group">
                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <select
                                    className="w-full pl-10 pr-4 h-12 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 transition-all text-white text-sm appearance-none cursor-pointer"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                >
                                    <option value="" disabled className="bg-surface-dark">Select Department</option>
                                    {DEPARTMENT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-surface-dark">{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 h-12 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 transition-all text-white text-sm font-mono text-center"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm Identity</label>
                            <div className="relative group">
                                <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 h-12 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 transition-all text-white text-sm font-mono text-center"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-14 rounded-2xl text-md group mt-4 font-bold"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Initialize Environment
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-slate-500 font-medium">
                        Already have access? <Link to="/login" className="text-primary font-bold hover:underline">Log In</Link>
                    </p>
                </div>
            </div>

            {/* Left Side: Visuals (Order 1 for LG, showing feature list) */}
            <div className="hidden lg:flex flex-col justify-center px-20 relative bg-primary overflow-hidden order-1 lg:order-2">
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-[20%] left-[10%] w-[60%] h-[60%] bg-white/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10 animate-fade-in text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest mb-8">
                        Environment Setup
                    </div>
                    <h1 className="text-5xl font-black mb-12 leading-tight">Secure your <br /> facility in minutes.</h1>

                    <div className="space-y-8">
                        <FeatureItem title="Asset Registry" desc="Centralized database for mechanical, electrical, and IT hardware." />
                        <FeatureItem title="Kanban Cycles" desc="Visual work order lifecycle from triage to resolution." />
                        <FeatureItem title="Smart Analytics" desc="Built-in reporting on team performance and asset reliability." />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ title, desc }: any) {
    return (
        <div className="flex gap-6">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5" />
            </div>
            <div>
                <h4 className="font-bold text-lg mb-1">{title}</h4>
                <p className="text-blue-100/70 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
