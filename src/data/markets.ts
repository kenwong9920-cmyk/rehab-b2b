/**
 * 出口市场页数据 —— /en/markets/{slug}
 *
 * 写作原则：
 * 1. 只写可核验的规则（法规编号、器械分类逻辑），不写具体官费数字（各国会变）。
 * 2. 明确区分「工厂负责」与「进口商负责」——这是买家最容易踩的坑，也是最容易建立专业感的地方。
 * 3. 时效用区间并注明"以你方代理实际排期为准"，不承诺官方审批天数。
 * 4. 每个市场都不假装适合所有人：结尾写清"什么情况不适合从中国采购"。
 */

export type MarketDoc = {
  document: string;
  /** manufacturer = 工厂出具 · importer = 进口商/当地持证人办理 */
  owner: 'manufacturer' | 'importer' | 'both';
  note: string;
};

export type Market = {
  slug: string;
  name: string;
  flag: string;
  /** H1 */
  h1: string;
  /** meta description */
  description: string;
  /** 开篇两段：这个市场的买家真正在意什么 */
  intro: string[];
  /** 器械分类说明 */
  classification: string;
  docs: MarketDoc[];
  logistics: { label: string; value: string }[];
  hotCategories: string[];
  /** 这个市场常见的“坑” */
  pitfalls: string[];
  faqs: { question: string; answer: string }[];
};

