import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'onChange'
> {
  label?: string;
  options: Option[];
  error?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <select
          className={`
              w-full px-4 py-2 bg-white border rounded-lg text-sm appearance-none cursor-pointer outline-none transition-all
              focus:ring-2 focus:ring-primary/20
              ${
                error
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-primary'
              }
              ${className}
            `}
          onChange={e => onChange?.(e.target.value)}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
