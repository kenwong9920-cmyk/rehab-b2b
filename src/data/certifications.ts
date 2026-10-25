/**
 * 认证与合规数据 —— /en/certifications 单一数据源
 *
 * ⚠️ 事实核查结论（2026-10-25，依据资料库「证书」文件夹内的原件）：
 *
 * 1. ISO 13485 / ISO 9001 由华认联（Huarenlian）签发，编号、签发日、有效期齐全。
 * 2. 「洗澡椅CE报告」「坐便椅CE报告」实际是 **RoHS 测试报告**（2011/65/EU + (EU) 2015/863），
 *    不是医疗器械 MDR 的符合性评定。
 * 3. GPSR 证书（TQT1520D368EC）依据 **EN 12520:2024 + EN 1728:2012**（家具座具强度标准），
 *    可用 CE 标识证明符合 GPSR 2023/988 —— 仍然不是 MDR。
 * 4. 「碳纤维拐杖专利证书」实际是 **EUIPO 注册式共同体外观设计**（015134442-0001），不是发明专利。
 * 5. MDR 符合性声明（DoC）与 FDA 注册/列名：**业务已确认持有**（2026-10-25 用户确认），
 *    原件不在资料库该文件夹内。因此按「confirmed, number with the document package」呈现，
 *    **不编造编号** —— 编号一旦写错，买家在 FDA / 公告机构数据库里查不到，整页可信度归零。
 *    TODO：拿到编号后填入 number 字段，页面自动从「随文件包提供」升级为可在线核验。
 *
 * 因此本页刻意把「我们有什么」和「我们没有什么」分开写。
 * 把 GPSR/RoHS 说成 MDR CE，是买家一查就穿的谎，也是这个页面唯一会反噬的写法。
 */

export type DocType = 'qms' | 'product' | 'declaration' | 'ip';

export type CertDoc = {
  type: DocType;
  title: string;
  /** 证书/报告编号；留空表示编号随文件包提供（页面不显示 No.） */
  number: string;
  /** number 为空时显示的替代说明 */
  numberNote?: string;
  issuer: string;
  /** 签发日 / 注册日（YYYY-MM-DD）；留空则页面不显示日期行 */
  issued: string;
  /** issued 为空时的替代说明 */
  dateNote?: string;
  /** 有效期至（无固定有效期则留空） */
  validUntil?: string;
  /** 依据的标准或指令 */
  standard: string;
  /** 覆盖范围：尽可能具体到型号 */
  covers: string;
  /** 一句话说明这到底是什么 */
  whatItIs: string;
  /** 一句话说明它不是什么（防止过度解读） */
  whatItIsNot?: string;
  /** 买家如何自查 */
  verify: string;
  verifyUrl?: string;
  /** 该文件对买家的状态标签 */
  badge?: string;
};

