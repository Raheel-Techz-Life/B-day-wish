'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { REGIONAL_CLIMATE_RISKS } from '@/lib/constants';
import { AlertCircle, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

const riskIcons = {
  low: CheckCircle2,
  medium: AlertTriangle,
  high: AlertTriangle,
  critical: AlertCircle,
};

const riskColors = {
  low: { bg: 'bg-green-50 dark:bg-green-800', border: 'border-green-200 dark:border-green-600', text: 'text-green-700 dark:text-green-300' },
  medium: {
    bg: 'bg-yellow-50 dark:bg-yellow-800',
    border: 'border-yellow-200 dark:border-yellow-600',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  high: { bg: 'bg-orange-50 dark:bg-orange-800', border: 'border-orange-200 dark:border-orange-600', text: 'text-orange-700 dark:text-orange-300' },
  critical: { bg: 'bg-red-50 dark:bg-red-800', border: 'border-red-200 dark:border-red-600', text: 'text-red-700 dark:text-red-300' },
};

export default function GISMapPage() {
  const { language } = useLanguage();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-primary">{t('gis.title', language)}</h1>
        <p className="text-muted-foreground mt-2">Regional climate threat visualization with historical climate events</p>
      </motion.div>

      {/* Map Legend */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card className="p-4">
          <h3 className="font-semibold text-sm mb-3">Risk Level Legend</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['low', 'medium', 'high', 'critical'] as const).map((level) => {
              const colors = riskColors[level];
              return (
                <div key={level} className={`p-3 rounded border ${colors.bg} ${colors.border}`}>
                  <p className="text-xs font-semibold capitalize">{level}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {level === 'low' && '0-25%'} {level === 'medium' && '25-50%'} {level === 'high' && '50-75%'} {level === 'critical' && '75-100%'}
                  </p>
                </div>
              );
            })}
            </div>
          </Card>
        </motion.div>

      {/* Regional Risk Cards */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="space-y-4">
          {REGIONAL_CLIMATE_RISKS.map((region, idx) => {
            const Icon = riskIcons[region.riskLevel];
            const colors = riskColors[region.riskLevel];

            return (
              <motion.div key={region.regionId} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }}>
                <Card className={`p-6 border-l-4 ${colors.bg} ${colors.border}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-5 h-5" />
                        <h3 className="text-lg font-semibold">{region.regionName}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        📍 Coordinates: {region.coordinates.lat.toFixed(4)}°N, {region.coordinates.lng.toFixed(4)}°E
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl font-bold ${colors.text}`}>
                        {region.riskLevel === 'low' && '🟢'}
                        {region.riskLevel === 'medium' && '🟡'}
                        {region.riskLevel === 'high' && '🟠'}
                        {region.riskLevel === 'critical' && '🔴'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{region.riskLevel} Risk</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Primary Threats */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />Climate Threats</h4>
                      <ul className="space-y-1 text-sm">
                        {region.primaryThreats.map((threat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {threat}
                          </li>
                ))}
              </ul>
                    </div>

                    {/* Affected Population */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />Impact Scale</h4>
                      <div className="bg-primary/10 p-3 rounded">
                        <p className="text-2xl font-bold text-primary">{(region.affectedPopulation / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-muted-foreground">Affected Population</p>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold text-sm mb-2">Recommended Actions</h4>
                    <ul className="grid md:grid-cols-2 gap-2">
                      {region.recommendedActions.map((action, i) => (
                        <li key={i} className="text-sm flex items-start gap-2">
                          <span className="text-primary font-bold mt-0.5">✓</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Historical Impact */}
                  {region.historicalImpact.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold text-sm mb-2">Historical Climate Events</h4>
                      <div className="space-y-2">
                        {region.historicalImpact.map((impact, i) => (
                          <div key={i} className="bg-muted/50 p-2 rounded text-xs">
                            <p className="font-medium">{impact.year}</p>
                            <p className="text-muted-foreground">{impact.damage}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Risk Summary Statistics */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Regional Risk Summary</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              {
                label: 'Critical Regions',
                value: REGIONAL_CLIMATE_RISKS.filter((r) => r.riskLevel === 'critical').length,
                icon: '🔴',
              },
              {
                label: 'High Risk Regions',
                value: REGIONAL_CLIMATE_RISKS.filter((r) => r.riskLevel === 'high').length,
                icon: '🟠',
              },
              {
                label: 'Total Affected Population',
                value: `${(REGIONAL_CLIMATE_RISKS.reduce((sum, r) => sum + r.affectedPopulation, 0) / 1000000).toFixed(1)}M`,
                icon: '👥',
              },
              {
                label: 'Unique Threats',
                value: new Set(REGIONAL_CLIMATE_RISKS.flatMap((r) => r.primaryThreats)).size,
                icon: '⚠️',
              },
            ].map((stat, i) => (
              <div key={i} className="bg-muted/30 p-4 rounded-lg text-center border border-muted">
                <p className="text-2xl mb-2">{stat.icon}</p>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Interactive Notes */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <Card className="p-6 bg-primary/5 border-primary/20">
          <h3 className="font-semibold mb-3">How to Use This Map</h3>
          <ul className="space-y-2 text-sm">
            <li>• <span className="font-medium">Identify high-risk areas:</span> Focus adaptation efforts on regions most vulnerable to climate threats.</li>
            <li>
              • <span className="font-medium">Plan infrastructure:</span> Build water harvesting and early warning systems to reduce climate impact.</li>
            <li>
              • <span className="font-medium">Crop selection:</span> Choose climate-resilient varieties suitable for your region.</li>
            <li>
              • <span className="font-medium">Government support:</span> Connect with local agricultural offices for climate adaptation programs.</li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
