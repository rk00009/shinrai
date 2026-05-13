'use client';

import { HTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'outline';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-neutral-200 text-text-primary',
  success: 'bg-success-100 text-success-700',
  warning: 'bg-warning-100 text-warning-700',
  danger: 'bg-danger-100 text-danger-700',
  info: 'bg-info-100 text-info-700',
  primary: 'bg-primary-100 text-primary-700',
  outline: 'bg-transparent border border-neutral-300 text-text-primary',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs rounded-md',
  md: 'px-3 py-1 text-sm rounded-md',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className, ...props }, ref) => (
    <span
      ref={ref}
      className={clsx(
        'inline-flex items-center font-medium transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';

interface StatusBadgeProps extends BadgeProps {
  status:
    | 'submitted'
    | 'verified'
    | 'assigned'
    | 'pending'
    | 'accepted'
    | 'in-progress'
    | 'resolved'
    | 'completed'
    | 'closed'
    | 'escalated';
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, ...props }, ref) => {
    const statusStyles = {
      submitted: 'bg-info-100 text-info-700',
      verified: 'bg-info-100 text-info-700',
      pending: 'bg-warning-100 text-warning-700',
      assigned: 'bg-warning-100 text-warning-700',
      accepted: 'bg-primary-100 text-primary-700',
      'in-progress': 'bg-warning-100 text-warning-700',
      resolved: 'bg-success-100 text-success-700',
      completed: 'bg-success-100 text-success-700',
      closed: 'bg-neutral-200 text-text-primary',
      escalated: 'bg-danger-100 text-danger-700',
    };

    const statusLabels = {
      submitted: 'Submitted',
      verified: 'Verified',
      pending: 'Pending',
      assigned: 'Assigned',
      accepted: 'Accepted',
      'in-progress': 'In Progress',
      resolved: 'Resolved',
      completed: 'Completed',
      closed: 'Closed',
      escalated: 'Escalated',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium px-3 py-1 text-sm rounded-md transition-colors',
          statusStyles[status]
        )}
        {...props}
      >
        {statusLabels[status]}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

interface CategoryBadgeProps extends BadgeProps {
  category: 'facilities' | 'it' | 'security' | 'academic' | 'student-services' | 'other';
}

export const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, ...props }, ref) => {
    const categoryStyles = {
      facilities: 'bg-orange-100 text-orange-700',
      it: 'bg-blue-100 text-blue-700',
      security: 'bg-red-100 text-red-700',
      academic: 'bg-purple-100 text-purple-700',
      'student-services': 'bg-green-100 text-green-700',
      other: 'bg-gray-100 text-gray-700',
    };

    const categoryLabels = {
      facilities: 'Facilities',
      it: 'IT & Tech',
      security: 'Security',
      academic: 'Academic',
      'student-services': 'Student Services',
      other: 'Other',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium px-3 py-1 text-sm rounded-md transition-colors',
          categoryStyles[category]
        )}
        {...props}
      >
        {categoryLabels[category]}
      </span>
    );
  }
);

CategoryBadge.displayName = 'CategoryBadge';

interface PriorityBadgeProps extends BadgeProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const PriorityBadge = forwardRef<HTMLSpanElement, PriorityBadgeProps>(
  ({ priority, ...props }, ref) => {
    const priorityStyles = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      critical: 'bg-red-100 text-red-700',
    };

    const priorityLabels = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
    };

    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium px-3 py-1 text-sm rounded-md transition-colors',
          priorityStyles[priority]
        )}
        {...props}
      >
        {priorityLabels[priority]}
      </span>
    );
  }
);

PriorityBadge.displayName = 'PriorityBadge';
