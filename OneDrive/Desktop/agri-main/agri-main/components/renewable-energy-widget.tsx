'use client';

import { Card } from '@/components/ui/card';
import type { RenewableEnergyData } from '@/lib/types';
import { Zap, TrendingUp, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RenewableEnergyWidgetProps {
  data: RenewableEnergyData;
}

const typeLabels: Record<string, string> = {
  solar: '☀️ Solar',
  biogas: '🔥 Biogas',
  wind: '💨 Wind',
  hybrid: '⚡ Hybrid',
};

export function RenewableEnergyWidget({ data }: RenewableEnergyWidgetProps) {
  return (
    <Card className="p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{typeLabels[data.type]}</h3>
          <p className="text-sm text-muted-foreground">Capacity: {data.installedCapacity} kW</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{data.currentGeneration.toFixed(1)} kW</p>
          <p className="text-xs text-muted-foreground">Current output</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-xs font-medium">Daily Generation</span>
          </div>
          <p className="text-lg font-bold text-green-700">{data.dailyGeneration} kWh</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-medium">CO₂ Offset</span>
          </div>
          <p className="text-lg font-bold text-blue-700">{data.co2Offset} kg</p>
        </div>

        <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-medium">Efficiency</span>
          </div>
          <p className="text-lg font-bold text-purple-700">{data.efficiencyRate}%</p>
        </div>

        <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium">Monthly Savings</span>
          </div>
          <p className="text-lg font-bold text-orange-700">₹{data.energySavings.toLocaleString()}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data.generationTrend}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value: number) => `${value} kWh`} />
          <Bar dataKey="generation" fill="url(#colorGradient)" />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" />
              <stop offset="95%" stopColor="#86efac" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      <div className="pt-2 border-t">
        <p className="text-xs text-muted-foreground">Status: {data.maintenanceStatus === 'good' ? '✅ Good' : '⚠️ Needs Service'}</p>
      </div>
    </Card>
  );
}
