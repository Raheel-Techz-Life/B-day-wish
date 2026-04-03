'use client';

import { Card } from '@/components/ui/card';
import type { IoTSensor } from '@/lib/types';
import { AlertCircle, Battery, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface IoTSensorCardProps {
  sensor: IoTSensor;
}

const statusIcons: Record<string, typeof CheckCircle2> = {
  healthy: CheckCircle2,
  warning: AlertTriangle,
  critical: AlertCircle,
};

export function IoTSensorCard({ sensor }: IoTSensorCardProps) {
  const StatusIcon = statusIcons[sensor.status];
  const isOutOfRange = sensor.currentValue < sensor.optimalRange.min || sensor.currentValue > sensor.optimalRange.max;
  const statusColor = sensor.status === 'healthy' ? 'text-green-600' : sensor.status === 'warning' ? 'text-yellow-600' : 'text-red-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-sm">{sensor.name}</h4>
            <p className="text-xs text-muted-foreground">{sensor.location}</p>
          </div>
          <StatusIcon className={`w-5 h-5 ${statusColor}`} />
        </div>

        <div className="bg-muted/30 p-3 rounded-lg border border-muted">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{sensor.currentValue}</span>
            <span className="text-sm text-muted-foreground">{sensor.unit}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Optimal: {sensor.optimalRange.min}-{sensor.optimalRange.max}
            {sensor.unit}
          </p>
        </div>

        {isOutOfRange && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-2 rounded text-xs text-yellow-700 dark:text-yellow-300">
            ⚠️ Value outside optimal range
          </div>
        )}

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">
            Last update: {sensor.lastReading.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <div className="flex items-center gap-1">
            <Battery className="w-3 h-3" />
            <span>{sensor.batteryLevel}%</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
