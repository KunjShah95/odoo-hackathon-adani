import React from 'react';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

// =============================================
// BASE CARD COMPONENT
// =============================================

interface CardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'outlined' | 'glass';
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export function Card({
    children,
    className,
    variant = 'default',
    hover = false,
    padding = 'md',
    onClick
}: CardProps) {
    const variants: Record<string, string> = {
        default: `
            bg-gradient-to-br from-surface-light/80 to-surface/60
            border border-white/[0.06]
            shadow-elevation-1
        `,
        elevated: `
            bg-surface-light
            border border-white/[0.08]
            shadow-elevation-2
        `,
        outlined: `
            bg-transparent
            border border-white/[0.08]
        `,
        glass: `
            bg-white/[0.03] backdrop-blur-xl
            border border-white/[0.08]
            shadow-elevation-1
        `,
    };

    const paddings: Record<string, string> = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    return (
        <div
            className={cn(
                'rounded-2xl transition-all duration-300',
                variants[variant],
                paddings[padding],
                hover && `
                    cursor-pointer
                    hover:border-primary/30
                    hover:shadow-elevation-2
                    hover:bg-surface-light/90
                    hover:-translate-y-0.5
                    active:translate-y-0
                `,
                onClick && 'cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

// =============================================
// ANIMATED CARD COMPONENT
// =============================================

interface AnimatedCardProps extends CardProps {
    delay?: number;
}

export function AnimatedCard({ children, delay = 0, ...props }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
        >
            <Card {...props}>{children}</Card>
        </motion.div>
    );
}

// =============================================
// CARD HEADER
// =============================================

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    action?: React.ReactNode;
}

export function CardHeader({ children, className, action }: CardHeaderProps) {
    return (
        <div className={cn('flex items-center justify-between mb-6', className)}>
            <div>{children}</div>
            {action && <div>{action}</div>}
        </div>
    );
}

// =============================================
// CARD TITLE
// =============================================

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
    subtitle?: string;
}

export function CardTitle({ children, className, subtitle }: CardTitleProps) {
    return (
        <div>
            <h3 className={cn('text-lg font-bold text-white tracking-tight', className)}>
                {children}
            </h3>
            {subtitle && (
                <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
            )}
        </div>
    );
}

// =============================================
// CARD CONTENT
// =============================================

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn('text-slate-400 leading-relaxed', className)}>
            {children}
        </div>
    );
}

// =============================================
// CARD FOOTER
// =============================================

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'between';
}

export function CardFooter({ children, className, align = 'right' }: CardFooterProps) {
    const alignments: Record<string, string> = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
    };

    return (
        <div className={cn(
            'flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.05]',
            alignments[align],
            className
        )}>
            {children}
        </div>
    );
}

// =============================================
// STAT CARD COMPONENT
// =============================================

interface StatCardProps {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: {
        value: string;
        direction: 'up' | 'down' | 'neutral';
    };
    className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
    return (
        <Card className={cn('relative overflow-hidden group', className)}>
            {/* Background gradient effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    {icon && (
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            {icon}
                        </div>
                    )}
                    {trend && (
                        <span className={cn(
                            'text-xs font-bold px-2 py-1 rounded-lg',
                            trend.direction === 'up' && 'bg-success/10 text-success',
                            trend.direction === 'down' && 'bg-danger/10 text-danger',
                            trend.direction === 'neutral' && 'bg-slate-500/10 text-slate-400'
                        )}>
                            {trend.direction === 'up' && '↑'}
                            {trend.direction === 'down' && '↓'}
                            {trend.value}
                        </span>
                    )}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-slate-500 font-medium">{label}</div>
            </div>
        </Card>
    );
}

// =============================================
// FEATURE CARD COMPONENT
// =============================================

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient?: string;
    className?: string;
}

export function FeatureCard({ title, description, icon, gradient = 'from-primary/20 to-blue-600/20', className }: FeatureCardProps) {
    return (
        <Card hover className={cn('group', className)}>
            <div className={cn(
                'w-14 h-14 rounded-2xl flex items-center justify-center mb-6',
                'bg-gradient-to-br transition-transform duration-300 group-hover:scale-110',
                gradient
            )}>
                <span className="text-white">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-slate-400 leading-relaxed">
                {description}
            </p>
        </Card>
    );
}