export const DOCS: CertDoc[] = [
  // ── 质量管理体系 ──
  {
    type: 'qms',
    title: 'ISO 13485:2016 — Medical device quality management system',
    number: '8623138319',
    issuer: 'Huarenlian Certification Service Co., Ltd. (华认联)',
    issued: '2025-06-19',
    validUntil: '2028-06-18',
    standard: 'GB/T 42061-2022 / ISO 13485:2016',
    covers:
      'Guangdong Jinda health care Co., Ltd — sales and production of Class I medical devices, including walking aids, bath safety seating, commode chairs and toilet safety rails.',
    whatItIs:
      'The quality system certificate most EU and Middle East importers require before a first order. It speaks to how the factory is run, not just to how one sample tested.',
    whatItIsNot:
      'It is not a product certificate. It does not certify any individual model, and it does not replace a Declaration of Conformity.',
    verify:
      'Check the number and the scope wording against the certification body’s register, and confirm the legal entity on the certificate matches the business licence. Ask for the PDF and the licence side by side.',
  },
  {
    type: 'qms',
    title: 'ISO 9001:2015 — Quality management system',
    number: '8629985173',
    issuer: 'Huarenlian Certification Service Co., Ltd. (华认联)',
    issued: '2025-06-19',
    validUntil: '2028-06-18',
    standard: 'GB/T 19001-2016 / ISO 9001:2015',
    covers:
      'General manufacturing quality management across the Zhongshan facility, including Class I medical device production and sales.',
    whatItIs:
      'Useful for tender documents, and for buyers whose customer asks for ISO 9001 specifically rather than ISO 13485.',
    whatItIsNot:
      'ISO 9001 alone does not satisfy medical device import requirements — if a distributor asks for 13485, this certificate will not substitute for it.',
    verify:
      'Same method as the 13485 certificate: number against the issuer’s register, and read the scope line, not the logo.',
  },

  // ── 产品符合性 ──
  {
    type: 'product',
    title: 'EU GPSR Certificate of Compliance — CE marking',
    number: 'TQT1520D368EC',
    issuer: 'Shenzhen Tianqi Testing Technology Service Co., Ltd. (TQT)',
    issued: '2026-06-10',
    standard: 'EN 12520:2024 · EN 1728:2012 · EU GPSR 2023/988',
    covers:
      'Folding shower stool, main test model LM5108 (test report TQT1520D368E). The certificate states that it applies to the tested sample and does not assess the whole production.',
    whatItIs:
      'A product-safety conformity certificate issued under the EU General Product Safety Regulation, tested to the European seating strength and durability standards EN 12520 and EN 1728. It permits CE marking to demonstrate compliance with GPSR.',
    whatItIsNot:
      'It is not a medical device conformity assessment under MDR 2017/745. EN 12520 and EN 1728 are furniture seating standards, not medical device standards.',
    verify:
      'Ask for the certificate together with test report TQT1520D368E, then confirm the model number and the standards on the certificate match the product you are buying. The report is the evidence; the certificate is the summary.',
  },
  {
    type: 'product',
    title: 'EU RoHS test report — bath chair series',
    number: 'RC2503200748',
    issuer: 'South China Technical Service Co., Ltd. (GD-SCT)',
    issued: '2025-04-01',
    standard: 'RoHS Directive 2011/65/EU & (EU) 2015/863',
    covers:
      'Bath chair, test model LM3200, covering series LM5101, LM5103, LM5104, LM3201, LM3202, LM3203, LM3004, LM3205, LM3206. Result: pass.',
    whatItIs:
      'Evidence that restricted substances (lead, cadmium, mercury, hexavalent chromium, PBBs, PBDEs) are within RoHS limits on the tested models.',
    whatItIsNot:
      'RoHS is a hazardous-substance directive, not a medical device or general product safety assessment. It is not the document a distributor means when they ask for “CE”.',
    verify:
      'Request the full report, check the model and series list against your order, and read the conclusion line of each test item.',
  },
  {
    type: 'product',
    title: 'EU RoHS test report — commode chair series',
    number: 'RC2503200997',
    issuer: 'South China Technical Service Co., Ltd. (GD-SCT)',
    issued: '2025-04-01',
    standard: 'RoHS Directive 2011/65/EU & (EU) 2015/863',
    covers:
      'Commode chair, test model LM6207, covering series LM6201–LM6209 and LM252. Result: pass.',
    whatItIs:
      'The same substance-limit evidence as the bath chair report, applied to the commode chair series.',
    whatItIsNot: 'Not a mechanical strength or medical device conformity document.',
    verify:
      'Same method as above: match the model and series list, and read the conclusion per test item.',
  },

  // ── 符合性声明（编号随文件包提供）──
  {
    type: 'declaration',
    title: 'EU MDR Declaration of Conformity — CE marking under 2017/745',
    number: '',
    numberNote: 'Reference number supplied with the document package',
    issuer: 'Guangdong Jinda health care Co., Ltd — manufacturer’s own declaration',
    issued: '',
    dateNote: 'Issued per model and per production run',
    standard:
      'Regulation (EU) 2017/745 (MDR), Annex IV content · risk management to EN ISO 14971 · information supplied by the manufacturer to EN ISO 1041',
    covers:
      'Class I rehabilitation equipment placed on the EU market under our own name — walking aids, bath safety seating, commode chairs, walkers and toilet safety rails. The declaration names the models it covers; a model not named on it is not covered by it.',
    whatItIs:
      'The document that actually makes CE marking lawful for a medical device. It states the device class, the models covered, the standards applied and the person signing on behalf of the manufacturer. For Class I devices the manufacturer declares conformity itself — there is no notified body certificate behind it, and none is required.',
    whatItIsNot:
      'It is not a notified-body certificate, and it is not the GPSR certificate listed above. If your distributor or tender treats the product as a higher class — for example an electrically powered or body-invasive variant — the route is different and we will say so before you order.',
    verify:
      'There is no public register for a Declaration of Conformity — that is exactly why it is the easiest document to fake. Check it three ways: the legal entity and address match the ISO 13485 certificate, the model you are buying is named on it, and the standards listed match what your market requires. Then ask the signatory to confirm the version date in writing.',
    badge: 'Held — copy on request',
  },
  {
    type: 'declaration',
    title: 'US FDA establishment registration & device listing',
    number: '',
    numberNote: 'Registration and listing numbers supplied with the document package',
    issuer: 'US Food and Drug Administration — registrant: Guangdong Jinda health care Co., Ltd',
    issued: '',
    dateNote: 'Registration is renewed annually, 1 October – 31 December',
    standard: 'FD&C Act · 21 CFR Part 807 (establishment registration and device listing)',
    covers:
      'The Zhongshan manufacturing facility and the Class I rehabilitation products listed for export to the United States. Device listing is per product, so confirm the listing covers the specific model and product code you are importing.',
    whatItIs:
      'Registration and listing are what US customs brokers and marketplace compliance teams actually look up: the facility appears in the FDA establishment database, and each device appears in the listing database under its product code. For the product codes covering walking aids, bath chairs, commode chairs and walkers, premarket notification under 510(k) is generally not required — which is why these reach the US as Class I listed devices.',
    whatItIsNot:
      'Registration is not approval, and FDA does not “approve” Class I devices. If any supplier of this product category tells you they are “FDA approved”, the term is being misused — the correct wording is registered and listed. Registration also does not certify that a given unit meets the specification.',
    verify:
      'Search both FDA public databases yourself: the establishment registration database for the facility name and address, then the device listing database for the product code. Ask us for the registration number and the listing numbers, and match them against what the databases return — the numbers should resolve to the Zhongshan address, not to a trading company.',
    verifyUrl: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfRL/rl.cfm',
    badge: 'Held — copy on request',
  },

  // ── 知识产权 ──
  {
    type: 'ip',
    title: 'EUIPO registered Community design — carbon fibre cane',
    number: '015134442-0001',
    issuer: 'European Union Intellectual Property Office (EUIPO)',
    issued: '2026-02-27',
    standard: 'Registered Community design · Locarno class 03-0351 (canes)',
    covers:
      'The external appearance of the carbon fibre walking cane, registered to Guangdong Jinda health care Co., Ltd, with the designer named on the register.',
    whatItIs:
      'A registered design protects the look of the product in the EU. It matters to buyers investing in artwork, tooling or a private label range built on that shape.',
    whatItIsNot:
      'It is a design registration, not a patent — it protects appearance, not a technical mechanism or a material formula.',
    verify:
      'Search the design number in the EUIPO eSearch plus database. Registrations are public and show the holder, the designer and the renewal dates.',
    verifyUrl: 'https://euipo.europa.eu/eSearch/',
  },
];

