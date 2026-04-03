'use client';

import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, CheckCircle2 } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard-card';
import { CropSelector } from '@/components/crop-selector';
import { Button } from '@/components/ui/button';
import { useMarketData, useMarketDataForecast } from '@/hooks/use-api';
import { MARKET_DATA } from '@/lib/constants';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';
import { useState } from 'react';

export default function MarketPage() {
  const { language } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const crops = Object.keys(MARKET_DATA);
  
  // Convert selected crop to lowercase for MARKET_DATA lookup
  const cropKey = selectedCrop.toLowerCase() as keyof typeof MARKET_DATA;
  
  // Use API data if available, fallback to mock data
  const { data: apiMarketData } = useMarketData(cropKey);
  const data = apiMarketData || MARKET_DATA[cropKey] || MARKET_DATA.rice;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">{t('market.title', language)}</h1>
        <p className="text-muted-foreground mt-1">{t('market.description', language)}</p>
      </motion.div>

      {/* Crop Selector */}
      <div className="max-w-xs">
        <label className="block text-sm font-medium text-foreground mb-2">{t('market.selectCrop', language)}</label>
        <CropSelector onSelect={setSelectedCrop} defaultCrop="Rice" />
      </div>

      {/* Current Price and Recommendation */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Current Price Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardCard title={`${data.cropName} ${t('market.priceTitle', language)}`} icon={<TrendingUp className="w-5 h-5" />}>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">{t('market.currentPrice', language)}</p>
                <p className="text-4xl font-bold text-primary">₹{data.currentPrice}</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm mb-2">{t('market.change30Day', language)}</p>
                <p className="text-xl font-semibold text-green-600 dark:text-green-400">
                  +₹{data.currentPrice - data.historicalData[0].price}
                  <span className="text-sm ml-2">
                    (+{(((data.currentPrice - data.historicalData[0].price) / data.historicalData[0].price) * 100).toFixed(1)}%)
                  </span>
                </p>
              </div>
            </div>
          </DashboardCard>
        </motion.div>

        {/* Best Time to Sell */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardCard title="Best Time to Sell" variant="success" icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Recommended Date</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {data.bestTimeToSell.date}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-2">Confidence Level</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{ width: `${data.bestTimeToSell.confidence}%` }}
                    />
                  </div>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {data.bestTimeToSell.confidence}%
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-foreground italic">{data.bestTimeToSell.reason}</p>
              </div>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Price Forecast Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <DashboardCard title={`${data.cropName} Price Forecast (Next 7 Days)`}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data.forecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                formatter={(value) => `₹${value}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', r: 5 }}
                activeDot={{ r: 7 }}
                name="Predicted Price"
                yAxisId="left"
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="var(--color-secondary)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-secondary)', r: 4 }}
                name="Confidence %"
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>
      </motion.div>

      {/* Historical Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DashboardCard title="Historical Price Data">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Price</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {data.historicalData.map((item, index) => {
                  const prevPrice = index > 0 ? data.historicalData[index - 1].price : item.price;
                  const change = item.price - prevPrice;
                  const changePercent = ((change / prevPrice) * 100).toFixed(1);

                  return (
                    <tr key={index} className="border-b border-border hover:bg-muted/50 transition">
                      <td className="py-3 px-4 text-foreground">{item.date}</td>
                      <td className="text-right py-3 px-4 font-medium text-foreground">₹{item.price}</td>
                      <td className={`text-right py-3 px-4 font-medium ${
                        change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {change >= 0 ? '+' : ''}{change} ({changePercent}%)
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <DashboardCard title="Market Insights & Trends">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Supply Trend</h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                {data.cropName} supply is expected to decrease in the coming week, pushing prices upward.
              </p>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">Demand Outlook</h4>
              <p className="text-sm text-green-800 dark:text-green-300">Strong demand from mills and export markets</p>
            </div>
            <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">Recommended Action</h4>
              <p className="text-sm text-purple-800 dark:text-purple-300">
                Hold your stock until {data.bestTimeToSell.date} for maximum returns, as price momentum is expected to accelerate.
              </p>
            </div>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Compare Crops */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <DashboardCard title="Compare Crops">
          <div className="space-y-3">
            {crops.map((crop) => {
              const cropData = MARKET_DATA[crop as keyof typeof MARKET_DATA];
              return (
                <div key={crop} className="flex justify-between items-center p-3 bg-muted/50 rounded border border-muted hover:bg-muted/70 transition">
                  <div>
                    <p className="font-medium text-foreground">{cropData.cropName}</p>
                    <p className="text-sm text-muted-foreground">Current: ₹{cropData.currentPrice}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={selectedCrop === cropData.cropName ? 'default' : 'outline'}
                    onClick={() => setSelectedCrop(cropData.cropName)}
                  >View</Button>
                </div>
              );
            })}
          </div>
        </DashboardCard>\n      </motion.div>
    </div>
  );
}
