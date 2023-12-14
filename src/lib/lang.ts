import { NextRequest } from 'next/server';
import { useEffect } from 'react';

export function getLang(req: NextRequest) {
  const cookie = req.cookies.get('lang');
  const lang = cookie ? cookie.value : 'en';
  return lang;
}

export function setLanguage(lang: string) {
  document.cookie = `lang=${lang}; max-age=31536000; path=/`;
}
