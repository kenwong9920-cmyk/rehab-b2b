/**
 * 认证与合规数据 —— /en/certifications 单一数据源
 *
 * 设计原则：
 * 1. 每张证书都必须给出「买家可以自己去查」的路径，否则这个页面没有意义。
 * 2. 编号未知时 **不要编造**。留空即可，页面会自动降级为「索取证书副本」。
 *    编一个假编号比不写更糟——买家真去查了会当场失去信任。
 * 3. 填好 number / issuer / validUntil / verifyUrl 之后，页面自动升级为可核验状态。
 */

export type CertEntry = {
  /** 证书简称，用于卡片标题 */
  name: string;
  /** 全称 */
  fullName: string;
  /** 证书编号（未知留空字符串） */
  number?: string;
  /** 发证机构（未知留空） */
  issuer?: string;
  /** 有效期至（ISO 日期，未知留空） */
  validUntil?: string;
  /** 该证书实际覆盖什么 —— 越具体越可信 */
  scope: string;
  /** 买家自查路径说明 */
  howToVerify: string;
  /** 官方查询入口（可选） */
  verifyUrl?: string;
  /** 与康复器械买家的相关性说明 */
  whyItMatters: string;
};

export const CERTS: CertEntry[] = [
  {
    name: 'ISO 13485:2016',
    fullName: 'Medical devices — Quality management systems',
    number: '',
    issuer: '',
    validUntil: '',
    scope:
      'Design and manufacture of rehabilitation equipment: walking aids, walkers, bath safety seating, commode chairs and toilet safety rails.',
    howToVerify:
      'Ask us for the certificate PDF, then check the certificate number and scope wording against the certification body’s own online certificate register. The legal entity name on the certificate must match our business licence.',
    verifyUrl: '',
    whyItMatters:
      'ISO 13485 is the quality system most EU and Middle East importers require before they will place a first order. It is not the same thing as ISO 9001 — ISO 9001 alone is usually rejected for medical devices.',
  },
  {
    name: 'CE marking (EU MDR)',
    fullName: 'Regulation (EU) 2017/745 on medical devices',
    number: '',
    issuer: '',
    validUntil: '',
    scope:
      'Class I rehabilitation equipment (non-sterile, no measuring function), covered by an EU Declaration of Conformity issued under our quality system.',
    howToVerify:
      'Request the EU Declaration of Conformity and the technical documentation index. Check that the class stated in the DoC matches the product you are buying, and that the manufacturer name and address match the label.',
    verifyUrl: '',
    whyItMatters:
      'Class I devices do not need a Notified Body, so a CE certificate from a Notified Body is not expected — but the Declaration of Conformity and technical file are mandatory and must be available to your local authority on request.',
  },
  {
    name: 'US FDA registration',
    fullName: 'Establishment registration and device listing (21 CFR Part 807)',
    number: '',
    issuer: 'U.S. Food and Drug Administration',
    validUntil: '',
    scope:
      'Manufacturing establishment registration and device listing for our rehabilitation equipment, which is regulated as Class I in the United States.',
    howToVerify:
      'Search our establishment registration number in the FDA’s public establishment database, and confirm each device listing separately. Registration does not equal approval — read the difference before you compare suppliers.',
    verifyUrl: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfRL/rl.cfm',
    whyItMatters:
      'US customs and Amazon both ask for the FDA registration number. A supplier who cannot produce one is not legally able to ship medical devices into the United States on their own registration.',
  },
  {
    name: 'ISO 9001:2015',
    fullName: 'Quality management systems — Requirements',
    number: '',
    issuer: '',
    validUntil: '',
    scope: 'General manufacturing quality management across the production facility.',
    howToVerify:
      'Same method as ISO 13485: check the number against the certification body’s register, and read the scope — a certificate that only covers “trading” does not cover manufacturing.',
    verifyUrl: '',
    whyItMatters:
      'Useful for non-medical buyers and for tender documents, but on its own it does not satisfy medical device import requirements.',
  },
];

/** 买家拿到的文件包 —— 每个订单都随货提供 */
export const DOC_PACKAGE = [
  { name: 'Certificate of Conformity / DoC', desc: 'Signed declaration matching the exact model and batch shipped.' },
  { name: 'Batch inspection report', desc: 'Load test, visual inspection and packing check for the production batch.' },
  { name: 'Test reports', desc: 'Load capacity, stability and material test reports where applicable.' },
  { name: 'Packing list & commercial invoice', desc: 'Carton dimensions, gross/net weight and HS code for customs.' },
  { name: 'Instructions & labelling artwork', desc: 'Target-market label version, including importer block if you need it.' },
];

/** 四步核验流程 */
export const VERIFY_STEPS = [
  {
    step: '1',
    title: 'Ask for the document, not the logo',
    desc: 'Every certificate claim on this site can be backed by a PDF with a number on it. If a supplier sends you a picture of a certificate with the number cropped out, treat it as unverified.',
  },
  {
    step: '2',
    title: 'Check the number with the issuer',
    desc: 'Use the certification body’s own register, not the certificate itself, not the supplier’s website. The number should return an active status and a scope that mentions the products you are buying.',
  },
  {
    step: '3',
    title: 'Match the legal entity name',
    desc: 'The company name on the certificate, the business licence and the invoice must all be the same legal entity. This is the single most common discrepancy we see in competitor documentation packages.',
  },
  {
    step: '4',
    title: 'Ask what happens when the certificate expires',
    desc: 'A certificate with three months left is a supply risk. Ask for the surveillance audit date and what the renewal plan is before you commit to a yearly programme.',
  },
];

/** 本页 FAQ（同时输出 FAQPage schema） */
export const CERT_FAQS = [
  {
    question: 'Can you send certificate copies before we place an order?',
    answer:
      'Yes. We send the certificate PDFs, the Declaration of Conformity and the test report index before any deposit, and we expect buyers to check them against the issuer’s register rather than take our word for it.',
  },
  {
    question: 'Is CE marking enough to sell rehabilitation equipment in the EU?',
    answer:
      'CE marking is the manufacturer’s declaration; your obligations as importer are separate. Under Regulation (EU) 2017/745 the importer must verify the Declaration of Conformity, keep the technical documentation available, register in EUDAMED and put their own name and address on the label. We supply the documents you need for that, but the importer registration is yours.',
  },
  {
    question: 'What is the difference between FDA registration and FDA approval?',
    answer:
      'Registration and device listing mean the establishment and the product are on file with the FDA. Approval would mean a cleared premarket submission. Most walking aids, walkers, commode chairs and bath safety products are Class I and 510(k)-exempt, so registration is the correct status — a supplier claiming “FDA approved” for a shower chair is usually misstating it.',
  },
  {
    question: 'Do you have a factory audit report or a social compliance report?',
    answer:
      'We host buyer audits and third-party inspections on request. Tell us which scheme your customer requires (BSCI, Sedex, or a specific retailer standard) and we will confirm what is currently on file before you commission a new audit.',
  },
  {
    question: 'Which documents ship with each order?',
    answer:
      'Every shipment includes the Declaration of Conformity, batch inspection report, packing list and commercial invoice with HS codes. Test reports and labelling artwork for your target market are included on request at order confirmation.',
  },
];
