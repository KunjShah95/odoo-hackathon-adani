import { useState, useEffect, useRef } from 'react';
import { Shield, ChevronRight, Wrench, Users, BarChart3, Clock, CheckCircle, ArrowRight, Play, Zap, Globe, Lock, Layers, TrendingUp, Award, Star, ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// =============================================
// ANIMATED BACKGROUND COMPONENTS
// =============================================

function GridBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Main grid */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(hsl(217, 91%, 60%) 1px, transparent 1px),
                        linear-gradient(90deg, hsl(217, 91%, 60%) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            {/* Radial fade */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-surface-dark/50 to-surface-dark" />
        </div>
    );
}

function FloatingOrbs() {
    return (
        <>
            <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full animate-float" />
            <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-400/8 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[200px] rounded-full" />
        </>
    );
}

function AnimatedParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/30 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: '100%',
                        opacity: 0
                    }}
                    animate={{
                        y: '-20%',
                        opacity: [0, 0.6, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    );
}

// =============================================
// NAVIGATION COMPONENT
// =============================================

function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'Solutions', href: '#solutions' },
        { label: 'Enterprise', href: '#enterprise' },
        { label: 'Pricing', href: '#pricing' },
    ];

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-surface-dark/90 backdrop-blur-xl border-b border-white/5 shadow-elevation-2'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <div className="absolute -inset-1 bg-primary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="hidden sm:block">
                        <span className="text-xl font-bold text-white tracking-tight">GearGuard</span>
                        <span className="block text-[10px] font-semibold text-primary tracking-widest uppercase">Enterprise</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <Link to="/login" className="text-slate-400 hover:text-white font-medium px-4 py-2 transition-colors">
                        Sign in
                    </Link>
                    <Link to="/register">
                        <Button className="rounded-full px-6 h-11">
                            Get Started
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-surface-dark/95 backdrop-blur-xl border-b border-white/5"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="block py-3 text-lg font-medium text-slate-300 hover:text-white transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-white/5 space-y-3">
                                <Link to="/login" className="block w-full text-center py-3 text-white font-medium">
                                    Sign in
                                </Link>
                                <Link to="/register">
                                    <Button className="w-full h-12 rounded-xl">Get Started</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

// =============================================
// HERO SECTION
// =============================================

function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const stats = [
        { value: '500+', label: 'Enterprise Clients' },
        { value: '12M', label: 'Assets Tracked' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '$2.4B', label: 'Downtime Prevented' }
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
            <GridBackground />
            <FloatingOrbs />
            <AnimatedParticles />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div style={{ y, opacity }} className="max-w-4xl">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-sm mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-success animate-ping opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                        </span>
                        <span className="text-sm font-medium text-slate-300">
                            Trusted by Fortune 500 manufacturing leaders
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-500" />
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
                    >
                        <span className="text-white">Predictive</span>
                        <br />
                        <span className="text-gradient">Maintenance</span>
                        <br />
                        <span className="text-white">Intelligence</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl mb-12"
                    >
                        Transform reactive maintenance into strategic advantage.
                        GearGuard's AI-powered platform reduces equipment downtime by
                        <span className="text-white font-semibold"> 73%</span> on average.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-start gap-4 mb-16"
                    >
                        <Link to="/register">
                            <Button size="lg" className="rounded-full px-8 h-14 text-base group">
                                Start Free Trial
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <button className="flex items-center gap-4 px-6 h-14 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                            </div>
                            <span className="text-white font-semibold">Watch Demo</span>
                        </button>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/5"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center md:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20"
                >
                    <DashboardPreview />
                </motion.div>
            </div>
        </section>
    );
}

// =============================================
// DASHBOARD PREVIEW COMPONENT
// =============================================

