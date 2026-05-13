'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { hoverScaleVariants, rotateLoadingVariants } from '@/lib/animation-variants';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

const variantStyles = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500/20',
  secondary: 'bg-neutral-200 text-text-primary hover:bg-neutral-300 focus:ring-neutral-300/20',
  outline: 'border-2 border-neutral-300 text-text-primary hover:bg-neutral-50 focus:ring-neutral-300/20',
  ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500/20',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500/20',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        variants={hoverScaleVariants}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        disabled={isDisabled}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          font-semibold
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          inline-flex items-center justify-center gap-2
          ${className || ''}
        `}
        {...props}
      >
        {isLoading && (
          <motion.div
            variants={rotateLoadingVariants}
            initial="initial"
            animate="animate"
            className="flex items-center"
          >
            <Loader2 size={18} />
          </motion.div>
        )}
        <span>{isLoading ? 'Loading...' : children}</span>
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
