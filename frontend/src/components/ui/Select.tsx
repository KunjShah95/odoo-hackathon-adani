import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================
// SELECT COMPONENT
// =============================================

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

interface SelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export function Select({
    label,
    placeholder = 'Select an option',
    options,
    value,
    onChange,
    error,
    disabled,
    className,
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev =>
                        prev < options.length - 1 ? prev + 1 : prev
                    );
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
                    break;
                case 'Enter':
                    e.preventDefault();
                    const option = options[highlightedIndex];
                    if (option && !option.disabled) {
                        onChange?.(option.value);
                        setIsOpen(false);
                    }
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, highlightedIndex, options, onChange]);

    return (
        <div className={cn('space-y-2', className)} ref={containerRef}>
            {label && (
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Trigger */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        'w-full h-12 px-4 rounded-xl flex items-center justify-between',
                        'bg-white/[0.03] border border-white/[0.08]',
                        'transition-all duration-200',
                        'hover:bg-white/[0.05] hover:border-white/[0.12]',
                        isOpen && 'bg-white/[0.06] border-primary/50 ring-2 ring-primary/10',
                        error && 'border-danger/50',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <span className={cn(
                        'text-sm font-medium truncate',
                        selectedOption ? 'text-white' : 'text-slate-600'
                    )}>
                        {selectedOption ? (
                            <span className="flex items-center gap-2">
                                {selectedOption.icon}
                                {selectedOption.label}
                            </span>
                        ) : placeholder}
                    </span>
                    <ChevronDown className={cn(
                        'w-4 h-4 text-slate-500 transition-transform',
                        isOpen && 'rotate-180'
                    )} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-surface-light border border-white/[0.08] shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar"
                        >
                            {options.map((option, index) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        if (!option.disabled) {
                                            onChange?.(option.value);
                                            setIsOpen(false);
                                        }
                                    }}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                    className={cn(
                                        'w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors',
                                        highlightedIndex === index && 'bg-white/[0.05]',
                                        option.value === value && 'bg-primary/10',
                                        option.disabled && 'opacity-50 cursor-not-allowed'
                                    )}
                                    disabled={option.disabled}
                                >
                                    <span className={cn(
                                        'text-sm font-medium flex items-center gap-2',
                                        option.value === value ? 'text-primary' : 'text-slate-300'
                                    )}>
                                        {option.icon}
                                        {option.label}
                                    </span>
                                    {option.value === value && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
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
// MULTI-SELECT COMPONENT
// =============================================

interface MultiSelectProps {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    value?: string[];
    onChange?: (values: string[]) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
}

export function MultiSelect({
    label,
    placeholder = 'Select options',
    options,
    value = [],
    onChange,
    error,
    disabled,
    className,
}: MultiSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOptions = options.filter(opt => value.includes(opt.value));

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleOption = (optionValue: string) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange?.(newValue);
    };

    const removeOption = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(value.filter(v => v !== optionValue));
    };

    return (
        <div className={cn('space-y-2', className)} ref={containerRef}>
            {label && (
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Trigger */}
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={cn(
                        'w-full min-h-12 px-3 py-2 rounded-xl flex items-center flex-wrap gap-2',
                        'bg-white/[0.03] border border-white/[0.08]',
                        'transition-all duration-200',
                        'hover:bg-white/[0.05] hover:border-white/[0.12]',
                        isOpen && 'bg-white/[0.06] border-primary/50 ring-2 ring-primary/10',
                        error && 'border-danger/50',
                        disabled && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map(opt => (
                            <span
                                key={opt.value}
                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg"
                            >
                                {opt.label}
                                <button
                                    onClick={(e) => removeOption(opt.value, e)}
                                    className="hover:bg-primary/20 rounded transition-colors"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-slate-600">{placeholder}</span>
                    )}
                    <ChevronDown className={cn(
                        'w-4 h-4 text-slate-500 ml-auto transition-transform',
                        isOpen && 'rotate-180'
                    )} />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-surface-light border border-white/[0.08] shadow-2xl z-50 max-h-60 overflow-y-auto custom-scrollbar"
                        >
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => !option.disabled && toggleOption(option.value)}
                                    className={cn(
                                        'w-full px-4 py-2.5 flex items-center justify-between text-left transition-colors',
                                        'hover:bg-white/[0.05]',
                                        value.includes(option.value) && 'bg-primary/10',
                                        option.disabled && 'opacity-50 cursor-not-allowed'
                                    )}
                                    disabled={option.disabled}
                                >
                                    <span className={cn(
                                        'text-sm font-medium',
                                        value.includes(option.value) ? 'text-primary' : 'text-slate-300'
                                    )}>
                                        {option.label}
                                    </span>
                                    {value.includes(option.value) && (
                                        <Check className="w-4 h-4 text-primary" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
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
