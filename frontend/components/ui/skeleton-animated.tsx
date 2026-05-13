'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  count?: number;
  height?: string;
  circle?: boolean;
  className?: string;
}

const shimmerGradient = `linear-gradient(
  90deg,
  rgba(255, 255, 255, 0) 0%,
  rgba(255, 255, 255, 0.2) 20%,
  rgba(255, 255, 255, 0.5) 60%,
  rgba(255, 255, 255, 0) 100%
)`;

/**
 * Animated loading skeleton component
 * Uses shimmer effect to indicate loading state
 */
export function SkeletonAnimated({ count = 1, height = 'h-4', circle = false, className }: SkeletonProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`
            bg-neutral-200
            ${circle ? 'rounded-full w-10 h-10' : `${height} rounded-md w-full`}
            ${className || ''}
            overflow-hidden
            relative
          `}
          style={{
            backgroundImage: shimmerGradient,
            backgroundPosition: '200% 0',
            backgroundSize: '200% 100%',
          }}
        >
          <motion.div
            animate={{
              backgroundPosition: ['200% 0', '-200% 0'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  );
}
