// Stacko pricing: the single source for plans, prices, limits and the pricing page copy (EN + AR).
// Change prices or limits here, then run:  node tools/build-pricing.js
// That regenerates pricing/index.html and ar/pricing/index.html (static, so search engines see the prices).
'use strict';

const UNLIMITED = 'unlimited';
const CUSTOM = 'custom';

// Prices in USD. Yearly = 10 × monthly ("2 months free").
const PLANS = [
  { id: 'starter',    monthly: 79,  yearly: 790,  locations: 3,      extraLocation: 15,     appUsers: 5,         connections: 1,         aiCredits: 150,  cta: 'trial' },
  { id: 'growth',     monthly: 199, yearly: 1990, locations: 10,     extraLocation: 12,     appUsers: 20,        connections: 3,         aiCredits: 600,  cta: 'trial', popular: true },
  { id: 'scale',      monthly: 449, yearly: 4490, locations: 30,     extraLocation: 10,     appUsers: UNLIMITED, connections: UNLIMITED, aiCredits: 2000, cta: 'trial' },
  { id: 'enterprise', monthly: CUSTOM, yearly: CUSTOM, locations: CUSTOM, extraLocation: CUSTOM, appUsers: UNLIMITED, connections: 'unlimitedCustom', aiCredits: 5000, aiAdjustable: true, cta: 'talk' },
];

const TRIAL_DAYS = 14;
const WHATSAPP = '96171313917';
const SYSTEMS = ['Odoo', 'ERPNext', 'Zoho Inventory', 'WooCommerce', 'Shopify', 'Excel / Google Sheets'];

