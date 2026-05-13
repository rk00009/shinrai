'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const variantStyles = {
  primary: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-neutral-300',
  secondary: 'bg-neutral-200 text-text-primary hover:bg-neutral-300 disabled:bg-neutral-100',
  outline: 'border border-neutral-300 text-text-primary hover:bg-neutral-50 disabled:opacity-50',
  ghost: 'text-primary-500 hover:bg-primary-50 disabled:text-neutral-300',
  danger: 'bg-danger-500 text-white hover:bg-danger-600 disabled:bg-neutral-300',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-6 py-3 text-lg rounded-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading,
    disabled,
    children,
    className,
    ...props
  }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          'font-medium transition-all duration-quick focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
          variantStyles[variant],
          sizeStyles[size],
          'disabled:cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin-slow">⏳</span>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
