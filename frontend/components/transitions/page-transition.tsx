'use client';

import { motion } from 'framer-motion';
import { pageTransitionVariants } from '@/lib/animation-variants';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Wrapper component for page transitions
 * Applies fade-in + slide-up animation to all pages
 * Usage: Wrap page content with <PageTransition>{children}</PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransitionVariants}
    >
      {children}
    </motion.div>
  );
}
