'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ClimateSmartCard } from '@/components/climate-smart-card';
import { ClimateGauge } from '@/components/climate-gauge';
import { RiskTimelineSlider } from '@/components/risk-timeline-slider';
import { CLIMATE_VULNERABILITY, CLIMATE_SMART_ADVISORIES } from '@/lib/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AlertTriangle, TrendingDown, Shield, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

export default function ClimateAdvisorPage() {
  const { language } = useLanguage();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-primary">{t('climate.title', language)}</h1>
        <p className="text-muted-foreground mt-2">{t('climate.description', language)}</p>
      </motion.div>

      {/* Climate Vulnerability Overview */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold">{CLIMATE_VULNERABILITY.regionName}</h2>
              <p className="text-sm text-muted-foreground">{t('climate.regionalClimateRiskAnalysis', language)}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{CLIMATE_VULNERABILITY.overallScore}</p>
              <p className="text-xs text-muted-foreground">{t('climate.vulnerabilityScore', language)}</p>
              <p className={`text-xs font-semibold mt-1 ${CLIMATE_VULNERABILITY.forecastTrend === 'worsening' ? 'text-red-600' : 'text-green-600'}`}>
                {CLIMATE_VULNERABILITY.forecastTrend === 'worsening' ? '📈 ' + t('climate.worsening', language) : '📉 ' + t('climate.improving', language)}
              </p>
            </div>
          </div>

          {/* Vulnerability Gauges */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3">
            <ClimateGauge label={t('climate.droughtRiskLabel', language)} value={CLIMATE_VULNERABILITY.droughtRisk} status={CLIMATE_VULNERABILITY.droughtRisk > 70 ? 'critical' : 'high'} unit="%" />
            <ClimateGauge
              label={t('climate.floodRiskLabel', language)}
              value={CLIMATE_VULNERABILITY.floodRisk}
              status={CLIMATE_VULNERABILITY.floodRisk > 70 ? 'high' : 'medium'}
              unit="%"
            />
            <ClimateGauge
              label={t('climate.heatStress', language)}
              value={CLIMATE_VULNERABILITY.temperatureStressRisk}
              status={CLIMATE_VULNERABILITY.temperatureStressRisk > 70 ? 'critical' : 'high'}
              unit="%"
            />
            <ClimateGauge label={t('climate.pestPressure', language)} value={CLIMATE_VULNERABILITY.pestPressureRisk} status={CLIMATE_VULNERABILITY.pestPressureRisk > 70 ? 'high' : 'medium'} unit="%" />
            <ClimateGauge label={t('climate.diseaseRisk', language)} value={CLIMATE_VULNERABILITY.diseaseRisk} status={CLIMATE_VULNERABILITY.diseaseRisk > 70 ? 'high' : 'medium'} unit="%" />
          </div>

          {/* Vulnerability Trend */}
          <div>
            <h3 className="font-semibold text-sm mb-3">{t('climate.vulnerabilityTrend', language)}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={CLIMATE_VULNERABILITY.historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Risk Summary Cards */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-700">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-200 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">{t('climate.primaryThreats', language)}</h3>
                <ul className="text-sm text-red-800 dark:text-red-100 mt-2 space-y-1">
                  {CLIMATE_VULNERABILITY.droughtRisk > 70 && <li>• Severe drought risk (72%)</li>}
                  {CLIMATE_VULNERABILITY.temperatureStressRisk > 70 && <li>• High temperature stress (68%)</li>}
                  {CLIMATE_VULNERABILITY.pestPressureRisk > 60 && <li>• Increased pest pressure</li>}
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-700 dark:text-blue-200 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">{t('climate.priorityActions', language)}</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-100 mt-2 space-y-1">
                  <li>Promote drought-resistant varieties</li>
                  <li>Build water harvesting infrastructure</li>
                  <li>Strengthen early warning systems</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Risk Timeline */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <RiskTimelineSlider
          data={CLIMATE_VULNERABILITY.historicalData}
          title="Climate Vulnerability Trend"
          description="Historical data with seasonal forecasting insights"
        />
      </motion.div>

      {/* Adaptive Strategies */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {t('climate.adaptiveStrategies', language)}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{t('cropBreeding.description', language)}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {CLIMATE_SMART_ADVISORIES.map((advisory) => (
            <ClimateSmartCard key={advisory.id} item={advisory} />
          ))}
        </div>
      </motion.div>

      {/* Implementation Guide */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            {t('climate.implementationRoadmap', language)}
          </h3>
          <div className="space-y-3">
            {[
              {
                phase: t('climate.phase1Immediate', language),
                actions: ['Start soil moisture monitoring', 'Begin crop residue mulching', 'Set up rainwater collection points'],
              },
              {
                phase: t('climate.phase2ShortTerm', language),
                actions: ['Plant drought-resistant varieties', 'Install drip irrigation system', 'Build check dams in fields'],
              },
              {
                phase: t('climate.phase3MediumTerm', language),
                actions: ['Diversify crops for resilience', 'Establish renewable energy system', 'Build farm pond for water storage'],
              },
            ].map((roadmap, idx) => (
              <div key={idx} className="bg-muted/50 p-4 rounded-lg border border-muted">
                <h4 className="font-semibold mb-2">{roadmap.phase}</h4>
                <ul className="space-y-1 text-sm">
                  {roadmap.actions.map((action, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
