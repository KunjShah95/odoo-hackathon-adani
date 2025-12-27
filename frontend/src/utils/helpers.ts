import { format, formatDistanceToNow, isAfter, parseISO } from 'date-fns';

// Format date to display string
export function formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'MMM d, yyyy');
}

// Format date with time
export function formatDateTime(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, 'MMM d, yyyy HH:mm');
}

// Get relative time (e.g., "2 hours ago")
export function getRelativeTime(date: string | Date): string {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(d, { addSuffix: true });
}

// Check if date is overdue
export function isOverdue(date: string | Date): boolean {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return isAfter(new Date(), d);
}

// Generate initials from name
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

// Truncate text with ellipsis
export function truncate(text: string, length: number): string {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
}

// Capitalize first letter
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

// Format status for display
export function formatStatus(status: string): string {
    return status
        .split('_')
        .map((word) => capitalize(word))
        .join(' ');
}

// Generate random color based on string (for avatars)
export function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        '#3b82f6', // blue
        '#22c55e', // green
        '#f59e0b', // amber
        '#ef4444', // red
        '#8b5cf6', // purple
        '#06b6d4', // cyan
        '#ec4899', // pink
    ];
    return colors[Math.abs(hash) % colors.length];
}

// Class name helper (like clsx)
export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
