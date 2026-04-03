'use client';

import { Card } from '@/components/ui/card';
import type { ClimateSmartAdvisoryItem } from '@/lib/types';
import { TrendingUp, Zap, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClimateSmartCardProps {
  item: ClimateSmartAdvisoryItem;
}

export function ClimateSmartCard({ item }: ClimateSmartCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="p-4 space-y-3 hover:shadow-md transition-shadow">
        <div>
          <h4 className="font-semibold text-sm mb-1">{item.strategy}</h4>
          <p className="text-xs text-muted-foreground">{item.cropName} crop</p>
        </div>

        <p className="text-sm text-foreground">{item.description}</p>

        <div className="space-y-2">
          <div className="bg-primary/10 p-2 rounded text-xs">
            <p className="font-medium text-primary">💡 Impact: {item.impact}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span>+{item.expectedYieldImprovement}% yield</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-blue-600" />
            <span>₹{item.implementationCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-orange-600" />
            <span>{item.timeToImplement}</span>
          </div>
        </div>

        {item.resilientVarieties && item.resilientVarieties.length > 0 && (
          <div className="pt-2 border-t">
            <p className="text-xs font-medium mb-1">🌱 Recommended Varieties:</p>
            <div className="flex flex-wrap gap-1">
              {item.resilientVarieties.map((variety) => (
                <span key={variety} className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-1 rounded text-xs">
                  {variety}
                </span>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