const COPY = {
  en: {
    title: 'Stacko pricing | Pay per location, every feature included',
    description: 'Stacko plans from $79 a month. You pay per location (warehouse, branch or shop); users, connections and AI are included. 14-day free trial.',
    navPricing: 'Pricing',
    nav: { how: 'How it works', product: 'The app', setup: 'Integrations', roles: 'Roles', faq: 'FAQ', demo: 'Book a demo' },
    hero: {
      eyebrow: 'Pricing',
      h1: 'Simple pricing: pay for your locations, everything else is included.',
      sub: `Every plan has every feature. Start with a ${TRIAL_DAYS}-day free trial.`,
      monthly: 'Monthly', yearly: 'Yearly', badge: '2 months free', billing: 'Billing period',
    },
    plans: {
      starter:    { name: 'Starter',    line: 'For a company with a few sites' },
      growth:     { name: 'Growth',     line: 'For growing teams across several warehouses and shops' },
      scale:      { name: 'Scale',      line: 'For larger networks' },
      enterprise: { name: 'Enterprise', line: 'Custom limits, connectors and support' },
    },
    popular: 'Most popular',
    perMonth: '/ month', perYear: '/ year', customQuote: 'Custom quote',
    cta: { trial: 'Start free trial', talk: 'Talk to us' },
    limits: {
      locations: (n) => n === CUSTOM ? 'Custom number of locations' : `${n} locations`,
      extraLocation: (n) => n === CUSTOM ? 'Extra locations: custom' : `Extra location: $${n} / month`,
      appUsers: (n) => n === UNLIMITED ? 'Unlimited app users' : `${n} app users`,
      telegram: 'Unlimited Telegram bot users',
      connections: (n) => n === UNLIMITED ? 'Unlimited connections to other systems' : n === 'unlimitedCustom' ? 'Unlimited connections + custom connectors' : `${n} connection${n === 1 ? '' : 's'} to other systems`,
      aiCredits: (n, adj) => `${n.toLocaleString('en-US')} AI credits / month${adj ? ' (adjustable)' : ''}`,
    },
    notes: [
      `Every plan starts with a ${TRIAL_DAYS}-day free trial.`,
      'No card and no online checkout: every button reaches our team, and we set it up with you.',
      'Need more AI? Add credits any time.',
      'Guided setup: on quote.',
    ],
    included: {
      title: 'Included in every plan',
      items: [
        'Live map of every warehouse, shop and shipment in motion, with ETAs',
        'Stock moves (receipts, issues, transfers, adjustments) with approval rules',
        'Import and shipment tracking by sea, air and road',
        'Ask Stacko: an AI chat that answers stock questions and prepares moves for you to confirm',
        'AI document reading (invoices, packing lists, Excel files) into draft moves',
        'Telegram bot: log a move or check stock by sending a message',
        'Low-stock alerts and notifications by email and Telegram',
        'Connections to Odoo, ERPNext, Zoho Inventory, WooCommerce, Shopify, and Excel/Google Sheets',
        'Live two-way stock with WooCommerce',
        'Roles and permissions per location, plus a full activity log',
        'English and Arabic, on desktop and mobile',
      ],
    },
    location: {
      eyebrow: 'The only thing you pay for',
      h2: 'What counts as a location?',
      p: 'A location is a warehouse, a branch or a shop. That is the only thing that sets your price.',
      kinds: { warehouse: 'A warehouse', shop: 'A shop', branch: 'A branch' },
      equals: '= 1 location',
      never: 'Never counted or limited',
      neverItems: ['Items (SKUs)', 'Stock moves', 'Telegram bot users'],
    },
    compare: {
      h2: 'Compare the plans',
      plan: 'Plan',
      rows: {
        monthly: 'Monthly', yearly: 'Yearly', locations: 'Locations', extraLocation: 'Extra location',
        appUsers: 'App users', telegram: 'Telegram bot users', connections: 'Connections to other systems',
        aiCredits: 'AI credits / month', trial: 'Free trial', selfServe: 'Self-serve setup (shop or spreadsheet)', guided: 'Guided setup (Odoo, ERPNext, Zoho, custom connector)',
      },
      v: {
        unlimited: 'Unlimited', custom: 'Custom', customQuote: 'Custom quote', unlimitedCustom: 'Unlimited + custom connectors',
        perMonth: '/ month', perYear: '/ year', adjustable: '(adjustable)', days: `${TRIAL_DAYS} days`, free: 'Free', onQuote: 'On quote',
      },
    },
    existing: {
      eyebrow: 'Works with your setup',
      h2: 'Already using Odoo, Zoho or WooCommerce?',
      p: 'Stacko works on top of your system for the same price, and your data keeps syncing. Use it as your full inventory app or next to the system you have: the plan costs the same either way.',
      setupTitle: 'Setup',
      selfServe: 'Connecting a shop (WooCommerce, Shopify) or a spreadsheet is self-serve and free.',
      guided: 'A guided setup for Odoo, ERPNext or Zoho, or a custom connector, is quoted separately.',
    },
    ai: {
      eyebrow: 'AI credits, explained',
      h2: 'One credit, one action.',
      p: '1 credit = one question to the AI assistant, one Telegram message, or one document page read by AI. Credits reset every month.',
      examples: [
        { q: '“What’s low in Tripoli?”', kind: 'Question to Ask Stacko', credits: 1 },
        { q: 'A 3-page supplier invoice', kind: 'Read by AI', credits: 3 },
        { q: 'One Telegram message', kind: 'Telegram bot', credits: 1 },
      ],
      credit: (n) => `${n} credit${n === 1 ? '' : 's'}`,
      ownKeyT: 'Your own Claude key',
      ownKey: 'Connect your own Claude (AI) key and your AI use is unlimited. It doesn’t use your credits.',
      topUpT: 'Need more AI?',
      topUp: 'Add credits any time.',
    },
    faq: {
      h2: 'Pricing questions',
      items: [
        ['Do you charge per user or per item?', 'No. You pay per location only.'],
        ['What happens when I reach my limit?', 'The app tells you, and you can add locations or upgrade.'],
        ['Can I change plan later?', 'Yes, any time. Just contact us.'],
        ['Do Telegram users count?', 'No. Staff who only use the Telegram bot are free.'],
        ['What if AI credits run out?', 'Top up, upgrade, or use your own Claude key.'],
        ['Is setup included?', 'Self-serve connections are free. Guided setup is quoted.'],
        ['Is there a free trial?', `Yes, ${TRIAL_DAYS} days on every plan.`],
      ],
    },
    final: { h2: 'See your stock live', p: 'Tell us how you work and we’ll show you Stacko on your own warehouses and shops.', demo: 'Book a demo', whatsapp: 'Message us on WhatsApp' },
    footer: { strip: 'Smarter stock management. Across every location.', tagline: 'Your stock, always in sight', by: 'A product by', rights: '© 2026 Aiphin · Beirut' },
    whatsappText: (plan) => plan ? `Hi Stacko team, I'm interested in the ${plan} plan.` : "Hi Stacko team, I'd like to see Stacko.",
  },

  ar: {
    title: 'أسعار ستاكو | الدفع حسب المواقع وكل الميزات مشمولة',
    description: 'خطط ستاكو تبدأ من 79$ شهرياً. تدفع حسب عدد المواقع (مستودع أو فرع أو متجر)، والمستخدمون والربط والذكاء الاصطناعي مشمولة. تجربة مجانية لمدة 14 يوماً.',
    navPricing: 'الأسعار',
    nav: { how: 'كيف يعمل', product: 'التطبيق', setup: 'التكامل', roles: 'الأدوار', faq: 'الأسئلة', demo: 'احجز عرضاً' },
    hero: {
      eyebrow: 'الأسعار',
      h1: 'أسعار بسيطة: تدفع حسب مواقعك، والباقي كله مشمول.',
      sub: `كل الخطط فيها كل الميزات. ابدأ بتجربة مجانية لمدة ${TRIAL_DAYS} يوماً.`,
      monthly: 'شهري', yearly: 'سنوي', badge: 'شهران مجاناً', billing: 'مدة الفوترة',
    },
    plans: {
      starter:    { name: 'المبتدئة', line: 'لشركة لديها مواقع قليلة' },
      growth:     { name: 'النمو',    line: 'لفرق تكبر بين عدة مستودعات ومتاجر' },
      scale:      { name: 'التوسع',   line: 'للشبكات الأكبر' },
      enterprise: { name: 'المؤسسات', line: 'حدود وربط ودعم حسب حاجتك' },
    },
    popular: 'الأكثر اختياراً',
    perMonth: '/ شهرياً', perYear: '/ سنوياً', customQuote: 'عرض سعر خاص',
    cta: { trial: 'ابدأ التجربة المجانية', talk: 'تواصل معنا' },
    limits: {
      // Arabic counted nouns: plural for 3–10, singular accusative above 10.
      locations: (n) => n === CUSTOM ? 'عدد مواقع حسب حاجتك' : n > 10 ? `${n} موقعاً` : `${n} مواقع`,
      extraLocation: (n) => n === CUSTOM ? 'المواقع الإضافية: حسب الاتفاق' : `الموقع الإضافي: ${n}$ / شهرياً`,
      appUsers: (n) => n === UNLIMITED ? 'مستخدمو التطبيق بلا حدود' : n > 10 ? `${n} مستخدماً للتطبيق` : `${n} مستخدمين للتطبيق`,
      telegram: 'مستخدمو بوت Telegram بلا حدود',
      connections: (n) => n === UNLIMITED ? 'ربط بلا حدود مع أنظمة أخرى' : n === 'unlimitedCustom' ? 'ربط بلا حدود + ربط خاص' : n === 1 ? 'ربط واحد مع نظام آخر' : `${n} عمليات ربط مع أنظمة أخرى`,
      aiCredits: (n, adj) => `${n.toLocaleString('en-US')} رصيد AI شهرياً${adj ? ' (قابل للتعديل)' : ''}`,
    },
    notes: [
      `كل خطة تبدأ بتجربة مجانية لمدة ${TRIAL_DAYS} يوماً.`,
      'لا بطاقة ولا دفع عبر الإنترنت: كل زر يوصلك إلى فريقنا، ونجهّز كل شيء معك.',
      'تحتاج AI أكثر؟ أضف رصيداً في أي وقت.',
      'التجهيز بمساعدتنا: حسب عرض سعر.',
    ],
    included: {
      title: 'مشمول في كل الخطط',
      items: [
        'خريطة حيّة لكل مستودع ومتجر وشحنة على الطريق، مع مواعيد الوصول',
        'حركات المخزون (استلام، إخراج، تحويل، تعديل) مع قواعد الموافقة',
        'تتبّع الاستيراد والشحنات بحراً وجواً وبراً',
        'اسأل ستاكو: محادثة AI تجيب عن أسئلة المخزون وتجهّز الحركات لتؤكّدها أنت',
        'قراءة المستندات بالـ AI (فواتير، قوائم تعبئة، ملفات Excel) وتحويلها إلى مسودات حركات',
        'بوت Telegram: سجّل حركة أو اعرف المخزون برسالة',
        'تنبيهات النقص والإشعارات عبر البريد الإلكتروني وTelegram',
        'الربط مع Odoo وERPNext وZoho Inventory وWooCommerce وShopify وExcel/Google Sheets',
        'مخزون متزامن في الاتجاهين مع WooCommerce',
        'أدوار وصلاحيات لكل موقع، مع سجل كامل للنشاط',
        'بالعربية والإنجليزية، على الكمبيوتر والجوال',
      ],
    },
    location: {
      eyebrow: 'الشيء الوحيد الذي تدفع مقابله',
      h2: 'ما الذي يُحسب كموقع؟',
      p: 'الموقع هو مستودع أو فرع أو متجر. هذا وحده ما يحدد سعرك.',
      kinds: { warehouse: 'مستودع', shop: 'متجر', branch: 'فرع' },
      equals: '= موقع واحد',
      never: 'لا يُحسب ولا يُحدّ أبداً',
      neverItems: ['الأصناف (SKUs)', 'حركات المخزون', 'مستخدمو بوت Telegram'],
    },
    compare: {
      h2: 'قارن بين الخطط',
      plan: 'الخطة',
      rows: {
        monthly: 'شهري', yearly: 'سنوي', locations: 'المواقع', extraLocation: 'الموقع الإضافي',
        appUsers: 'مستخدمو التطبيق', telegram: 'مستخدمو بوت Telegram', connections: 'الربط مع أنظمة أخرى',
        aiCredits: 'رصيد AI شهرياً', trial: 'التجربة المجانية', selfServe: 'التجهيز الذاتي (متجر أو جدول بيانات)', guided: 'التجهيز بمساعدتنا (Odoo أو ERPNext أو Zoho أو ربط خاص)',
      },
      v: {
        unlimited: 'بلا حدود', custom: 'حسب الحاجة', customQuote: 'عرض سعر خاص', unlimitedCustom: 'بلا حدود + ربط خاص',
        perMonth: '/ شهرياً', perYear: '/ سنوياً', adjustable: '(قابل للتعديل)', days: `${TRIAL_DAYS} يوماً`, free: 'مجاني', onQuote: 'حسب عرض سعر',
      },
    },
    existing: {
      eyebrow: 'يعمل مع نظامك',
      h2: 'تستخدم Odoo أو Zoho أو WooCommerce؟',
      p: 'ستاكو يعمل فوق نظامك بالسعر نفسه، وتبقى بياناتك متزامنة. استخدمه كتطبيق مخزون كامل أو إلى جانب نظامك الحالي: سعر الخطة واحد في الحالتين.',
      setupTitle: 'التجهيز',
      selfServe: 'ربط متجر (WooCommerce أو Shopify) أو جدول بيانات تقوم به بنفسك ومجاناً.',
      guided: 'التجهيز بمساعدتنا لـ Odoo أو ERPNext أو Zoho، أو الربط الخاص، له عرض سعر منفصل.',
    },
    ai: {
      eyebrow: 'رصيد AI ببساطة',
      h2: 'رصيد واحد، عملية واحدة.',
      p: 'الرصيد الواحد = سؤال واحد لمساعد AI، أو رسالة Telegram واحدة، أو صفحة واحدة من مستند يقرؤها AI. يتجدد الرصيد كل شهر.',
      examples: [
        { q: '«شو الناقص بطرابلس؟»', kind: 'سؤال لـ اسأل ستاكو', credits: 1 },
        { q: 'فاتورة مورّد من 3 صفحات', kind: 'يقرؤها AI', credits: 3 },
        { q: 'رسالة Telegram واحدة', kind: 'بوت Telegram', credits: 1 },
      ],
      credit: (n) => (n === 1 ? 'رصيد واحد' : `${n} أرصدة`),
      ownKeyT: 'مفتاح Claude الخاص بك',
      ownKey: 'اربط مفتاح Claude (AI) الخاص بك ليصبح استخدامك للـ AI بلا حدود، من دون أن يُخصم من رصيدك.',
      topUpT: 'تحتاج AI أكثر؟',
      topUp: 'أضف رصيداً في أي وقت.',
    },
    faq: {
      h2: 'أسئلة عن الأسعار',
      items: [
        ['هل تحسبون السعر حسب المستخدم أو حسب الصنف؟', 'لا. تدفع حسب عدد المواقع فقط.'],
        ['ماذا يحصل عندما أصل إلى حدّ خطتي؟', 'يخبرك التطبيق، ويمكنك إضافة مواقع أو الانتقال إلى خطة أكبر.'],
        ['هل يمكنني تغيير الخطة لاحقاً؟', 'نعم، في أي وقت. تواصل معنا فقط.'],
        ['هل يُحسب مستخدمو Telegram؟', 'لا. الموظفون الذين يستخدمون بوت Telegram فقط مجاناً.'],
        ['ماذا لو نفد رصيد AI؟', 'أضف رصيداً، أو انتقل إلى خطة أكبر، أو استخدم مفتاح Claude الخاص بك.'],
        ['هل التجهيز مشمول؟', 'الربط الذاتي مجاني. التجهيز بمساعدتنا حسب عرض سعر.'],
        ['هل هناك تجربة مجانية؟', `نعم، ${TRIAL_DAYS} يوماً في كل الخطط.`],
      ],
    },
    final: { h2: 'شاهد مخزونك مباشرة', p: 'أخبرنا كيف تعمل، ونريك ستاكو على مستودعاتك ومتاجرك أنت.', demo: 'احجز عرضاً تجريبياً', whatsapp: 'راسلنا على WhatsApp' },
    footer: { strip: 'إدارة مخزون أذكى. في كل موقع.', tagline: 'مخزونك دايماً قدّام عينك', by: 'منتج من', rights: '© 2026 أيفِن · بيروت' },
    whatsappText: (plan) => plan ? `مرحباً فريق ستاكو، أنا مهتم بخطة ${plan}.` : 'مرحباً فريق ستاكو، أود رؤية ستاكو.',
  },
};

module.exports = { PLANS, COPY, TRIAL_DAYS, WHATSAPP, SYSTEMS, UNLIMITED, CUSTOM };
