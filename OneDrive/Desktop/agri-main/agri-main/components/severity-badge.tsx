'use client';

import { AlertSeverity } from '@/lib/types';
import { useLanguage } from './language-provider';
import { t } from '@/lib/translations';

interface SeverityBadgeProps {
  severity: AlertSeverity;
  className?: string;
}

export function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const { language } = useLanguage();

  const severityStyles = {
    critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-300 dark:border-red-700',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border border-orange-300 dark:border-orange-700',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-300 dark:border-green-700',
  };

  const labelKeys = {
    critical: 'risk.critical',
    high: 'risk.high',
    medium: 'risk.medium',
    low: 'risk.low',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${severityStyles[severity]} ${className}`}>
      {t(labelKeys[severity], language as any)}
    </span>
  );
}
