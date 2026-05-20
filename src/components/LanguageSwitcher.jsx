import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { lang, setLang } = useTranslation();

  const languages = [
    { code: 'tr', label: 'TÜRKÇE' },
    { code: 'en', label: 'ENGLISH' },
    { code: 'de', label: 'DEUTSCH' },
  ];

  return (
    <div className="absolute top-6 right-6 z-50 group">
      {/* Trigger Button */}
      <div className="flex items-center justify-center w-10 h-10 bg-white/80 backdrop-blur-md rounded-full border border-card-border shadow-sm cursor-pointer hover:bg-white transition-colors">
        <Globe size={18} className="text-charcoal" />
      </div>

      {/* Dropdown Menu */}
      <div className="absolute top-full right-0 mt-2 flex flex-col bg-white/95 backdrop-blur-xl border border-card-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden transform origin-top-right scale-95 group-hover:scale-100 min-w-[120px]">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`px-4 py-3 text-[11px] tracking-wider font-bold text-left transition-colors hover:bg-black/5 ${lang === l.code ? 'text-mtgrip' : 'text-silver hover:text-charcoal'}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
