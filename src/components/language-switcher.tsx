'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    
    // Update document direction
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200 text-white"
      aria-label="Switch language"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">
        {i18n.language === 'ar' ? 'EN' : 'AR'}
      </span>
    </button>
  );
}
