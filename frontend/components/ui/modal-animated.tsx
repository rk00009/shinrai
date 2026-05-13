'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { modalVariants, backdropVariants } from '@/lib/animation-variants';

interface ModalAnimatedProps {
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

/**
 * Enhanced Modal with Framer Motion animations
 * - Backdrop fade-in/out
 * - Modal scale + fade + slide
 * - Smooth transitions on open/close
 */
export function ModalAnimated({
  isOpen,
  onClose,
  title,
  description,
  size = 'md',
  children,
}: ModalAnimatedProps) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${sizeStyles[size]} bg-white rounded-xl shadow-2xl w-full max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || description) && (
                <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 flex justify-between items-start">
                  <div>
                    {title && <h2 className="text-2xl font-bold text-text-primary">{title}</h2>}
                    {description && (
                      <p className="text-sm text-text-secondary mt-1">{description}</p>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ rotate: 90, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-text-secondary" />
                  </motion.button>
                </div>
              )}

              {/* Content */}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
