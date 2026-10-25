/**
 * "下单前你就能核验的事" —— 产品页信任模块文案
 *
 * 独立放置（不塞进 i18n JSON）的原因：这 4 条只在产品页复用，
 * 且需要与认证页 /certifications 的措辞保持一致，集中一处更好维护。
 */
export const VERIFY_COPY: Record<
  string,
  { heading: string; items: { icon: string; title: string; desc: string }[]; link: string }
> = {
  en: {
    heading: 'What you can verify before you order',
    items: [
      { icon: '📄', title: 'Certificate copies', desc: 'MDR DoC / FDA listing / ISO 13485 copies sent before any deposit.' },
      { icon: '🧪', title: 'Batch test report', desc: 'Load and inspection report with every shipment.' },
      { icon: '📦', title: 'Sample first', desc: 'Pre-production sample approved before bulk runs.' },
      { icon: '🎥', title: 'Factory walkthrough', desc: 'Live video call through the production line on request.' },
    ],
    link: 'See how to verify our certificates →',
  },
  fr: {
    heading: 'Ce que vous pouvez vérifier avant de commander',
    items: [
      { icon: '📄', title: 'Copies des certificats', desc: 'DoC MDR / enregistrement FDA / ISO 13485 transmis avant tout acompte.' },
      { icon: '🧪', title: 'Rapport de test par lot', desc: 'Rapport de charge et d’inspection avec chaque expédition.' },
      { icon: '📦', title: 'Échantillon d’abord', desc: 'Échantillon de pré-production validé avant la série.' },
      { icon: '🎥', title: 'Visite d’usine', desc: 'Visite en direct de la ligne de production sur demande.' },
    ],
    link: 'Voir comment vérifier nos certificats →',
  },
  de: {
    heading: 'Was Sie vor der Bestellung prüfen können',
    items: [
      { icon: '📄', title: 'Zertifikatskopien', desc: 'MDR-Konformitätserklärung / FDA-Registrierung / ISO 13485 vor jeder Anzahlung.' },
      { icon: '🧪', title: 'Prüfbericht pro Charge', desc: 'Belastungs- und Inspektionsbericht mit jeder Lieferung.' },
      { icon: '📦', title: 'Erst Muster', desc: 'Vorserienmuster vor der Serienproduktion freigegeben.' },
      { icon: '🎥', title: 'Fabrikrundgang', desc: 'Live-Videoanruf durch die Produktion auf Anfrage.' },
    ],
    link: 'So prüfen Sie unsere Zertifikate →',
  },
  es: {
    heading: 'Lo que puede verificar antes de pedir',
    items: [
      { icon: '📄', title: 'Copias de certificados', desc: 'DoC MDR / registro FDA / ISO 13485 antes de cualquier anticipo.' },
      { icon: '🧪', title: 'Informe por lote', desc: 'Informe de carga e inspección con cada envío.' },
      { icon: '📦', title: 'Primero la muestra', desc: 'Muestra de preproducción aprobada antes de la serie.' },
      { icon: '🎥', title: 'Recorrido por fábrica', desc: 'Videollamada en directo por la línea de producción.' },
    ],
    link: 'Ver cómo verificar nuestros certificados →',
  },
  ko: {
    heading: '주문 전에 직접 확인할 수 있는 것',
    items: [
      { icon: '📄', title: '인증서 사본', desc: '계약금 납입 전 MDR 적합성 선언 / FDA 등록 / ISO 13485 사본 제공.' },
      { icon: '🧪', title: '배치 시험 성적서', desc: '출하 시마다 하중 시험 및 검사 성적서 동봉.' },
      { icon: '📦', title: '샘플 우선', desc: '양산 전 사전 생산 샘플 승인.' },
      { icon: '🎥', title: '공장 화상 투어', desc: '요청 시 생산 라인 실시간 화상 통화.' },
    ],
    link: '인증서 검증 방법 보기 →',
  },
  ja: {
    heading: 'ご注文前に確認できること',
    items: [
      { icon: '📄', title: '証明書のコピー', desc: '手付金のお支払い前に MDR 適合性宣言 / FDA 登録 / ISO 13485 を提出。' },
      { icon: '🧪', title: 'ロット試験報告書', desc: '出荷ごとに耐荷重試験・検査報告書を添付。' },
      { icon: '📦', title: 'まずサンプル', desc: '量産前に事前生産サンプルを承認。' },
      { icon: '🎥', title: '工場のライブ見学', desc: 'ご希望により生産ラインをビデオ通話で案内。' },
    ],
    link: '証明書の検証方法を見る →',
  },
  ar: {
    heading: 'ما يمكنك التحقق منه قبل الطلب',
    items: [
      { icon: '📄', title: 'نسخ الشهادات', desc: 'نسخ إقرار MDR للمطابقة / تسجيل FDA / ISO 13485 تُرسل قبل أي دفعة مقدمة.' },
      { icon: '🧪', title: 'تقرير اختبار الدفعة', desc: 'تقرير التحميل والفحص مع كل شحنة.' },
      { icon: '📦', title: 'العينة أولًا', desc: 'اعتماد عينة ما قبل الإنتاج قبل التصنيع الكمي.' },
      { icon: '🎥', title: 'جولة في المصنع', desc: 'مكالمة فيديو مباشرة داخل خط الإنتاج عند الطلب.' },
    ],
    link: 'كيف تتحقق من شهاداتنا →',
  },
};
