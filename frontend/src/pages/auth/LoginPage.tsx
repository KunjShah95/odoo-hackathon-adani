import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

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
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden">
            {/* Left Side: Branding & Visuals */}
            <div className="hidden lg:flex flex-col justify-center px-20 relative bg-primary overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-blue-400/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[100%] bg-black/10 blur-[120px] rounded-full" />
                </div>

                <div className="relative z-10 animate-fade-in">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-12 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Shield className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-6xl font-black text-white leading-tight mb-8">
                        Engineered for <br />
                        <span className="text-blue-900/50">Modern Facilities.</span>
                    </h1>
                    <p className="text-xl text-blue-100 max-w-lg leading-relaxed mb-12">
                        The intelligent layer between your equipment and your maintenance teams.
                        Track, schedule, and optimize with surgical precision.
                    </p>

                    <div className="grid grid-cols-2 gap-8 text-white/80">
                        <div>
                            <div className="text-3xl font-bold mb-1">94%</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Uptime Average</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-1">12M+</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-blue-200">Assets Secured</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex flex-col justify-center items-center p-8 bg-surface-dark relative">
                <div className="w-full max-w-md animate-slide-up">
                    <div className="text-center mb-10">
                        <div className="lg:hidden flex justify-center mb-6">
                            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-3">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Access your operations control center.</p>
                    </div>

                    {error && (
                        <div className="mb-8 p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger text-sm font-bold animate-shake text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Corporate Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 h-14 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-white font-medium"
                                    placeholder="admin@gearguard.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Key</label>
                                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-primary hover:underline">Lost access?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-12 h-14 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all text-white font-medium font-mono"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-1">
                            <input type="checkbox" id="remember" className="w-5 h-5 rounded-lg accent-primary bg-white/5 border-white/10" />
                            <label htmlFor="remember" className="text-sm font-medium text-slate-400">Trust this device for 30 days</label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-16 rounded-2xl text-lg group"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Authenticate Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-10 text-center text-slate-500 font-medium">
                        Need an infrastructure? <Link to="/register" className="text-primary font-bold hover:underline">Deploy GearGuard</Link>
                    </p>

                    <div className="mt-12 flex items-center justify-center gap-8 opacity-30 grayscale hover:grayscale-0 transition-all">
                        <Shield className="w-8 h-8" />
                        <div className="h-4 w-px bg-white/10" />
                        <span className="text-[10px] uppercase font-black tracking-[0.2em]">ISO 27001 Certified System</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
