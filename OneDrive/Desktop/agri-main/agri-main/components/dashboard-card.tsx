'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  variant?: 'default' | 'alert' | 'success';
}

export function DashboardCard({
  title,
  children,
  icon,
  className = '',
  variant = 'default',
}: DashboardCardProps) {
  const variantClasses = {
    default: 'bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 shadow-sm',
    alert: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border border-red-300 dark:border-red-700 shadow-sm',
    success: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border border-green-300 dark:border-green-700 shadow-sm',
    secondary: 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950 dark:to-yellow-900 border border-amber-300 dark:border-amber-700 shadow-sm',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, shadow: '0 10px 25px rgba(0,0,0,0.1)' }}
      className={`rounded-lg p-6 shadow-sm transition-shadow ${variantClasses[variant]} ${className}`}
    >
      <div className="flex items-center gap-2 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
