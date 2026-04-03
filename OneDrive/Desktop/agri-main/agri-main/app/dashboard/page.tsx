'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertCircle } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard-card';
import { WeatherWidget } from '@/components/weather-widget';
import { VoiceButton } from '@/components/voice-button';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';
import { useWeather, useAlerts, useCropStatus, useMarketDataForecast, useFinanceData } from '@/hooks/use-api';
import { WEATHER, ALERTS, CROP_STATUS, MARKET_DATA, FINANCE_DATA } from '@/lib/constants';
import { Progress } from '@/components/ui/progress';

// Helper function to translate alert data
function getTranslatedAlert(alert: any, language: string) {
  const alertKeyMap: Record<string, { titleKey: string; descKey: string }> = {
    '1': { titleKey: 'alert.heavyRainTitle', descKey: 'alert.heavyRainDesc' },
    '2': { titleKey: 'alert.armywormTitle', descKey: 'alert.armywormDesc' },
    '3': { titleKey: 'alert.soilPHTitle', descKey: 'alert.soilPHDesc' },
    '4': { titleKey: 'alert.irrigationTitle', descKey: 'alert.irrigationDesc' },
    '5': { titleKey: 'alert.fertilizerTitle', descKey: 'alert.fertilizerDesc' },
    '6': { titleKey: 'alert.waterStressTitle', descKey: 'alert.waterStressDesc' },
  };

  const keys = alertKeyMap[alert.id];
  if (keys) {
    return {
      ...alert,
      title: t(keys.titleKey, language as any),
      description: t(keys.descKey, language as any),
    };
  }
  return alert;
}

// Helper function to translate crop names
function getTranslatedCropName(cropName: string, language: string): string {
  const cropKeyMap: Record<string, string> = {
    'Rice': 'crop.rice',
    'Maize': 'crop.maize',
    'Wheat': 'crop.wheat',
    'Cotton': 'crop.cotton',
    'Tomato': 'crop.tomato',
  };

  const key = cropKeyMap[cropName];
  return key ? t(key, language as any) : cropName;
}

export default function DashboardPage() {
  const { language } = useLanguage();
  const weatherState = useWeather();
  const alertsState = useAlerts();
  const cropsState = useCropStatus();
  const marketState = useMarketDataForecast();
  const financeState = useFinanceData();

  // Use API data if available, fallback to mock data
  const weather = weatherState.data || WEATHER;
  const alerts = (alertsState.data || ALERTS).map((alert) => getTranslatedAlert(alert, language));
  const crops = cropsState.data || CROP_STATUS;
  const marketForecast = marketState.data || MARKET_DATA;
  const finance = financeState.data || FINANCE_DATA;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('dashboard.title', language)}</h1>
        <VoiceButton />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <WeatherWidget data={weather} />

        <DashboardCard
          title={t('dashboard.alerts', language)}
          icon={<AlertCircle className="w-5 h-5" />}
          variant={alerts.length > 0 ? 'alert' : 'success'}
        >
          <div className="space-y-2">
            {alerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="text-sm">
                <p className="font-medium">{alert.title}</p>
                <p className="text-muted-foreground text-xs">{alert.description}</p>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">{t('dashboard.yourCrops', language)}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {crops.map((crop) => (
            <DashboardCard key={crop.id} title={getTranslatedCropName(crop.cropName, language)} variant="secondary">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.health', language)}</p>
                  <Progress value={crop.health} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{t('dashboard.soilMoisture', language)}</p>
                  <Progress value={crop.soilMoisture} />
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard title={t('dashboard.marketPriceForecast', language)} icon={<TrendingUp className="w-5 h-5" />}>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={MARKET_DATA.rice.forecast}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="price" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>

        <DashboardCard title={t('dashboard.monthlyFlowCashFlow', language)} icon={<TrendingUp className="w-5 h-5" />}>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={finance.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#10b981" />
                <Bar dataKey="expenses" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
