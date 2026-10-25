/**
 * 全站常量 — 公司信息、社交链接等
 */
export const SITE = {
  name: 'JinDa Rehab Medical',
  tagline: 'Professional Rehabilitation Equipment Manufacturer',
  url: 'https://www.jdrehab.com',
  email: 'info@jdrehab.com',
  phone: '+8613680164002',
  phoneDisplay: '+86 13680164002',
  whatsapp: '+85257044967',
  address: {
    street: 'No. 41 Jiajing Road, the Second Industrial Zone, Nanlang Sub-district',
    city: 'Zhongshan',
    province: 'Guangdong',
    country: 'China',
    full: 'No. 41 Jiajing Road, the Second Industrial Zone, Nanlang Sub-district, Zhongshan, Guangdong, China',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/110253002',
    instagram: 'https://instagram.com/guandongjindahealthcare',
  },
  foundedYear: 2010,
  employees: '200+',
  factoryArea: '15,000 m²',
  exportCountries: 50,
  certifications: ['CE', 'FDA', 'ISO 13485', 'ISO 9001'],
} as const;

/**
 * 全站唯一事实源 —— 所有对外数字只能从这里取，禁止在页面里硬编码。
 * 出现"同一个数字在不同页面不一样"会直接摧毁 B2B 买家的信任。
 */
export const FACTS = {
  /** 建立年份（首页显示的年限由此动态计算，不要写死 "15+ years"） */
  foundedYear: SITE.foundedYear,
  factoryArea: SITE.factoryArea,
  employees: SITE.employees,
  exportCountries: SITE.exportCountries,
  /** 目录中真实的最低起订量（自动化校验：见 scripts/check-facts.mjs） */
  moqFrom: '30 units',
  /** 标准交期（51 个产品 frontmatter 全部为 15-30 days） */
  productionDays: '15–30 days',
  /** 询盘响应承诺 */
  responseHours: 24,
  /** 主营分类数 */
  categories: 5,
  skuCount: 51,
  certifications: SITE.certifications,
} as const;

/** 对外统一承诺 —— 首屏、表单上方、产品页共用同一组措辞 */
export const PROMISES = [
  { value: '24h', labelKey: 'promise.quote', fallback: 'Quote response' },
  { value: '15–30', labelKey: 'promise.production', fallback: 'Days production' },
  { value: '30+', labelKey: 'promise.moq', fallback: 'Units MOQ' },
  { value: '50+', labelKey: 'promise.countries', fallback: 'Countries served' },
] as const;

/** 产品分类 */
export const PRODUCT_CATEGORIES = [
  {
    slug: 'walking-aids',
    icon: '🦯',
    nameKey: 'categories.walkingAids',
    descriptionKey: 'categories.walkingAidsDesc',
  },
  {
    slug: 'walkers',
    icon: '🚶',
    nameKey: 'categories.walkers',
    descriptionKey: 'categories.walkersDesc',
  },
  {
    slug: 'bath-safety',
    icon: '🛁',
    nameKey: 'categories.bathSafety',
    descriptionKey: 'categories.bathSafetyDesc',
  },
  {
    slug: 'toilet-safety',
    icon: '🚽',
    nameKey: 'categories.toiletSafety',
    descriptionKey: 'categories.toiletSafetyDesc',
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
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
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
