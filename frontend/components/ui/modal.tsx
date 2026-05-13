'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
};

export const Modal = ({ isOpen, onClose, title, description, size = 'md', children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className={clsx(
                'bg-white rounded-lg shadow-xl max-w-full pointer-events-auto',
                sizeStyles[size]
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                <div>
                  {title && <h2 className="text-lg font-semibold text-text-primary">{title}</h2>}
                  {description && <p className="text-sm text-text-secondary mt-1">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  onClose?: () => void;
}

const alertStyles = {
  success: 'bg-success-50 border-success-200 text-success-900',
  error: 'bg-danger-50 border-danger-200 text-danger-900',
  warning: 'bg-warning-50 border-warning-200 text-warning-900',
  info: 'bg-info-50 border-info-200 text-info-900',
};

const alertIcons = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', title, onClose, className, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        className={clsx(
          'rounded-lg border p-4 flex gap-4 items-start',
          alertStyles[type],
          className
        )}
        {...props}
      >
        <span className="text-xl mt-0.5">{alertIcons[type]}</span>
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1">{title}</h4>}
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-xl hover:opacity-70 transition-opacity flex-shrink-0"
          >
            ✕
          </button>
        )}
      </motion.div>
    );
  }
);

Alert.displayName = 'Alert';

interface ToastProps extends AlertProps {
  autoClose?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const positionStyles = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ position = 'bottom-right', autoClose = 5000, ...props }, ref) => {
    return (
      <div className={clsx('fixed z-50', positionStyles[position])}>
        <Alert ref={ref} {...props} />
      </div>
    );
  }
);

Toast.displayName = 'Toast';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ count = 1, height = 'h-4', className, ...props }, ref) => {
    return (
      <div ref={ref} className="space-y-2" {...props}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={clsx('bg-neutral-200 rounded-lg animate-pulse', height, className)}
          />
        ))}
      </div>
    );
  }
);

Skeleton.displayName = 'Skeleton';