function DashboardPreview() {
    return (
        <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl opacity-50" />

            <div className="relative glass-panel rounded-3xl overflow-hidden">
                {/* Browser Chrome */}
                <div className="h-14 border-b border-white/5 bg-white/[0.02] flex items-center px-6">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/60 hover:bg-red-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60 hover:bg-yellow-500 transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60 hover:bg-green-500 transition-colors" />
                    </div>
                    <div className="flex-1 flex justify-center">
                        <div className="px-6 py-1.5 rounded-lg bg-white/5 text-xs text-slate-500 font-mono">
                            app.gearguard.io/dashboard
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Active Assets', value: '2,847', change: '+12%', icon: Wrench },
                                { label: 'Team Efficiency', value: '94.2%', change: '+3.1%', icon: Users },
                                { label: 'MTTR', value: '2.4h', change: '-18%', icon: Clock }
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <stat.icon className="w-5 h-5 text-primary" />
                                        <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-success' : 'text-primary'}`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                    <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
                                    <div className="text-xs text-slate-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Chart Placeholder */}
                        <div className="h-48 rounded-2xl bg-white/[0.02] border border-white/5 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="font-semibold text-white">Equipment Health Index</h4>
                                <div className="flex gap-2">
                                    {['7D', '30D', '90D'].map((period, i) => (
                                        <button key={i} className={`px-3 py-1 rounded-lg text-xs font-medium ${i === 1 ? 'bg-primary text-white' : 'text-slate-500 hover:text-white'}`}>
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-24 flex items-end gap-2">
                                {[40, 65, 45, 80, 60, 90, 75, 85, 70, 95, 80, 88].map((h, i) => (
                                    <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                                        <div
                                            className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all group-hover:bg-primary-light"
                                            style={{ height: `${h}%` }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Activity Feed */}
                    <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5">
                        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                            Live Activity
                        </h4>
                        <div className="space-y-3">
                            {[
                                { title: 'Compressor A-12', status: 'Maintenance Complete', time: '2m ago', color: 'success' },
                                { title: 'Conveyor Line 3', status: 'Inspection Scheduled', time: '15m ago', color: 'primary' },
                                { title: 'Generator B-7', status: 'Alert Triggered', time: '1h ago', color: 'warning' },
                                { title: 'HVAC Unit 2', status: 'Parts Ordered', time: '2h ago', color: 'info' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                                    <div className={`w-2 h-2 rounded-full mt-2 bg-${item.color}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">{item.title}</div>
                                        <div className="text-xs text-slate-600">{item.status}</div>
                                    </div>
                                    <div className="text-xs text-slate-700">{item.time}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// =============================================
// FEATURES SECTION
// =============================================

function FeaturesSection() {
    const features = [
        {
            icon: Zap,
            title: 'Predictive Analytics',
            description: 'ML-powered algorithms analyze sensor data to predict failures 14 days before they occur.',
            gradient: 'from-yellow-500/20 to-orange-500/20'
        },
        {
            icon: Users,
            title: 'Smart Routing',
            description: 'Automatically assign work orders to the right technician based on skills, location, and availability.',
            gradient: 'from-blue-500/20 to-cyan-500/20'
        },
        {
            icon: BarChart3,
            title: 'Real-time Dashboards',
            description: 'Live KPI tracking with customizable views for operations, maintenance, and executive teams.',
            gradient: 'from-purple-500/20 to-pink-500/20'
        },
        {
            icon: Lock,
            title: 'Enterprise Security',
            description: 'SOC 2 Type II certified with role-based access, SSO, and end-to-end encryption.',
            gradient: 'from-green-500/20 to-emerald-500/20'
        },
        {
            icon: Layers,
            title: 'Asset Hierarchy',
            description: 'Model complex equipment relationships with unlimited levels of parent-child associations.',
            gradient: 'from-indigo-500/20 to-violet-500/20'
        },
        {
            icon: Globe,
            title: 'Multi-site Support',
            description: 'Manage facilities across continents with localized settings and consolidated reporting.',
            gradient: 'from-rose-500/20 to-red-500/20'
        }
    ];

    return (
        <section id="features" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">Platform Capabilities</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Built for Industrial Scale
                    </h2>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Every feature engineered to handle the complexity of modern manufacturing operations.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative"
                        >
                            <div className="glass-card p-8 rounded-3xl h-full">
                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Hover Arrow */}
                                <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-sm font-semibold">Learn more</span>
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================
// SOCIAL PROOF SECTION
// =============================================

function SocialProofSection() {
    const testimonials = [
        {
            quote: "GearGuard reduced our unplanned downtime by 68% in the first quarter. The ROI was evident within 60 days.",
            author: "Sarah Chen",
            role: "VP of Operations",
            company: "Tesla Gigafactory",
            rating: 5
        },
        {
            quote: "The predictive maintenance alerts have saved us millions in avoided equipment failures.",
            author: "Marcus Rodriguez",
            role: "Maintenance Director",
            company: "Boeing Manufacturing",
            rating: 5
        },
        {
            quote: "Finally, a platform that our technicians actually want to use. Adoption was almost immediate.",
            author: "Dr. Emily Watson",
            role: "Chief Technology Officer",
            company: "Siemens Energy",
            rating: 5
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel rounded-3xl p-8 mb-20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '4.9/5', label: 'G2 Rating', icon: Star },
                            { value: '#1', label: 'CMMS Category', icon: Award },
                            { value: '73%', label: 'Avg Downtime Reduction', icon: TrendingUp },
                            { value: '< 2hr', label: 'Avg Support Response', icon: Clock }
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <stat.icon className="w-6 h-6 text-primary mb-3" />
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-8 rounded-3xl"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, j) => (
                                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-lg text-white leading-relaxed mb-8">
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold">
                                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="font-semibold text-white">{testimonial.author}</div>
                                    <div className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// =============================================
// CTA SECTION
// =============================================

function CTASection() {
    return (
        <section className="py-32 relative">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    {/* Glow */}
                    <div className="absolute -inset-4 bg-primary/20 blur-[80px] rounded-[4rem]" />

                    <div className="relative rounded-[3rem] bg-gradient-to-br from-primary via-blue-600 to-blue-700 p-12 md:p-20 text-center overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                        <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

                        {/* Content */}
                        <div className="relative">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                Ready to eliminate downtime?
                            </h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                                Join 500+ manufacturing leaders who trust GearGuard to protect their operations.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/register">
                                    <Button size="lg" className="bg-white text-primary hover:bg-slate-100 px-10 h-14 rounded-full shadow-lg">
                                        Start Free Trial
                                        <ArrowRight className="w-5 h-5" />
                                    </Button>
                                </Link>
                                <Link to="/contact" className="flex items-center gap-2 text-white font-semibold hover:underline">
                                    <span>Talk to Sales</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                                {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'HIPAA Ready'].map((badge, i) => (
                                    <div key={i} className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-blue-100">
                                        {badge}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// =============================================
// FOOTER
// =============================================

function Footer() {
    const footerLinks = {
        Product: ['Features', 'Integrations', 'Pricing', 'Changelog', 'Roadmap'],
        Solutions: ['Manufacturing', 'Healthcare', 'Energy', 'Transportation', 'Facilities'],
        Resources: ['Documentation', 'API Reference', 'Community', 'Blog', 'Case Studies'],
        Company: ['About', 'Careers', 'Press', 'Contact', 'Partners']
    };

    return (
        <footer className="border-t border-white/5 py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">GearGuard</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
                            The enterprise maintenance intelligence platform trusted by industry leaders worldwide.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'linkedin', 'github'].map((social) => (
                                <a key={social} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
                                    <span className="sr-only">{social}</span>
                                    <Globe className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5">
                    <p className="text-sm text-slate-600 mb-4 md:mb-0">
                        © 2025 GearGuard Systems Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy</Link>
                        <Link to="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">Terms</Link>
                        <span className="text-sm text-slate-700">v3.5.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// =============================================
// MAIN LANDING PAGE COMPONENT
// =============================================

export function LandingPage() {
    return (
        <div className="min-h-screen bg-surface-dark selection:bg-primary/30 overflow-x-hidden">
            <Navigation />
            <HeroSection />
            <FeaturesSection />
            <SocialProofSection />
            <CTASection />
            <Footer />
        </div>
    );
}