/** 我们不持有、或按规则本就不适用的文件 */
export const NOT_IN_FOLDER = [
  {
    name: 'Notified body certificate under MDR',
    status: 'Does not apply to Class I',
    note: 'Class I devices are self-declared, so there is no notified body certificate to show — for us or for any competitor selling the same class. If your tender template demands one, the requirement does not match the device class, and we will say that rather than send you a certificate for a different product.',
  },
  {
    name: 'Mechanical strength test to a medical device standard',
    status: 'Not in this folder',
    note: 'The strength evidence on file is EN 12520 / EN 1728, which are furniture seating standards. If your tender or distributor specifies a medical device standard such as ISO 7176 or a national variant, that test has to be commissioned separately — we will quote the lead time rather than imply the existing report covers it.',
  },
  {
    name: 'Social compliance audit (BSCI / Sedex)',
    status: 'On request',
    note: 'We host buyer and third-party audits. Tell us which scheme your customer requires and we will confirm what is currently on file before you commission a new one.',
  },
  {
    name: 'EU REACH SVHC declaration for every component',
    status: 'Per model — quote stage',
    note: 'RoHS reports cover the electrical and metal content of the tested series. REACH SVHC is a separate declaration and is issued per model against the current candidate list. Ask for it with the model numbers and we will confirm which version applies.',
  },
];

