/**
 * 品类制造商落地页 —— /en/manufacturers/{slug}
 *
 * 目的：截住 "X manufacturer / X supplier / X OEM" 这类交易型搜索。
 * 现有产品页的标题是产品名（例如 "500lbs Capacity Adjustable Anti-Slip Shower Chair"），
 * 没有一页是专门为"我是制造商"这件事而做的落地页。
 *
 * 每个页面统一骨架：
 *   shortAnswer（给 AI 引擎和快速浏览者的 2 句结论）
 *   → 我们的定位 → 规格与 MOQ → 定制能力 → 认证文件 → FAQ → 询盘
 */

export type ManufacturerPage = {
  slug: string;
  /** 目标关键词 */
  keyword: string;
  /** H1 */
  h1: string;
  /** meta description */
  description: string;
  /** 2–3 句直接答案，AI 引擎最爱引用这种结构 */
  shortAnswer: string;
  /** 正文段落 */
  body: string[];
  /** 关键参数表 */
  specs: { label: string; value: string }[];
  /** 定制能力 */
  customization: string[];
  /** 关联分类（用于内链与产品展示） */
  categories: string[];
  /** 这个页面主推的产品 slug */
  featured: string[];
  faqs: { question: string; answer: string }[];
};

export const MANUFACTURERS: ManufacturerPage[] = [
  {
    slug: 'walking-aid-manufacturer',
    keyword: 'walking aid manufacturer',
    h1: 'Walking Aid Manufacturer — Canes, Crutches and Walking Sticks',
    description:
      'Walking aid manufacturer in Zhongshan, China: 22 cane and crutch models, aluminium and carbon fibre, MOQ from 100 units, CE and FDA documentation, private label from stock tooling.',
    shortAnswer:
      'JinDa Rehab Medical manufactures walking aids — folding canes, quad canes, forearm crutches and underarm crutches — in Zhongshan, Guangdong. 22 models are in production, MOQ starts at 100 units per SKU for walking aids, and production runs 15–30 days after order confirmation.',
    body: [
      'Most walking aid enquiries we receive are not about the product; they are about whether the supplier can hold the same specification across repeat orders. Canes are a light, high-volume item, and the failure mode is always the same: the first shipment is right, the third one has a different tip, a thinner wall tube, or a handle that has been re-sourced.',
      'Our answer is tooling discipline. Tube diameters, wall thickness, tip compounds and grip moulds are fixed per model and recorded on the specification sheet that ships with the quotation. When a repeat order is placed, the sheet is pulled and the same tooling is used — if something has to change (a material becomes unavailable, for example), you are told before production, not after arrival.',
      'The catalogue splits into three families. Aluminium canes cover the volume end: adjustable height, standard ferrules, low MOQ. Carbon fibre canes are the lighter, higher-margin end for pharmacy and retail brands. Crutches — forearm and underarm — carry more assembly and a higher unit price, and are usually ordered by distributors who also take bath safety or commode chairs in the same container.',
    ],
    specs: [
      { label: 'Models in production', value: '22' },
      { label: 'MOQ', value: '100 units per SKU (200–500 on selected folding models)' },
      { label: 'Materials', value: 'Aluminium 6061/7075, carbon fibre, ABS and TPR grips' },
      { label: 'Height adjustment', value: 'Push-button or twist-lock, 8–10 positions' },
      { label: 'Load rating', value: '100–150 kg depending on model, tested per batch' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Custom colour and anodising',
      'Custom grip mould and logo on the handle',
      'Custom tip compound and diameter',
      'Retail carton and hang-tag artwork',
      'Bilingual instructions for your market',
    ],
    categories: ['walking-aids'],
    featured: ['lightweight-carbon-fiber-folding-cane', 'high-quality-adjustable-folding-cane-carbon-fiber', 'carbon-fiber-elbow-crutches-fracture-support'],
    faqs: [
      {
        question: 'What is the MOQ for a custom-coloured walking cane?',
        answer:
          'Standard colours run at the normal 100-unit MOQ. A custom anodised colour becomes a dedicated coating batch, which typically moves the minimum to 300–500 units depending on the shade. Send the Pantone or RAL reference and we will confirm the exact minimum before you commit.',
      },
      {
        question: 'Can you match a sample we already have from another supplier?',
        answer:
          'Yes, and this is one of the most common requests we get. Send the physical sample or a drawing with the critical dimensions — tube outer diameter, wall thickness, overall length, tip diameter. We confirm which of our existing tools can match it and where a new tool would be needed, before quoting.',
      },
      {
        question: 'Do walking canes require FDA 510(k) clearance?',
        answer:
          'Canes and crutches used for mobility are normally regulated as Class I devices and are 510(k)-exempt in the United States, so establishment registration and device listing apply instead of a premarket submission. If you add a therapeutic claim to the packaging, check the classification again before printing.',
      },
      {
        question: 'How are canes packed for export?',
        answer:
          'Individually poly-bagged with the ferrule protected, then in an export carton sized to keep the carton weight under 20 kg for manual handling. Retail-ready cartons, hang tags and FBA-compliant labelling are available at order confirmation.',
      },
    ],
  },
  {
    slug: 'shower-chair-manufacturer',
    keyword: 'shower chair manufacturer',
    h1: 'Shower Chair Manufacturer — Bath Safety Seating',
    description:
      'Shower chair manufacturer in China: 13 bath safety models from 30-unit MOQ, aluminium and steel frames, 150–227 kg load ratings, CE and FDA documentation, private label ready.',
    shortAnswer:
      'JinDa Rehab Medical manufactures shower chairs, shower stools and bath benches in Zhongshan, China. 13 bath safety models are in production, MOQ starts at 30 units per SKU — the lowest entry point in our catalogue — and load ratings run from 150 kg to 227 kg (500 lbs).',
    body: [
      'Bath safety is the category where the gap between a cheap chair and a correct chair shows up fastest. A shower chair carries a wet, moving adult; the failure points are the leg splay under load, the foot pad compound on a wet tile floor, and the seat material after two years of hot water and disinfectant.',
      'That is why the specification sheet for each model lists frame wall thickness, seat material, foot pad compound and the tested load rating separately, rather than one headline number. The 500 lbs model in our range uses a 1.4 mm aluminium wall and a PU seat specifically because moulded PP seats crack at that rating over time.',
      'For distributors, the practical advantage of this category is the MOQ. At 30 units on selected steel folding models, a pharmacy or a small distributor can test a market without committing to a container. Bath safety also mixes efficiently with commode chairs and toilet rails, which is how most first containers are built.',
    ],
    specs: [
      { label: 'Models in production', value: '13' },
      { label: 'MOQ', value: '30 units per SKU (steel folding) · up to 500 on custom frames' },
      { label: 'Load ratings', value: '150 kg / 200 kg / 227 kg (500 lbs) depending on model' },
      { label: 'Frame materials', value: 'Aluminium alloy 1.2–1.4 mm wall, powder-coated steel' },
      { label: 'Seat materials', value: 'PU with drainage holes, moulded PP, EVA cushion' },
      { label: 'Adjustability', value: '5–7 height positions, some models with adjustable backrest and armrest width' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Frame colour (standard RAL range or custom batch)',
      'Seat and backrest material selection',
      'Armrest and backrest configuration',
      'Logo printing on seat or frame',
      'Retail carton with your artwork',
    ],
    categories: ['bath-safety'],
    featured: ['500lbs-capacity-anti-slip-shower-chair', 'white-extra-wide-heavy-duty-shower-chair', 'adjustable-aluminum-bath-chair-elderly'],
    faqs: [
      {
        question: 'What is the maximum load rating you can manufacture?',
        answer:
          '227 kg (500 lbs) in the current catalogue, on the heavy-duty model with a 1.4 mm aluminium frame and PU seat. Above that, the constraint stops being the frame and becomes the seat and the floor interface — if you need a higher rating for a bariatric range, tell us the target load and we will confirm whether it needs a new tool or an existing platform.',
      },
      {
        question: 'Are the foot pads suitable for wet tile floors?',
        answer:
          'We use slanted rubber compounds on the bath safety range specifically for wet surfaces, and the model specification sheet names the compound. If your market has a particular floor type — polished porcelain, for example — say so at quotation stage, because the compound can be specified per order.',
      },
      {
        question: 'Can a shower chair carry our importer details on the label?',
        answer:
          'Yes. For EU shipments the importer’s name and address must appear on the device or packaging, so your importer block is set into the label artwork and approved before production. The same applies to the Arabic bilingual label for GCC markets.',
      },
      {
        question: 'Why is the MOQ lower than your other categories?',
        answer:
          'Because the steel folding models share a single frame platform and a small number of seat moulds, so the setup cost is spread across many models. A custom frame colour or a new seat mould is a dedicated run, and the minimum rises to 300–500 units accordingly.',
      },
    ],
  },
  {
    slug: 'commode-chair-manufacturer',
    keyword: 'commode chair manufacturer',
    h1: 'Commode Chair Manufacturer — Bedside and Portable Commodes',
    description:
      'Commode chair manufacturer in China: 6 models, steel and aluminium frames, 30-unit MOQ on stock models, height-adjustable and padded options, CE and FDA documentation.',
    shortAnswer:
      'JinDa Rehab Medical manufactures commode chairs — folding bedside commodes, height-adjustable models and padded commodes with armrests — in Zhongshan, China. 6 models are in production with MOQ from 30 units per SKU on stock frames.',
    body: [
      'Commode chairs are bought by three very different customers: distributors supplying home care, institutions fitting out wards, and pharmacies selling to families. The specification that matters changes with each — home care wants foldability and a low carton volume, institutions want adjustability and a replaceable bucket, pharmacies want retail packaging and a price point.',
      'Because the frame platform is shared, we can serve all three from the same tooling. The differences are in the seat, the bucket, the armrest configuration and the carton — which is also why the MOQ range in this category is wide, from 30 units on a stock folding model to 500 on a custom frame.',
      'For institutional orders, the practical detail is spare parts. Commode chairs fail at the bucket and the seat, not the frame, so we quote a spare bucket and seat allowance with institutional orders rather than leaving the buyer to source them separately two years later.',
    ],
    specs: [
      { label: 'Models in production', value: '6' },
      { label: 'MOQ', value: '30 units per SKU (stock steel folding) · 500 on custom frames' },
      { label: 'Frame materials', value: 'Powder-coated steel, aluminium on lightweight models' },
      { label: 'Load ratings', value: '100–150 kg depending on model' },
      { label: 'Features', value: 'Folding, height adjustment, padded seat, removable bucket, armrests' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Frame colour and finish',
      'Padded seat fabric and colour',
      'Bucket capacity and lid',
      'Spare parts allowance for institutional orders',
      'Retail or institutional carton',
    ],
    categories: ['commode-chairs'],
    featured: ['adjustable-150kg-foldable-commode-chair', 'flip-back-commode-chair-anti-slip', 'portable-folding-commode-chair-daily-use'],
    faqs: [
      {
        question: 'Can we order spare buckets and seats with the first order?',
        answer:
          'Yes, and for institutional orders we recommend it. Buckets and seats are the parts that wear out first, and sourcing them two years later from a different production run rarely matches. We quote a spare parts allowance as a line item on the proforma invoice.',
      },
      {
        question: 'What is the difference between your folding and height-adjustable commodes?',
        answer:
          'Folding models prioritise carton volume and home storage, with a fixed seat height. Height-adjustable models use a multi-position leg section, which adds components and setup time — that is why the entry MOQ is higher and the unit price reflects more material.',
      },
      {
        question: 'Do commode chairs need to be registered as medical devices?',
        answer:
          'In the EU they are normally Class I devices under MDR 2017/745, self-certified with a Declaration of Conformity. In the US they are generally Class I and 510(k)-exempt, requiring establishment registration and device listing rather than a premarket submission. Confirm the classification for your exact product and claims before printing packaging.',
      },
    ],
  },
  {
    slug: 'walker-manufacturer',
    keyword: 'walker manufacturer',
    h1: 'Walker & Rollator Manufacturer',
    description:
      'Walker and rollator manufacturer in China: 6 models, folding walking frames and wheeled rollators, flat 100-unit MOQ per SKU, CE and FDA documentation, OEM colours and branding.',
    shortAnswer:
      'JinDa Rehab Medical manufactures folding walkers and wheeled rollators in Zhongshan, China. 6 models are in production on a shared frame platform, with a flat MOQ of 100 units per SKU and 15–30 day production.',
    body: [
      'Walkers and rollators sit between the simplicity of a cane and the complexity of a wheelchair. The engineering questions are brake reliability on a rollator, frame rigidity on a folding walker, and whether the folding mechanism still locks positively after a thousand cycles.',
      'Our range runs on one frame platform, which is why every model carries the same 100-unit MOQ — there is no low-volume variant and no setup penalty for choosing a different model in the range. That is useful for distributors building a first walking-aid container: you can mix several models without each one triggering a separate minimum.',
      'Brake and wheel assemblies are the parts we keep as stock spares. For distributors running a rental or institutional programme, we quote a spare wheel and brake kit allowance with the order, because a rollator with a failed brake is out of service and the replacement part is not something a local shop can fabricate.',
    ],
    specs: [
      { label: 'Models in production', value: '6' },
      { label: 'MOQ', value: '100 units per SKU (flat across the range)' },
      { label: 'Types', value: 'Folding walkers, 2-wheel and 4-wheel rollators' },
      { label: 'Frame materials', value: 'Aluminium and powder-coated steel' },
      { label: 'Load ratings', value: '100–150 kg depending on model' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Frame colour',
      'Wheel type and size',
      'Seat and storage bag on rollator models',
      'Logo placement on frame and bag',
      'Spare parts kit for rental programmes',
    ],
    categories: ['walkers'],
    featured: ['lightweight-black-2-wheel-rollator', 'lightweight-foldable-walker-tall-adults', 'foldable-stainless-steel-walker-with-seat'],
    faqs: [
      {
        question: 'Why is the MOQ flat at 100 units for every walker model?',
        answer:
          'Because all six models share one frame platform and one set of jigs. Changing model does not change the setup, so there is no reason to raise the minimum for a particular variant — the only thing that raises it is a custom colour or a custom carton.',
      },
      {
        question: 'Do you supply spare wheels and brakes?',
        answer:
          'Yes. Wheel assemblies, brake kits and hand grips are available as spare parts with the order or separately. For rental and institutional programmes we recommend adding an allowance to the initial order, since matching a part to a later production run is not guaranteed indefinitely.',
      },
      {
        question: 'Can rollators be shipped as a mixed container with other categories?',
        answer:
          'Yes. Rollators are bulky relative to their value, so they usually form the base of a container load, with canes, toilet rails and commode chairs filling the remaining volume. We calculate the mix against the 40HQ or 20GP capacity and send the load plan with the quote.',
      },
    ],
  },
  {
    slug: 'toilet-safety-manufacturer',
    keyword: 'toilet safety rail manufacturer',
    h1: 'Toilet Safety Rail Manufacturer',
    description:
      'Toilet safety rail manufacturer in China: 4 models, clamp-on and floor-standing rails, 50-unit MOQ, 150 kg load ratings, CE and FDA documentation, private label packaging.',
    shortAnswer:
      'JinDa Rehab Medical manufactures toilet safety rails and support frames in Zhongshan, China. 4 models are in production with MOQ from 50 units per SKU, covering clamp-on rails and floor-standing frames with 150 kg load ratings.',
    body: [
      'Toilet safety rails are a small, high-density product — the carton is cheap to ship and the unit price is low, which makes the category attractive for a first order. The risk sits in two places: whether the clamp actually fits the toilet pan used in your market, and whether the finish survives a bathroom cleaning regime.',
      'Pan geometry varies by country, so we ask for the pan width and the mounting surface before quoting a clamp-on model. For markets where pan shapes are inconsistent, the floor-standing frame removes the fit problem entirely at a slightly higher unit cost.',
      'Finish is the part buyers discover later. Powder coating over a properly pre-treated steel tube survives disinfectant; a thin coat over an untreated tube does not, and the failure shows as rust at the clamp within a year. We specify the coating process on the model sheet so it can be compared rather than assumed.',
    ],
    specs: [
      { label: 'Models in production', value: '4' },
      { label: 'MOQ', value: '50 units per SKU (up to 300 on custom finishes)' },
      { label: 'Types', value: 'Clamp-on toilet rails, floor-standing safety frames' },
      { label: 'Load ratings', value: '150 kg' },
      { label: 'Finish', value: 'Powder-coated steel, pre-treated before coating' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Frame colour',
      'Clamp width for your market’s pan geometry',
      'Padded grip colour and material',
      'Retail carton and hang tag',
    ],
    categories: ['toilet-safety'],
    featured: ['high-capacity-toilet-safety-rail-cushioned-grip', 'adjustable-ergonomic-elevated-toilet-chair-frame', 'adjustable-grab-bar-elderly-bathroom-safety'],
    faqs: [
      {
        question: 'Will your clamp-on rail fit the toilets in our market?',
        answer:
          'Send us the pan width range you need to cover. Clamp-on rails are limited by the pan geometry, and markets differ — where pan shapes are inconsistent, the floor-standing frame is the safer specification because it does not depend on the pan at all.',
      },
      {
        question: 'How is the finish tested?',
        answer:
          'The steel is pre-treated before coating, and the coating process is named on the model specification sheet so you can compare it with another supplier’s. If your market uses aggressive bathroom disinfectants, tell us and we will confirm the coating specification against that.',
      },
      {
        question: 'Can this ship as a small first order?',
        answer:
          'Yes — at 50 units per SKU and a small carton, this is one of the easiest categories to start with. It also fills gaps in a container built around bulkier items such as shower chairs.',
      },
    ],
  },
  {
    slug: 'private-label-mobility-aids',
    keyword: 'private label mobility aids',
    h1: 'Private Label Mobility Aids — Your Brand on Existing Tooling',
    description:
      'Private label mobility aids from China: existing moulds, no tooling cost, MOQ from 30 units, your logo on product and packaging, CE and FDA documentation in your brand’s name where applicable.',
    shortAnswer:
      'Private label means the product already exists and carries your brand. At JinDa Rehab Medical that starts at 30 units per SKU on selected models, with no tooling investment, and typically adds 3–5 days to the standard 15–30 day production time for logo and packaging work.',
    body: [
      'Private label is the fastest route to market and the one most first-time buyers should take. You choose an existing model, we apply your logo, colour and carton, and the product ships under your brand. No mould cost, no development cycle, no minimum that requires a business case.',
      'The distinction that matters commercially is who is the manufacturer of record. Applying your brand does not change the legal manufacturer on the Declaration of Conformity — that remains us unless you have your own quality system and a contractual OEM arrangement. Buyers who assume otherwise discover the problem during a customs or marketplace check, so it is worth settling before the artwork is printed.',
      'Typical private label lead time is the standard 15–30 days plus 3–5 days for logo and packaging approval. The artwork itself is the variable: if you arrive with print-ready files, the schedule holds; if the carton design starts from scratch, it does not.',
    ],
    specs: [
      { label: 'Entry MOQ', value: '30 units per SKU on selected models' },
      { label: 'Tooling cost', value: 'None — existing moulds and jigs' },
      { label: 'Branding options', value: 'Logo on product, label, carton, hang tag, instructions' },
      { label: 'Colour', value: 'Standard range included; custom RAL is a dedicated batch' },
      { label: 'Extra lead time', value: '3–5 days for logo and packaging approval' },
      { label: 'Legal manufacturer', value: 'Remains JinDa Rehab Medical unless a separate OEM agreement is signed' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Logo on frame, seat or handle',
      'Custom label and carton artwork',
      'Bilingual or market-specific instructions',
      'Hang tags and retail-ready packaging',
      'FNSKU labelling for Amazon FBA',
    ],
    categories: ['bath-safety', 'walking-aids', 'commode-chairs', 'walkers'],
    featured: ['500lbs-capacity-anti-slip-shower-chair', 'lightweight-carbon-fiber-folding-cane', 'flip-back-commode-chair-anti-slip'],
    faqs: [
      {
        question: 'Do we need to pay for a mould for private label?',
        answer:
          'No. Private label uses an existing model and existing tooling, so there is no mould cost. A new mould is only relevant if you want a shape that does not exist yet, which is a full OEM development project with a different MOQ and timeline.',
      },
      {
        question: 'Will the product carry our name or yours?',
        answer:
          'Both, in different places. Your brand appears on the product and packaging as the brand owner; the legal manufacturer named on the Declaration of Conformity stays JinDa Rehab Medical unless you have your own quality system and we sign a separate OEM arrangement. Confirm which structure your market requires before the artwork is approved.',
      },
      {
        question: 'How fast can the first shipment go out?',
        answer:
          'Standard production is 15–30 days after order confirmation, plus 3–5 days for logo and packaging approval. If you send print-ready artwork with the order, the approval step usually runs in parallel with material preparation rather than adding to it.',
      },
      {
        question: 'Can you pack for Amazon FBA?',
        answer:
          'Yes — FNSKU labels, poly bags with the suffocation warning, carton weight and dimension limits, and the carton plan for the fulfilment centre you name. Tell us the FC at order confirmation so the plan is built before packing starts.',
      },
    ],
  },
  {
    slug: 'oem-rehabilitation-equipment',
    keyword: 'OEM rehabilitation equipment',
    h1: 'OEM Rehabilitation Equipment — Manufactured to Your Specification',
    description:
      'OEM rehabilitation equipment manufacturing in China: build to your drawing or sample, aluminium and steel frames, 300-unit MOQ on modified platforms, full test documentation.',
    shortAnswer:
      'OEM means we build to your specification rather than ours. At JinDa Rehab Medical, OEM projects start from an existing frame platform wherever possible — which keeps MOQ at 300–500 units — and move to a new tool only when the geometry genuinely requires it.',
    body: [
      'The difference between OEM and private label is who owns the specification. In an OEM project you bring the drawing, the sample or the target specification, and the factory is responsible for meeting it repeatably. That changes what the quotation has to contain: not just a unit price, but the critical dimensions, the tolerances, the material grade and the test that proves each one.',
      'Most OEM enquiries we receive can be met from an existing platform with a modification — a different tube length, a different seat, an additional brace. That is worth checking first, because it keeps the MOQ at 300–500 units instead of the 1,000+ a new mould usually requires, and it shortens the schedule by several weeks.',
      'When a new tool is genuinely needed, we quote it separately and state who owns it. Tool ownership matters more than buyers expect: if the tool is paid for in the unit price rather than as a line item, moving to a second supplier later becomes impossible.',
    ],
    specs: [
      { label: 'Starting MOQ', value: '300–500 units on a modified existing platform' },
      { label: 'New tooling', value: 'Quoted separately, ownership stated on the PI' },
      { label: 'Materials', value: 'Aluminium 6061/7075, steel, PU, PP, EVA, TPR' },
      { label: 'Processes in house', value: 'Tube cutting, bending, welding, powder coating, assembly, packing' },
      { label: 'Documentation', value: 'Drawing, critical dimension list, batch test report, DoC' },
      { label: 'Production time', value: '15–30 days after approval (plus tooling lead time where applicable)' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Frame geometry changes from your drawing',
      'Material and wall thickness specification',
      'Load rating targeting with test verification',
      'Component substitution to your approved list',
      'Private tool ownership',
    ],
    categories: ['bath-safety', 'walking-aids', 'commode-chairs', 'walkers', 'toilet-safety'],
    featured: ['white-extra-wide-heavy-duty-shower-chair', 'adjustable-150kg-foldable-commode-chair', 'foldable-stainless-steel-walker-with-seat'],
    faqs: [
      {
        question: 'What do you need from us to quote an OEM project?',
        answer:
          'A drawing or a physical sample, the target load rating, the target market (which decides the certification route), and an annual volume indication. With those four we can tell you within a day whether it is a platform modification or a new tool, and what each would cost.',
      },
      {
        question: 'Who owns the tooling if we pay for it?',
        answer:
          'You do, if it is quoted as a separate line item — and we state that on the proforma invoice. This is deliberately different from the common practice of amortising the tool into the unit price, which quietly makes it impossible for you to move the project to another supplier later.',
      },
      {
        question: 'Can you hold a load rating above 150 kg?',
        answer:
          'Yes — models rated to 227 kg (500 lbs) are in current production, and OEM projects can target a specific rating with test verification. The constraint at higher ratings is usually the seat and the floor interface rather than the frame, so the specification discussion starts there.',
      },
      {
        question: 'How is the first article approved?',
        answer:
          'We send a pre-production sample built on production tooling — not a hand-made prototype — together with the batch test report for that sample. Production does not start until you approve it in writing, and the approved sample is archived as the reference for the run.',
      },
    ],
  },
  {
    slug: 'bath-safety-supplier',
    keyword: 'bath safety supplier',
    h1: 'Bath Safety Supplier — Shower Chairs, Commodes and Toilet Rails',
    description:
      'Bath safety supplier in China covering shower chairs, commode chairs and toilet safety rails: 23 models in the category group, MOQ from 30 units, one container, one document package.',
    shortAnswer:
      'JinDa Rehab Medical supplies the full bath safety group — shower chairs, bath benches, commode chairs and toilet safety rails — from one factory in Zhongshan, China. 23 models across these categories can be mixed in a single container, with MOQ from 30 units per SKU on stock models.',
    body: [
      'Bath safety is rarely bought as a single product. A distributor building a range needs shower chairs, commode chairs and toilet rails that share a finish, a colour direction and a document package — and that is difficult when each item comes from a different small factory, each with its own certificate and its own idea of what a carton should look like.',
      'Supplying the group from one facility solves the practical problems: one Declaration of Conformity covering the range, one label template, one colour standard, one container instead of three shipments. For a private label range, it also means the branding is consistent across the shelf.',
      'The 30-unit entry point on selected models is what makes a range test possible. You can put a small quantity of each of four or five models into one order, validate which ones sell, and build the second order around the winners rather than guessing on the first.',
    ],
    specs: [
      { label: 'Models in category group', value: '23 (13 bath safety + 6 commode chairs + 4 toilet rails)' },
      { label: 'MOQ', value: '30 units per SKU on selected stock models' },
      { label: 'Load ratings', value: '150 kg to 227 kg (500 lbs) depending on model' },
      { label: 'Materials', value: 'Aluminium, powder-coated steel, PU, PP, EVA, rubber' },
      { label: 'Mixing', value: 'Multiple categories per container, each SKU meeting its own minimum' },
      { label: 'Production time', value: '15–30 days after order confirmation' },
      { label: 'Certifications', value: 'CE (EU MDR Class I), FDA registration, ISO 13485, ISO 9001' },
    ],
    customization: [
      'Unified colour direction across the range',
      'One label template for all items',
      'Private label branding across the group',
      'Range carton plan and container load plan',
      'Spare parts allowance for institutional buyers',
    ],
    categories: ['bath-safety', 'commode-chairs', 'toilet-safety'],
    featured: ['500lbs-capacity-anti-slip-shower-chair', 'flip-back-commode-chair-anti-slip', 'high-capacity-toilet-safety-rail-cushioned-grip'],
    faqs: [
      {
        question: 'Can we mix shower chairs, commode chairs and toilet rails in one order?',
        answer:
          'Yes, as long as each SKU meets its own minimum. This is how most first distributor orders are built: the shower chairs and commodes carry the container volume, and the smaller, denser items fill the gaps. We send the load plan with the quotation.',
      },
      {
        question: 'Is one Declaration of Conformity enough for the whole range?',
        answer:
          'It can cover multiple devices if the risk class and the applicable requirements are the same, but each device must be identified in it. We issue the DoC covering the specific models on your order rather than a generic document, so it matches what your authority or customs broker will see.',
      },
      {
        question: 'How do you keep the colour consistent across different products?',
        answer:
          'Colour is specified once per order and applied across the group, using the same powder coating reference. On mixed containers that is the detail that usually breaks when buying from several factories — the frames arrive in three slightly different shades of the same grey.',
      },
    ],
  },
];

export const MANUFACTURER_SLUGS = MANUFACTURERS.map((m) => m.slug);
