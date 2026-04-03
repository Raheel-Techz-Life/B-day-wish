'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { IoTSensorCard } from '@/components/iot-sensor-card';
import { DashboardCard } from '@/components/dashboard-card';
import { YieldOptimizationChart } from '@/components/yield-optimization-chart';
import { IOT_SENSORS, PRECISION_AGRICULTURE } from '@/lib/constants';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, TrendingUp, Droplets, Target } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

export default function PrecisionAgriculturePage() {
  const { language } = useLanguage();
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-primary">{t('precision.title', language)}</h1>
        <p className="text-muted-foreground mt-2">{t('precision.description', language)}</p>
      </motion.div>

      {/* IoT Sensors Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            {t('precision.iotSensorNetwork', language)}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {IOT_SENSORS.map((sensor) => (
            <IoTSensorCard key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </motion.div>

      {/* Field-level Optimization */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />Field Optimization</h2>
        </div>
        <div className="space-y-6">
          {PRECISION_AGRICULTURE.map((field, idx) => (
            <Card key={field.fieldId} className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{field.fieldName}</h3>
                  <p className="text-sm text-muted-foreground">{field.cropName} • {field.areaSize} hectares</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{field.optimizationScore}%</p>
                  <p className="text-xs text-muted-foreground">Optimization Score</p>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-3">
                <div className="bg-green-50 dark:bg-green-800 p-3 rounded-lg border border-green-200 dark:border-green-600">
                  <p className="text-xs text-green-700 dark:text-green-300 mb-1 font-medium">Current Yield</p>
                  <p className="text-lg font-bold text-green-700 dark:text-green-300">{field.currentYield}</p>
                  <p className="text-xs text-green-600 dark:text-green-400">kg/ha</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-800 p-3 rounded-lg border border-blue-200 dark:border-blue-600">
                  <p className="text-xs text-blue-700 dark:text-blue-300 mb-1 font-medium">Target Yield</p>
                  <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{field.targetYield}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">kg/ha</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-800 p-3 rounded-lg border border-purple-200 dark:border-purple-600">
                  <p className="text-xs text-purple-700 dark:text-purple-300 mb-1 font-medium">Potential Gain</p>
                  <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                    {(((field.targetYield - field.currentYield) / field.currentYield) * 100).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-800 p-3 rounded-lg border border-orange-200 dark:border-orange-600">
                  <p className="text-xs text-orange-700 dark:text-orange-300 mb-1 font-medium">Water Efficiency</p>
                  <p className="text-lg font-bold text-orange-700 dark:text-orange-300">{field.inputEfficiency.waterEfficiency.toFixed(2)}</p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">L/kg</p>
                </div>
              </div>

              {/* Yield Variability Map */}
              <div>
                <h4 className="font-semibold text-sm mb-2">Spatial Yield Variation</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={field.yieldVariabilityMap}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(value: number) => `${value} kg/ha`} />
                    <Bar dataKey="yield" fill="url(#colorGradient)" />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" />
                        <stop offset="95%" stopColor="#86efac" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Recommendations */}
              <div className="pt-3 border-t">
                <h4 className="font-semibold text-sm mb-3">Optimization Recommendations</h4>
                <div className="space-y-2">
                  {field.recommendations.map((rec, i) => (
                    <div key={i} className="bg-primary/5 p-3 rounded-lg text-sm">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium">{rec.practice}</p>
                        <span className="text-primary font-bold">+{rec.potentialYieldGain}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{rec.timeline}</p>
                      <p className="text-xs">Resources: {rec.resources.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Input Efficiency Benchmark */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />Input Efficiency Analysis</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: 'Water Efficiency',
                icon: Droplets,
                data: PRECISION_AGRICULTURE.map((f) => ({
                  field: f.fieldName.split(' - ')[1],
                  efficiency: f.inputEfficiency.waterEfficiency,
                })),
              },
              {
                label: 'Fertilizer Efficiency',
                icon: TrendingUp,
                data: PRECISION_AGRICULTURE.map((f) => ({
                  field: f.fieldName.split(' - ')[1],
                  efficiency: f.inputEfficiency.fertiliserEfficiency,
                })),
              },
              {
                label: 'Pesticide Efficiency',
                icon: Target,
                data: PRECISION_AGRICULTURE.map((f) => ({
                  field: f.fieldName.split(' - ')[1],
                  efficiency: f.inputEfficiency.pesticideEfficiency,
                })),
              },
            ].map((chart, i) => {
              const Icon = chart.icon;
              return (
                <div key={i}>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Icon className="w-4 h-4" /> {chart.label}
                  </h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="field" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="efficiency" stroke="#16a34a" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Yield Optimization Analysis */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />Yield Optimization Analysis</h2>
        </div>
        <YieldOptimizationChart
          data={[
            { input: 45, yield: 5200, field: 'Field A - North' },
            { input: 52, yield: 5400, field: 'Field A - North' },
            { input: 48, yield: 7100, field: 'Field B - South' },
            { input: 55, yield: 7400, field: 'Field B - South' },
            { input: 50, yield: 6800, field: 'Field C - East' },
          ]}
          title="Resource Efficiency vs Yield Performance"
          xAxisLabel="Fertilizer Input (kg/hectare)"
          yAxisLabel="Yield (kg/hectare)"
          targetYield={7000}
        />
      </motion.div>
    </div>
  );
}
