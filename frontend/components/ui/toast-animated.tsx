'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { toastVariants } from '@/lib/animation-variants';
import { Check, X, AlertCircle, Info } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: <Check size={20} />,
  error: <X size={20} />,
  warning: <AlertCircle size={20} />,
  info: <Info size={20} />,
};

const colorMap = {
  success: 'bg-success-50 border-success-200 text-success-800',
  error: 'bg-danger-50 border-danger-200 text-danger-800',
  warning: 'bg-warning-50 border-warning-200 text-warning-800',
  info: 'bg-info-50 border-info-200 text-info-800',
};

const iconColorMap = {
  success: 'text-success-600',
  error: 'text-danger-600',
  warning: 'text-warning-600',
  info: 'text-info-600',
};

/**
 * Individual toast notification with animation
 */
function Toast({ id, type, title, message, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${colorMap[type]} border rounded-lg p-4 shadow-lg flex gap-3`}
    >
      <div className={`flex-shrink-0 ${iconColorMap[type]}`}>{iconMap[type]}</div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        {message && <p className="text-sm opacity-90">{message}</p>}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onClose(id)}
        className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
      >
        <X size={18} />
      </motion.button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastProps[];
  onRemove: (id: string) => void;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

const positionMap = {
  'top-left': 'top-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'top-right': 'top-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-4 right-4',
};

/**
 * Toast container component
 * Displays multiple toasts with staggered animations
 * Usage: Place in root layout or page
 */
export function ToastContainer({
  toasts,
  onRemove,
  position = 'bottom-right',
}: ToastContainerProps) {
  return (
    <div className={`fixed ${positionMap[position]} z-50 space-y-2 pointer-events-none`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} onClose={onRemove} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Hook to manage toast notifications
 * Usage in component:
 * const { toasts, addToast, removeToast } = useToast();
 */
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const addToast = (
    type: 'success' | 'error' | 'warning' | 'info',
    title: string,
    message?: string,
    duration?: number,
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      id,
      type,
      title,
      message,
      duration,
      onClose: removeToast,
    };
    setToasts((prev) => [...prev, newToast]);
    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
