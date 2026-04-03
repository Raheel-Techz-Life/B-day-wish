'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  TrendingUp,
  Leaf,
  DollarSign,
  Mic,
  Cloud,
  ArrowRight,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language-provider';
import { t } from '@/lib/translations';
import { LANGUAGES } from '@/lib/constants';
import type { LanguageCode } from '@/lib/translations';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function LandingPage() {
  const { language, setLanguage } = useLanguage();
  const currentLang = LANGUAGES.find(l => l.code === language);

  const features = [
    {
      icon: AlertTriangle,
      titleKey: 'home.featureWeather',
      descriptionKey: 'home.featureWeather',
    },
    {
      icon: TrendingUp,
      titleKey: 'home.featureMarket',
      descriptionKey: 'home.featureMarket',
    },
    {
      icon: Leaf,
      titleKey: 'home.features',
      descriptionKey: 'home.features',
    },
    {
      icon: DollarSign,
      titleKey: 'dashboard.finance',
      descriptionKey: 'dashboard.finance',
    },
    {
      icon: Mic,
      titleKey: 'nav.assistant',
      descriptionKey: 'nav.assistant',
    },
    {
      icon: Cloud,
      titleKey: 'dashboard.weather',
      descriptionKey: 'dashboard.weather',
    },
  ];

  const steps = [
    {
      number: '01',
      titleKey: 'common.profile',
      descriptionKey: 'common.profile',
    },
    {
      number: '02',
      titleKey: 'common.language',
      descriptionKey: 'common.language',
    },
    {
      number: '03',
      titleKey: 'common.success',
      descriptionKey: 'common.success',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-green-900/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('home.title', language)}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Dropdown */}
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

            {/* Get Started Button */}
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-md">
                {t('home.cta', language)} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-7xl font-bold text-foreground text-balance leading-tight">
              {t('home.subtitle', language)}
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              🌾 {t('home.title', language)} - {t('home.subtitle', language)}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-white shadow-md transform hover:scale-105 transition-all">
                {t('home.cta', language)} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5">
              {t('home.learnMore', language)}
            </Button>
          </div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-16 min-h-96 flex items-center justify-center border border-primary/20 shadow-lg"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotateZ: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mx-auto w-fit"
            >
              <Mic className="w-40 h-40 text-primary/40" />
            </motion.div>
            <p className="text-lg text-muted-foreground">{t('nav.assistant', language)}</p>
            <p className="text-sm text-muted-foreground">🎤 {t('home.subtitle', language)}</p>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t('home.features', language)}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('home.subtitle', language)}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = [
              'from-primary/15',
              'from-secondary/15',
              'from-accent/15',
              'from-green-500/15',
              'from-blue-500/15',
              'from-orange-500/15',
            ];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className={`bg-gradient-to-br ${colors[index]} to-transparent dark:to-slate-900/50 rounded-2xl p-8 border border-border hover:border-primary/50 transition-all shadow-sm hover:shadow-md`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t(feature.titleKey, language)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(feature.descriptionKey, language)}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{t('home.learnMore', language)}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.subtitle', language)}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-8 border border-border hover:border-primary/50 transition-all h-full shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                      {step.number}
                    </div>
                    <div className="text-3xl">{['📋', '🔗', '🤖'][index]}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{t(step.titleKey, language)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(step.descriptionKey, language)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-y-px">
                    <ArrowRight className="w-8 h-8 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-secondary to-accent/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              ✨ {t('cta.title', language)}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {t('cta.description', language)}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                  {t('cta.startTrial', language)} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Features List */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: '🎤', textKey: 'cta.voiceInterface' },
                { icon: '⚡', textKey: 'cta.realTimeAlerts' },
                { icon: '📊', textKey: 'cta.marketPredictions' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center justify-center gap-3 text-white font-semibold"
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <span>{t(feature.textKey, language)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-t border-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-400">{t('ui.krishiNetra', language)}</h3>
              <p className="text-sm text-slate-300">
                {t('footer.description', language)}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.product', language)}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.features', language)}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.pricing', language)}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.company', language)}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.about', language)}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.contact', language)}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">{t('footer.legal', language)}</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.privacy', language)}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition duration-200">
                    {t('footer.terms', language)}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
            <p>{t('footer.copyright', language)} 🌾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
