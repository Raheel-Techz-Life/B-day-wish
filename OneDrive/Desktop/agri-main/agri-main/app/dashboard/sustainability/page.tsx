'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, PieChart, Pie } from 'recharts';
import { Leaf, Droplets, AlertTriangle, TrendingUp, Zap, Cloud, Shield } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard-card';
import { RenewableEnergyWidget } from '@/components/renewable-energy-widget';
import { ClimateGauge } from '@/components/climate-gauge';
import { GREEN_SCORE, RENEWABLE_ENERGY_DATA, CLIMATE_VULNERABILITY } from '@/lib/constants';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

export default function SustainabilityPage() {
  const { language } = useLanguage();
  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const scoreVariant = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'default';
    return 'alert';
  };

  const pieData = [
    { name: 'Soil Health', value: GREEN_SCORE.soilHealth.score },
    { name: 'Water Usage', value: GREEN_SCORE.waterUsage.score },
    { name: 'Pesticide Impact', value: GREEN_SCORE.pesticideImpact.score },
  ];

  const COLORS = ['var(--color-chart-1)', 'var(--color-chart-2)', 'var(--color-chart-3)'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">{t('sustainability.title', language)}</h1>
        <p className="text-muted-foreground mt-1">{t('sustainability.description', language)}</p>
      </motion.div>

      {/* Overall Green Score */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <DashboardCard
          title={t('sustainability.greenScore', language)}
          variant={scoreVariant(GREEN_SCORE.overallScore)}
          icon={<Leaf className="w-5 h-5 text-green-500" />}
        >
          <div className="flex flex-col items-center py-8">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={GREEN_SCORE.overallScore >= 80 ? '#16a34a' : GREEN_SCORE.overallScore >= 60 ? '#eab308' : '#dc2626'}
                  strokeWidth="8"
                  strokeDasharray={`${(GREEN_SCORE.overallScore / 100) * 339.3} 339.3`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <div className={`text-5xl font-bold ${scoreColor(GREEN_SCORE.overallScore)}`}>
                  {GREEN_SCORE.overallScore}
                </div>
                <p className="text-sm text-muted-foreground">/ 100</p>
              </div>
            </div>
            <p className="text-center text-muted-foreground max-w-sm">
              {t('sustainability.yourFarmPerfoming', language)} {
                GREEN_SCORE.overallScore >= 80 ? t('sustainability.excellently', language) : 
                GREEN_SCORE.overallScore >= 60 ? t('sustainability.well', language) : 
                t('sustainability.needsImprovement', language)
              } {t('sustainability.inSustainablePractices', language)}
            </p>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Soil Health */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardCard
            title={t('sustainability.soilHealth', language)}
            icon={<Leaf className="w-5 h-5" />}
            variant={scoreVariant(GREEN_SCORE.soilHealth.score)}
          >
            <div className="space-y-4">
              <div className="text-center">
                <p className={`text-4xl font-bold ${scoreColor(GREEN_SCORE.soilHealth.score)}`}>
                  {GREEN_SCORE.soilHealth.score}
                </p>
              </div>
              <div className="space-y-2">
                {GREEN_SCORE.soilHealth.metrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Water Usage */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard
            title={t('sustainability.waterUsage', language)}
            icon={<Droplets className="w-5 h-5 text-blue-500" />}
            variant={scoreVariant(GREEN_SCORE.waterUsage.score)}
          >
            <div className="space-y-4">
              <div className="text-center">
                <p className={`text-4xl font-bold ${scoreColor(GREEN_SCORE.waterUsage.score)}`}>
                  {GREEN_SCORE.waterUsage.score}
                </p>
              </div>
              <div className="space-y-2">
                {GREEN_SCORE.waterUsage.metrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Pesticide Impact */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard
            title="Pesticide Impact"
            icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
            variant={scoreVariant(GREEN_SCORE.pesticideImpact.score)}
          >
            <div className="space-y-4">
              <div className="text-center">
                <p className={`text-4xl font-bold ${scoreColor(GREEN_SCORE.pesticideImpact.score)}`}>
                  {GREEN_SCORE.pesticideImpact.score}
                </p>
              </div>
              <div className="space-y-2">
                {GREEN_SCORE.pesticideImpact.metrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{metric.label}</span>
                      <span className="text-xs font-medium">{metric.value}%</span>
                    </div>
                    <Progress value={metric.value} className="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Score Breakdown Pie Chart */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <DashboardCard title="Category Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}/100`} />
            </PieChart>
          </ResponsiveContainer>
        </DashboardCard>
      </motion.div>

      {/* Green Score Trend */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <DashboardCard title="Green Score Trend (Last 5 Weeks)" icon={<TrendingUp className="w-5 h-5 text-green-500" />}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={GREEN_SCORE.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                formatter={(value) => `${value}/100`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', r: 5 }}
                activeDot={{ r: 7 }}
                name="Green Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </motion.div>

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <DashboardCard title="Recommendations for Improvement">
          <div className="space-y-3">
            {GREEN_SCORE.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border border-green-200 dark:border-green-800"
              >
                <div className="flex-shrink-0 text-xl">
                  {index === 0 && '💧'}
                  {index === 1 && '🌱'}
                  {index === 2 && '🦋'}
                  {index === 3 && '♻️'}
                </div>
                <p className="text-sm text-foreground">{recommendation}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>

      {/* Renewable Energy Integration */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />Renewable Energy Systems</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {RENEWABLE_ENERGY_DATA.map((energy) => (
            <RenewableEnergyWidget key={energy.id} data={energy} />
          ))}
        </div>
      </motion.div>

      {/* Climate Adaptation Resilience */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <DashboardCard title="Climate Adaptation Resilience" icon={<Shield className="w-5 h-5 text-primary" />}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Your farm resilience to climate threats</p>
            <div className="grid md:grid-cols-3 gap-3">
              <ClimateGauge label="Adaptation Score" value={78} status="high" unit="/100" />
              <ClimateGauge label="Water Security" value={82} status="low" unit="/100" />
              <ClimateGauge label="Biodiversity Protection" value={75} status="medium" unit="/100" />
            </div>
            <div className="pt-4 border-t space-y-2">
              <h4 className="font-semibold text-sm">Adaptation Measures Implemented</h4>
              <div className="space-y-2">
                {[
                  { item: 'Rainwater harvesting system', status: '✅ Active' },
                  { item: 'Crop diversification program', status: '✅ In progress' },
                  { item: 'Soil conservation practices', status: '✅ Active' },
                  { item: 'Renewable energy sources', status: '✅ Installed' },
                ].map((measure, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{measure.item}</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{measure.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Impact Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
        <DashboardCard title="Environmental Impact Summary">
          <div className="space-y-4">
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Carbon Footprint</p>
              <p className="text-2xl font-bold text-primary">2.3 Tons CO₂/Hectare</p>
              <p className="text-xs text-muted-foreground mt-1">Industry Average: 3.1 Tons CO₂/Hectare</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Water Consumption</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4,500 Liters/Hectare</p>
              <p className="text-xs text-muted-foreground mt-1">Your best practices are reducing water use</p>
            </div>
            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Biodiversity Index</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">7.8 / 10</p>
              <p className="text-xs text-muted-foreground mt-1">Consider crop rotation and organic practices</p>
            </div>
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
