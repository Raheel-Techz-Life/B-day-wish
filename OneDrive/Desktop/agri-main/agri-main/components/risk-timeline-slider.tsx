'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RiskTimelineSliderProps {
  data: { date: string; score: number }[];
  title?: string;
  description?: string;
}

export function RiskTimelineSlider({ data, title = 'Climate Risk Timeline', description }: RiskTimelineSliderProps) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: Math.min(4, data.length) });

  const visibleData = data.slice(visibleRange.start, visibleRange.end);
  const canGoBack = visibleRange.start > 0;
  const canGoForward = visibleRange.end < data.length;

  const handlePrevious = () => {
    if (canGoBack) {
      setVisibleRange((prev) => ({
        start: Math.max(0, prev.start - 1),
        end: Math.max(4, prev.end - 1),
      }));
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setVisibleRange((prev) => ({
        start: prev.start + 1,
        end: Math.min(data.length, prev.end + 1),
      }));
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>

        <div className="space-y-4">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={visibleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                formatter={(value) => `${value}/100`}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={!canGoBack}
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <span className="text-xs text-muted-foreground">
              {visibleRange.start + 1} - {visibleRange.end} of {data.length}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={!canGoForward}
              className="gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
