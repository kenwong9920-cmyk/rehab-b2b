/**
 * 公司历程 —— /about 页面时间轴
 *
 * 独立成文件而不是塞进 i18n JSON：内容是「年份 + 一句话」的结构化数组，
 * 放在 i18n 里会变成 7 个语言各自一堆扁平键，改一条要动 7 个地方。
 *
 * 措辞规则（与 /certifications 保持一致）：
 * - CE 是制造商自我声明（MDR），不说 "certified"，说 "CE marking introduced"
 * - FDA 不说 "approved"，说 "establishment registration and device listing completed"
 *   —— FDA 不批准 Class I 器械，写 approved 会被专业买家一眼看穿
 */
export type Milestone = { year: string; event: string };

export const MILESTONES: Record<string, Milestone[]> = {
  en: [
    { year: '2010', event: 'JinDa Rehab Medical founded in Zhongshan, Guangdong' },
    { year: '2013', event: 'CE marking introduced for the walking aids line under the medical device directive' },
    { year: '2015', event: 'FDA establishment registration and device listing completed for the US market' },
    { year: '2017', event: 'ISO 13485 certification achieved — medical device quality management system' },
    { year: '2019', event: 'New 15,000 m² facility opened with expanded production lines' },
    { year: '2022', event: 'Expanded to 50+ export countries with a dedicated OEM/ODM division' },
    { year: '2025', event: 'Launched physiotherapy and smart rehabilitation product lines' },
  ],
  fr: [
    { year: '2010', event: 'Création de JinDa Rehab Medical à Zhongshan, Guangdong' },
    { year: '2013', event: 'Marquage CE introduit sur la gamme d’aides à la marche, au titre de la directive dispositifs médicaux' },
    { year: '2015', event: 'Enregistrement de l’établissement et listing des dispositifs effectués auprès de la FDA pour le marché américain' },
    { year: '2017', event: 'Certification ISO 13485 obtenue — système de management de la qualité pour dispositifs médicaux' },
    { year: '2019', event: 'Ouverture d’une nouvelle usine de 15 000 m² avec lignes de production étendues' },
    { year: '2022', event: 'Expansion vers plus de 50 pays d’export avec une division OEM/ODM dédiée' },
    { year: '2025', event: 'Lancement des gammes de physiothérapie et de réadaptation connectée' },
  ],
  de: [
    { year: '2010', event: 'Gründung von JinDa Rehab Medical in Zhongshan, Guangdong' },
    { year: '2013', event: 'CE-Kennzeichnung für die Gehhilfen-Linie nach der Medizinprodukterichtlinie eingeführt' },
    { year: '2015', event: 'FDA-Betriebsregistrierung und Gerätelistung für den US-Markt abgeschlossen' },
    { year: '2017', event: 'ISO 13485 zertifiziert — Qualitätsmanagementsystem für Medizinprodukte' },
    { year: '2019', event: 'Neues Werk mit 15.000 m² und erweiterten Produktionslinien eröffnet' },
    { year: '2022', event: 'Ausbau auf über 50 Exportländer mit eigener OEM/ODM-Abteilung' },
    { year: '2025', event: 'Einführung von Physiotherapie- und smarten Rehabilitationslinien' },
  ],
  es: [
    { year: '2010', event: 'Fundación de JinDa Rehab Medical en Zhongshan, Guangdong' },
    { year: '2013', event: 'Introducción del marcado CE en la línea de ayudas para caminar conforme a la directiva de productos sanitarios' },
    { year: '2015', event: 'Registro de establecimiento y listado de productos ante la FDA para el mercado estadounidense' },
    { year: '2017', event: 'Certificación ISO 13485 obtenida — sistema de gestión de calidad de productos sanitarios' },
    { year: '2019', event: 'Apertura de una nueva planta de 15.000 m² con líneas de producción ampliadas' },
    { year: '2022', event: 'Expansión a más de 50 países de exportación con una división OEM/ODM propia' },
    { year: '2025', event: 'Lanzamiento de líneas de fisioterapia y rehabilitación conectada' },
  ],
  ko: [
    { year: '2010', event: '중국 광둥성 중산시에 JinDa Rehab Medical 설립' },
    { year: '2013', event: '의료기기 지침에 따라 보행 보조기 라인에 CE 마킹 도입' },
    { year: '2015', event: '미국 시장 진출을 위한 FDA 시설 등록 및 기기 리스팅 완료' },
    { year: '2017', event: 'ISO 13485 인증 취득 — 의료기기 품질경영시스템' },
    { year: '2019', event: '생산 라인을 확장한 15,000㎡ 신공장 준공' },
    { year: '2022', event: '전담 OEM/ODM 부문을 갖추고 50개국 이상으로 수출 확대' },
    { year: '2025', event: '물리치료 및 스마트 재활 제품 라인 출시' },
  ],
  ja: [
    { year: '2010', event: '中国広東省中山市に JinDa Rehab Medical を設立' },
    { year: '2013', event: '医療機器指令に基づき歩行補助具ラインでCEマーキングを開始' },
    { year: '2015', event: '米国市場向けにFDAの施設登録およびデバイスリスト登録を完了' },
    { year: '2017', event: 'ISO 13485認証を取得 — 医療機器の品質マネジメントシステム' },
    { year: '2019', event: '生産ラインを増設した15,000㎡の新工場が稼働' },
    { year: '2022', event: '専任のOEM/ODM部門を設置し、50カ国以上へ輸出を拡大' },
    { year: '2025', event: '理学療法およびスマートリハビリ製品ラインを投入' },
  ],
  ar: [
    { year: '2010', event: 'تأسيس JinDa Rehab Medical في تشونغشان بمقاطعة قوانغدونغ' },
    { year: '2013', event: 'اعتماد علامة CE لخط أدوات المساعدة على المشي وفق توجيه الأجهزة الطبية' },
    { year: '2015', event: 'إتمام تسجيل المنشأة وإدراج الأجهزة لدى إدارة الغذاء والدواء الأمريكية للسوق الأمريكي' },
    { year: '2017', event: 'الحصول على شهادة ISO 13485 — نظام إدارة الجودة للأجهزة الطبية' },
    { year: '2019', event: 'افتتاح مصنع جديد بمساحة 15,000 م² مع خطوط إنتاج موسّعة' },
    { year: '2022', event: 'التوسع إلى أكثر من 50 دولة تصدير مع قسم مخصص لـ OEM/ODM' },
    { year: '2025', event: 'إطلاق خطوط منتجات العلاج الطبيعي وإعادة التأهيل الذكية' },
  ],
};
