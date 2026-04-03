'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ClimateGaugeProps {
  label: string;
  value: number;
  maxValue?: number;
  unit?: string;
  status: 'low' | 'medium' | 'high' | 'critical';
}

const statusColors: Record<string, { bg: string; text: string; progress: string }> = {
  low: { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-700 dark:text-green-300', progress: 'bg-green-500' },
  medium: { bg: 'bg-yellow-50 dark:bg-yellow-950', text: 'text-yellow-700 dark:text-yellow-300', progress: 'bg-yellow-500' },
  high: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-700 dark:text-orange-300', progress: 'bg-orange-500' },
  critical: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-700 dark:text-red-300', progress: 'bg-red-500' },
};

export function ClimateGauge({ label, value, maxValue = 100, unit = '', status }: ClimateGaugeProps) {
  const colors = statusColors[status];
  const percentage = (value / maxValue) * 100;

  return (
    <Card className={`p-4 ${colors.bg}`}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-lg font-bold ${colors.text}`}
          >
            {value}
            {unit}
          </motion.span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full ${colors.progress}`}
          />
        </div>
      </div>
    </Card>
  );
}
