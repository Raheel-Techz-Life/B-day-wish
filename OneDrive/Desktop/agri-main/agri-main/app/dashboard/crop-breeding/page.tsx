'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { CropVarietyCard } from '@/components/crop-variety-card';
import { CROP_VARIETIES } from '@/lib/constants';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Sprout, TrendingUp, Award, Zap } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

export default function CropBreedingPage() {
  const { language } = useLanguage();
  // Prepare data for resilience comparison
  const resilienceComparison = CROP_VARIETIES.map((variety) => ({
    name: variety.name,
    drought: variety.climateResilience.drought,
    flood: variety.climateResilience.flood,
    heat: variety.climateResilience.heat,
    pest: variety.climateResilience.pest,
    disease: variety.climateResilience.disease,
  }));

  // Yield potential comparison
  const yieldComparison = CROP_VARIETIES.map((variety) => ({
    name: variety.name.substring(0, 12),
    yield: variety.yieldPotential,
    water: variety.waterRequirement,
  }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold text-primary">{t('cropBreeding.title', language)}</h1>
        <p className="text-muted-foreground mt-2">{t('cropBreeding.description', language)}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <h1 className="text-3xl font-bold text-primary">Crop Breeding Insights</h1>
        <p className="text-muted-foreground mt-2">Climate-resilient crop varieties adapted to your region</p>
      </motion.div>

      {/* Overview Statistics */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              icon: Sprout,
              label: 'Total Varieties',
              value: CROP_VARIETIES.length,
              color: 'text-green-600',
            },
            {
              icon: Award,
              label: 'Certified Varieties',
              value: CROP_VARIETIES.filter((v) => v.certifications.length > 0).length,
              color: 'text-blue-600',
            },
            {
              icon: TrendingUp,
              label: 'Avg Yield Potential',
              value: `${Math.round(CROP_VARIETIES.reduce((sum, v) => sum + v.yieldPotential, 0) / CROP_VARIETIES.length)} kg/ha`,
              color: 'text-orange-600',
            },
            {
              icon: Zap,
              label: 'High Resilience',
              value: CROP_VARIETIES.filter((v) => {
                const avg = (v.climateResilience.drought + v.climateResilience.flood + v.climateResilience.heat + v.climateResilience.pest + v.climateResilience.disease) / 5;
                return avg > 80;
              }).length,
              color: 'text-red-600',
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="p-4 text-center">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Climate Resilience Comparison */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Climate Resilience Comparison</h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={resilienceComparison}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Drought Resistance" dataKey="drought" stroke="#16a34a" fill="#16a34a" fillOpacity={0.1} />
              <Radar name="Flood Tolerance" dataKey="flood" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Radar name="Heat Tolerance" dataKey="heat" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
              <Radar name="Pest Resistance" dataKey="pest" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
              <Radar name="Disease Resistance" dataKey="disease" stroke="#ec4899" fill="#ec4899" fillOpacity={0.1} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Yield vs Water Efficiency */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Yield Potential & Water Efficiency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yieldComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} label={{ value: 'Yield (kg/ha)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} label={{ value: 'Water (mm)', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="yield" fill="#16a34a" name="Yield Potential (kg/ha)" />
              <Bar yAxisId="right" dataKey="water" fill="#3b82f6" name="Water Requirement (mm)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Variety Selection Matrix */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Climate-Resilient Crop Varieties</h2>
          <p className="text-sm text-muted-foreground mt-1">Explore detailed profiles of each variety</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {CROP_VARIETIES.map((variety) => (
            <CropVarietyCard key={variety.id} variety={variety} />
          ))}
        </div>
      </motion.div>

      {/* Selection Guide */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">How to Choose the Right Variety</h3>
          <div className="space-y-4">
            {[
              {
                title: '1. Assess Your Climate Risk',
                description: 'Review the Climate-Smart Advisor page to understand your region\'s primary threats (drought, flood, heat)',
              },
              {
                title: '2. Match Resilience Scores',
                description: 'Select varieties with high scores in your region\'s threat areas (e.g., if drought is high, choose drought-resistant varieties)',
              },
              {
                title: '3. Consider Yield Potential',
                description: 'Balance resilience with yield - varieties offering 80%+ resilience with good yield potential are optimal',
              },
              {
                title: '4. Check Soil & Water Requirements',
                description: 'Ensure the variety matches your soil type and available water resources',
              },
              {
                title: '5. Verify Market Demand',
                description: 'Choose varieties with high market demand to ensure profitable sales',
              },
              {
                title: '6. Check Government Support',
                description: 'Certified and approved varieties often have access to government subsidies and seed programs',
              },
            ].map((guide, i) => (
              <div key={i} className="border-l-4 border-primary pl-4">
                <h4 className="font-semibold text-sm">{guide.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Regional Suitability */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Regional Suitability Map</h3>
          <div className="space-y-3">
            {[...new Set(CROP_VARIETIES.flatMap((v) => v.suitableRegions))].map((region) => (
              <div key={region} className="bg-muted/50 p-4 rounded-lg border border-muted">
                <h4 className="font-semibold text-sm mb-2">{region}</h4>
                <div className="flex flex-wrap gap-2">
                  {CROP_VARIETIES.filter((v) => v.suitableRegions.includes(region)).map((variety) => (
                    <span key={variety.id} className="bg-primary/10 text-primary px-3 py-1 rounded text-xs font-medium">
                      {variety.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
