import React from 'react';
import { cn } from '../../utils/helpers';

// =============================================
// TEXT INPUT COMPONENT
// =============================================

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    hint?: string;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
}

export function Input({
    label,
    error,
    hint,
    icon,
    iconPosition = 'left',
    className,
    disabled,
    ...props
}: InputProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {label}
                    </span>
                    {hint && (
                        <span className="text-xs text-slate-600">{hint}</span>
                    )}
                </label>
            )}
            <div className="relative group">
                {icon && iconPosition === 'left' && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
                <input
                    className={cn(
                        'w-full h-12 rounded-xl outline-none transition-all duration-200',
                        'bg-white/[0.03] border border-white/[0.08]',
                        'text-white font-medium placeholder:text-slate-600',
                        'hover:bg-white/[0.05] hover:border-white/[0.12]',
                        'focus:bg-white/[0.06] focus:border-primary/50',
                        'focus:ring-2 focus:ring-primary/10',
                        'disabled:opacity-50 disabled:cursor-not-allowed',
                        icon && iconPosition === 'left' && 'pl-12 pr-4',
                        icon && iconPosition === 'right' && 'pl-4 pr-12',
                        !icon && 'px-4',
                        error && 'border-danger/50 focus:border-danger/50 focus:ring-danger/10',
                        className
                    )}
                    disabled={disabled}
                    {...props}
                />
                {icon && iconPosition === 'right' && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors">
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <p className="text-xs text-danger font-medium flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-danger" />
                    {error}
                </p>
            )}
        </div>
    );
}

// =============================================
// TEXTAREA COMPONENT
// =============================================

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    hint?: string;
}

export function TextArea({
    label,
    error,
    hint,
    className,
    disabled,
    ...props
}: TextAreaProps) {
    return (
        <div className="space-y-2">
            {label && (
                <label className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        {label}
                    </span>
                    {hint && (
                        <span className="text-xs text-slate-600">{hint}</span>
                    )}
                </label>
            )}
            <textarea
                className={cn(
                    'w-full min-h-[120px] p-4 rounded-xl outline-none transition-all duration-200 resize-y',
                    'bg-white/[0.03] border border-white/[0.08]',
                    'text-white font-medium placeholder:text-slate-600',
                    'hover:bg-white/[0.05] hover:border-white/[0.12]',
                    'focus:bg-white/[0.06] focus:border-primary/50',
                    'focus:ring-2 focus:ring-primary/10',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    error && 'border-danger/50 focus:border-danger/50 focus:ring-danger/10',
                    className
                )}
                disabled={disabled}
                {...props}
            />
            {error && (
                <p className="text-xs text-danger font-medium flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-danger" />
                    {error}
                </p>
            )}
        </div>
    );
}

// =============================================
// SEARCH INPUT COMPONENT
// =============================================

interface SearchInputProps extends Omit<InputProps, 'icon' | 'iconPosition'> {
    onClear?: () => void;
}

export function SearchInput({ onClear, value, ...props }: SearchInputProps) {
    return (
        <div className="relative group">
            <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
                type="text"
                value={value}
                className={cn(
                    'w-full h-12 pl-11 pr-10 rounded-xl outline-none transition-all duration-200',
                    'bg-white/[0.03] border border-white/[0.08]',
                    'text-white font-medium placeholder:text-slate-600',
                    'hover:bg-white/[0.05] hover:border-white/[0.12]',
                    'focus:bg-white/[0.06] focus:border-primary/50',
                    'focus:ring-2 focus:ring-primary/10'
                )}
                {...props}
            />
            {value && onClear && (
                <button
                    onClick={onClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
                >
                    <svg className="w-3 h-3 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </div>
    );
}

// =============================================
// FORM GROUP COMPONENT
// =============================================

interface FormGroupProps {
    children: React.ReactNode;
    className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
    return (
        <div className={cn('space-y-6', className)}>
            {children}
        </div>
    );
}

// =============================================
// INPUT WITH ADDON
// =============================================

interface InputWithAddonProps extends InputProps {
    addon: string;
    addonPosition?: 'left' | 'right';
}

export function InputWithAddon({
    addon,
    addonPosition = 'left',
    className,
    ...props
}: InputWithAddonProps) {
    return (
        <div className="space-y-2">
            {props.label && (
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {props.label}
                </label>
            )}
            <div className="flex">
                {addonPosition === 'left' && (
                    <div className="h-12 px-4 flex items-center bg-white/[0.05] border border-r-0 border-white/[0.08] rounded-l-xl text-sm text-slate-500 font-medium">
                        {addon}
                    </div>
                )}
                <input
                    className={cn(
                        'flex-1 h-12 px-4 outline-none transition-all duration-200',
                        'bg-white/[0.03] border border-white/[0.08]',
                        'text-white font-medium placeholder:text-slate-600',
                        'hover:bg-white/[0.05]',
                        'focus:bg-white/[0.06] focus:border-primary/50',
                        addonPosition === 'left' && 'rounded-l-none rounded-r-xl',
                        addonPosition === 'right' && 'rounded-r-none rounded-l-xl',
                        className
                    )}
                    {...props}
                />
                {addonPosition === 'right' && (
                    <div className="h-12 px-4 flex items-center bg-white/[0.05] border border-l-0 border-white/[0.08] rounded-r-xl text-sm text-slate-500 font-medium">
                        {addon}
                    </div>
                )}
            </div>
        </div>
    );
}
