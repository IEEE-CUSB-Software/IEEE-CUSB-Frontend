import React, { useState, useRef, useEffect } from 'react';
import { FiX, FiCheck, FiChevronDown } from 'react-icons/fi';

interface Option {
  label: string;
  value: string;
}

interface SearchableMultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  error?: string;
  darkMode?: boolean;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  error,
  darkMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
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
    inputRef.current?.focus();
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-1 w-full" ref={wrapperRef}>
      {label && (
        <label className={`text-sm font-medium transition-colors duration-300 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          {label}
        </label>
      )}

      <div
        className={`relative border rounded-md p-2 flex flex-wrap gap-2 items-center cursor-text transition-all duration-300 ${
          darkMode ? 'border-gray-700 bg-gray-800/50 focus-within:border-blue-500' : 'border-gray-300 bg-white focus-within:border-blue-600'
        } ${error ? 'border-red-500' : ''}`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {/* Selected Pills */}
        {value.map(val => {
          const opt = options.find(o => o.value === val);
          return (
            <span
              key={val}
              className={`px-2 py-1 rounded text-sm flex items-center gap-1 transition-colors ${
                darkMode ? 'bg-primary/20 text-primary-light' : 'bg-primary/10 text-primary'
              }`}
            >
              {opt?.label || val}
              <button
                type="button"
                onClick={e => handleRemove(val, e)}
                className={`hover:opacity-70 transition-opacity ${darkMode ? 'text-gray-300' : 'text-primary'}`}
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </span>
          );
        })}

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={value.length === 0 ? placeholder : ''}
          className={`flex-1 min-w-[120px] bg-transparent outline-none text-sm ${
            darkMode ? 'text-gray-200 placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
          }`}
        />

        {/* Dropdown Indicator */}
        <div className={`ml-auto px-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute z-50 top-full left-0 right-0 mt-1 rounded-md border shadow-lg max-h-60 overflow-y-auto ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            {filteredOptions.length === 0 ? (
              <div className={`p-3 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                No options found
              </div>
            ) : (
              filteredOptions.map(opt => {
                const isSelected = value.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={`px-3 py-2 text-sm flex items-center justify-between cursor-pointer transition-colors ${
                      darkMode
                        ? `hover:bg-gray-700/50 ${isSelected ? 'bg-primary/10 text-primary-light' : 'text-gray-200'}`
                        : `hover:bg-gray-100 ${isSelected ? 'bg-primary/5 text-primary' : 'text-gray-700'}`
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <FiCheck className="w-4 h-4" />}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default SearchableMultiSelect;
