/**
 * 产品页 FAQ 生成器
 *
 * 背景：product frontmatter 里的 faqs 字段是可选的，但 51 个产品都没有填写，
 * 导致全站没有一个 FAQPage 结构化数据（google 富摘要/长尾问答流量全部丢失）。
 *
 * 做法：用产品自身已有的真实数据（MOQ / 交期 / 认证 / 定制项 / 规格）组装 FAQ。
 * 好处是每条答案都因产品而异，不会产生跨页重复内容，且可见内容与 schema 完全一致
 * （Google 明确要求 FAQPage 的问答必须在页面上可见）。
 *
 * 若某个产品在 frontmatter 里写了 faqs，则直接使用手写版本，不再自动生成。
 */

type Faq = { question: string; answer: string };

type ProductLike = {
  title: string;
  moq?: string;
  deliveryTime?: string;
  certifications?: string[];
  customOptions?: string[];
  specifications?: { name: string; value: string }[];
  faqs?: Faq[];
};

type Copy = {
  moqQ: string;
  moqA: string;
  leadQ: string;
  leadA: string;
  certQ: string;
  certA: string;
  customQ: string;
  customA: string;
  specQ: string;
  specA: string;
  and: string;
};

const COPY: Record<string, Copy> = {
  en: {
    moqQ: 'What is the minimum order quantity (MOQ) for {title}?',
    moqA: 'The MOQ is {moq} per SKU. Larger volumes can be split across colours or packaging variants, and tiered pricing starts from one container load. Please tell us your target quantity and we will quote against it.',
    leadQ: 'What is the lead time for {title}?',
    leadA: 'Production takes {lead} after the order is confirmed and the deposit is received. Transit time depends on destination and shipping mode; we confirm the full schedule in writing with your order.',
    certQ: 'Which certifications are available for {title}?',
    certA: 'This product is supplied with {certs}. Certificate copies, test reports and declaration documents are provided on request before you place a deposit.',
    customQ: 'Can {title} be customised with our own logo and packaging?',
    customA: 'Yes. Available customisation includes {custom}. Custom colour and packaging require a minimum quantity that we confirm together with your artwork.',
    specQ: 'What are the key specifications of {title}?',
    specA: 'Key specifications: {specs}. The full specification sheet is included with every quotation.',
    and: ', ',
  },
  fr: {
    moqQ: 'Quelle est la quantité minimale de commande (MOQ) pour {title} ?',
    moqA: 'La MOQ est de {moq} par référence. Les volumes plus importants peuvent être répartis entre plusieurs coloris ou conditionnements, avec un prix dégressif à partir d’un conteneur complet. Indiquez-nous votre volume cible et nous vous chiffrons en conséquence.',
    leadQ: 'Quel est le délai de production pour {title} ?',
    leadA: 'La production prend {lead} après confirmation de la commande et réception de l’acompte. Le transport dépend de la destination et du mode d’expédition ; le calendrier complet est confirmé par écrit avec votre commande.',
    certQ: 'Quelles certifications sont disponibles pour {title} ?',
    certA: 'Ce produit est fourni avec {certs}. Les copies des certificats, rapports de tests et déclarations sont transmises sur demande avant tout acompte.',
    customQ: 'Peut-on personnaliser {title} avec notre logo et notre packaging ?',
    customA: 'Oui. Les personnalisations disponibles incluent {custom}. La couleur et le packaging sur mesure nécessitent une quantité minimale que nous confirmons avec votre fichier graphique.',
    specQ: 'Quelles sont les caractéristiques techniques de {title} ?',
    specA: 'Caractéristiques principales : {specs}. La fiche technique complète accompagne chaque devis.',
    and: ', ',
  },
  de: {
    moqQ: 'Wie hoch ist die Mindestbestellmenge (MOQ) für {title}?',
    moqA: 'Die Mindestbestellmenge beträgt {moq} pro Artikel. Größere Mengen können auf Farben oder Verpackungsvarianten aufgeteilt werden; Staffelpreise beginnen ab einer Containerladung. Nennen Sie uns Ihre Zielmenge, wir kalkulieren darauf.',
    leadQ: 'Wie lange ist die Lieferzeit für {title}?',
    leadA: 'Die Produktion dauert {lead} nach Auftragsbestätigung und Eingang der Anzahlung. Die Transportzeit hängt von Ziel und Versandart ab; den kompletten Zeitplan bestätigen wir schriftlich mit Ihrer Bestellung.',
    certQ: 'Welche Zertifikate sind für {title} verfügbar?',
    certA: 'Dieses Produkt wird mit {certs} geliefert. Zertifikatskopien, Prüfberichte und Erklärungen stellen wir auf Anfrage vor der Anzahlung bereit.',
    customQ: 'Kann {title} mit unserem Logo und unserer Verpackung individualisiert werden?',
    customA: 'Ja. Verfügbar sind {custom}. Sonderfarben und Sonderverpackungen erfordern eine Mindestmenge, die wir gemeinsam mit Ihren Druckdaten bestätigen.',
    specQ: 'Was sind die wichtigsten technischen Daten von {title}?',
    specA: 'Wichtigste Daten: {specs}. Das vollständige Datenblatt liegt jedem Angebot bei.',
    and: ', ',
  },
  es: {
    moqQ: '¿Cuál es el pedido mínimo (MOQ) de {title}?',
    moqA: 'El pedido mínimo es de {moq} por referencia. Los volúmenes mayores se pueden repartir entre colores o formatos de embalaje, con precio escalonado desde un contenedor completo. Indíquenos su volumen objetivo y le cotizamos sobre esa base.',
    leadQ: '¿Cuál es el plazo de producción de {title}?',
    leadA: 'La producción tarda {lead} tras confirmar el pedido y recibir el anticipo. El tránsito depende del destino y del modo de envío; confirmamos el calendario completo por escrito con su pedido.',
    certQ: '¿Qué certificaciones están disponibles para {title}?',
    certA: 'Este producto se suministra con {certs}. Las copias de certificados, informes de ensayo y declaraciones se facilitan a petición antes de cualquier anticipo.',
    customQ: '¿Se puede personalizar {title} con nuestro logotipo y embalaje?',
    customA: 'Sí. Las opciones disponibles incluyen {custom}. El color y el embalaje personalizados requieren una cantidad mínima que confirmamos junto con su arte final.',
    specQ: '¿Cuáles son las especificaciones principales de {title}?',
    specA: 'Especificaciones principales: {specs}. La ficha técnica completa se adjunta a cada cotización.',
    and: ', ',
  },
  ko: {
    moqQ: '{title}의 최소 주문 수량(MOQ)은 얼마입니까?',
    moqA: 'MOQ는 품목당 {moq}입니다. 더 많은 수량은 색상이나 포장 사양으로 나누어 진행할 수 있으며, 1컨테이너부터 단계별 가격이 적용됩니다. 목표 수량을 알려주시면 그에 맞춰 견적을 드립니다.',
    leadQ: '{title}의 생산 기간은 얼마나 걸립니까?',
    leadA: '주문 확정 및 계약금 입금 후 생산에 {lead}이 소요됩니다. 운송 기간은 목적지와 운송 방식에 따라 다르며, 전체 일정은 주문서와 함께 서면으로 확정합니다.',
    certQ: '{title}에는 어떤 인증이 제공됩니까?',
    certA: '본 제품에는 {certs}가 제공됩니다. 인증서 사본, 시험 성적서, 선언 문서는 계약금 납입 전에 요청하시면 제공해 드립니다.',
    customQ: '{title}에 자사 로고와 포장을 적용할 수 있습니까?',
    customA: '가능합니다. {custom} 등을 지원합니다. 맞춤 색상과 포장은 최소 수량이 필요하며, 인쇄 파일과 함께 확정합니다.',
    specQ: '{title}의 주요 사양은 무엇입니까?',
    specA: '주요 사양: {specs}. 전체 사양서는 모든 견적서에 포함됩니다.',
    and: ', ',
  },
  ja: {
    moqQ: '{title}の最小発注数量（MOQ）はいくつですか？',
    moqA: 'MOQは1型番あたり{moq}です。より多い数量はカラーや包装仕様で分けることができ、1コンテナから段階価格が適用されます。ご希望数量をお知らせいただければ、それに基づいてお見積りします。',
    leadQ: '{title}の生産期間はどのくらいですか？',
    leadA: 'ご注文確定および手付金入金後、生産に{lead}かかります。輸送期間は仕向地と輸送方法により異なります。全体のスケジュールはご注文とともに書面で確定します。',
    certQ: '{title}にはどのような認証がありますか？',
    certA: '本製品には{certs}が付属します。証明書のコピー、試験報告書、宣言書は、手付金のお支払い前でもご請求いただければ提供します。',
    customQ: '{title}に自社ロゴや包装を入れられますか？',
    customA: '可能です。{custom}に対応しています。カスタムカラーと包装には最小数量があり、入稿データとあわせて確定します。',
    specQ: '{title}の主な仕様を教えてください。',
    specA: '主な仕様：{specs}。詳細な仕様書はお見積りごとに添付します。',
    and: '、',
  },
  ar: {
    moqQ: 'ما هو الحد الأدنى للطلب (MOQ) لمنتج {title}؟',
    moqA: 'الحد الأدنى للطلب هو {moq} لكل صنف. يمكن تقسيم الكميات الأكبر على ألوان أو عبوات مختلفة، ويبدأ التسعير التدريجي من حمولة حاوية كاملة. أخبرنا بالكمية المستهدفة وسنقدم العرض على أساسها.',
    leadQ: 'ما هي مدة الإنتاج لمنتج {title}؟',
    leadA: 'يستغرق الإنتاج {lead} بعد تأكيد الطلب واستلام الدفعة المقدمة. تعتمد مدة الشحن على الوجهة وطريقة النقل، ونؤكد الجدول الكامل كتابيًا مع طلبك.',
    certQ: 'ما الشهادات المتوفرة لمنتج {title}؟',
    certA: 'يُورَّد هذا المنتج مع {certs}. نوفر نسخ الشهادات وتقارير الاختبار وإقرارات المطابقة عند الطلب وقبل أي دفعة مقدمة.',
    customQ: 'هل يمكن تخصيص {title} بشعارنا وعبوتنا؟',
    customA: 'نعم. تشمل خيارات التخصيص {custom}. يتطلب اللون والعبوة المخصصة حدًا أدنى للكمية نؤكده مع ملفات التصميم الخاصة بك.',
    specQ: 'ما المواصفات الرئيسية لمنتج {title}؟',
    specA: 'المواصفات الرئيسية: {specs}. تُرفق ورقة المواصفات الكاملة مع كل عرض سعر.',
    and: '، ',
  },
};

