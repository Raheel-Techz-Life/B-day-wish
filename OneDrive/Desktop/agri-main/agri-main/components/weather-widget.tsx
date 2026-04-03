'use client';

import { Cloud, AlertTriangle, Droplets, Wind } from 'lucide-react';
import { DashboardCard } from './dashboard-card';
import { SeverityBadge } from './severity-badge';
import { WeatherData } from '@/lib/types';
import { useLanguage } from './language-provider';
import { t } from '@/lib/translations';

interface WeatherWidgetProps {
  data: WeatherData;
}

export function WeatherWidget({ data }: WeatherWidgetProps) {
  const { language } = useLanguage();

  return (
    <DashboardCard
      title={t('dashboard.currentWeatherRisk', language)}
      icon={<Cloud className="w-5 h-5" />}
      variant={data.riskLevel === 'critical' ? 'alert' : 'default'}
    >
      <div className="space-y-4">
        {/* Temperature and Condition */}
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl font-bold text-foreground">{data.temp}°C</div>
            <p className="text-muted-foreground">{data.condition}</p>
          </div>
          <SeverityBadge severity={data.riskLevel} />
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">{t('dashboard.humidity', language)}</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">{t('dashboard.windSpeed', language)}</p>
              <p className="font-semibold">{data.windSpeed} km/h</p>
            </div>
          </div>
        </div>

        {/* Prediction */}
        {data.riskLevel !== 'low' && (
          <div className="flex gap-3 items-start p-3 bg-white/50 dark:bg-black/20 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">{data.prediction}</p>
          </div>
        )}
      </div>
    </DashboardCard>
  );
}
