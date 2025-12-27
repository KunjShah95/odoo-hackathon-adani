import React from 'react';
import { cn } from '../../utils/helpers';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
    return (
        <div
            className={cn(
                'bg-surface rounded-xl border border-surface-light p-6',
                'transition-all duration-200',
                hover && 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer',
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('flex items-center justify-between mb-4', className)}>
            {children}
        </div>
    );
}

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
    return (
        <h3 className={cn('text-lg font-semibold text-white', className)}>
            {children}
        </h3>
    );
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={cn('text-secondary-light', className)}>{children}</div>;
}

interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('flex items-center justify-end gap-2 mt-4 pt-4 border-t border-surface-light', className)}>
            {children}
        </div>
    );
}
