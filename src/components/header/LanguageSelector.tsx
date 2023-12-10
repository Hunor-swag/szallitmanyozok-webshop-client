'use client';

import { setLang } from '@/lib/lang';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSelector({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lang: string) => {
    setLang(lang);
    router.push(`/${lang}`);
  };

  return (
    <div>
      <button
        onClick={() => handleLanguageChange('hu')}
        className={`py-2 px-1 text-white hover:text-gray-500 transition-colors duration-300 ${
          lang === 'hu' && 'font-bold'
        }`}
      >
        HU
      </button>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`py-2 px-1 text-white hover:text-gray-500 transition-colors duration-300 ${
          lang === 'en' && 'font-bold'
        }`}
      >
        EN
      </button>
    </div>
  );
}