function fill(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
}

/**
 * 生成产品 FAQ 列表。顺序固定，便于 schema 与页面一致。
 */
export function buildProductFaqs(p: ProductLike, locale: string): Faq[] {
  // 手写优先
  if (p.faqs && p.faqs.length > 0) return p.faqs;

  const c = COPY[locale] || COPY.en;
  const out: Faq[] = [];
  const sep = c.and;

  if (p.moq) {
    out.push({
      question: fill(c.moqQ, { title: p.title }),
      answer: fill(c.moqA, { moq: p.moq }),
    });
  }

  if (p.deliveryTime) {
    out.push({
      question: fill(c.leadQ, { title: p.title }),
      answer: fill(c.leadA, { lead: p.deliveryTime }),
    });
  }

  if (p.certifications && p.certifications.length > 0) {
    out.push({
      question: fill(c.certQ, { title: p.title }),
      answer: fill(c.certA, { certs: p.certifications.join(sep) }),
    });
  }

  if (p.customOptions && p.customOptions.length > 0) {
    out.push({
      question: fill(c.customQ, { title: p.title }),
      answer: fill(c.customA, {
        custom: p.customOptions.slice(0, 4).join(sep).toLowerCase(),
      }),
    });
  }

  if (p.specifications && p.specifications.length > 0) {
    const specs = p.specifications
      .slice(0, 4)
      .map((s) => `${s.name}: ${s.value}`)
      .join('; ');
    out.push({
      question: fill(c.specQ, { title: p.title }),
      answer: fill(c.specA, { specs }),
    });
  }

  return out;
}

/** 把 FAQ 列表转成 schema.org FAQPage 节点 */
export function faqPageSchema(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}
