import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputProps {
  label?: string;
  id?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  success?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
}

const Input = ({ 
  label, 
  id,
  type = 'text',
  value, 
  onChange,
  error,
  success,
  disabled = false,
  placeholder,
  required = false,
  helperText,
  className = ''
}: InputProps) => {

  const inputId = id || `input-${label?.replace(/\s+/g, '-').toLowerCase()}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const getInputClasses = () => {
    const base = 'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 outline-none';
    const states = {
      error: 'border-red-500 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100',
      success: 'border-green-500 bg-green-50 text-green-900 placeholder-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-100',
      disabled: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
      default: 'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
    };

    if (disabled) return `${base} ${states.disabled}`;
    if (error) return `${base} ${states.error}`;
    if (success) return `${base} ${states.success}`;
    return `${base} ${states.default}`;
  };

  const getLabelClasses = () => {
    const base = 'block text-sm font-medium mb-1.5 transition-colors duration-200';
    if (disabled) return `${base} text-gray-400`;
    if (error) return `${base} text-red-700`;
    if (success) return `${base} text-green-700`;
    return `${base} text-gray-700`;
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className={getLabelClasses()}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          className={getInputClasses()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={`${error ? errorId : ''} ${helperText ? helperId : ''}`.trim() || undefined}
          aria-required={required}
        />
        
        {(error || success) && !disabled && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            {success && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
        )}
      </div>

      {error && (
        <p 
          id={errorId}
          className="mt-1.5 text-sm text-red-600 flex items-start gap-1"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}

      {success && !error && (
        <p 
          className="mt-1.5 text-sm text-green-600 flex items-start gap-1"
          role="status"
        >
          <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{success}</span>
        </p>
      )}

      {helperText && !error && !success && (
        <p 
          id={helperId}
          className="mt-1.5 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
