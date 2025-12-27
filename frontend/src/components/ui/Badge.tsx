import { cn } from '../../utils/helpers';

// =============================================
// BASE BADGE COMPONENT
// =============================================

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'xs' | 'sm' | 'md';
    dot?: boolean;
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    dot = false,
    className,
}: BadgeProps) {
    const variants: Record<string, string> = {
        default: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
        primary: 'bg-primary/10 text-primary border-primary/20',
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        danger: 'bg-danger/10 text-danger border-danger/20',
        info: 'bg-info/10 text-info border-info/20',
    };

    const sizes: Record<string, string> = {
        xs: 'px-1.5 py-0.5 text-[9px]',
        sm: 'px-2 py-0.5 text-[10px]',
        md: 'px-2.5 py-1 text-xs',
    };

    return (
        <span className={cn(
            'inline-flex items-center gap-1.5 font-bold uppercase tracking-wider rounded-lg border',
            variants[variant],
            sizes[size],
            className
        )}>
            {dot && (
                <span className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    variant === 'default' && 'bg-slate-400',
                    variant === 'primary' && 'bg-primary',
                    variant === 'success' && 'bg-success',
                    variant === 'warning' && 'bg-warning',
                    variant === 'danger' && 'bg-danger',
                    variant === 'info' && 'bg-info',
                )} />
            )}
            {children}
        </span>
    );
}

// =============================================
// STATUS BADGE
// =============================================

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const statusConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
        NEW: { label: 'New', variant: 'info' },
        IN_PROGRESS: { label: 'In Progress', variant: 'warning' },
        REPAIRED: { label: 'Repaired', variant: 'success' },
        CLOSED: { label: 'Closed', variant: 'default' },
        CANCELLED: { label: 'Cancelled', variant: 'danger' },
        SCRAP: { label: 'Scrap', variant: 'danger' },
        OPERATIONAL: { label: 'Operational', variant: 'success' },
        UNDER_MAINTENANCE: { label: 'Maintenance', variant: 'warning' },
        SCRAPPED: { label: 'Scrapped', variant: 'danger' },
        DECOMMISSIONED: { label: 'Decommissioned', variant: 'default' },
    };

    const config = statusConfig[status] || { label: status, variant: 'default' as const };

    return (
        <Badge variant={config.variant} dot className={className}>
            {config.label}
        </Badge>
    );
}

// =============================================
// PRIORITY BADGE
// =============================================

interface PriorityBadgeProps {
    priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const priorityConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
        CRITICAL: { label: 'Critical', variant: 'danger' },
        HIGH: { label: 'High', variant: 'warning' },
        MEDIUM: { label: 'Medium', variant: 'primary' },
        LOW: { label: 'Low', variant: 'default' },
    };

    const config = priorityConfig[priority] || priorityConfig.MEDIUM;

    return (
        <Badge variant={config.variant} className={className}>
            {config.label}
        </Badge>
    );
}

// =============================================
// TYPE BADGE
// =============================================

interface TypeBadgeProps {
    type: 'CORRECTIVE' | 'PREVENTIVE' | 'PREDICTIVE' | 'EMERGENCY';
    className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
    const typeConfig: Record<string, { label: string; variant: BadgeProps['variant'] }> = {
        CORRECTIVE: { label: 'Corrective', variant: 'danger' },
        PREVENTIVE: { label: 'Preventive', variant: 'success' },
        PREDICTIVE: { label: 'Predictive', variant: 'primary' },
        EMERGENCY: { label: 'Emergency', variant: 'danger' },
    };

    const config = typeConfig[type] || typeConfig.CORRECTIVE;

    return (
        <Badge variant={config.variant} className={className}>
            {config.label}
        </Badge>
    );
}

// =============================================
// COUNT BADGE (for notifications, etc.)
// =============================================

interface CountBadgeProps {
    count: number;
    max?: number;
    variant?: 'primary' | 'danger' | 'warning';
    className?: string;
}

export function CountBadge({ count, max = 99, variant = 'danger', className }: CountBadgeProps) {
    if (count === 0) return null;

    const displayCount = count > max ? `${max}+` : count.toString();

    const variantStyles: Record<string, string> = {
        primary: 'bg-primary text-white',
        danger: 'bg-danger text-white',
        warning: 'bg-warning text-white',
    };

    return (
        <span className={cn(
            'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold',
            variantStyles[variant],
            className
        )}>
            {displayCount}
        </span>
    );
}

// =============================================
// ONLINE STATUS INDICATOR
// =============================================

interface OnlineStatusProps {
    status: 'online' | 'offline' | 'away' | 'busy';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

export function OnlineStatus({ status, size = 'md', showLabel = false, className }: OnlineStatusProps) {
    const statusColors: Record<string, string> = {
        online: 'bg-success',
        offline: 'bg-slate-500',
        away: 'bg-warning',
        busy: 'bg-danger',
    };

    const sizes: Record<string, string> = {
        sm: 'w-2 h-2',
        md: 'w-2.5 h-2.5',
        lg: 'w-3 h-3',
    };

    const labels: Record<string, string> = {
        online: 'Online',
        offline: 'Offline',
        away: 'Away',
        busy: 'Busy',
    };

    return (
        <span className={cn('inline-flex items-center gap-1.5', className)}>
            <span className={cn(
                'rounded-full',
                statusColors[status],
                sizes[size],
                status === 'online' && 'animate-pulse'
            )} />
            {showLabel && (
                <span className="text-xs text-slate-500 font-medium capitalize">{labels[status]}</span>
            )}
        </span>
    );
}
