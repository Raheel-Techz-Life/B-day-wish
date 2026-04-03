'use client';

import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import type { LanguageCode } from '@/lib/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [isReady, setIsReady] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language') as LanguageCode | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
    setIsReady(true);
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  }, []);

  const contextValue = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  // Don't render context until ready to prevent hydration issues
  if (!isReady) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
