'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from 'recharts';
import { DollarSign, TrendingDown, Wallet } from 'lucide-react';
import { DashboardCard } from '@/components/dashboard-card';
import { Button } from '@/components/ui/button';
import { useFinanceData } from '@/hooks/use-api';
import { FINANCE_DATA } from '@/lib/constants';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

export default function FinancePage() {
  const { language } = useLanguage();
  const { data: apiFinanceData } = useFinanceData();
  
  // Use API data if available, fallback to mock data
  const financeData = apiFinanceData || FINANCE_DATA;
  const netProfit = financeData.income - financeData.expenses;
  const profitMargin = ((netProfit / financeData.income) * 100).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground">{t('finance.title', language)}</h1>
        <p className="text-muted-foreground mt-1">{t('finance.description', language)}</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <DashboardCard title={t('finance.totalIncome', language)} icon={<DollarSign className="w-5 h-5 text-green-500" />}>
            <div>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">₹{financeData.income.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">{t('finance.fromAllCrops', language)}</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <DashboardCard title={t('finance.totalExpenses', language)} icon={<TrendingDown className="w-5 h-5 text-orange-500" />}>
            <div>
              <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">₹{financeData.expenses.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">{t('finance.seedsAndLabor', language)}</p>
            </div>
          </DashboardCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <DashboardCard title={t('finance.netProfit', language)} variant="success" icon={<Wallet className="w-5 h-5 text-green-600" />}>
            <div>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400">₹{netProfit.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">{t('finance.profitMargin', language)}: {profitMargin}%</p>
            </div>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <DashboardCard title={t('finance.monthlyChart', language)}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={financeData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="income" fill="var(--color-chart-1)" name={t('dashboard.income', language)} radius={[8, 8, 0, 0]} />
                <Bar dataKey="expenses" fill="var(--color-chart-3)" name={t('dashboard.expenses', language)} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </DashboardCard>
        </motion.div>

        {/* Forecast Chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <DashboardCard title={t('finance.projectedCashFlow', language) || "Projected Cash Flow (Next 6 Months)"}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={financeData.forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                  formatter={(value) => `₹${value.toLocaleString()}`}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="projected"
                  fill="var(--color-primary)"
                  fillOpacity={0.3}
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  name="Projected Income"
                />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardCard>
        </motion.div>
      </div>

      {/* Credit Suggestions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <DashboardCard title={t('finance.availableCredit', language) || "Available Credit Options"}>
          <div className="space-y-4">
            {financeData.creditSuggestions.map((credit, index) => (
              <div
                key={index}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition flex justify-between items-start"
              >
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Credit Limit: ₹{credit.amount.toLocaleString()}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Interest Rate: {credit.interestRate}% per annum</p>
                    <p>Tenure: {credit.term} months</p>
                    <p>
                      Monthly EMI: ₹
                      {(
                        (credit.amount * (credit.interestRate / 100 / 12)) /
                        (1 - Math.pow(1 + credit.interestRate / 100 / 12, -credit.term))
                      ).toFixed(0)}
                    </p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white">Apply</Button>
              </div>
            ))}
          </div>
        </DashboardCard>
      </motion.div>

      {/* Transaction History */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <DashboardCard title={t('finance.recentTransactions', language) || "Recent Transactions"}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { desc: 'Fertilizer Purchase', cat: 'Expenses', amt: -5000, type: 'expense' },
                  { desc: 'Rice Sale', cat: 'Income', amt: 12000, type: 'income' },
                  { desc: 'Labor Payment', cat: 'Expenses', amt: -3000, type: 'expense' },
                  { desc: 'Equipment Maintenance', cat: 'Expenses', amt: -1500, type: 'expense' },
                  { desc: 'Pesticide Purchase', cat: 'Expenses', amt: -2000, type: 'expense' },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition">
                    <td className="py-3 px-4 font-medium text-foreground">{transaction.desc}</td>
                    <td className="py-3 px-4 text-muted-foreground">{transaction.cat}</td>
                    <td className={`text-right py-3 px-4 font-semibold ${
                      transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'income' ? '+' : ''}{transaction.amt.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">Today</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardCard>
      </motion.div>

      {/* Financial Tips */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <DashboardCard title="Financial Tips">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                💡 Your profit margin of {profitMargin}% is healthy. Focus on reducing water costs to improve further.
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-300">You're eligible for agriculture subsidies. Apply now to get up to ₹5000 assistance.</p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-300">Consider crop diversification to reduce risk and improve overall farm profitability.</p>
            </div>
          </div>
        </DashboardCard>
      </motion.div>
    </div>
  );
}
