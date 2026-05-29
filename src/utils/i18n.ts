/**
 * i18n 翻译工具 — 同步版本（用于 Astro 组件 frontmatter）
 */
import en from '@/i18n/en.json';
import fr from '@/i18n/fr.json';
import de from '@/i18n/de.json';
import es from '@/i18n/es.json';
import type { LocaleCode } from '@/utils/constants';

const DICTIONARIES: Record<string, Record<string, unknown>> = { en, fr, de, es };

type TranslationDict = typeof en;

/**
 * 获取翻译函数（同步）
 * @param locale - 语言代码 (en/fr/de/es)
 */
export function useTranslations(locale: string) {
  const dict = DICTIONARIES[locale] || DICTIONARIES.en;

  /**
   * 获取翻译文本
   * @param key - 点号分隔的 key，如 'nav.home'
   * @param fallback - 找不到时的默认值
   */
  function t(key: string, fallback = ''): string {
    const keys = key.split('.');
    let value: unknown = dict;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback || key;
      }
    }
    return typeof value === 'string' ? value : fallback || key;
  }

  return { t };
}

/**
 * 仅获取翻译函数中的导航部分（轻量版，只用于 Header）
 */
export function useNav(locale: string) {
  const dict = DICTIONARIES[locale] || DICTIONARIES.en;
  const nav = (dict as TranslationDict).nav;
  return {
    home: nav.home,
    products: nav.products,
    about: nav.about,
    factory: nav.factory,
    oem: nav.oem,
    solutions: nav.solutions,
    caseStudies: nav.caseStudies,
    blog: nav.blog,
    contact: nav.contact,
    getQuote: nav.getQuote,
    downloads: nav.downloads,
  };
}

/**
 * 获取 hreflang 链接列表
 */
export function getAlternateLinks(currentPath: string, currentLocale: string) {
  const locales: LocaleCode[] = ['en', 'fr', 'de', 'es'];
  const pathWithoutLocale = currentPath.replace(new RegExp(`^/${currentLocale}`), '');

  return locales.map((locale) => ({
    locale,
    href: `/${locale}${pathWithoutLocale}`,
  }));
}
