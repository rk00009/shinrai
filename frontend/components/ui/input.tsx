'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, errorMessage, label, helperText, className, style, ...props }, ref) => {
    const mergedStyle = { caretColor: 'rgb(26,26,26)', ...style } as React.CSSProperties;
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors duration-quick text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error
              ? 'border-danger-500 bg-danger-50'
              : 'border-neutral-300 bg-white hover:border-neutral-400',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            'placeholder:text-neutral-400',
            className
          )}
          style={mergedStyle}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-danger-600">{errorMessage}</p>
        )}
        {helperText && !errorMessage && (
          <p className="mt-1 text-sm text-text-secondary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, errorMessage, label, rows = 4, className, style, ...props }, ref) => {
    const mergedStyle = { caretColor: 'rgb(26,26,26)', ...style } as React.CSSProperties;
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors duration-quick resize-none text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error
              ? 'border-danger-500 bg-danger-50'
              : 'border-neutral-300 bg-white hover:border-neutral-400',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            'placeholder:text-neutral-400',
            className
          )}
          style={mergedStyle}
          {...props}
        />
        {errorMessage && (
          <p className="mt-1 text-sm text-danger-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, errorMessage, label, options, className, style, ...props }, ref) => {
    const mergedStyle = { caretColor: 'rgb(26,26,26)', ...style } as React.CSSProperties;
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            'w-full px-4 py-2 rounded-lg border transition-colors duration-quick text-text-primary',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error
              ? 'border-danger-500 bg-danger-50'
              : 'border-neutral-300 bg-white hover:border-neutral-400',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            className
          )}
          style={mergedStyle}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <p className="mt-1 text-sm text-danger-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
