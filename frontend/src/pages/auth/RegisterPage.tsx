import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Building, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { DEPARTMENT_OPTIONS } from '../../utils/constants';

interface FieldErrors {
    name?: string;
    email?: string;
    department?: string;
    password?: string;
    confirmPassword?: string;
}

export function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        password: '',
        confirmPassword: '',
    });

    // Client-side validation
    const validateForm = (): boolean => {
        const errors: FieldErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Invalid email format (e.g., user@example.com)';
        }

        // Department validation
        if (!formData.department) {
            errors.department = 'Please select a department';
        }

        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        } else if (!/[A-Z]/.test(formData.password)) {
            errors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[0-9]/.test(formData.password)) {
            errors.password = 'Password must contain at least one number';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Parse backend errors and map to fields
    const parseBackendErrors = (err: any) => {
        if (err.errors && Array.isArray(err.errors)) {
            const errors: FieldErrors = {};
            err.errors.forEach((e: { field: string; message: string }) => {
                if (e.field in formData) {
                    errors[e.field as keyof FieldErrors] = e.message;
                }
            });
            if (Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                return 'Please fix the highlighted errors below';
            }
        }

        // Handle specific error messages from backend
        const message = err.message || 'Registration failed';
        if (message.toLowerCase().includes('email') && message.toLowerCase().includes('exist')) {
            setFieldErrors({ email: 'This email is already registered' });
            return 'This email is already registered';
        }

        return message;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        // Run client-side validation first
        if (!validateForm()) {
            setError('Please fix the errors below to continue');
            return;
        }

        setIsLoading(true);

        try {
            await register(formData);
            navigate('/app');
        } catch (err: any) {
            const errorMessage = parseBackendErrors(err);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Clear field error when user starts typing
    const handleFieldChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (fieldErrors[field]) {
            setFieldErrors({ ...fieldErrors, [field]: undefined });
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-surface-dark overflow-hidden">
            {/* Right Side: Form (Flipped) */}
            <div className="flex flex-col justify-center items-center p-8 bg-surface-dark relative order-2 lg:order-1">
                <div className="w-full max-w-md animate-slide-up">
                    {/* Clickable Logo */}
                    <div className="flex justify-center mb-8">
                        <Link to="/" className="flex items-center gap-3 group cursor-pointer">
                            <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-transform">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white group-hover:text-primary transition-colors">GearGuard</span>
                        </Link>
                    </div>

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
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${fieldErrors.name ? 'text-danger' : 'text-slate-500'}`}>
                                    OPERATOR_NAME
                                </label>
                                <div className="relative group">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${fieldErrors.name ? 'text-danger' : 'text-slate-600 group-focus-within:text-primary'}`} />
                                    <input
                                        type="text"
                                        className={`w-full pl-10 pr-4 h-12 bg-white/[0.03] border rounded-2xl outline-none transition-all text-white text-sm ${fieldErrors.name
                                            ? 'border-danger/50 focus:border-danger'
                                            : 'border-white/5 focus:border-primary/50'
                                            }`}
                                        placeholder="John Smith"
                                        value={formData.name}
                                        onChange={(e) => handleFieldChange('name', e.target.value)}
                                    />
                                </div>
                                {fieldErrors.name && (
                                    <div className="flex items-center gap-1.5 ml-1 animate-slide-up">
                                        <AlertCircle className="w-3 h-3 text-danger" />
                                        <span className="text-xs text-danger font-medium">{fieldErrors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${fieldErrors.email ? 'text-danger' : 'text-slate-500'}`}>
                                    SECTOR_ID (EMAIL)
                                </label>
                                <div className="relative group">
                                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${fieldErrors.email ? 'text-danger' : 'text-slate-600 group-focus-within:text-primary'}`} />
                                    <input
                                        type="email"
                                        className={`w-full pl-10 pr-4 h-12 bg-white/[0.03] border rounded-2xl outline-none transition-all text-white text-sm ${fieldErrors.email
                                            ? 'border-danger/50 focus:border-danger'
                                            : 'border-white/5 focus:border-primary/50'
                                            }`}
                                        placeholder="john@corp.com"
                                        value={formData.email}
                                        onChange={(e) => handleFieldChange('email', e.target.value)}
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <div className="flex items-center gap-1.5 ml-1 animate-slide-up">
                                        <AlertCircle className="w-3 h-3 text-danger" />
                                        <span className="text-xs text-danger font-medium">{fieldErrors.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Department Field */}
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${fieldErrors.department ? 'text-danger' : 'text-slate-500'}`}>
                                OPERATIONAL_SECTOR
                            </label>
                            <div className="relative group">
                                <Building className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${fieldErrors.department ? 'text-danger' : 'text-slate-600 group-focus-within:text-primary'}`} />
                                <select
                                    className={`w-full pl-10 pr-4 h-12 bg-white/[0.03] border rounded-2xl outline-none transition-all text-white text-sm appearance-none cursor-pointer ${fieldErrors.department
                                        ? 'border-danger/50 focus:border-danger'
                                        : 'border-white/5 focus:border-primary/50'
                                        }`}
                                    value={formData.department}
                                    onChange={(e) => handleFieldChange('department', e.target.value)}
                                >
                                    <option value="" disabled className="bg-surface-dark">Select Department</option>
                                    {DEPARTMENT_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-surface-dark">{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                            {fieldErrors.department && (
                                <div className="flex items-center gap-1.5 ml-1 animate-slide-up">
                                    <AlertCircle className="w-3 h-3 text-danger" />
                                    <span className="text-xs text-danger font-medium">{fieldErrors.department}</span>
                                </div>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${fieldErrors.password ? 'text-danger' : 'text-slate-500'}`}>
                                AUTH_CIPHER
                            </label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${fieldErrors.password ? 'text-danger' : 'text-slate-600 group-focus-within:text-primary'}`} />
                                <input
                                    type="password"
                                    className={`w-full pl-10 pr-4 h-12 bg-white/[0.03] border rounded-2xl outline-none transition-all text-white text-sm font-mono text-center ${fieldErrors.password
                                        ? 'border-danger/50 focus:border-danger'
                                        : 'border-white/5 focus:border-primary/50'
                                        }`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => handleFieldChange('password', e.target.value)}
                                />
                            </div>
                            {fieldErrors.password && (
                                <div className="flex items-center gap-1.5 ml-1 animate-slide-up">
                                    <AlertCircle className="w-3 h-3 text-danger" />
                                    <span className="text-xs text-danger font-medium">{fieldErrors.password}</span>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className={`text-xs font-bold uppercase tracking-widest ml-1 ${fieldErrors.confirmPassword ? 'text-danger' : 'text-slate-500'}`}>
                                CONFIRM_CIPHER
                            </label>
                            <div className="relative group">
                                <CheckCircle className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${fieldErrors.confirmPassword ? 'text-danger' : 'text-slate-600 group-focus-within:text-primary'}`} />
                                <input
                                    type="password"
                                    className={`w-full pl-10 pr-4 h-12 bg-white/[0.03] border rounded-2xl outline-none transition-all text-white text-sm font-mono text-center ${fieldErrors.confirmPassword
                                        ? 'border-danger/50 focus:border-danger'
                                        : 'border-white/5 focus:border-primary/50'
                                        }`}
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                                />
                            </div>
                            {fieldErrors.confirmPassword && (
                                <div className="flex items-center gap-1.5 ml-1 animate-slide-up">
                                    <AlertCircle className="w-3 h-3 text-danger" />
                                    <span className="text-xs text-danger font-medium">{fieldErrors.confirmPassword}</span>
                                </div>
                            )}
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
