import { AlertCircle, CheckCircle } from 'lucide-react';

interface TextareaProps {
  label?: string;
  id?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  success?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  maxLength?: number;
  showCount?: boolean;
  className?: string;
}

const Textarea = ({
  label,
  id,
  value,
  onChange,
  error,
  success,
  disabled = false,
  placeholder,
  required = false,
  helperText,
  rows = 4,
  resize = 'vertical',
  maxLength,
  showCount = false,
  className = '',
}: TextareaProps) => {

  const textareaId =
    id || `textarea-${label?.replace(/\s+/g, '-').toLowerCase()}`;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;
  const countId = `${textareaId}-count`;

  const getTextareaClasses = () => {
    const base =
      'w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 outline-none';
    const resizeClass = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    }[resize];

    const states = {
      error:
        'border-red-500 bg-red-50 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-4 focus:ring-red-100',
      success:
        'border-green-500 bg-green-50 text-green-900 placeholder-green-400 focus:border-green-600 focus:ring-4 focus:ring-green-100',
      disabled: 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed',
      default:
        'border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100',
    };

    const stateClass = disabled
      ? states.disabled
      : error
        ? states.error
        : success
          ? states.success
          : states.default;
    return `${base} ${resizeClass} ${stateClass}`;
  };

  const getLabelClasses = () => {
    const base =
      'block text-sm font-medium mb-1.5 transition-colors duration-200';
    if (disabled) return `${base} text-gray-400`;
    if (error) return `${base} text-red-700`;
    if (success) return `${base} text-green-700`;
    return `${base} text-gray-700`;
  };

  const currentLength = value?.length || 0;
  const isOverLimit = maxLength && currentLength > maxLength;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={textareaId} className={getLabelClasses()}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          id={textareaId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          rows={rows}
          maxLength={maxLength}
          className={getTextareaClasses()}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            `${error ? errorId : ''} ${helperText ? helperId : ''} ${showCount ? countId : ''}`.trim() ||
            undefined
          }
          aria-required={required}
        />

        {(error || success) && !disabled && (
          <div className="absolute right-3 top-3 pointer-events-none">
            {error && <AlertCircle className="w-5 h-5 text-red-500" />}
            {success && <CheckCircle className="w-5 h-5 text-green-500" />}
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mt-1.5">
        <div className="flex-1">
          {error && (
            <p
              id={errorId}
              className="text-sm text-red-600 flex items-start gap-1"
              role="alert"
              aria-live="polite"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </p>
          )}

          {success && !error && (
            <p
              className="text-sm text-green-600 flex items-start gap-1"
              role="status"
            >
              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{success}</span>
            </p>
          )}

          {helperText && !error && !success && (
            <p id={helperId} className="text-sm text-gray-500">
              {helperText}
            </p>
          )}
        </div>

        {showCount && (
          <p
            id={countId}
            className={`text-sm shrink-0 ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-500'}`}
            aria-live="polite"
          >
            {currentLength}
            {maxLength && `/${maxLength}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Textarea;
