'use client';

import { Card } from '@/components/ui/card';
import type { CropVariety } from '@/lib/types';
import { CheckCircle2, Droplets, Zap } from 'lucide-react';

interface CropVarietyCardProps {
  variety: CropVariety;
}

export function CropVarietyCard({ variety }: CropVarietyCardProps) {
  const avgResilience =
    (variety.climateResilience.drought +
      variety.climateResilience.flood +
      variety.climateResilience.heat +
      variety.climateResilience.pest +
      variety.climateResilience.disease) /
    5;

  return (
    <Card className="p-4 space-y-3">
      <div className="space-y-1">
        <h3 className="font-semibold">{variety.name}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="bg-primary/10 px-2 py-1 rounded">{variety.parentCrop}</span>
          <span>Maturity: {variety.maturityPeriod} days</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="bg-blue-50 dark:bg-blue-950 p-2 rounded">
          <p className="text-blue-700 dark:text-blue-300 font-bold">{variety.yieldPotential}</p>
          <p className="text-xs text-muted-foreground">kg/ha</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950 p-2 rounded">
          <p className="text-orange-700 dark:text-orange-300 font-bold">₹{variety.price}</p>
          <p className="text-xs text-muted-foreground">per kg</p>
        </div>
        <div className="bg-green-50 dark:bg-green-950 p-2 rounded">
          <p className="text-green-700 dark:text-green-300 font-bold">{Math.round(avgResilience)}%</p>
          <p className="text-xs text-muted-foreground">Resilience</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Climate Resilience Scores</span>
          </div>
          <div className="space-y-1 text-xs">
            {Object.entries(variety.climateResilience).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-muted-foreground capitalize">{key}</span>
                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-2 border-t space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <Droplets className="w-3 h-3 text-blue-600" />
          <span>Water: {variety.waterRequirement} mm</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Soil: {variety.soilTypeRequirement}</span>
        </div>
        {variety.certifications.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {variety.certifications.map((cert) => (
              <span key={cert} className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-0.5 rounded text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {cert}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