export const MARKETS: Market[] = [
  {
    slug: 'north-america',
    name: 'North America',
    flag: '🇺🇸',
    h1: 'Rehabilitation equipment for North American importers and distributors',
    description:
      'FDA establishment registration, Class I device listing and 21 CFR 801 labelling for walking aids, shower chairs and commode chairs shipped to the US and Canada.',
    intro: [
      'North American buyers rarely ask about price first. They ask for the FDA registration number, the label artwork, and whether the product is a Class I exempt device — because those three things decide whether the container clears customs and whether Amazon will accept the listing.',
      'This page lays out what the manufacturer provides, what your importer of record has to file, and where the two usually get confused.',
    ],
    classification:
      'Most walking aids, canes, walkers, rollators, commode chairs, shower chairs and toilet safety rails are regulated by the FDA as Class I devices and are 510(k)-exempt. Exemption from premarket notification is not exemption from regulation: the establishment must register and each device must be listed. Some products carrying therapeutic claims, or supplied sterile, fall outside the exemption and need a 510(k) — check the classification database for your exact product code before you assume.',
    docs: [
      { document: 'Establishment registration (FDA)', owner: 'manufacturer', note: 'Filed annually by the manufacturing establishment; the registration number is what your broker will ask for.' },
      { document: 'Device listing', owner: 'manufacturer', note: 'One listing per device/listing combination. Registration without listing is a common gap in competitor paperwork.' },
      { document: 'Declaration of Conformity', owner: 'manufacturer', note: 'States the classification, the applicable regulation and that the device meets it.' },
      { document: 'Label artwork to 21 CFR 801', owner: 'both', note: 'Manufacturer supplies artwork; the importer’s name and address must appear if you are the importer of record.' },
      { document: 'UDI / GUDID entry', owner: 'importer', note: 'Class I devices require UDI labelling. The GUDID record is normally created by the labeler — often you, not us.' },
      { document: 'Import entry (CBP Form 7501)', owner: 'importer', note: 'Your customs broker files this; we supply the commercial invoice, packing list and HS code.' },
    ],
    logistics: [
      { label: 'Loading ports', value: 'Shenzhen (Yantian/Shekou), Guangzhou (Nansha), Ningbo' },
      { label: 'Sea transit', value: 'West coast approx. 14–20 days; east coast approx. 30–40 days via Panama or Suez' },
      { label: 'Air freight', value: '5–8 days door to door for samples and urgent replenishment' },
      { label: 'Container mix', value: 'Mobility products are bulky: 40HQ is usually the efficient unit above ~500 units' },
    ],
    hotCategories: ['bath-safety', 'walking-aids', 'commode-chairs', 'walkers'],
    pitfalls: [
      'Treating the FDA registration number as an approval — it is not, and Amazon and CBP treat the two differently.',
      'Using a label that names the Chinese manufacturer as the importer of record.',
      'Assuming 510(k) exemption covers a product once a therapeutic claim is added to the packaging.',
    ],
    faqs: [
      {
        question: 'Do you have an FDA registration number we can verify?',
        answer:
          'Yes — we supply the establishment registration number and the corresponding device listings, and you can check both in the FDA’s public databases before ordering. We send the numbers as part of the document package rather than asking you to take a logo on a website as proof.',
      },
      {
        question: 'Is a shower chair a medical device in the US?',
        answer:
          'Bath safety seating sold for medical or rehabilitative use is generally regulated as a Class I device; the same chair sold purely as a household convenience item may not be. The intended use statement on your label and listing is what decides it, which is why the artwork matters as much as the product.',
      },
      {
        question: 'Can you ship directly to an Amazon FBA warehouse?',
        answer:
          'Yes. We can pack to FBA requirements — FNSKU labels, poly bags with the suffocation warning, carton weight and dimension limits — and ship to the warehouse appointment. Tell us the fulfilment centre and we build the carton plan around it.',
      },
      {
        question: 'What HS code applies to walking aids and shower chairs?',
        answer:
          'Walking aids, canes and walkers typically fall under 6602; commode chairs and bath chairs under furniture or medical furniture headings depending on construction and intended use. We state the HS code we use on every invoice, but the final classification is your broker’s call — we will send product photos and material breakdown to support it.',
      },
    ],
  },
  {
    slug: 'europe',
    name: 'Europe (EU)',
    flag: '🇪🇺',
    h1: 'Rehabilitation equipment for EU importers under MDR 2017/745',
    description:
      'CE marking, EU Declaration of Conformity, EUDAMED and technical documentation for Class I rehabilitation equipment imported into the European Union.',
    intro: [
      'Since MDR 2017/745 replaced the old directive, the importer carries obligations that used to sit with the manufacturer. Most first-time EU importers discover this after the goods arrive, when their distributor asks for a Declaration of Conformity that names the right entity and a technical file that actually matches the product.',
      'Here is how the responsibilities split, and what we hand over so your file is complete.',
    ],
    classification:
      'Walking aids, canes, walkers, rollators, commode chairs, shower chairs and toilet safety rails are typically Class I under MDR Annex VIII — non-sterile, no measuring function, not reusable surgical instruments. Class I devices are self-certified: no Notified Body is involved, and the manufacturer issues the EU Declaration of Conformity under its own quality system. That also means there is no Notified Body certificate to show you, which surprises buyers who expect one.',
    docs: [
      { document: 'EU Declaration of Conformity', owner: 'manufacturer', note: 'Names the device, the class, the regulation and the manufacturer’s legal entity. Must match the label.' },
      { document: 'Technical documentation (Annex II & III)', owner: 'manufacturer', note: 'Risk analysis, verification and validation, labelling, and the GSPR checklist. Must be available to the authority on request.' },
      { document: 'ISO 13485 certificate', owner: 'manufacturer', note: 'Not strictly mandatory for Class I self-certification, but almost every EU distributor requires it in practice.' },
      { document: 'EUDAMED actor registration (SRN)', owner: 'importer', note: 'You register as importer and obtain your SRN; we register as manufacturer and provide our SRN.' },
      { document: 'UDI (MDR)', owner: 'manufacturer', note: 'Basic UDI-DI plus UDI-DI on the label and packaging, entered in EUDAMED.' },
      { document: 'Importer details on the label', owner: 'importer', note: 'Your name, registered trade name and address must appear on the device or its packaging.' },
      { document: 'PRRC (Person Responsible for Regulatory Compliance)', owner: 'manufacturer', note: 'A named qualified person available at the manufacturer; we provide the name and qualification on request.' },
    ],
    logistics: [
      { label: 'Loading ports', value: 'Shenzhen, Ningbo, Shanghai' },
      { label: 'Sea transit', value: 'Rotterdam / Hamburg approx. 30–38 days; Mediterranean (Genoa, Valencia) approx. 28–35 days' },
      { label: 'Rail option', value: 'China–Europe rail to Duisburg / Warsaw, approx. 18–25 days, useful for mid-volume replenishment' },
      { label: 'Compliance note', value: 'Nordic and DACH distributors routinely ask for the GSPR checklist and the clinical evaluation reference before listing' },
    ],
    hotCategories: ['bath-safety', 'walkers', 'walking-aids', 'toilet-safety'],
    pitfalls: [
      'Asking for a Notified Body certificate on a Class I device — there is not one, and a supplier who produces one is likely misstating the classification.',
      'Shipping before the importer’s SRN exists, which blocks the EUDAMED entries later.',
      'A Declaration of Conformity that lists a trading company rather than the legal manufacturer.',
    ],
    faqs: [
      {
        question: 'Do Class I rehabilitation products need a Notified Body?',
        answer:
          'No. Non-sterile Class I devices with no measuring function are self-certified under MDR, so the manufacturer issues the Declaration of Conformity without a Notified Body. What you should ask for instead is the DoC, the technical documentation index, and evidence that the quality system is certified to ISO 13485.',
      },
      {
        question: 'Who registers in EUDAMED — you or us?',
        answer:
          'Both, in different roles. We register as the manufacturer and hold an SRN; you register as the importer and hold your own SRN. The device registration and UDI entries are tied to the manufacturer record, which is why we complete ours before your first shipment rather than after.',
      },
      {
        question: 'Can you put our company name and address on the label?',
        answer:
          'Yes. Under MDR the importer’s name and address must appear on the device or packaging, so we print your importer block as part of the label artwork. Send the exact legal wording you need and we will set it in the layout for your approval before production.',
      },
      {
        question: 'Which languages must the instructions be in?',
        answer:
          'The language(s) required by the member state where you place the device on the market — commonly German, French, Dutch, Italian, Spanish or Polish. We produce the translated IFU for the markets you name; the translation is reviewed by your local distributor before release.',
      },
    ],
  },
  {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    h1: 'Rehabilitation equipment for UK importers — MHRA and UKCA',
    description:
      'MHRA device registration, UKCA marking and the current status of CE recognition for rehabilitation equipment supplied to Great Britain.',
    intro: [
      'Great Britain (England, Scotland, Wales) runs its own device regime under the MHRA, separate from the EU. Northern Ireland follows EU rules. That split alone causes more confusion than any other part of UK sourcing.',
      'This page covers what our documents support and what your UK entity has to file.',
    ],
    classification:
      'Walking aids, walkers, commode chairs, bath chairs and toilet rails are generally Class I under the UK Medical Devices Regulations 2002. The UK has extended recognition of CE marking for many device types, so a CE-marked Class I device can usually continue to be placed on the GB market — but MHRA registration of the device and the UK Responsible Person is still required, and the rules have moved several times, so confirm the position with your UK regulatory advisor for your product and date.',
    docs: [
      { document: 'UK Responsible Person (UKRP) appointment', owner: 'importer', note: 'A UK-based entity must be appointed before devices can be registered. This is yours to arrange, not ours.' },
      { document: 'MHRA device registration', owner: 'importer', note: 'Filed by the UKRP through the MHRA portal, per device.' },
      { document: 'UKCA or CE marking', owner: 'manufacturer', note: 'We support both routes; tell us which your customer requires and we mark accordingly.' },
      { document: 'UK Declaration of Conformity', owner: 'manufacturer', note: 'Separate from the EU DoC and citing UK regulations, with the UKRP named.' },
      { document: 'Instructions in English', owner: 'manufacturer', note: 'UK requires English labelling and IFU; we supply the UK version of the artwork.' },
      { document: 'Post-market surveillance arrangement', owner: 'both', note: 'Vigilance reporting routes through the UKRP; we supply the incident data we hold.' },
    ],
    logistics: [
      { label: 'Loading ports', value: 'Shenzhen, Ningbo' },
      { label: 'Sea transit', value: 'Felixstowe / Southampton approx. 30–38 days' },
      { label: 'Air freight', value: '5–8 days to Heathrow or East Midlands' },
      { label: 'Customs note', value: 'UK is a separate customs territory from the EU — a UK import entry cannot be cleared against an EU declaration' },
    ],
    hotCategories: ['bath-safety', 'walking-aids', 'commode-chairs'],
    pitfalls: [
      'Assuming a UK distributor’s CE certificate covers MHRA registration — it does not, and unregistered devices can be seized.',
      'Confusing Great Britain with Northern Ireland, which still follows EU MDR.',
    ],
    faqs: [
      {
        question: 'Is CE marking still accepted in Great Britain?',
        answer:
          'For many device types the UK has extended recognition of CE marking, so CE-marked Class I products can generally still be placed on the GB market. The rules have been revised several times, so confirm the current position for your device class with your UK regulatory advisor — we will supply whichever marking and declaration your route requires.',
      },
      {
        question: 'Do you have a UK Responsible Person?',
        answer:
          'No. The UKRP must be a UK-established entity, so it is appointed by the importer or distributor. We provide the manufacturer documentation the UKRP needs to complete the MHRA registration.',
      },
      {
        question: 'Can the same production run serve the EU and the UK?',
        answer:
          'The product can be identical, but the label and the declaration differ. We run one production batch with two label versions and two declarations, so you do not pay for a separate manufacturing run.',
      },
    ],
  },
  {
    slug: 'japan-korea',
    name: 'Japan & Korea',
    flag: '🇯🇵',
    h1: 'Rehabilitation equipment for Japanese and Korean importers',
    description:
      'PMD Act notification in Japan and MFDS import licensing in Korea for walking aids, walkers, shower chairs and commode chairs.',
    intro: [
      'Japan and Korea both require a locally licensed entity to hold the product registration, and both look closely at documentation quality in Japanese or Korean — an English-only IFU will usually be rejected by the distributor before it ever reaches the authority.',
      'The two systems work differently, so they are described separately below.',
    ],
    classification:
      'Japan: under the Pharmaceuticals and Medical Devices Act (PMDA), most walking aids and bath safety products are Class I general medical devices, filed by notification (todoke) through a Marketing Authorization Holder (MAH) established in Japan. Korea: under the Medical Devices Act, Class I devices are notified to MFDS, and the importer must hold an importing licence and act as the licence holder.',
    docs: [
      { document: 'Japan: MAH appointment', owner: 'importer', note: 'A Japan-based MAH is mandatory. Without one, no notification can be filed.' },
      { document: 'Japan: Class I notification (todoke)', owner: 'importer', note: 'Filed by the MAH with PMDA; we supply the technical file it is based on.' },
      { document: 'Japan: IFU and labelling in Japanese', owner: 'both', note: 'Japanese IFU, SE (single use) and manufacturer/MAH blocks are mandatory. We set the layout; your MAH approves the wording.' },
      { document: 'Korea: importing licence + licence holder', owner: 'importer', note: 'The Korean licence holder files the Class I notification with MFDS.' },
      { document: 'Korea: Korean-language labelling', owner: 'both', note: 'Korean IFU and label with the licence holder’s details and the MFDS notification number.' },
      { document: 'ISO 13485 + test reports', owner: 'manufacturer', note: 'Both markets accept ISO 13485 as the quality evidence; load and stability test reports support the filing.' },
    ],
    logistics: [
      { label: 'Loading ports', value: 'Shenzhen, Guangzhou, Ningbo' },
      { label: 'Sea transit', value: 'Japan (Tokyo/Osaka) approx. 7–12 days; Korea (Busan) approx. 7–10 days' },
      { label: 'Air freight', value: '3–5 days' },
      { label: 'Advantage', value: 'Short transit and small minimum sailing volumes make these markets practical for frequent, smaller replenishment' },
    ],
    hotCategories: ['walking-aids', 'bath-safety', 'toilet-safety', 'walkers'],
    pitfalls: [
      'Shipping before an MAH or Korean licence holder exists — the goods cannot be cleared for medical use.',
      'Reusing an English IFU with a Japanese sticker added; both authorities expect the full translated text.',
      'Assuming Japanese buyers accept CE marking as evidence — they do not; the domestic filing is what counts.',
    ],
    faqs: [
      {
        question: 'Can you register the product in Japan for us?',
        answer:
          'No — the notification must be filed by a Japan-based MAH, and we are not one. What we do is supply the complete technical file, the ISO 13485 certificate, the test reports and the Japanese label and IFU layout, so your MAH can file without going back and forth with the factory.',
      },
      {
        question: 'Do you already supply Japanese or Korean distributors?',
        answer:
          'Tell us the market and the product and we will confirm what documentation is already prepared for that route, including whether a Japanese or Korean label version exists for the model you are considering.',
      },
      {
        question: 'Which incoterm works best for small first orders?',
        answer:
          'For Japan and Korea, CIF or door delivery is usually simpler than FOB for a first order, because the sailing is short and the freight cost is a small share of the total. We quote both so you can compare against your own forwarder.',
      },
    ],
  },
  {
    slug: 'middle-east',
    name: 'Middle East',
    flag: '🇦🇪',
    h1: 'Rehabilitation equipment for Middle East importers and tender suppliers',
    description:
      'SFDA registration in Saudi Arabia, MOHAP registration in the UAE, and the documentation package required for GCC medical device tenders.',
    intro: [
      'Middle East demand is driven by two different buyers: distributors serving private clinics and pharmacies, and suppliers bidding on ministry or hospital tenders. The second group needs a document package that survives a technical committee review, and that package is usually where a Chinese supplier falls short.',
      'We build the file to tender standard, not to e-commerce standard.',
    ],
    classification:
      'Saudi Arabia regulates devices through SFDA, with medical device marketing authorisation (MDMA) held by a Saudi authorised representative. The UAE regulates through MOHAP, with registration held by a licensed local agent. Other GCC states have their own schemes and generally accept a SFDA or MOHAP registration as supporting evidence rather than as a substitute.',
    docs: [
      { document: 'Saudi authorised representative appointment', owner: 'importer', note: 'A Saudi-licensed AR is mandatory to hold the MDMA.' },
      { document: 'SFDA MDMA application', owner: 'importer', note: 'Filed by the AR; we supply the technical file, ISO 13485 and test reports it references.' },
      { document: 'UAE MOHAP registration + local agent', owner: 'importer', note: 'Registration is held by the agent; certificates must be attested for use in the UAE.' },
      { document: 'Certificate attestation (embassy / MOFA)', owner: 'both', note: 'Chinese-issued certificates usually need notarisation, chamber of commerce and embassy legalisation. Budget several weeks — this is the step that delays tenders.' },
      { document: 'Arabic labelling and IFU', owner: 'both', note: 'Arabic is required on the label and instructions for GCC registration; we set bilingual artwork.' },
      { document: 'Tender document set', owner: 'both', note: 'Authorisation letter, ISO certificates, test reports, warranty statement and after-sales commitment — we issue these on company letterhead with reference numbers.' },
    ],
    logistics: [
      { label: 'Loading ports', value: 'Shenzhen, Ningbo, Shanghai' },
      { label: 'Sea transit', value: 'Jebel Ali approx. 18–25 days; Dammam approx. 20–28 days' },
      { label: 'Air freight', value: '4–7 days to Dubai or Riyadh' },
      { label: 'Tender note', value: 'Partial shipments and staged delivery against project milestones are common; agree the schedule in the contract before the tender closes' },
    ],
    hotCategories: ['bath-safety', 'commode-chairs', 'walking-aids', 'toilet-safety'],
    pitfalls: [
      'Starting certificate attestation after the tender is awarded — the legalisation chain alone can take longer than the delivery window.',
      'Sending an English-only label to a GCC registration; Arabic is not optional.',
      'Bidding a specification the factory cannot repeat at volume — the sample passes, the production run does not.',
    ],
    faqs: [
      {
        question: 'Can you supply documentation for a government tender?',
        answer:
          'Yes. We issue the authorisation letter, ISO certificates, test reports, warranty statement and after-sales commitment on company letterhead with reference numbers, in the format tender committees normally request. Send us the technical annex from the tender document and we will confirm compliance line by line before you bid.',
      },
      {
        question: 'Who handles SFDA registration?',
        answer:
          'A Saudi authorised representative must hold the MDMA, so the filing is done by them. We provide the technical file, ISO 13485 certificate, test reports and Arabic label artwork that the application depends on.',
      },
      {
        question: 'How long does certificate attestation take?',
        answer:
          'Plan on several weeks for notarisation, chamber of commerce authentication and embassy legalisation of Chinese-issued certificates, and start it before the tender closes rather than after award. We prepare the certificate set specifically for attestation so your agent is not sending documents back for re-issue.',
      },
      {
        question: 'Do you support high-load-capacity models?',
        answer:
          'Yes — models rated to 150 kg and above are a significant part of our catalogue, and they are the specification most often requested for hospital and institutional supply in the region. Load test reports are available for those models.',
      },
    ],
  },
];

export const MARKET_SLUGS = MARKETS.map((m) => m.slug);
