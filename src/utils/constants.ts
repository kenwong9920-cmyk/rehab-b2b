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
  /**
   * 认证标签 —— 对外一律用这套措辞。
   * 「CE」必须带法规依据，「FDA」必须写成 registered / listed，
   * 因为 FDA 不"批准"Class I 器械，写 approved 会被专业买家当场判定为不专业。
   */
  certifications: ['CE (EU MDR 2017/745)', 'FDA registered & listed', 'ISO 13485', 'ISO 9001'],
} as const;

/**
 * 全站唯一事实源 —— 所有对外数字只能从这里取，禁止在页面里硬编码。
 * 出现"同一个数字在不同页面不一样"会直接摧毁 B2B 买家的信任。
 */
export const FACTS = {
  /** 证书与发票上的法定名称（与 ISO 证书、营业执照一致，勿随意改动） */
  legalName: 'Guangdong Jinda health care Co., Ltd',
  legalNameZh: '广东晋大康复护理用品有限公司',
  /** 统一社会信用代码 —— 买家可在国家企业信用信息公示系统核验 */
  registrationNo: '91442000MA4W51H52M',
  postalCode: '528400',
  /** 建立年份（首页显示的年限由此动态计算，不要写死 "15+ years"） */
  foundedYear: SITE.foundedYear,
  /**
   * 经营年限 —— 每年自动 +1。
   * 文案里写 {years} 占位符，渲染时替换；禁止在 i18n 里写死 "16 年"，
   * 否则跨年后全站七种语言同时变成假数字（这一点竞品站年年踩）。
   */
  yearsInBusiness: new Date().getFullYear() - SITE.foundedYear,
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

  /**
   * 监管登记号 —— 买家会在 FDA 公共数据库里逐个查号，所以这里不放占位符。
   * 留空时页面显示「随文件包提供」，填上后自动升级为可在线核验。
   * 待补：FDA 企业注册号 / 器械列名号、各型号 MDR DoC 编号。
   */
  fdaRegistration: '',
  fdaListings: [] as string[],
  mdrDocRef: '',
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
