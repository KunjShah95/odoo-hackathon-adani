import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export function Input({
    label,
    error,
    icon,
    className,
    id,
    ...props
}: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-secondary-light mb-2"
                >
                    {label}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
                        {icon}
                    </div>
                )}
                <input
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2.5 bg-surface-dark border border-surface-light rounded-lg',
                        'text-white placeholder:text-secondary',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                        'transition-all duration-200',
                        icon && 'pl-10',
                        error && 'border-danger focus:ring-danger',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-danger">{error}</p>
            )}
        </div>
    );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export function TextArea({
    label,
    error,
    className,
    id,
    ...props
}: TextAreaProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-secondary-light mb-2"
                >
                    {label}
                </label>
            )}
            <textarea
                id={inputId}
                className={cn(
                    'w-full px-4 py-2.5 bg-surface-dark border border-surface-light rounded-lg',
                    'text-white placeholder:text-secondary resize-none',
                    'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                    'transition-all duration-200',
                    error && 'border-danger focus:ring-danger',
                    className
                )}
                rows={4}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-sm text-danger">{error}</p>
            )}
        </div>
    );
}
