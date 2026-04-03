'use client';

import { motion } from 'framer-motion';
import { AlertCircle, Clock, Zap } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard-card';
import { SeverityBadge } from '@/components/severity-badge';
import { Button } from '@/components/ui/button';
import { useAlerts } from '@/hooks/use-api';
import { ALERTS } from '@/lib/constants';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';
import type { Alert } from '@/lib/types';
import { useState } from 'react';

type SeverityFilter = 'all' | 'critical' | 'high' | 'medium' | 'low';

// Helper function to translate alert data
function getTranslatedAlert(alert: any, language: string) {
  const alertKeyMap: Record<string, { titleKey: string; descKey: string }> = {
    '1': { titleKey: 'alert.heavyRainTitle', descKey: 'alert.heavyRainDesc' },
    '2': { titleKey: 'alert.armywormTitle', descKey: 'alert.armywormDesc' },
    '3': { titleKey: 'alert.soilPHTitle', descKey: 'alert.soilPHDesc' },
    '4': { titleKey: 'alert.irrigationTitle', descKey: 'alert.irrigationDesc' },
    '5': { titleKey: 'alert.fertilizerTitle', descKey: 'alert.fertilizerDesc' },
    '6': { titleKey: 'alert.waterStressTitle', descKey: 'alert.waterStressDesc' },
  };

  const keys = alertKeyMap[alert.id];
  if (keys) {
    return {
      ...alert,
      title: t(keys.titleKey, language as any),
      description: t(keys.descKey, language as any),
    };
  }
  return alert;
}

export default function AlertsPage() {
  const { language } = useLanguage();
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityFilter>('all');
  const { data: apiAlerts, loading, error } = useAlerts();

  // Use API data if available, fallback to mock data
  const allAlerts = (apiAlerts || ALERTS).map((alert) => getTranslatedAlert(alert, language));

  const filteredAlerts = selectedSeverity === 'all'
    ? allAlerts
    : allAlerts.filter((a) => (a as Alert).severity === selectedSeverity);

  // Sort by severity and timestamp
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    const severityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    const aSeverity = (a as Alert).severity as string;
    const bSeverity = (b as Alert).severity as string;
    const severityDiff = (severityOrder[aSeverity] ?? 999) - (severityOrder[bSeverity] ?? 999);
    return severityDiff !== 0 ? severityDiff : (b as Alert).timestamp.getTime() - (a as Alert).timestamp.getTime();
  });

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">{t('alerts.title', language)}</h1>
        <p className="text-muted-foreground mt-1">
          {sortedAlerts.length} {selectedSeverity === 'all' ? '' : selectedSeverity} alerts
        </p>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
          <button
            key={severity}
            onClick={() => setSelectedSeverity(severity as SeverityFilter)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedSeverity === severity
                ? 'bg-primary/20 text-primary border border-primary'
                : 'bg-muted hover:bg-muted/80 text-foreground border border-muted'
            }`}
          >
            {severity === 'all' ? 'All' : t(`alerts.${severity}`, language)}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {sortedAlerts.length === 0 ? (
          <DashboardCard title={t('alerts.noAlerts', language)} variant="success">
            <p className="text-green-600 dark:text-green-400 text-center py-8">{t('alerts.noAlerts', language)}</p>
          </DashboardCard>
        ) : (
          sortedAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <DashboardCard
                title={alert.title}
                className="cursor-pointer hover:shadow-md"
                variant={alert.severity === 'critical' || alert.severity === 'high' ? 'alert' : 'default'}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    {alert.severity === 'critical' ? (
                      <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-red-600 dark:text-red-300" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-300" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                        <SeverityBadge severity={alert.severity} />
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(alert.timestamp)}
                      </span>
                    </div>

                    <p className="text-foreground mb-3">{alert.description}</p>

                    {alert.cropName && (
                      <div className="mb-3">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {alert.cropName}
                        </span>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        {alert.action}
                      </Button>
                      {alert.voiceUrl && (
                        <Button size="sm" variant="outline">Listen</Button>
                      )}
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          ))
        )}
      </div>

      {/* Alert Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <DashboardCard title={t('alerts.critical', language)}>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {ALERTS.filter((a) => a.severity === 'critical').length}
          </p>
        </DashboardCard>
        <DashboardCard title={t('alerts.high', language)}>
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {ALERTS.filter((a) => a.severity === 'high').length}
          </p>
        </DashboardCard>
        <DashboardCard title={t('alerts.medium', language)}>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {ALERTS.filter((a) => a.severity === 'medium').length}
          </p>
        </DashboardCard>
        <DashboardCard title={t('alerts.low', language)}>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {ALERTS.filter((a) => a.severity === 'low').length}
          </p>
        </DashboardCard>
      </div>
    </div>
  );
}
