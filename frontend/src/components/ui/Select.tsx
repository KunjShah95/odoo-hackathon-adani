import React from 'react';
import { cn } from '../../utils/helpers';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    onChange?: (value: string) => void;
}

export function Select({
    label,
    error,
    options,
    placeholder = 'Select an option',
    className,
    id,
    onChange,
    value,
    ...props
}: SelectProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
    };

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
                <select
                    id={inputId}
                    className={cn(
                        'w-full px-4 py-2.5 bg-surface-dark border border-surface-light rounded-lg',
                        'text-white appearance-none cursor-pointer',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
                        'transition-all duration-200',
                        error && 'border-danger focus:ring-danger',
                        !value && 'text-secondary',
                        className
                    )}
                    value={value}
                    onChange={handleChange}
                    {...props}
                >
                    <option value="" disabled className="text-secondary">
                        {placeholder}
                    </option>
                    {options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className="bg-surface-dark text-white"
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
            </div>
            {error && (
                <p className="mt-1.5 text-sm text-danger">{error}</p>
            )}
        </div>
    );
}
