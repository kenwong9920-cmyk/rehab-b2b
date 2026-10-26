/**
 * 分类页 SEO 覆盖 · 按 locale × category 精修
 *
 * 为什么单独一个文件而不是塞进 i18n：
 * - i18n 里的 categories.* 服务于全站导航、页脚、筛选条，一改全站跟着变；
 * - 这里只针对「已排在第 2 页、需要推首页」的个别分类页做定向优化，
 *   未填写的分类完全沿用 i18n 默认文案，零影响。
 *
 * 填写规则（与 scripts/audit.mjs 的 LIMIT 一致）：
 * - title ≤ 62 显示宽度（未含 BaseLayout 自动追加的 " | JinDa Rehab Medical"）
 *   本文件里的 title 是**不含品牌后缀**的部分，模板会自动补；
 * - description 120–165 显示宽度（含品牌后缀不影响 description）；
 * - intro / faqs 必须与页面可见内容严格一致 —— FAQPage schema 的答案必须能在页面上看到。
 *
 * 显示宽度 = CJK 算 2、ASCII 算 1，用脚本算，禁止目测。
 */
export interface CategoryFaq {
  q: string;
  a: string;
}

export interface CategorySeo {
  /** 不含品牌后缀 */
  title: string;
  description: string;
  /** 页面正文导语：给页面提供产品网格之外的实质内容与硬参数 */
  intro?: string;
  /** 渲染为页面可见 FAQ 区块，同时输出 FAQPage schema */
  faqs?: CategoryFaq[];
}

export const CATEGORY_SEO: Record<string, Record<string, CategorySeo>> = {
  de: {
    /*
     * GSC 实测（90 天）：/de/products/category/walkers/ 63 展现 · 0 点击 · 加权 11.1 位
     * 已可见的真实查询：faltrollator großhändler 7.0 / medizinischer faltrollator großhandel 7.0 /
     * großhandel faltrollator 9.0 / kinderrollatoren 19.0 / leichter faltrollator 30.0 / gehwagen 41.0
     * → 商业意图词组已在首页，但 title 里是 "Produkte"（无效修饰词），description 首句只是复述品类。
     *   改为「Großhandel」承接已排 7–9 位的采购意图，描述首句给承重/材质/起订/交期硬参数。
     */
    walkers: {
      title: 'Rollatoren & Gehwagen — Großhandel',
      description:
        'Sechs Rollatormodelle ab 100 Stück: Edelstahl-Rahmen, 2-Rad-Rollator mit Handbremse und gepolstertem Sitz, drei pädiatrische Gehwagen. Lieferung 15–30 Tage.',
      intro:
        'JinDa fertigt in Zhongshan sechs Rollator- und Gehwagen-Modelle: drei für Erwachsene — darunter der Edelstahl-Rollator LM2002-S mit Leder-Sitz und der LM2002-S-W1 mit zwei Rädern und Handbremse — sowie drei pädiatrische Faltrollatoren für Kinder in der Genesung. Alle Rahmen sind pulverbeschichteter Edelstahl, beim LM2005T mit Kohlefaserbeinen. Mindestbestellmenge 100 Stück pro Modell, Lieferzeit 15–30 Tage.',
      faqs: [
        {
          q: 'Welche Rollatormodelle fertigt JinDa und für wen sind sie gedacht?',
          a: 'Sechs Modelle: der LM2002-S-W1 mit zwei Rädern, gepolstertem Sitz und Handbremse, der LM2002-S aus Edelstahl mit Leder-Sitz, der LM2002-S-W1-FS mit erhöhtem Gestell für große Erwachsene sowie die drei pädiatrischen Modelle LM2005B-S, LM2005T und LM2005L-S für Kinder.',
        },
        {
          q: 'Aus welchem Material sind die Rahmen?',
          a: 'Alle Rahmen sind pulverbeschichteter Edelstahl. Beim LM2005T bestehen zusätzlich die Beine aus Kohlefaser; das hält das Gestell leicht und korrosionsfrei.',
        },
        {
          q: 'Ab welcher Bestellmenge liefert JinDa?',
          a: '100 Stück pro Modell. Die Lieferzeit beträgt 15–30 Tage ab Auftragsbestätigung, die Angebotsantwort erfolgt innerhalb von 24 Stunden.',
        },
        {
          q: 'Welche Zertifikate liegen der Lieferung bei?',
          a: 'CE-Kennzeichnung nach EU MDR 2017/745, FDA-Registrierung, ISO 13485 und ISO 9001. Die Nachweise sind Teil des Dokumentenpakets.',
        },
        {
          q: 'Welche Anpassungen sind im OEM-Geschäft möglich?',
          a: 'Rahmenfarbe, Sitzmaterial und Sitzfarbe, Griffdesign, Radtyp sowie Verpackung mit eigenem Branding. Der Mindestauftrag bleibt bei 100 Stück pro Modell.',
        },
        {
          q: 'Sind die Rollatoren für drinnen und draußen geeignet?',
          a: 'Der LM2002-S-W1 läuft auf Gummirädern über Teppich, Fliesen und Außenflächen. Die Faltmodelle mit Gummifüßen sind für den Innenbereich und befestigte Wege ausgelegt.',
        },
      ],
    },
  },
};
