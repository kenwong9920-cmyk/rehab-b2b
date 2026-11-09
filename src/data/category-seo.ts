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
  en: {
    /*
     * GSC 实测（90 天 2026-07-27~10-25）：/en/products/category/bath-safety/ 54 展现 · 0 点击 · 加权 19.0 位
     * 是全站剩余的第 2 页页面里展现第二多的一页（仅次于手杖产品页 85 展现）。
     * 原 title 是模板生成的 "Bath & Shower Safety — Products"，"Products" 对采购者无信息量；
     * 改为承接 manufacturer 商业意图，H1 仍保留品类名 "Bath & Shower Safety"，不丢品类词。
     * description 首句给这一分类真正的差异化：1.3 kg 到 350 kg(770 lb) 的承重跨度 ——
     * 竞品通常只有 120–150 kg 一档。FAQ 全部取自已上线产品的真实规格，未编造任何数值。
     */
    'bath-safety': {
      title: 'Bath Safety Shower Chair Manufacturer',
      description:
        'From a 1.3 kg folding shower stool to a 350 kg (770 lb) bariatric chair, made in our Zhongshan plant: 5–7 height levels, aluminium or stainless frames. MOQ 30.',
      intro:
        'A range built around one variable: the load. It starts at a 1.3 kg folding stainless stool for home care and travel, steps through 150 kg aluminium chairs with foam armrests or flip-back leather backrests, and ends at two 350 kg (770 lb) extra-wide chairs with a 6-level flat-tube frame and a reinforced cross bar. Frames are AL6063 aluminium at 1.2 mm or powder-coated stainless steel, seats are blow-moulded HDPE or PU with drainage holes, and every model folds flat for storage.',
      faqs: [
        {
          q: 'What load ratings are available in this range?',
          a: 'Rated loads run from 120 kg to 350 kg (265 lb to 770 lb). The aluminium LM5101D and the flip-back LM5205CK are rated 150 kg (330 lb), the LM5106KD is rated 500 lb (227 kg), and the two extra-wide LM5109 stainless models are rated 350 kg (770 lb). These are static frame and seat figures, not medical device test results.',
        },
        {
          q: 'Which model is the lightest for home care and travel?',
          a: 'The LM5101KD-S folding stainless steel chair at 1.3 kg (2.9 lb), with a 51 × 40 cm seat and a 74–86 cm height range. The LM5101D bath stool is 1.9 kg and the LM3202KD chair with foam armrests is 3.2 kg.',
        },
        {
          q: 'How many height settings does each chair have?',
          a: 'Five to seven, set with push-button spring pins. The LM5205CK flip-back chair has 5 levels, the LM5101D and both LM5109 models have 6, and the LM5106KD has 7.',
        },
        {
          q: 'Are the frames rust-proof in a wet bathroom?',
          a: 'Aluminium alloy frames — AL6063 at a 1.2 mm to 1.4 mm wall — do not rust, and the stainless steel frames are powder-coated for permanent humidity. Seats are blow-moulded HDPE or PU with drainage holes, so water runs off instead of pooling.',
        },
        {
          q: 'What is the minimum order quantity and lead time?',
          a: 'MOQ is set per SKU and per colour: 30 units on the LM6108F foldable toilet chair, 100 on the LM5106KD and both LM5109 models, up to 500 on the LM5205CK and LM5205LK. Lead time is 15–30 days from order confirmation, and quotes are answered within 24 hours.',
        },
        {
          q: 'Which certifications ship with an order?',
          a: 'CE marking under EU MDR 2017/745 as a Class I manufacturer declaration, FDA registration, ISO 13485 and ISO 9001. Strength evidence on file for the LM5108 stool is to EN 12520:2024 and EN 1728:2012 — furniture seating standards, not medical device tests.',
        },
      ],
    },
  },
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

  /*
   * ko /walking-aids/ —— 父分类，聚合 crutches(21) + walking-canes(22) = 43 个产品。
   * GSC 实测（近 14 天，2026-10-23~11-05 探针）：41 展现 · 0 点击 · 加权 15.9 位
   * → 韩语展现最高的单页，也是全站剩余「第 2 页」里最大的一块，且 43 个产品已在库。
   * 原 title/description 由模板生成（分类名 + "제품"），"제품" 对采购者零信息量；
   * 改为承接 도매(批发) / 제조 공장(工厂) 的采购意图，description 首句给 120 g–155 cm 的规格跨度。
   * FAQ 全部取自已上线 SKU 的真实规格；LM4201/LM4208 数据表无载荷值 → 明确写「표기 없음」，不编。
   */
  ko: {
    'walking-aids': {
      title: '목발·지팡이 도매 제조 공장 | OEM·ODM',
      description:
        'LM4914TA 카본 지팡이 120 g부터 겨드랑이 목발 95–155 cm까지 43종을 자체 공장에서 생산합니다. MOQ 100개, 15–30일 출고, CE 마킹·FDA 등록·ISO 13485.',
      intro:
        '진다(JinDa)는 중산 공장에서 목발 21종과 보행 지팡이 22종을 생산합니다. 프레임은 알루미늄 합금 또는 100% 카본파이버이며, LM4914TA 카본 지팡이는 120 g, LM4907TB는 0.42 kg, 겨드랑이 목발 LM4206은 0.95 kg, LM4208은 1.15 kg입니다. 높이는 지팡이 72–96.5 cm(10단), 겨드랑이 목발 95–155 cm, 전완 목발 91–118 cm(12단)까지 조절됩니다. 모델별 MOQ 100–500개, 납기 15–30일.',
      faqs: [
        {
          q: '어떤 목발과 지팡이를 생산하나요?',
          a: '목발 21종(겨드랑이·전완·팔꿈치형)과 보행 지팡이 22종, 총 43종입니다. 대표 모델은 겨드랑이 목발 LM4201·LM4208, 전완 목발 LM4202A·LM4401, 카본 지팡이 LM4907TB·LM4914TA입니다.',
        },
        {
          q: '프레임 재질과 무게는 어떻게 되나요?',
          a: '프레임은 알루미늄 합금 또는 100% 카본파이버입니다. LM4914TA 카본 지팡이는 120 g, LM4907TB는 0.42 kg, LM4206 겨드랑이 목발은 0.95 kg, LM4208은 1.15 kg, 전완 목발 LM4401은 1쌍 1.13 kg입니다.',
        },
        {
          q: '최대 하중은 얼마인가요?',
          a: '카본 지팡이 LM4907TB·LM4903TAZ·LM4914TA와 전완 목발 LM4401은 최대 100 kg, 이중 목발 LM4202B는 200 lb(약 90 kg)입니다. 알루미늄 겨드랑이 목발 LM4201·LM4208은 데이터시트에 하중 값이 표기되어 있지 않습니다.',
        },
        {
          q: '키에 맞춰 높이를 조절할 수 있나요?',
          a: '지팡이는 72–96.5 cm 구간에서 10단, 겨드랑이 목발은 95–155 cm, 전완 목발 LM4401은 91–118 cm 구간에서 12단으로 조절됩니다. 모두 버튼식 스프링 핀 방식이라 공구 없이 조절할 수 있습니다.',
        },
        {
          q: 'MOQ와 납기는 어떻게 되나요?',
          a: '모델별 MOQ는 100–500개입니다. 대부분 200개, LM4201·LM4202A·LM4202B는 300개, 아마핏 서포트 목발과 이중 지팡이 서포트는 500개입니다. 납기는 주문 확정 후 15–30일이며 견적은 24시간 이내에 회신합니다.',
        },
        {
          q: '인증과 OEM 대응 범위는 어떻게 되나요?',
          a: 'EU MDR 2017/745에 따른 CE 마킹(Class I 제조사 자기선언), FDA 등록, ISO 13485, ISO 9001 문서가 제공됩니다. OEM은 프레임 색상, 손잡이 재질(천연 로즈우드·PP), 팁 교체, 브랜드 포장까지 가능하며 MOQ는 모델당 100개부터입니다.',
        },
      ],
    },
  },

  /*
   * ja /walkers/ —— 6 个机型全部在库。
   * GSC 实测（近 14 天）：10 展现 · 加权 8.4 位 → 位置已在首页边缘，问题在 SERP 呈现与点击，不在相关性。
   * 因此 title 保留分类词（歩行器）并补 卸売製造元 / OEM，FAQ 用富摘要抢点击；正文语言本身已是日语。
   */
  ja: {
    walkers: {
      title: '歩行器・ロレーター 卸売製造元・OEM対応',
      description:
        'ステンレス製歩行器から2輪ロレーターまで6機種を中山工場で製造。LM2005Tは脚部カーボン、シート付き折りたたみ、MOQ 100台、納期15–30日、CE・FDA・ISO 13485。',
      intro:
        '金达（JinDa）は中山工場で歩行器・ロレーター6機種を製造しています。大人用は3機種 —— ハンドブレーキとパッド入りシートを備えた2輪ロレーター LM2002-S-W1、レザーシート内蔵のステンレス折りたたみ式 LM2002-S、高身長向けに設計した LM2002-S-W1-FS —— 、小児用は折りたたみ式3機種（LM2005B-S、LM2005T、LM2005L-S）です。フレームは粉体塗装ステンレス、LM2005T は脚部にカーボンファイバーを使用しています。MOQ は1モデル100台、納期は15–30日です。',
      faqs: [
        {
          q: 'どのような歩行器・ロレーターを製造していますか？',
          a: '大人用3機種と小児用3機種の計6機種です。LM2002-S-W1 は2輪ロレーターでハンドブレーキとパッド入りシート付き、LM2002-S はレザーシート内蔵のステンレス折りたたみ式、LM2002-S-W1-FS は高身長向けの延長フレーム仕様です。',
        },
        {
          q: 'フレームの素材は何ですか？',
          a: 'フレームは粉体塗装ステンレススチールです。小児用 LM2005T はフレームが粉体塗装ステンレス、脚部がカーボンファイバー製で、軽量かつ腐食しない構成です。',
        },
        {
          q: '小児用の歩行器はありますか？',
          a: '3機種あります。LM2005B-S（ブラック／イエロー）、LM2005T（プリントデザイン、脚部カーボン）、LM2005L-S（折りたたみ・高さ調整式）で、いずれもステンレスフレームの折りたたみ式です。',
        },
        {
          q: 'MOQ と納期を教えてください。',
          a: 'MOQ は1モデル100台です。納期は注文確定後15–30日、見積回答は24時間以内です。',
        },
        {
          q: 'どのような認証が付きますか？',
          a: 'EU MDR 2017/745 に基づく CE マーキング（Class I の製造者自己宣言）、FDA 登録、ISO 13485、ISO 9001 です。書類一式は出荷時に同梱できます。',
        },
        {
          q: 'OEM ではどこまでカスタマイズできますか？',
          a: 'フレームの色、シートの素材と色、グリップ形状、キャスターの種類、ロゴ入り梱包まで対応します。MOQ は1モデル100台のままです。',
        },
      ],
    },
  },

  /*
   * es /walkers/ —— 6 个机型全部在库。
   * GSC 实测（近 14 天）：10 展现 · 加权 24.9 位 → 在第 3 页，相关性与内容厚度都不足。
   * 因此不只是改 meta：补 intro（6 机型 + 材质 + MOQ）与 6 条西语 FAQ，扩大页面可被匹配的语义面积。
   */
  es: {
    walkers: {
      title: 'Fabricante de Andadores y Rollators',
      description:
        'Acero inoxidable y 6 modelos: andador plegable con asiento de piel, rollator de 2 ruedas con freno de mano y tres andadores pediátricos. MOQ 100 uds, 15–30 días.',
      intro:
        'JinDa fabrica en Zhongshan seis modelos de andadores y rollators: tres para adultos — el rollator de 2 ruedas LM2002-S-W1 con freno de mano y asiento acolchado, el andador plegable LM2002-S con asiento de piel integrado y el LM2002-S-W1-FS con chasis extendido para usuarios altos — y tres andadores pediátricos plegables (LM2005B-S, LM2005T, LM2005L-S). Los chasis son de acero inoxidable con pintura en polvo; el LM2005T lleva las patas de fibra de carbono. MOQ 100 unidades por modelo, entrega en 15–30 días.',
      faqs: [
        {
          q: '¿Qué modelos de andadores y rollators fabrican?',
          a: 'Seis modelos: el rollator de 2 ruedas LM2002-S-W1 con freno de mano y asiento acolchado, el andador plegable LM2002-S de acero inoxidable con asiento de piel, el LM2002-S-W1-FS de altura extendida para adultos altos y los tres pediátricos LM2005B-S, LM2005T y LM2005L-S.',
        },
        {
          q: '¿De qué material es el chasis?',
          a: 'Todos los chasis son de acero inoxidable con pintura en polvo. En el LM2005T las patas son de fibra de carbono, lo que reduce el peso y evita la corrosión.',
        },
        {
          q: '¿Hay modelos para niños?',
          a: 'Sí, tres: LM2005B-S (negro/amarillo), LM2005T (diseño impreso, patas de carbono) y LM2005L-S (plegable y con altura ajustable). Los tres son plegables y de acero inoxidable.',
        },
        {
          q: '¿Cuál es el pedido mínimo y el plazo de entrega?',
          a: 'MOQ de 100 unidades por modelo. El plazo es de 15–30 días desde la confirmación del pedido y la cotización se responde en menos de 24 horas.',
        },
        {
          q: '¿Qué certificaciones se entregan con el pedido?',
          a: 'Marcado CE según EU MDR 2017/745 como declaración del fabricante de Clase I, registro FDA, ISO 13485 e ISO 9001. El paquete documental acompaña al envío.',
        },
        {
          q: '¿Se puede personalizar el producto en régimen OEM?',
          a: 'Sí: color del chasis, material y color del asiento, diseño del puño, tipo de rueda y embalaje con su marca. El MOQ se mantiene en 100 unidades por modelo.',
        },
      ],
    },
  },
};

