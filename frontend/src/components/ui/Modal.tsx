import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className,
}: ModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={cn(
                    'relative w-full mx-4 bg-surface rounded-xl border border-surface-light shadow-2xl',
                    'animate-slide-up',
                    sizes[size],
                    className
                )}
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-surface-light">
                        <h2 className="text-lg font-semibold text-white">{title}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 text-secondary hover:text-white hover:bg-surface-light rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Body */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

interface ModalActionsProps {
    children: React.ReactNode;
    className?: string;
}

export function ModalActions({ children, className }: ModalActionsProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-end gap-3 mt-6 pt-4 border-t border-surface-light',
                className
            )}
        >
            {children}
        </div>
    );
}
