'use client';

import { useRouter } from 'next/navigation';
import { User, Globe, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LANGUAGES } from '@/lib/constants';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';
import type { LanguageCode } from '@/lib/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopBar() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const currentLang = LANGUAGES.find(l => l.code === language);
  
  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 z-30">
      <div 
        onClick={() => router.push('/')}
        className="flex-1 lg:hidden text-sm font-bold text-green-700 dark:text-green-400 cursor-pointer hover:opacity-80 transition-opacity"
      >
        {t('ui.krishiNetra', language)}
      </div>
      <div className="flex-1 hidden lg:block" />

      {/* Right Side Controls */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Globe className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">{currentLang?.code.toUpperCase() || 'EN'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem 
                key={lang.code} 
                className="cursor-pointer"
                onSelect={() => setLanguage(lang.code as LanguageCode)}
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                FB
              </div>
              <span className="text-sm hidden sm:inline">{t('ui.farmer', language)}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer gap-2">
              <User className="w-4 h-4" />
              <span>{t('common.profile', language)}</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 text-red-600">
              <LogOut className="w-4 h-4" />
              <span>{t('common.logout', language)}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
