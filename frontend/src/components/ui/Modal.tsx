import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================
// MODAL COMPONENT
// =============================================

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    children: React.ReactNode;
    showClose?: boolean;
    closeOnOverlay?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    subtitle,
    size = 'md',
    children,
    showClose = true,
    closeOnOverlay = true,
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const sizes: Record<string, string> = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[90vw] max-h-[90vh]',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={closeOnOverlay ? onClose : undefined}
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        className={cn(
                            'relative w-full rounded-3xl overflow-hidden z-10',
                            'bg-gradient-to-br from-surface-light to-surface',
                            'border border-white/[0.08]',
                            'shadow-2xl shadow-black/50',
                            sizes[size]
                        )}
                    >
                        {/* Header */}
                        {(title || showClose) && (
                            <div className="flex items-start justify-between p-6 border-b border-white/[0.05]">
                                <div>
                                    {title && (
                                        <h2 className="text-xl font-bold text-white">{title}</h2>
                                    )}
                                    {subtitle && (
                                        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
                                    )}
                                </div>
                                {showClose && (
                                    <button
                                        onClick={onClose}
                                        className="p-2 -m-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// =============================================
// MODAL ACTIONS
// =============================================

interface ModalActionsProps {
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right' | 'between';
}

export function ModalActions({ children, className, align = 'right' }: ModalActionsProps) {
    const alignments: Record<string, string> = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end',
        between: 'justify-between',
    };

    return (
        <div className={cn(
            'flex items-center gap-3 pt-6 mt-6 border-t border-white/[0.05]',
            alignments[align],
            className
        )}>
            {children}
        </div>
    );
}

// =============================================
// CONFIRMATION MODAL
// =============================================

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'primary';
    loading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    loading = false,
}: ConfirmModalProps) {
    const iconStyles = {
        danger: 'bg-danger/10 text-danger',
        warning: 'bg-warning/10 text-warning',
        primary: 'bg-primary/10 text-primary',
    };

    const buttonStyles = {
        danger: 'bg-danger hover:bg-red-600',
        warning: 'bg-warning hover:bg-amber-600',
        primary: 'bg-primary hover:bg-primary-dark',
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} showClose={false} size="sm">
            <div className="text-center py-4">
                {/* Icon */}
                <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6',
                    iconStyles[variant]
                )}>
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-sm mx-auto">{message}</p>

                {/* Actions */}
                <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] transition-all disabled:opacity-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className={cn(
                            'px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50',
                            buttonStyles[variant]
                        )}
                    >
                        {loading ? (
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : confirmText}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

// =============================================
// DRAWER COMPONENT
// =============================================

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    position?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function Drawer({
    isOpen,
    onClose,
    title,
    position = 'right',
    size = 'md',
    children,
}: DrawerProps) {
    const sizes = {
        sm: 'w-80',
        md: 'w-96',
        lg: 'w-[480px]',
    };

    const slideDirection = position === 'right' ? 'translateX(100%)' : 'translateX(-100%)';

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100]">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: position === 'right' ? '100%' : '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: position === 'right' ? '100%' : '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={cn(
                            'absolute top-0 h-full',
                            position === 'right' ? 'right-0' : 'left-0',
                            sizes[size],
                            'bg-gradient-to-br from-surface-light to-surface',
                            'border-l border-white/[0.08]',
                            'shadow-2xl',
                            'flex flex-col'
                        )}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/[0.05]">
                            {title && <h2 className="text-lg font-bold text-white">{title}</h2>}
                            <button
                                onClick={onClose}
                                className="p-2 -m-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/[0.05] transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
