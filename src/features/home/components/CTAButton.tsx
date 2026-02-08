import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CTAButtonProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    href?: string;
    className?: string;
}

/**
 * Animated CTA button with hover effects
 * Supports primary (IEEE blue) and secondary (cyan) variants
 */
export const CTAButton = ({
    children,
    variant = 'primary',
    onClick,
    href,
    className = '',
}: CTAButtonProps) => {
    const baseClasses =
        'px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 relative overflow-hidden';

    const variantClasses = {
        primary:
            'bg-primary text-white hover:bg-[#00427a] shadow-lg hover:shadow-xl hover:shadow-primary/50',
        secondary:
            'bg-info text-white hover:bg-[#0EA5E9] shadow-lg hover:shadow-xl hover:shadow-info/50',
    };

    const Component = href ? 'a' : 'button';

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
        >
            <Component
                href={href}
                onClick={onClick}
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            >
                <motion.span
                    className="relative z-10"
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                >
                    {children}
                </motion.span>

                {/* Hover glow effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    whileHover={{ opacity: 0.2, x: ['0%', '100%'] }}
                    transition={{ duration: 0.6 }}
                />
            </Component>
        </motion.div>
    );
};
