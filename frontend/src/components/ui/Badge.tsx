import { cn } from '../../utils/helpers';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
    size?: 'sm' | 'md';
    className?: string;
}

export function Badge({
    children,
    variant = 'default',
    size = 'sm',
    className,
}: BadgeProps) {
    const variants = {
        default: 'bg-surface-light text-secondary-light border-surface-light',
        success: 'bg-green-500/20 text-green-400 border-green-500/50',
        warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
        danger: 'bg-red-500/20 text-red-400 border-red-500/50',
        info: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-sm',
    };

    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full border',
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}

// Status Badge with predefined colors
interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const getVariant = (status: string): BadgeProps['variant'] => {
        switch (status) {
            case 'NEW':
            case 'OPERATIONAL':
                return 'info';
            case 'IN_PROGRESS':
            case 'UNDER_MAINTENANCE':
                return 'warning';
            case 'REPAIRED':
                return 'success';
            case 'SCRAP':
            case 'SCRAPPED':
            case 'DECOMMISSIONED':
                return 'danger';
            default:
                return 'default';
        }
    };

    const formatStatus = (status: string) => {
        return status
            .split('_')
            .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
            .join(' ');
    };

    return (
        <Badge variant={getVariant(status)} className={className}>
            {formatStatus(status)}
        </Badge>
    );
}

// Priority Badge
interface PriorityBadgeProps {
    priority: string;
    className?: string;
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
    const getVariant = (priority: string): BadgeProps['variant'] => {
        switch (priority) {
            case 'LOW':
                return 'default';
            case 'MEDIUM':
                return 'info';
            case 'HIGH':
                return 'warning';
            case 'CRITICAL':
                return 'danger';
            default:
                return 'default';
        }
    };

    return (
        <Badge variant={getVariant(priority)} className={className}>
            {priority.charAt(0) + priority.slice(1).toLowerCase()}
        </Badge>
    );
}
