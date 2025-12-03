import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'danger'
    | 'success'
    | 'outline'
    | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/**
 * Reusable Button Component
 * IEEE brand themed button with multiple variants and sizes
 * Supports loading states and icons
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

  const variantStyles = {
    primary: `
      bg-primary text-primary-foreground
      hover:bg-primary/90 active:bg-primary/80
      shadow-sm hover:shadow
    `,
    secondary: `
      bg-secondary text-secondary-foreground
      hover:bg-secondary/90 active:bg-secondary/80
      shadow-sm hover:shadow
    `,
    accent: `
      bg-accent text-accent-foreground
      hover:bg-accent/90 active:bg-accent/80
      shadow-sm hover:shadow
    `,
    danger: `
      bg-destructive text-destructive-foreground
      hover:bg-destructive/90 active:bg-destructive/80
      shadow-sm hover:shadow
    `,
    success: `
      bg-success text-success-foreground
      hover:bg-success/90 active:bg-success/80
      shadow-sm hover:shadow
    `,
    outline: `
      bg-transparent border-2 border-primary text-primary
      hover:bg-primary/5 active:bg-primary/10
    `,
    ghost: `
      bg-transparent text-primary
      hover:bg-muted active:bg-muted/80
    `,
  };

  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-7 py-3.5 text-lg',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!isLoading && leftIcon && <span>{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
