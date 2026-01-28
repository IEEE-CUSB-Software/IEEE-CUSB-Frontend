import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiX } from 'react-icons/fi';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  placeholder?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = 'Select options...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeValue = (valToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== valToRemove));
  };

  return (
    <div className="flex flex-col gap-1.5" ref={containerRef}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-4 py-2 min-h-[42px] bg-white border rounded-lg text-sm cursor-pointer outline-none transition-all flex items-center justify-between
            focus:ring-2 focus:ring-primary/20
            ${
              error
                ? 'border-red-500 focus:border-red-500'
                : 'border-gray-300 focus:border-primary'
            }
          `}
        >
          <div className="flex flex-wrap gap-1.5">
            {value.length === 0 && (
              <span className="text-gray-400">{placeholder}</span>
            )}
            {value.map(val => {
              const option = options.find(o => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium"
                >
                  {option?.label || val}
                  <FiX
                    className="w-3 h-3 hover:text-primary/70 cursor-pointer"
                    onClick={e => removeValue(val, e)}
                  />
                </span>
              );
            })}
          </div>
          <FiChevronDown className="text-gray-400 shrink-0 ml-2" />
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              options.map(option => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`
                    px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center gap-2
                    ${
                      value.includes(option.value)
                        ? 'bg-primary/5 text-primary font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center
                    ${
                      value.includes(option.value)
                        ? 'bg-primary border-primary'
                        : 'border-gray-300'
                    }
                  `}
                  >
                    {value.includes(option.value) && (
                      <FiX className="w-3 h-3 text-white transform rotate-45" /> // Using FiX rotated as checkmark or just FiCheck if imported, but imitating check
                    )}
                  </div>
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
