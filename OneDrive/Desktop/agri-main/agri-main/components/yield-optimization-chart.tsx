'use client';

import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/card';

interface YieldOptimizationChartProps {
  data: { input: number; yield: number; field: string }[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  targetYield?: number;
}

export function YieldOptimizationChart({
  data,
  title = 'Yield vs Resource Input',
  xAxisLabel = 'Resource Input (Units)',
  yAxisLabel = 'Yield (kg/hectare)',
  targetYield = 7000,
}: YieldOptimizationChartProps) {
  const avgYield = data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.yield, 0) / data.length) : 0;
  const maxYield = data.length > 0 ? Math.max(...data.map((d) => d.yield)) : 0;
  const efficiency = data.length > 0 ? Math.round((avgYield / targetYield) * 100) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-muted/30 p-2 rounded text-center border border-muted">
              <p className="text-xs text-muted-foreground">Current Average</p>
              <p className="text-lg font-bold text-primary">{avgYield}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded text-center border border-muted">
              <p className="text-xs text-muted-foreground">Peak Yield</p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{maxYield}</p>
            </div>
            <div className="bg-muted/30 p-2 rounded text-center border border-muted">
              <p className="text-xs text-muted-foreground">Efficiency</p>
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{efficiency}%</p>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="input" name={xAxisLabel} tick={{ fontSize: 12 }} />
            <YAxis dataKey="yield" name={yAxisLabel} tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              cursor={{ fill: 'rgba(0,0,0,0.1)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card p-2 rounded border border-border text-xs">
                      <p className="font-semibold">{data.field}</p>
                      <p>{xAxisLabel}: {data.input}</p>
                      <p>{yAxisLabel}: {data.yield}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={targetYield}
              stroke="var(--color-secondary)"
              strokeDasharray="3 3"
              label={{ value: `Target: ${targetYield}`, position: 'right', fill: 'var(--color-muted-foreground)' }}
            />
            <Scatter name="Field Performance" data={data} fill="var(--color-primary)" />
            <Legend />
          </ScatterChart>
        </ResponsiveContainer>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>Scatter points show yield achievement at different resource input levels.</p>
          <p>Dashed line indicates your target yield benchmark.</p>
        </div>
      </Card>
    </motion.div>
  );
}
