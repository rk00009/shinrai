'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  showLabel?: boolean;
  animated?: boolean;
}

const sizeMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorMap = {
  primary: 'bg-primary-500',
  success: 'bg-success-500',
  warning: 'bg-warning-500',
  danger: 'bg-danger-500',
  info: 'bg-info-500',
};

/**
 * Animated progress bar component
 * Uses spring animation for smooth value transitions
 */
export function ProgressBarAnimated({
  value,
  size = 'md',
  color = 'primary',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className={`${sizeMap[size]} w-full bg-neutral-200 rounded-full overflow-hidden`}>
        <motion.div
          animate={{
            width: animated ? `${clampedValue}%` : `${clampedValue}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 20,
            duration: 0.8,
          }}
          className={`${colorMap[color]} h-full rounded-full`}
        />
      </div>
      {showLabel && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-secondary mt-1 font-medium"
        >
          {clampedValue}%
        </motion.p>
      )}
    </div>
  );
}

/**
 * Segmented progress bar for multi-step processes
 */
interface SegmentedProgressProps {
  current: number; // Current step (1-indexed)
  total: number; // Total steps
  labels?: string[];
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
}

export function SegmentedProgressBarAnimated({
  current,
  total,
  labels,
  color = 'primary',
}: SegmentedProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i < current;
          const isCurrent = i === current - 1;

          return (
            <motion.div
              key={i}
              initial={{ scaleX: 0.8, opacity: 0.5 }}
              animate={{
                scaleX: isActive ? 1 : isCurrent ? 0.9 : 0.8,
                opacity: isActive ? 1 : isCurrent ? 0.8 : 0.5,
                backgroundColor: isActive
                  ? colorMap[color].replace('bg-', '')
                  : isCurrent
                    ? colorMap[color].replace('bg-', '')
                    : 'rgb(229, 231, 235)',
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
              }}
              className="flex-1 h-2 rounded-full"
            />
          );
        })}
      </div>
      {labels && (
        <div className="flex justify-between text-xs text-text-secondary">
          {labels.map((label, i) => (
            <motion.span
              key={i}
              animate={{
                color: i < current ? 'rgb(0, 0, 0)' : 'rgb(107, 114, 128)',
                fontWeight: i < current ? '600' : '400',
              }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>
          ))}
        </div>
      )}
    </div>
  );
}
