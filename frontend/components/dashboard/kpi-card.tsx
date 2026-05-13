'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number | string;
  unit?: string;
  trend?: number;
  trendDirection?: 'up' | 'down';
  icon: string;
  color: 'primary' | 'success' | 'warning' | 'info';
  index?: number;
}

const colorStyles = {
  primary: 'from-primary-50 to-primary-100 border-primary-200',
  success: 'from-success-50 to-success-100 border-success-200',
  warning: 'from-warning-50 to-warning-100 border-warning-200',
  info: 'from-info-50 to-info-100 border-info-200',
};

const textColorStyles = {
  primary: 'text-primary-700',
  success: 'text-success-700',
  warning: 'text-warning-700',
  info: 'text-info-700',
};

export function KPICard({
  title,
  value,
  unit,
  trend,
  trendDirection = 'up',
  icon,
  color,
  index = 0,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Card variant="elevated" className={`bg-gradient-to-br ${colorStyles[color]} border`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-text-secondary">{title}</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-bold text-text-primary">{value}</span>
              {unit && <span className="text-sm text-text-secondary">{unit}</span>}
            </div>
            {trend !== undefined && (
              <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${trendDirection === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
                {trendDirection === 'up' ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}
                <span>{trend}% vs last month</span>
              </div>
            )}
          </div>
          <div className="text-4xl">{icon}</div>
        </div>
      </Card>
    </motion.div>
  );
}

interface KPIGridProps {
  children: React.ReactNode;
}

export function KPIGrid({ children }: KPIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}
