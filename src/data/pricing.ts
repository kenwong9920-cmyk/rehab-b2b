/**
 * MOQ 与价格数据 —— /en/moq-pricing 单一数据源
 *
 * 关键原则：MOQ 全部来自产品 frontmatter 的真实数据（脚本统计，见下方 moqStats）。
 * 价格区间在拿到真实 FOB 报价前 **留空**，页面会自动降级为「24 小时内单独报价」，
 * 绝不编造区间 —— 编价格会让第一个真询盘当场对不上。
 *
 * 填 priceBand 之后，表格自动显示区间，无需改页面代码。
 */

export type CategoryPricing = {
  slug: string;
  name: string;
  /** 该分类真实 SKU 数 */
  skus: number;
  /** 真实最低 MOQ（单位：件） */
  moqFrom: number;
  /** 真实最高 MOQ */
  moqTo: number;
  /** FOB 价格区间，例如 'US$12 – US$38'；未知留空 */
  priceBand?: string;
  /** 该分类 MOQ 差异的原因（让数字显得可信） */
  note: string;
};

/**
 * 数据来源：51 个产品 frontmatter 的 moq 字段统计（2026-10）
 * bath-safety 13 SKU · 30–500 · commode-chairs 6 SKU · 30–500
 * toilet-safety 4 SKU · 50–300 · walkers 6 SKU · 100
 * walking-aids 22 SKU · 100–500
 */
export const CATEGORY_PRICING: CategoryPricing[] = [
  {
    slug: 'walking-aids',
    name: 'Walking aids & canes',
    skus: 22,
    moqFrom: 100,
    moqTo: 500,
    priceBand: '',
    note: 'Carbon-fibre and folding canes carry a higher MOQ than fixed aluminium models because the tube set and tip tooling are shared across a full run.',
  },
  {
    slug: 'bath-safety',
    name: 'Bath safety & shower chairs',
    skus: 13,
    moqFrom: 30,
    moqTo: 500,
    priceBand: '',
    note: 'The widest MOQ range in our catalogue: a standard moulded seat starts at 30 units, while a custom frame colour or a new seat mould moves the entry point up.',
  },
  {
    slug: 'walkers',
    name: 'Walkers & rollators',
    skus: 6,
    moqFrom: 100,
    moqTo: 100,
    priceBand: '',
    note: 'A single flat MOQ of 100 units per SKU — these models share one frame platform, so there is no low-volume variant.',
  },
  {
    slug: 'commode-chairs',
    name: 'Commode chairs',
    skus: 6,
    moqFrom: 30,
    moqTo: 500,
    priceBand: '',
    note: 'Steel folding models start low; height-adjustable and padded models with multi-part frames need a longer setup and therefore a higher entry point.',
  },
  {
    slug: 'toilet-safety',
    name: 'Toilet safety rails',
    skus: 4,
    moqFrom: 50,
    moqTo: 300,
    priceBand: '',
    note: 'Small, high-density cartons keep freight cheap, which is why the low end of this category is more accessible than the frame products.',
  },
];

/** MOQ 是怎么算出来的 —— 这一段是页面可信度的核心 */
export const MOQ_EXPLAINER = [
  {
    title: 'Per SKU, not per purchase order',
    desc: 'The MOQ applies to each model and colour combination, not to the order total. Three SKUs at their individual MOQ is a valid order; one SKU below its MOQ is not.',
  },
  {
    title: 'Setup cost is the real floor',
    desc: 'Tube cutting, welding jigs, powder-coating batch size and carton printing all have a fixed cost. A 30-unit run pays the same setup as a 300-unit run — it just pays it across fewer pieces.',
  },
  {
    title: 'Custom colour and packaging move the floor',
    desc: 'Standard colours are coated in batches that serve several orders. A custom RAL colour or a printed carton becomes a dedicated run, so the minimum rises with it.',
  },
  {
    title: 'Mixed containers are allowed',
    desc: 'Once each SKU clears its own minimum, you can combine categories in one container. This is how most first orders from distributors are structured.',
  },
];

/** 报价包含什么 —— 逐条列出，避免“低价后面加项” */
export const QUOTE_INCLUDES = [
  'Raw material and components',
  'Production labour and assembly',
  'Powder coating / anodising in standard colours',
  'In-line and pre-shipment inspection',
  'Standard export carton with your shipping mark',
  'Declaration of conformity and batch test report',
  'Loading supervision and container photos',
  'Export documentation (packing list, invoice, HS code)',
  'Product liability insurance on the shipped value',
];

/** 三条降本路径 */
export const COST_LEVERS = [
  {
    n: '1',
    title: 'Consolidate SKUs',
    desc: 'Freight and setup are per run. Moving from three small orders a year to one mixed container usually cuts landed cost more than any negotiation on unit price.',
  },
  {
    n: '2',
    title: 'Use existing tooling',
    desc: 'Choosing a model already in production avoids the new-mould or new-jig cost entirely. Customisation on an existing platform (colour, label, carton) is far cheaper than a new frame.',
  },
  {
    n: '3',
    title: 'Standardise packaging',
    desc: 'A stock carton with a printed shipping mark costs a fraction of a full-colour retail box. Upgrade the retail packaging only after the product is validated in your market.',
  },
];

/** 从询价到交付 */
export const QUOTE_STEPS = [
  { n: '1', title: 'Send the brief', desc: 'Product, target quantity, destination country and any certification your customer requires.' },
  { n: '2', title: 'Quote within 24 hours', desc: 'An itemised FOB quote — unit price, carton data, MOQ per SKU and lead time.' },
  { n: '3', title: 'Sample approval', desc: 'Pre-production sample against your spec, with the test report for that batch.' },
  { n: '4', title: 'Order & deposit', desc: 'PI issued, deposit received, production slot booked in writing.' },
  { n: '5', title: 'Production & inspection', desc: '15–30 days, with loading photos and the batch inspection report before shipment.' },
  { n: '6', title: 'Shipment', desc: 'FOB, CIF or door delivery — we work with your forwarder or introduce ours.' },
];

export const PRICING_FAQS = [
  {
    question: 'Why do you not publish a single unit price?',
    answer:
      'Because the same shower chair can leave the factory at very different unit costs depending on seat material, frame colour, carton type and quantity — publishing one number would be misleading. What we do publish is the real MOQ per category, derived from the 51 models currently in our catalogue, plus an itemised quote within 24 hours.',
  },
  {
    question: 'What is the lowest MOQ you accept?',
    answer:
      '30 units per SKU on selected steel folding models in the bath safety and commode chair categories. Walkers are a flat 100 units per SKU. If your first order is below the MOQ for the model you want, we will tell you which models can meet your volume instead.',
  },
  {
    question: 'Can I mix different models in one order?',
    answer:
      'Yes, as long as each SKU meets its own minimum. Mixed containers are normal for distributors — the container can hold several categories as long as the total volume fills it economically.',
  },
  {
    question: 'What are the payment terms?',
    answer:
      'Standard terms are 30% deposit with the balance before shipment, against a copy of the bill of lading. Terms are confirmed on the proforma invoice before production starts; we do not change them after the deposit.',
  },
  {
    question: 'Are prices FOB or delivered?',
    answer:
      'Quotes are FOB by default, from a South China port. If you need CIF or door delivery we quote the freight and insurance separately so you can compare them against your own forwarder.',
  },
];
