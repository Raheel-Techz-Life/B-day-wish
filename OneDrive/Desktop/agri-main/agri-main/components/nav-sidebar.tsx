'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Bell,
  BarChart3,
  Wallet,
  Leaf,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Cloud,
  Map,
  Sprout,
  Home,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';

const navItems = [
  { labelKey: 'nav.home', href: '/', icon: Home },
  { labelKey: 'nav.dashboard', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'nav.alerts', href: '/dashboard/alerts', icon: Bell },
  { labelKey: 'nav.market', href: '/dashboard/market', icon: BarChart3 },
  { labelKey: 'nav.finance', href: '/dashboard/finance', icon: Wallet },
  { labelKey: 'nav.sustainability', href: '/dashboard/sustainability', icon: Leaf },
  { labelKey: 'nav.precisionAgriculture', href: '/dashboard/precision-agriculture', icon: Cpu },
  { labelKey: 'nav.climateAdvisor', href: '/dashboard/climate-advisor', icon: Cloud },
  { labelKey: 'nav.gisMap', href: '/dashboard/gis-map', icon: Map },
  { labelKey: 'nav.cropBreeding', href: '/dashboard/crop-breeding', icon: Sprout },
  { labelKey: 'nav.assistant', href: '/dashboard/assistant', icon: MessageCircle },
];

export function NavSidebar() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed left-0 top-0 h-screen bg-slate-900 dark:bg-slate-950 border-r border-slate-700 transition-all duration-300 z-40 hidden lg:flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <h1 className="text-2xl font-bold text-green-400">KrishiNetra</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto text-gray-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-700 text-white'
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{t(item.labelKey, language)}</span>}
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-700">
          {!isCollapsed && (
            <p className="text-xs text-gray-400 text-center">KrishiNetra v1.0</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