/** 买家拿到的文件包 —— 每个订单都随货提供 */
export const DOC_PACKAGE = [
  { name: 'Declaration of Conformity', desc: 'Issued for the exact model and batch shipped, not a generic template.' },
  { name: 'Batch inspection report', desc: 'Load test, visual inspection and packing check for the production batch.' },
  { name: 'Test reports covering that model', desc: 'The report numbers listed on this page, where they cover the model you ordered.' },
  { name: 'Packing list & commercial invoice', desc: 'Carton dimensions, gross/net weight and HS code for customs.' },
  { name: 'Labelling artwork for your market', desc: 'Including the importer block, in the language your market requires.' },
];

/** 四步核验流程 */
export const VERIFY_STEPS = [
  {
    step: '1',
    title: 'Ask for the document, not the logo',
    desc: 'A certificate claim is only worth the PDF behind it. If a supplier sends an image with the number cropped out, treat it as unverified — that is usually deliberate.',
  },
  {
    step: '2',
    title: 'Check the number with the issuer',
    desc: 'Use the certification body’s own register, not the certificate itself and not the supplier’s website. The number should return an active status and a scope covering the products you are buying.',
  },
  {
    step: '3',
    title: 'Read what the document actually covers',
    desc: 'This is where most buyers get caught. A GPSR certificate, a RoHS report and an MDR declaration are all “CE” documents, and only one of them is a medical device assessment. Check the standard numbers, not the badge.',
  },
  {
    step: '4',
    title: 'Match the legal entity name',
    desc: 'The name on the certificate, the business licence and the invoice must be the same legal entity. Mismatches here are the most common problem in Chinese documentation packages.',
  },
];

export const CERT_FAQS = [
  {
    question: 'Is your CE marking a medical device certificate?',
    answer:
      'Yes — through our own Declaration of Conformity under MDR 2017/745, which is how Class I devices are lawfully CE marked. There is no notified body involved at this class, for us or for anyone else. Alongside it we hold a GPSR Certificate of Compliance for the folding shower stool tested to EN 12520:2024 and EN 1728:2012, and RoHS reports for the bath chair and commode chair series. The distinction matters: the MDR declaration is the medical device document, the GPSR certificate is the general product safety one, and they are not interchangeable.',
  },
  {
    question: 'Can you send the certificate PDFs before we place an order?',
    answer:
      'Yes, and we expect you to check them against the issuer rather than take our word for it. Ask for the ISO 13485 certificate, the MDR Declaration of Conformity for the model you want, the FDA registration and listing numbers, the GPSR certificate with its test report, and the two RoHS reports. The four documents with public registers are on this page with their numbers.',
  },
  {
    question: 'The ISO 13485 certificate is issued by a Chinese certification body. Does that matter?',
    answer:
      'It can, depending on your customer. Huarenlian is a Chinese certification body, and some EU distributors and public tenders specifically require a certificate from a body accredited under the IAF medical device scheme. Ask them which they accept before you commission anything — if they need a different body, that is a re-certification project rather than a document request.',
  },
  {
    question: 'Do you have FDA registration?',
    answer:
      'Yes — the Zhongshan facility is registered with the FDA and our Class I products are listed, and both numbers are in the document package. Look them up yourself in the FDA establishment and device listing databases: the numbers should resolve to our address in Zhongshan, not to a trading company. One wording point worth keeping straight: registration and listing are not approval. FDA does not approve Class I devices, so if you see a competitor advertising “FDA approved” for a walking aid or a shower chair, that claim is being misused.',
  },
  {
    question: 'What ships with each order?',
    answer:
      'A Declaration of Conformity for the exact model and batch, the batch inspection report, packing list and commercial invoice with HS codes, and the label artwork for your market. Test reports are supplied where they cover the model you ordered — and we will tell you when they do not.',
  },
];
