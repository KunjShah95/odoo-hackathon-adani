import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, CheckCircle2, Activity, Zap, Server, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Animated background grid with pulsing nodes
function AnimatedGrid() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px'
            }} />
            {/* Animated glow nodes */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '3s'
                    }}
                />
            ))}
        </div>
    );
}

// Floating orbs for depth
function FloatingOrbs() {
    return (
        <>
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        </>
    );
}

// Stats ticker component
function StatsTicker() {
    const stats = [
        { icon: Activity, label: 'Uptime', value: '99.97%' },
        { icon: Server, label: 'Assets Tracked', value: '2.4M+' },
        { icon: Zap, label: 'Avg Response', value: '<50ms' },
        { icon: Clock, label: 'Work Orders/Day', value: '125K+' },
    ];

    return (
        <div className="flex items-center gap-6 mt-8">
            {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-blue-100/60">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{stat.label}:</span>
                    <span className="text-xs font-bold text-white">{stat.value}</span>
                    {i < stats.length - 1 && <div className="w-px h-4 bg-white/10 ml-4" />}
                </div>
            ))}
        </div>
    );
}

// Trust badges
function TrustBadges() {
    const badges = ['SOC 2 Type II', 'ISO 27001', 'GDPR Ready', 'HIPAA Compliant'];

    return (
        <div className="flex items-center gap-3 mt-12">
            {badges.map((badge, i) => (
                <div
                    key={i}
                    className="px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold uppercase tracking-wider text-blue-100/50"
                >
                    {badge}
                </div>
            ))}
        </div>
    );
}

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        setIsPageLoaded(true);
        emailRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            await login(formData);
            navigate('/app');
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please verify your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormValid = formData.email.length > 0 && formData.password.length > 0;

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] bg-surface-dark overflow-hidden">
            {/* Left Side: Premium Branding Panel */}
            <div className="hidden lg:flex flex-col justify-between p-16 relative bg-gradient-to-br from-primary via-blue-600 to-blue-800 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%221%22%20cy%3D%221%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />

                {/* Gradient overlays */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-white/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-30%] left-[-20%] w-[80%] h-[80%] bg-black/20 blur-[120px] rounded-full" />
                </div>

                {/* Top section - Logo & Navigation */}
                <div className={`relative z-10 transition-all duration-700 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <Link to="/" className="flex items-center gap-4 group cursor-pointer">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl group-hover:bg-white/20 transition-all">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-blue-100 transition-colors">GearGuard</h3>
                            <p className="text-blue-200/60 text-xs font-medium">Enterprise Platform</p>
                        </div>
                    </Link>
                </div>

                {/* Center section - Hero content */}
                <div className={`relative z-10 -mt-12 transition-all duration-700 delay-200 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-white/90">All systems operational</span>
                    </div>

                    <h1 className="text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                        Your operations,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                            always protected.
                        </span>
                    </h1>

                    <p className="text-lg text-blue-100/80 max-w-md leading-relaxed font-medium">
                        The enterprise-grade maintenance platform trusted by Fortune 500 companies to manage
                        critical infrastructure with surgical precision.
                    </p>

                    <StatsTicker />
                </div>

                {/* Bottom section - Trust indicators */}
                <div className={`relative z-10 transition-all duration-700 delay-500 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <TrustBadges />
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12 bg-surface-dark relative">
                <AnimatedGrid />
                <FloatingOrbs />

                <div className={`w-full max-w-[420px] relative z-10 transition-all duration-700 delay-300 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">GearGuard</span>
                        </Link>
                    </div>

                    {/* Form header */}
                    <div className="mb-10">
                        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight">
                            Welcome back
                        </h2>
                        <p className="text-slate-400 font-medium">
                            Enter your credentials to access your dashboard
                        </p>
                    </div>

                    {/* Error state */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-shake">
                            <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-red-400 text-xs font-bold">!</span>
                            </div>
                            <p className="text-red-400 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email address</span>
                                {formData.email.includes('@') && formData.email.includes('.') && (
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                )}
                            </label>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                                <div className={`absolute inset-0 rounded-2xl bg-primary/20 blur-xl transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-100' : 'opacity-0'}`} />
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-primary' : 'text-slate-600'}`} />
                                <input
                                    ref={emailRef}
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="relative w-full pl-12 pr-4 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all text-white font-medium placeholder:text-slate-600"
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
                                <Link
                                    to="/forgot-password"
                                    className="text-xs font-semibold text-primary hover:text-primary-light transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                                <div className={`absolute inset-0 rounded-2xl bg-primary/20 blur-xl transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-100' : 'opacity-0'}`} />
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-primary' : 'text-slate-600'}`} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="relative w-full pl-12 pr-12 h-14 bg-white/[0.03] border border-white/[0.08] rounded-2xl outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all text-white font-medium font-mono tracking-wide placeholder:text-slate-600"
                                    placeholder="••••••••••••"
                                    autoComplete="current-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors p-1"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-3 px-1 pt-1">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="peer sr-only"
                                />
                                <label
                                    htmlFor="remember"
                                    className="flex items-center justify-center w-5 h-5 rounded-md border border-white/10 bg-white/5 cursor-pointer transition-all peer-checked:bg-primary peer-checked:border-primary"
                                >
                                    <CheckCircle2 className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                                </label>
                            </div>
                            <label htmlFor="remember" className="text-sm font-medium text-slate-400 cursor-pointer select-none">
                                Keep me signed in for 30 days
                            </label>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading || !isFormValid}
                            className={`
                                w-full h-14 mt-2 rounded-2xl font-bold text-sm uppercase tracking-widest
                                flex items-center justify-center gap-3
                                transition-all duration-300 relative overflow-hidden group
                                ${isFormValid
                                    ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]'
                                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                                }
                                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                            `}
                        >
                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign in to Dashboard</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* SSO Options */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/15 hover:text-white transition-all flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google SSO
                        </button>
                        <button className="h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-400 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/15 hover:text-white transition-all flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.0003 2C6.47715 2 2 6.47715 2 12.0003C2 16.4893 4.86518 20.2678 8.83927 21.7356C9.33927 21.8297 9.52088 21.5251 9.52088 21.2628C9.52088 21.0256 9.51259 20.3156 9.50844 19.4726C6.72634 20.0701 6.14059 18.1571 6.14059 18.1571C5.68459 17.0073 5.02951 16.7055 5.02951 16.7055C4.12108 16.0898 5.09805 16.1022 5.09805 16.1022C6.10151 16.1731 6.62915 17.125 6.62915 17.125C7.52073 18.6166 8.97039 18.1876 9.54 17.9333C9.63049 17.2846 9.88927 16.8541 10.1746 16.6016C7.95342 16.3463 5.62 15.4826 5.62 11.6208C5.62 10.5376 6.01195 9.64941 6.64878 8.95541C6.54512 8.70078 6.20293 7.69419 6.74634 6.34566C6.74634 6.34566 7.58634 6.07624 9.49658 7.35C10.2954 7.12341 11.1503 7.01012 12.0003 7.00586C12.8503 7.01012 13.7052 7.12341 14.5054 7.35C16.4144 6.07624 17.253 6.34566 17.253 6.34566C17.7977 7.69419 17.4555 8.70078 17.3519 8.95541C17.99 9.64941 18.3793 10.5376 18.3793 11.6208C18.3793 15.4924 16.0419 16.3436 13.8151 16.5948C14.174 16.9064 14.4946 17.5203 14.4946 18.4523C14.4946 19.8024 14.4821 20.8892 14.4821 21.2628C14.4821 21.5276 14.6618 21.8351 15.1716 21.7343C19.1389 20.2651 22 16.4893 22 12.0003C22 6.47715 17.5228 2 12.0003 2Z" />
                            </svg>
                            GitHub SSO
                        </button>
                    </div>

                    {/* Sign up link */}
                    <p className="mt-10 text-center text-slate-500 font-medium">
                        New to the platform?{' '}
                        <Link to="/register" className="text-primary font-bold hover:text-primary-light transition-colors hover:underline underline-offset-4">
                            Create an account
                        </Link>
                    </p>

                    {/* Footer info */}
                    <div className="mt-12 flex items-center justify-center gap-6 text-slate-600">
                        <Link to="/terms" className="text-xs font-medium hover:text-slate-400 transition-colors">Terms</Link>
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <Link to="/privacy" className="text-xs font-medium hover:text-slate-400 transition-colors">Privacy</Link>
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <span className="text-xs font-medium">v3.4.2</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
