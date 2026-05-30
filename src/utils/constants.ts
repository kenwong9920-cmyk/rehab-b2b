/**
 * 全站常量 — 公司信息、社交链接等
 */
export const SITE = {
  name: 'JinDa Rehab Medical',
  tagline: 'Professional Rehabilitation Equipment Manufacturer',
  url: 'https://www.jdrehab.com',
  email: 'info@jdrehab.com',
  phone: '+8613710405041',
  whatsapp: '+85257044967',
  address: {
    street: 'No. 41 Jiajing Road, the Second Industrial Zone, Nanlang Sub-district',
    city: 'Zhongshan',
    province: 'Guangdong',
    country: 'China',
    full: 'No. 41 Jiajing Road, the Second Industrial Zone, Nanlang Sub-district, Zhongshan, Guangdong, China',
  },
  social: {
    linkedin: 'https://linkedin.com/company/rehabpro-med',
    facebook: 'https://facebook.com/rehabpro-med',
    youtube: 'https://youtube.com/@rehabpro-med',
    twitter: 'https://twitter.com/rehabpro-med',
  },
  foundedYear: 2010,
  employees: '200+',
  factoryArea: '15,000 m²',
  exportCountries: 50,
  certifications: ['CE', 'FDA', 'ISO 13485', 'ISO 9001'],
} as const;

/** 产品分类 */
export const PRODUCT_CATEGORIES = [
  {
    slug: 'walking-aids',
    icon: '🦯',
    nameKey: 'categories.walkingAids',
    descriptionKey: 'categories.walkingAidsDesc',
  },
  {
    slug: 'bath-safety',
    icon: '🛁',
    nameKey: 'categories.bathSafety',
    descriptionKey: 'categories.bathSafetyDesc',
  },
  {
    slug: 'commode-chairs',
    icon: '♿',
    nameKey: 'categories.commodeChairs',
    descriptionKey: 'categories.commodeChairsDesc',
  },
] as const;

/** 支持的语言 */
export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

export type LocaleCode = (typeof LANGUAGES)[number]['code'];

/** 导航菜单项 */
export const NAV_ITEMS = [
  { href: '/products/', labelKey: 'nav.products' },
  { href: '/about/', labelKey: 'nav.about' },
  { href: '/factory/', labelKey: 'nav.factory' },
  { href: '/oem-odm/', labelKey: 'nav.oem' },
  { href: '/blog/', labelKey: 'nav.blog' },
  { href: '/contact/', labelKey: 'nav.contact' },
] as const;
