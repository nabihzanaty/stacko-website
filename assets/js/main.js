(()=>{'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Each language has its own URL (/ and /ar/), so the page's lang attribute decides.
let lang=document.documentElement.lang==='ar'?'ar':'en';

/* ================= dynamic strings ================= */
const arDays=n=>n===1?'يوم واحد':n===2?'يومان':n<=10?`${n} أيام`:`${n} يوماً`;
const arHours=n=>n===1?'ساعة واحدة':n===2?'ساعتان':n<=10?`${n} ساعات`:`${n} ساعة`;
const T={
 en:{units:'units',W1:'Beirut',W2:'Sidon',W3:'Tripoli',PORT:'Port of Beirut',AIR:'Beirut Airport',CN:'Supplier',
  cap:'capacity used',ok:'In stock',low:'Low',skus:'SKUs',lowS:'Low',inb:'Inbound',outb:'Outbound',search:'Search item or SKU…',
  left:'left',du:['d','h','m'],customs:'Customs',landing:'Landing',
  lzUnits:'Units',lzLow:'Low lines',lzIn:'Inbound',lzOut:'Outbound',lzLowest:'Lowest:',noRes:'No items match that search.',
  sea:'Sea',air:'Air',road:'Road',
  cities:{tyre:'Tyre',byblos:'Byblos',zahle:'Zahle',baalbek:'Baalbek',sea:'MEDITERRANEAN SEA',hermel:'Hermel'},
  rbFrom:'From',rbCodeSea:'<b>SHP-24017</b> · 1 × 40ft · 1,200 units → WH-02 Sidon',rbCodeAir:'<b>SHP-24022</b> · 14 cartons · 270 units → WH-03 Tripoli',
  legSea:n=>`SEA · ~${n} DAYS`,legCus:'CUSTOMS · ~2 DAYS',legRoad:'TRUCK',legAir:n=>`AIR · ~${n} HOURS`,legCusA:'CUSTOMS · ~1 DAY',
  BEY:'Beirut Airport (BEY)',destSea:'WH-02 Sidon',destAir:'WH-03 Tripoli',days:'days',hours:'h',
  dayN:d=>`Day ${d}`,hourN:h=>`Hour ${h}`,ofDays:n=>`~${n} days`,ofHours:n=>`~${n} h`,
  stSea:(a,b,near)=>`${a} of ${b} at sea${near?', past '+near:''}`,
  seaLeftD:d=>`Port of Beirut in ~${d} day${d>1?'s':''}`,seaLeftH:h=>`Port of Beirut in ~${h} h`,
  stCus:p=>`At ${p} · In customs`,stCusL:h=>`~${h} h of customs left`,
  stRoad:w=>`On the road to ${w}`,stRoadL:m=>`${m} min left`,
  stDone:(w,u)=>`Delivered to ${w} · ${u} units added`,stDoneL:'Stock landed',
  stAir:(h,m,f)=>`${h}h ${m}m in the air · ${f} → Beirut`,stAirL:h=>`Lands in ~${h} h`,
  rideArr:x=>`Arrives ${x}`,
  qs:['How many security cameras do we have, and where?','What is low in Sidon right now?','What is arriving next?'],
  aTotal:(n,it)=>`${n} × ${it} across 3 warehouses`,aTransit:n=>`Plus ${n} on the road right now.`,aNoTransit:'None on the road right now.',
  aLow:n=>`${n} items are below 100 units in WH-02 Sidon`,aLowNone:'Nothing is low in WH-02 Sidon right now.',aLowFoot:'Lowest first. Tap the building on the map to see the full list.',
  aNext:'Next arrivals, soonest first',aIn:'in',
  toasts:[{k:'ok',t:'Stock transfer completed',s:'From Beirut to Tripoli'},{k:'go',t:'In transit · Tripoli → Sidon',s:'ETA 2h 15m'},{k:'ship',t:'Container arrived at Port of Beirut',s:'1,200 units · SHP-24017'},{k:'low',t:'Low stock in WH-02 Sidon',s:'3 items below 100 units'}],
  srchPh:'Search product, SKU or location…',srchNone:'No match. Try a product, a SKU or a city.',inWh:w=>`in ${w}`,total:'total',tryL:'Try:',tryQs:['cable','SKU-10377','Sidon'],
  nDone:'Stock transfer completed',nStart:'Transfer started',nShip:'Container arrived at Port of Beirut',nLow:w=>`Low stock in ${w}`,nFrom:(a,b)=>`From ${a} to ${b}`,nLowSub:n=>`${n} items below 100 units`,nUnits:q=>`${q} units`,
  trTitle:'In transit',trEta:'left',trNone:'No trucks on the road right now.',
  chStock:'Units in stock, all locations',chMove:'Moves logged in the last 14 days',chLoc:'Units by warehouse',chVs:'vs 14 days ago',chAvg:a=>`${a} a day on average`,chCap:p=>`${p}% of capacity in use`,chMovesL:'moves',chCapL:'capacity',
  months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  mwLow:n=>`${n} low`,mwCap:p=>`${p}% capacity`,mwName:w=>`${T.en[w]} warehouse`,
  fmPh:{name:'Your name',company:'Company name',phone:'+961 …',email:'name@company.com',msg:'For example: electronics and home goods from Türkiye and the UAE'},
  fmText:d=>`Hi Stacko team, I'd like a demo.\nName: ${d.name}\nCompany: ${d.company||'-'}\nPhone: ${d.phone}\nEmail: ${d.email||'-'}\nWarehouses or branches: ${d.wh}\nUsing today: ${d.sys}\nImports: ${d.msg||'-'}`,
  copied:'Copied',
  ivRead:'Reading…',ivDraft:'Draft · needs review',ivOk:'Approved',
  spF2Read:'Matching items…',spF2Draft:'2 matched · 2 new to confirm',spF2Ok:'2 matched · 2 created',
  rvTRead:'AI is reading the invoice',rvSRead:'Nothing is recorded yet',rvTDraft:'Waiting for Maya to review',rvSDraft:'Owner · approves purchases',rvTOk:'Approved by Maya · 09:12',rvSOk:'Shipment recorded in the ledger',rvBtn:'Approve',
  rlScope:'Locations',lv:{y:'Allowed',s:'Own sites',d:'Draft, needs approval',n:'No access'},
  acts:['View map and stock','Upload invoices and documents','Log receipts, issues and transfers','Approve transactions','Adjust stock after counts','Track imports and shipments','Reports','Manage users and permissions'],
  roles:[['Owner','Map and reports','Sees every site, every move and every report. Approves stock adjustments.','All locations'],
   ['Admin','Settings','Sets up warehouses, users and permissions. Doesn\'t move stock.','All locations'],
   ['Warehouse manager','App','Runs one site. Receives shipments, approves transfers and runs counts.','Assigned sites'],
   ['Floor staff','Telegram','Most of the team. Logs stock in, out and transfers from Telegram or the app.','Assigned sites'],
   ['Purchasing','Invoice upload','Uploads supplier invoices and tracks sea and air shipments from any country.','All locations'],
   ['Document clerk','Upload','Uploads invoices and documents and prepares drafts. Sees only their own submissions.','Own submissions'],
   ['Operations reviewer','Approvals','Reviews AI drafts, resolves flagged lines and approves transactions.','All locations'],
   ['Branch staff','App','Sees stock everywhere to answer customers, but only records stock leaving their own branch.','Assigned branch'],
   ['Read-only viewer','Map and reports','For accountants, auditors and partners. Sees the map, stock and reports, and changes nothing.','Permitted locations']]},
 ar:{units:'وحدة',W1:'بيروت',W2:'صيدا',W3:'طرابلس',PORT:'مرفأ بيروت',AIR:'مطار بيروت',CN:'المورّد',
  cap:'من السعة مستخدمة',ok:'متوفر',low:'منخفض',skus:'صنف',lowS:'منخفض',inb:'واردة',outb:'صادرة',search:'ابحث عن صنف أو رمز…',
  left:'متبقٍ',du:[' ي',' س',' د'],customs:'الجمارك',landing:'هبوط',
  lzUnits:'الوحدات',lzLow:'أصناف منخفضة',lzIn:'واردة',lzOut:'صادرة',lzLowest:'الأقل:',noRes:'لا أصناف تطابق هذا البحث.',
  sea:'بحري',air:'جوي',road:'بري',
  cities:{tyre:'صور',byblos:'جبيل',zahle:'زحلة',baalbek:'بعلبك',sea:'البحر المتوسط',hermel:'الهرمل'},
  rbFrom:'من',rbCodeSea:'<b>SHP-24017</b> · حاوية 40 قدم · 1,200 وحدة ← WH-02 صيدا',rbCodeAir:'<b>SHP-24022</b> · 14 كرتونة · 270 وحدة ← WH-03 طرابلس',
  legSea:n=>`بحري · ~${arDays(n)}`,legCus:'جمارك · ~يومان',legRoad:'شاحنة',legAir:n=>`جوي · ~${arHours(n)}`,legCusA:'جمارك · ~يوم واحد',
  BEY:'مطار بيروت (BEY)',destSea:'WH-02 صيدا',destAir:'WH-03 طرابلس',days:'أيام',hours:'س',
  dayN:d=>`اليوم ${d}`,hourN:h=>`الساعة ${h}`,ofDays:n=>`~${arDays(n)}`,ofHours:n=>`~${arHours(n)}`,
  stSea:(a,b,near)=>`${a} من ${b} في البحر${near?'، بعد '+near:''}`,
  seaLeftD:d=>`مرفأ بيروت بعد ~${arDays(d)}`,seaLeftH:h=>`مرفأ بيروت بعد ~${arHours(h)}`,
  stCus:p=>`في ${p} · في الجمارك`,stCusL:h=>`~${arHours(h)} متبقية في الجمارك`,
  stRoad:w=>`على الطريق إلى ${w}`,stRoadL:m=>`${m} دقيقة متبقية`,
  stDone:(w,u)=>`وصلت إلى ${w} · أُضيفت ${u} وحدة`,stDoneL:'دخلت البضاعة المخزون',
  stAir:(h,m,f)=>`${h}س ${m}د في الجو · ${f} ← بيروت`,stAirL:h=>`تهبط بعد ~${arHours(h)}`,
  rideArr:x=>`الوصول ${x}`,
  qs:['كم كاميرا مراقبة عندنا، وأين؟','ما الأصناف المنخفضة في صيدا الآن؟','ما الذي سيصل قريباً؟'],
  aTotal:(n,it)=>`${n} × ${it} في 3 مستودعات`,aTransit:n=>`بالإضافة إلى ${n} على الطريق الآن.`,aNoTransit:'لا شيء منها على الطريق الآن.',
  aLow:n=>`${n} أصناف تحت 100 وحدة في WH-02 صيدا`,aLowNone:'لا أصناف منخفضة في WH-02 صيدا الآن.',aLowFoot:'الأقل أولاً. اضغط على المبنى في الخريطة لرؤية القائمة كاملة.',
  aNext:'الوصول القادم، الأقرب أولاً',aIn:'بعد',
  toasts:[{k:'ok',t:'اكتمل تحويل المخزون',s:'من بيروت إلى طرابلس'},{k:'go',t:'قيد النقل · طرابلس ← صيدا',s:'الوصول خلال 2س 15د'},{k:'ship',t:'وصلت حاوية إلى مرفأ بيروت',s:'1,200 وحدة · SHP-24017'},{k:'low',t:'مخزون منخفض في WH-02 صيدا',s:'3 أصناف تحت 100 وحدة'}],
  srchPh:'ابحث عن منتج أو رمز أو موقع…',srchNone:'لا نتائج. جرّب اسم منتج أو رمزاً أو مدينة.',inWh:w=>`في ${w}`,total:'المجموع',tryL:'جرّب:',tryQs:['كابل','SKU-10377','صيدا'],
  nDone:'اكتمل تحويل المخزون',nStart:'بدأ تحويل',nShip:'وصلت حاوية إلى مرفأ بيروت',nLow:w=>`مخزون منخفض في ${w}`,nFrom:(a,b)=>`من ${a} إلى ${b}`,nLowSub:n=>`${n} أصناف تحت 100 وحدة`,nUnits:q=>`${q} وحدة`,
  trTitle:'قيد النقل',trEta:'متبقٍ',trNone:'لا شاحنات على الطريق الآن.',
  chStock:'الوحدات في المخزون، كل المواقع',chMove:'الحركات المسجّلة في آخر 14 يوماً',chLoc:'الوحدات حسب المستودع',chVs:'مقارنة بقبل 14 يوماً',chAvg:a=>`بمعدل ${a} يومياً`,chCap:p=>`${p}% من السعة مستخدمة`,chMovesL:'حركة',chCapL:'السعة',
  months:['كانون الثاني','شباط','آذار','نيسان','أيار','حزيران','تموز','آب','أيلول','تشرين الأول','تشرين الثاني','كانون الأول'],
  mwLow:n=>`${n} منخفضة`,mwCap:p=>`${p}% من السعة`,mwName:w=>`مستودع ${T.ar[w]}`,
  fmPh:{name:'اسمك',company:'اسم الشركة',phone:'+961 …',email:'name@company.com',msg:'مثلاً: إلكترونيات وأدوات منزلية من تركيا والإمارات'},
  fmText:d=>`مرحباً فريق ستاكو، أود حجز عرض تجريبي.\nالاسم: ${d.name}\nالشركة: ${d.company||'-'}\nالهاتف: ${d.phone}\nالبريد الإلكتروني: ${d.email||'-'}\nعدد المستودعات أو الفروع: ${d.wh}\nالنظام الحالي: ${d.sys}\nالاستيراد: ${d.msg||'-'}`,
  copied:'تم النسخ',
  ivRead:'قيد القراءة…',ivDraft:'مسودة · بانتظار المراجعة',ivOk:'تمت الموافقة',
  spF2Read:'جارٍ مطابقة الأصناف…',spF2Draft:'2 مطابقان · 2 جديدان للتأكيد',spF2Ok:'2 مطابقان · 2 أُنشئا',
  rvTRead:'الذكاء الاصطناعي يقرأ الفاتورة',rvSRead:'لم يُسجَّل شيء بعد',rvTDraft:'بانتظار مراجعة مايا',rvSDraft:'المالكة · توافق على المشتريات',rvTOk:'وافقت مايا · 09:12',rvSOk:'سُجّلت الشحنة في السجل',rvBtn:'موافقة',
  rlScope:'المواقع',lv:{y:'مسموح',s:'مواقعه فقط',d:'مسودة تحتاج موافقة',n:'غير مسموح'},
  acts:['عرض الخريطة والمخزون','رفع الفواتير والمستندات','تسجيل الاستلام والإخراج والتحويل','الموافقة على المعاملات','تعديل المخزون بعد الجرد','متابعة الاستيراد والشحنات','التقارير','إدارة المستخدمين والصلاحيات'],
  roles:[['المالك','الخريطة والتقارير','يرى كل موقع وكل حركة وكل تقرير، ويوافق على تعديلات المخزون.','كل المواقع'],
   ['مسؤول النظام','الإعدادات','يجهّز المستودعات والمستخدمين والصلاحيات، ولا ينقل بضاعة.','كل المواقع'],
   ['مدير المستودع','التطبيق','يدير موقعاً واحداً. يستلم الشحنات، يوافق على التحويلات، ويجري الجرد.','المواقع المعيّنة'],
   ['فريق العمل','Telegram','معظم الفريق. يسجّلون الإدخال والإخراج والتحويلات عبر Telegram أو التطبيق.','المواقع المعيّنة'],
   ['المشتريات','رفع الفواتير','يرفعون فواتير الموردين ويتابعون الشحنات البحرية والجوية من أي بلد.','كل المواقع'],
   ['موظف المستندات','الرفع','يرفع الفواتير والمستندات ويجهّز المسودات، ولا يرى إلا ما أرسله.','ما أرسله فقط'],
   ['مراجع العمليات','الموافقات','يراجع مسودات الذكاء الاصطناعي، يحلّ الأسطر المعلَّمة، ويوافق على المعاملات.','كل المواقع'],
   ['موظف الفرع','التطبيق','يرى المخزون في كل المواقع ليجيب الزبائن، لكنه يسجّل فقط البضاعة الخارجة من فرعه.','الفرع المعيّن'],
   ['مشاهد فقط','الخريطة والتقارير','للمحاسبين والمدققين والشركاء. يرى الخريطة والمخزون والتقارير، ولا يغيّر شيئاً.','المواقع المسموحة']]}
};
const t=k=>T[lang][k];

/* ================= static copy (Arabic) ================= */
const AR={
 navHow:'كيف يعمل',navProduct:'التطبيق',navSetup:'التكامل',navRoles:'الأدوار',navPricing:'الأسعار',navFaq:'الأسئلة',navDemo:'احجز عرضاً',
 heroH1:'مخزونك دايماً قدّام عينك',
 heroLede:'ستاكو يضع كل مستودعاتك وأصنافك وشحناتك على خريطة حيّة واحدة. فريقك يسجّل الحركة بحوالي 10 ثوانٍ، والشاحنة تنطلق على الخريطة.',
 heroCta:'احجز عرضاً تجريبياً',heroHow:'تابع تحويلاً واحداً',pcName:'مستودع بيروت',pcP:'المنتجات',pcT:'قيد النقل',pcA:'المتوفر',
 pbEyebrow:'المشكلة الحقيقية',pbH2:'لا أحد يسجّل التحويلات.',
 pbP:'البضاعة تتنقّل بين المستودعات طوال اليوم. تسجيل كل حركة يبدو عملاً إضافياً بلا نتيجة ظاهرة، فيُهمَل. الأرقام تنحرف، وبعد فترة لا أحد يثق بها.',
 pbAnswer:'<b>جواب ستاكو:</b> أن يأخذ التسجيل حوالي 10 ثوانٍ، وأن تظهر كل حركة على الخريطة كشاحنة أو سفينة أو طائرة.',
 shTitle:'ورقة جرد · WH-01 بيروت',shSub:'ما تقوله السجلات مقابل ما على الرف',shExample:'مثال',
 thItem:'الصنف',thSys:'في السجلات',thShelf:'على الرف',thGap:'الفرق',thWhy:'ماذا حصل',
 r1n:'شريط LED&rlm; 5م',r1w:'أُرسل إلى صيدا ولم يسجّله أحد.',r2n:'كاميرا مراقبة',r2w:'استُلمت حاوية ولم تُدخل.',
 r3n:'مروحة مكتبية',r3w:'بيعت من هنا وخُصمت في طرابلس.',r4n:'كابل USB-C&rlm; 1م',r4w:'مطابق.',
 shFoot:'ثلاثة أسطر من أربعة خاطئة، وكل خطأ بدأ بحركة لم يكتبها أحد.',
 stageNote:'رسم توضيحي · بيانات تجريبية',jEyebrow:'كيف يعمل',jH2:'رسالة واحدة. شاحنة واحدة على الخريطة.',
 jP:'تابع تحويلاً واحداً من بيروت إلى صيدا، من الرسالة على رصيف التحميل حتى وصول البضاعة إلى الرف.',
 s1no:'الخطوة 1 من 4',s1h:'هادي يرسل رسالة',s1p:'بلا نماذج ولا جداول. الموظفون يسجّلون الحركات على Telegram بكلماتهم، مباشرةً من رصيف التحميل.',
 tgName:'بوت ستاكو',tgSub:'Telegram · فريق بيروت',tgMsg:'بعتت 40 شريط LED من بيروت لصيدا',tgBot:'تمام. جهّزت مسودة تحويل من WH-01 بيروت إلى WH-02 صيدا وأرسلتها إلى كريم للموافقة.',
 s2no:'الخطوة 2 من 4',s2h:'ستاكو يجهّز المسودة. كريم يوافق.',s2p:'الذكاء الاصطناعي يقرأ الرسالة ويطابق الصنف والمستودعين. كريم، مدير مستودع بيروت، يراجع المسودة ويوافق عليها، وعندها فقط تخرج البضاعة من بيروت.',
 rcApp:'وافق عليها',rcAppV:'كريم · المدير · 09:41',
 rcRef:'تحويل',rcItem:'الصنف',rcItemV:'شريط LED&rlm; 5م',rcQty:'الكمية',rcRoute:'المسار',rcRouteV:'WH-01 بيروت ← WH-02 صيدا',rcEta:'الوصول المتوقع',rcBy:'سجّلها',rcByV:'هادي · Telegram · 09:41',
 rcDelta:'شريط LED&rlm; 5م في بيروت:',
 s3no:'الخطوة 3 من 4',s3h:'الشاحنة تتحرك على الخريطة',s3p:'التحويل يظهر مع عدّ تنازلي مباشر، فيرى الجميع ما على الطريق. تابع التمرير لتقود الشاحنة.',
 rideLeft:'متبقٍ',rideFrom:'انطلقت 09:41',rideFromW:'WH-01 بيروت',rideToW:'WH-02 صيدا',
 s4no:'الخطوة 4 من 4',s4h:'البضاعة تصل إلى صيدا',s4p:'عند الوصول تُضاف الوحدات إلى صيدا، ينطفئ تنبيه النقص، وتدخل الحركة سجل التدقيق.',
 dlv:'تم التسليم: 40 × شريط LED&rlm; 5م',dlvSub:'WH-02 صيدا · 10:54 · الشاحنة LB-218',lvItem:'شريط LED&rlm; 5م في صيدا:',plLow:'منخفض',plOk:'متوفر',
 prEyebrow:'داخل التطبيق',prH2:'أكثر من مجرد مخزون.<br><span class="accent">إنها رؤية أوضح.</span>',
 prP:'من عدة مستودعات إلى عدة فروع، شاهد مخزونك وحركاتك وتنقلاتك في مكان واحد وعلى خريطة واحدة. النافذة أدناه حيّة، جرّب الضغط على أي مبنى.',
 kUnits:'الوحدات في المخزون',kTransit:'وحدات قيد النقل',kShips:'بحري · جوي · بري',kLow:'أصناف منخفضة',showing:'عرض 20 من 10,482 صنف · بيانات تجريبية',
 askTitle:'اسأل ستاكو',askSub:'الأجوبة من نفس المخزون الحي الظاهر على الخريطة.',
 p1t:'مستودعات متعددة',p1d:'كل موقع على خريطة واحدة، مع الوحدات والسعة والنقص بنظرة واحدة.',
 p2t:'حركات لحظية',p2d:'كل إدخال وإخراج وتحويل يُسجّل مع من وماذا ومتى وأين.',
 p3t:'رؤية المخزون',p3d:'ابحث في أكثر من 10,000 صنف واعرف أي موقع يحمل كل صنف.',
 p4t:'قرارات أذكى',p4d:'تنبيهات النقص وعدم التطابق، وأجوبة واضحة على أسئلة المخزون.',
 ftEyebrow:'الميزات',ftH2:'كل مستودع. كل حركة. رؤية واحدة واضحة.',ftP:'كل ما تحتاجه لإدارة المخزون في عدة مواقع، بالوضوح والتحكم اللذين يستحقهما عملك.',
 b1t:'البحث عن المخزون',b1d:'اعثر على الصنف الصحيح في الموقع الصحيح، أسرع.',
 b2t:'نظرة على الخريطة',b2d:'شاهد كل مستودعاتك وفروعك في عرض واحد.',
 b3t:'التحويلات والحركات',b3d:'تابع كل حركة مخزون بين المواقع.',livePill:'مباشر',
 b4t:'مؤشرات أذكى',b4d:'قرارات أفضل بأرقام واضحة ومحدّثة.',tbStock:'المخزون',tbMove:'الحركة',tbLoc:'المواقع',demoTag:'بيانات تجريبية',
 imEyebrow:'الاستيراد',imH2:'من أي مرفأ إلى رفّك.',
 imP:'كل شحنة مستوردة تُتابَع كتحويل واحد: بحراً أو جواً، ثم الجمارك، ثم بالشاحنة إلى المستودع. أينما كان المورّد، تعرف دائماً في أي مرحلة هي.',
 rbSea:'بحري',rbAir:'جوي',rbHint:'اسحب لتحريك الشحنة على مسارها. أوقات النقل أمثلة فقط؛ في ستاكو تحدد وقت الوصول لكل شحنة أو لكل مرحلة.',
 invH3:'ارفع الفاتورة. ستاكو يجهّز مسودة الشحنة.',invP:'أرسل فاتورة المورّد أو قائمة التعبئة بصيغة PDF أو Excel أو صورة. الذكاء الاصطناعي يقرأ كل سطر ويجهّز مسودة. الأصناف الجديدة أو غير الواضحة تُعلَّم للمراجعة، ولا يُسجَّل شيء قبل أن يؤكّده شخص لديه صلاحية الموافقة.',
 ivs1:'الذكاء الاصطناعي يقرأ',ivs2:'شخص يراجع',ivs3:'موافقة وتسجيل',spChk:'يحتاج تأكيداً قبل إنشائه',invMid:'الذكاء الاصطناعي يقرأ الأسطر',
 spLabel:'شحنة قادمة',spMode:'بحري',spFrom:'جبل علي',spPort:'مرفأ بيروت',spTo:'WH-02 صيدا',spItem:'الصنف',spQty:'الكمية',
 sp1:'شريط LED&rlm; 5م',sp2:'سماعات لاسلكية',sp3:'حصيرة يوغا',sp4:'صندوق تخزين',spNew:'صنف جديد',spNew2:'صنف جديد',
 spFoot1:'<b>1,200 وحدة</b> في الطريق · الوصول بعد حوالي 20 يوماً',
 suEyebrow:'يعمل مع نظامك',suH2:'ابدأ من جديد، أو احتفظ بنظامك.',
 suP:'ستاكو يمكن أن يدير مخزونك بالكامل، أو يضيف الخريطة والذكاء الاصطناعي فوق النظام الذي تستخدمه. في الحالتين، أنت تحدد أي نظام يحمل الأرقام المعتمدة.',
 suA1:'الخيار 1',suA:'نظام مخزون كامل',suAp:'للفرق التي تعمل على Excel والفواتير الورقية وWhatsApp. ستاكو يصبح نظام المخزون لديك.',
 suAl1:'المنتجات والأصناف والمخزون في كل موقع',suAl2:'الاستلام والإخراج والتحويل والجرد',suAl3:'الأدوار والموافقات والسجل الكامل',suAl4:'الخريطة الحية ولوحة المتابعة والتقارير',
 suB1:'الخيار 2',suB:'الخريطة والذكاء الاصطناعي فوق نظام ERP لديك',suBp:'تستخدم Odoo أو SAP أو نظاماً آخر؟ احتفظ به. ستاكو يتصل به، يعرض مواقعه ومخزونه على الخريطة، ويضيف قراءة المستندات بالذكاء الاصطناعي.',
 saT:'ستاكو · كل المواقع',saSub:'مباشر',sa1:'المستودعات والفروع',sa2:'حركات اليوم',sa3:'بانتظار الموافقة',sa4:'أصناف منخفضة',
 syT:'نظامك ⇄ ستاكو',sySub:'آخر مزامنة قبل دقيقتين',syEx:'مثال',sy1:'المواقع',sy1v:'3 من 3',sy2:'المنتجات',sy3:'مستويات المخزون',sy3v:'محدّثة',sy4:'الإرسال إلى نظامك',sy4v:'1 بانتظار الموافقة',sy5:'التعارضات',
 mdH:'أنت تختار حدود الاتصال',
 md1t:'قراءة فقط',md1p:'ستاكو يعرض بيانات نظامك على الخريطة، ويبقى نظامك هو المرجع.',
 md2t:'مسودة للموافقة',md2p:'ستاكو يجهّز السجلات من المستندات، وشخص يوافق عليها قبل أن يصل أي شيء إلى نظامك.',
 md3t:'إرسال بعد الموافقة',md3p:'المعاملات المعتمدة تُرسل إلى نظامك مرة واحدة مع رقم مرجعي، فلا يُسجَّل شيء مرتين.',
 suNote:'يُجهَّز الربط لكل عميل على حدة. أخبرنا بالنظام الذي تستخدمه ونؤكّد لك ما هو ممكن قبل أي التزام.',suCta:'ناقش نظامك معنا',
 ucEyebrow:'لمن ستاكو',ucH2:'مصمّم للشركات التي تنقل البضاعة.',ucP:'إذا كان مخزونك في أكثر من مكان، أو يصلك بفواتير موردين طويلة، فستاكو صُمّم لك.',ucW:'مع ستاكو',
 uc1t:'تجار الجملة والموزّعون',uc1p:'عدة مستودعات، وشاحنات تتنقّل بينها طوال اليوم.',uc1s:'كل مستودع وكل تحويل على خريطة واحدة، مع من نقل ماذا.',
 uc2t:'متاجر بعدة فروع',uc2p:'زبون يطلب صنفاً نفد هنا لكنه موجود في فرع آخر.',uc2s:'ابحث مرة واحدة، اعرف أي فرع لديه الصنف، وحوّله بموافقة.',
 uc3t:'المستوردون وقطع الغيار',uc3p:'آلاف الأصناف، وحاويات تصل مع فواتير طويلة.',uc3s:'ارفع الفاتورة، راجع المسودة، وتابع الشحنة من المرفأ إلى الرف.',
 uc4t:'المصانع الصغيرة',uc4p:'مواد خام تدخل، بضاعة جاهزة تخرج، والجرد نادراً ما يتطابق.',uc4s:'استلام وإخراج وجرد لكل موقع، مع تعديلات تحتاج إلى موافقة.',
 rlEyebrow:'الأدوار والصلاحيات',rlH2:'لكل شخص الصلاحية المناسبة.',rlP:'تسعة أدوار جاهزة، تُضبط حسب الإجراء وحسب الموقع. من يجهّز المعاملة لا يوافق عليها. اختر دوراً لترى ما يمكنه فعله.',
 lgTitle:'كل رقم له أصل.',lgP:'سجل اليوم للمستودعات الثلاثة. قيود على سبيل المثال.',lgTime:'الوقت',lgWho:'من',lgWhat:'ماذا',lgWhere:'أين',lgChg:'قبل ← بعد',
 lw1:'النظام',lv1:'عند الوصول',lk1:'إدخال',lx1:'40 × شريط LED&rlm; 5م',ll1:'WH-02 صيدا',lc1:'85 ← 125',
 lw2:'هادي',lv2:'Telegram · بموافقة كريم',lk2:'تحويل',lx2:'40 × شريط LED&rlm; 5م',ll2:'WH-01 ← WH-02',lc2:'640 ← 600',
 lw3:'رنا',lv3:'فاتورة · بموافقة مايا',lk3:'شحنة',lx3:'1,200 وحدة · SHP-24017',ll3:'جبل علي ← WH-02',lc3:'+1,200 قادمة',
 lw4:'عمر',lv4:'التطبيق',lk4:'إخراج',lx4:'12 × مروحة مكتبية',ll4:'WH-03 طرابلس',lc4:'95 ← 83',
 lw5:'مايا',lv5:'المالكة · موافقة',lk5:'تعديل',lx5:'−3 × غطاء هاتف، جرد',ll5:'WH-01 بيروت',lc5:'214 ← 211',
 lgNote:'السجل يكبر فقط. التصحيح قيد جديد، وليس تعديلاً.',
 tsEyebrow:'مبني على الثقة',tsH2:'أرقام يعتمد عليها كل فريقك.',tsP:'سجلات المخزون لا تفيد إلا إذا وثق بها الناس. هذه الضمانات موجودة في كل حساب على ستاكو.',
 ts1t:'الموافقة لشخص، لا للذكاء الاصطناعي وحده',ts1p:'الذكاء الاصطناعي يجهّز المسودات، والمخزون لا يتغيّر إلا بعد تأكيد شخص مخوَّل.',
 ts2t:'تحقّق قبل الاعتماد',ts2p:'المنتجات والمواقع والكميات والوحدات والحقول المطلوبة تُفحص قبل تأكيد أي معاملة.',
 ts3t:'لا تسجيل مزدوج',ts3p:'كل استيراد وكل إرسال يحمل رقماً مرجعياً، فلا تُسجَّل الفاتورة نفسها أو المزامنة نفسها مرتين.',
 ts4t:'سجل يكبر ولا يُمحى',ts4p:'من وماذا ومتى وأين، مع القيم قبل وبعد. التصحيح قيد جديد، وليس تعديلاً.',
 ts5t:'بياناتك ملكك',ts5p:'بيانات كل شركة منفصلة تماماً عن غيرها، والوصول إليها يتبع الأدوار التي تحددها.',
 ts6t:'مزامنة واضحة',ts6p:'عند الربط مع نظامك، تظهر حالة المزامنة والأخطاء والتعارضات، وتُعاد المحاولات الفاشلة بأمان.',
 fqEyebrow:'أسئلة شائعة',fqH2:'أسئلة نسمعها كثيراً.',fqP:'سؤال آخر؟ <a href="#contact">راسلنا</a> وسيجيبك شخص من فريقنا.',
 q1:'هل عليّ استبدال نظامي الحالي؟',a1:'لا. إذا كنت تستخدم نظام ERP مثل Odoo أو SAP، يمكن لستاكو أن يعمل فوقه ويضيف الخريطة وقراءة المستندات. وإذا لم يكن لديك نظام، يمكن أن يكون ستاكو نظام مخزونك الكامل.',
 q2:'هل يغيّر الذكاء الاصطناعي مخزوني وحده؟',a2:'لا. الذكاء الاصطناعي يقرأ الرسائل والمستندات ويجهّز مسودات. الأصناف الجديدة أو غير الواضحة تُعلَّم، ولا يتغيّر المخزون إلا بعد أن يؤكّد المسودة شخص لديه صلاحية الموافقة.',
 q3:'ما المستندات التي يقرأها ستاكو؟',a3:'فواتير الموردين وقوائم التعبئة، بصيغة PDF أو Excel أو صورة. يستخرج ستاكو المورّد ورقم الفاتورة والتاريخ والأصناف والكميات والوحدات والمجاميع عندما تكون موجودة في المستند.',
 q4:'لمن تعود البيانات؟',a4:'لك أنت. بيانات كل شركة منفصلة، ولا يراها إلا من تمنحهم الصلاحية.',
 q5:'هل يمكنني التحكم بمن يفعل ماذا؟',a5:'نعم. الصلاحيات تُضبط حسب الإجراء وحسب الموقع، انطلاقاً من تسعة أدوار جاهزة يمكنك تعديلها. من يجهّز المعاملة لا يستطيع الموافقة عليها.',
 q6:'هل يمكنكم نقل ملفات Excel الحالية؟',a6:'نعم. التجهيز يشمل استيراد منتجاتك ومواقعك ومخزونك الافتتاحي من ملفاتك الحالية، فيبدأ فريقك بأرقام حقيقية.',
 q7:'كم يستغرق التجهيز؟',a7:'يعتمد على عدد المواقع والمنتجات لديك، وعلى ما إذا كنا سنربط مع نظام قائم. نتفق على خطة واضحة خلال العرض التجريبي.',
 q8:'كم تبلغ كلفة ستاكو؟',a8:'تدفع حسب عدد المواقع (مستودع أو فرع أو متجر)، وكل الخطط فيها كل الميزات. كل الخطط تبدأ بتجربة مجانية لمدة 14 يوماً. <a href="/ar/pricing/">شاهد الخطط</a>.',
 ctEyebrow:'احجز عرضاً',ctH2:'احصل على رؤية أوضح لمخزونك.',
 ctP:'أخبرنا كيف تعمل اليوم، على Excel أو الورق أو نظام ERP، ونريك ستاكو على مستودعاتك وفروعك أنت.',
 fmSys:'ماذا تستخدم اليوم؟',sys1:'Excel أو ورق',sys2:'نظام ERP مثل Odoo أو SAP',sys3:'شيء آخر',
 ctMailL:'البريد الإلكتروني',ctWaL:'WhatsApp',ctCopy:'نسخ',ctCopy2:'نسخ',
 fmTitle:'أخبرنا عن مخزونك',fmSub:'يأخذ دقيقة واحدة. نردّ عليك بموعد لعرض قصير.',
 fmName:'الاسم الكامل',fmCompany:'الشركة <em>(اختياري)</em>',fmPhone:'الهاتف أو WhatsApp',fmEmail:'البريد الإلكتروني <em>(لتصلك رسالة التأكيد ورابط العرض)</em>',
 fmWh:'كم مستودعاً أو فرعاً لديك؟',fmMsg:'ماذا تستورد، ومن أين؟ <em>(اختياري)</em>',
 fmErrName:'يرجى إدخال اسمك.',fmErrPhone:'يرجى إدخال رقم هاتف أو WhatsApp.',
 fmSend:'اطلب عرضاً تجريبياً',fmNote:'تم حفظ طلبك لدى فريقنا. يمكنك أيضاً إرساله عبر WhatsApp للحصول على ردّ أسرع.',
 fmOkT:'تم حفظ طلبك',fmOkP:'سنتواصل معك قريباً. للحصول على ردّ أسرع، أرسله عبر WhatsApp أيضاً. هذا نصّه:',fmWarn:'تعذّر حفظ طلبك عبر الإنترنت. يرجى إرساله عبر WhatsApp ليصل إلى فريقنا.',fmOkBtn:'أرسل عبر WhatsApp',fmCopyMsg:'انسخ الرسالة',fmEdit:'عدّل التفاصيل',
 ftStrip:'إدارة مخزون أذكى. في كل موقع.',ftCta:'احجز عرضاً',ftTag:'مخزونك دايماً قدّام عينك',ftBy:'منتج من',ftRights:'© 2026 أيفِن · بيروت'
};
const EN={};$$('[data-i]').forEach(el=>{EN[el.dataset.i]=el.innerHTML});

/* ================= geography ================= */
const DEG=Math.PI/180,LAT0=33.05,LON0=35.10,KX=111.32*Math.cos(33.85*DEG),KY=110.9,IX=1.2247,IY=0.7071;
const G=([la,lo])=>[(lo-LON0)*KX,(la-LAT0)*KY];
const LEB_LL=[[33.092,35.104],[33.17,35.16],[33.255,35.19],[33.29,35.205],[33.38,35.25],[33.47,35.31],[33.555,35.365],[33.64,35.41],[33.70,35.445],[33.79,35.462],[33.86,35.47],[33.898,35.475],[33.905,35.52],[33.94,35.588],[33.985,35.615],[34.05,35.635],[34.12,35.64],[34.25,35.66],[34.31,35.69],[34.335,35.735],[34.40,35.785],[34.455,35.812],[34.48,35.845],[34.54,35.90],[34.635,35.97],
 [34.645,36.06],[34.64,36.20],[34.63,36.33],[34.63,36.45],[34.53,36.57],[34.44,36.62],[34.34,36.58],[34.22,36.48],[34.10,36.40],[33.98,36.28],[33.86,36.13],[33.78,36.07],[33.70,36.08],[33.60,35.98],[33.50,35.93],[33.42,35.86],[33.33,35.82],[33.27,35.62],[33.20,35.57],[33.10,35.50],[33.08,35.38],[33.07,35.25],[33.09,35.15]];
const LEB=LEB_LL.map(G),COAST=LEB.slice(0,25);
const sst=(a,b,x)=>{const k=Math.max(0,Math.min(1,(x-a)/(b-a)));return k*k*(3-2*k)};
function segT(q,a,b){const dx=b[0]-a[0],dy=b[1]-a[1];let k=((q[0]-a[0])*dx+(q[1]-a[1])*dy)/(dx*dx+dy*dy||1);k=k<0?0:k>1?1:k;return[k,Math.hypot(a[0]+k*dx-q[0],a[1]+k*dy-q[1])]}
function distPoly(q,P){let m=1e9;for(let i=0;i<P.length-1;i++){const d=segT(q,P[i],P[i+1])[1];if(d<m)m=d}return m}
const R1={p:[[33.33,35.55],[33.55,35.63],[33.78,35.74],[33.95,35.83],[34.15,35.97],[34.30,36.05],[34.50,36.15]].map(G),a:[5,6.5,8,9,9.5,10,7],s:7.5};
const R2={p:[[33.40,35.84],[33.58,35.98],[33.80,36.15],[34.05,36.33],[34.35,36.52]].map(G),a:[9,6.5,6.5,6,5],s:6.5};
function ridge(q,r){let best=1e9,amp=0;for(let i=0;i<r.p.length-1;i++){const[k,d]=segT(q,r.p[i],r.p[i+1]);if(d<best){best=d;amp=r.a[i]+(r.a[i+1]-r.a[i])*k}}return amp*Math.exp(-best*best/(2*r.s*r.s))}
function elev(E,N){const q=[E,N],d=distPoly(q,COAST),f=sst(0,9,d);if(f<=0)return 0;let h=1.5*sst(4,24,d)+ridge(q,R1)+ridge(q,R2);h+=.55*Math.sin(E*.31+N*.17)*Math.cos(N*.23-E*.13)+.3*Math.sin(E*.83+N*1.21);return Math.max(0,h*f)*1.45}
function inPoly(q,P){let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const a=P[i],b=P[j];if((a[1]>q[1])!==(b[1]>q[1])&&q[0]<(b[0]-a[0])*(q[1]-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
// dot lattice on the isometric axes, so it reads like the Dot core grid
const DOTS=[[],[],[],[],[]];
(()=>{const A=2.15,s=A*.7071;for(let i=-135;i<=135;i++)for(let j=-135;j<=135;j++){const E=s*(i-j),N=-s*(i+j);if(E<-3||E>150||N<0||N>185)continue;if(!inPoly([E,N],LEB))continue;const h=elev(E,N);const l=h<1.4?0:h<4.3?1:h<8?2:h<11.6?3:4;DOTS[l].push([E,N,h])}})();
// bounds in world-screen units
const BND=(()=>{let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;LEB.forEach(([E,N])=>{x0=Math.min(x0,IX*E);x1=Math.max(x1,IX*E);y0=Math.min(y0,-IY*N);y1=Math.max(y1,-IY*N)});return{x0,x1,y0:y0-8,y1:y1+3}})();

/* places, roads and routes */
const LL={W1:[33.888,35.548],W2:[33.553,35.395],W3:[34.437,35.845],PORT:[33.903,35.518],AIR:[33.821,35.488]};
const WP={};for(const k in LL)WP[k]=G(LL[k]);
const WH=['W1','W2','W3'];
const CODE={W1:'WH-01',W2:'WH-02',W3:'WH-03'},CAP={W1:15000,W2:12000,W3:11000};
const SOUTH=[LL.W1,[33.880,35.515],[33.845,35.497],[33.80,35.478],[33.77,35.465],[33.70,35.45],[33.65,35.42],[33.60,35.40],LL.W2];
const NORTH=[LL.W1,[33.915,35.565],[33.94,35.59],[33.98,35.627],[34.03,35.637],[34.12,35.652],[34.255,35.668],[34.33,35.73],[34.39,35.79],LL.W3];
function roadLL(a,b){
  if(a==='PORT')return[LL.PORT,[33.897,35.53],...(b==='W1'?[LL.W1]:roadLL('W1',b))];
  if(a==='AIR'){if(b==='W2')return[LL.AIR,...SOUTH.slice(3)];return[LL.AIR,[33.845,35.497],[33.880,35.515],...(b==='W1'?[LL.W1]:roadLL('W1',b).slice(0))]}
  if(a==='W1')return b==='W2'?SOUTH:NORTH;
  if(b==='W1')return[...roadLL('W1',a)].reverse();
  if(a==='W2')return[...SOUTH].reverse().concat(NORTH.slice(1));
  return[...NORTH].reverse().concat(SOUTH.slice(1));
}
const ROADS_LL=[
  [[33.10,35.12],[33.20,35.18],[33.27,35.215],[33.38,35.265],[33.47,35.32],LL.W2],
  SOUTH,NORTH,[LL.W3,[34.50,35.88],[34.56,35.93],[34.63,35.985]],
  [LL.W1,[33.86,35.56],[33.83,35.61],[33.80,35.68],[33.81,35.77],[33.82,35.86],[33.76,35.97],[33.70,36.075]],
  [[33.82,35.86],[33.85,35.90],[33.93,36.05],[34.00,36.21],[34.20,36.33],[34.39,36.39],[34.45,36.48]],
  [LL.AIR,[33.845,35.497]],[LL.PORT,[33.897,35.53],LL.W1]
];
const ROADS=ROADS_LL.map(r=>r.map(p=>{const[E,N]=G(p);return[E,N,elev(E,N)+.08]}));
function smooth(pts,n=10){const o=[];for(let i=0;i<pts.length-1;i++){const p0=pts[i-1]||pts[i],p1=pts[i],p2=pts[i+1],p3=pts[i+2]||p2;for(let k=0;k<n;k++){const s=k/n,s2=s*s,s3=s2*s;o.push(p1.map((_,d)=>.5*((2*p1[d])+(-p0[d]+p2[d])*s+(2*p0[d]-5*p1[d]+4*p2[d]-p3[d])*s2+(-p0[d]+3*p1[d]-3*p2[d]+p3[d])*s3)))}}o.push(pts[pts.length-1]);return o}
const SEALANE=smooth([[32.35,33.35],[32.75,34.05],[33.25,34.75],[33.62,35.2],[33.84,35.42],[33.903,35.512]].map(G));
const AIRLANE=smooth([[35.1,37.45,30],[34.6,36.85,22],[34.18,36.2,14],[33.97,35.8,7],[33.86,35.56,2],[33.821,35.488,0]].map(([la,lo,a])=>[...G([la,lo]),a]),12);
function prep(pts,useZ){const cum=[0];for(let i=1;i<pts.length;i++)cum.push(cum[i-1]+Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]));const o={pts,cum,len:cum[cum.length-1]};if(!useZ)o.pts=pts.map(p=>[p[0],p[1],elev(p[0],p[1])+.08]);return o}
function along(P,f){f=Math.max(0,Math.min(1,f));const d=f*P.len;let i=0;while(i<P.cum.length-2&&P.cum[i+1]<d)i++;const a=P.pts[i],b=P.pts[i+1],seg=(P.cum[i+1]-P.cum[i])||1,s=(d-P.cum[i])/seg;return{E:a[0]+(b[0]-a[0])*s,N:a[1]+(b[1]-a[1])*s,z:(a[2]||0)+((b[2]||0)-(a[2]||0))*s,hd:Math.atan2(b[1]-a[1],b[0]-a[0])}}
const CITIES=[['tyre',[33.272,35.24]],['byblos',[34.121,35.69]],['zahle',[33.85,35.93]],['baalbek',[34.006,36.24]],['hermel',[34.39,36.43]]];

/* ================= catalogue & demo stock ================= */
const CAT=[['LED Strip 5m','شريط LED\u200F 5م'],['Security Camera','كاميرا مراقبة'],['USB-C Cable 1m','كابل USB-C\u200F 1م'],['Desk Fan','مروحة مكتبية'],['Power Bank 10k','شاحن متنقل 10k'],['Wireless Earbuds','سماعات لاسلكية'],['Phone Case','غطاء هاتف'],['Smart Plug','قابس ذكي'],['Kitchen Scale','ميزان مطبخ'],['Water Bottle 1L','قارورة ماء 1ل'],['Bluetooth Speaker','مكبر صوت بلوتوث'],['Wall Clock','ساعة حائط'],['Yoga Mat','حصيرة يوغا'],['Car Charger','شاحن سيارة'],['Desk Lamp','مصباح مكتب'],['Backpack','حقيبة ظهر'],['Storage Box','صندوق تخزين'],['Hair Dryer','مجفف شعر'],['Extension Cord','وصلة كهرباء'],['Mini Projector','جهاز عرض صغير']].map((n,i)=>({id:'i'+i,sku:'SKU-'+(10240+i*137),en:n[0],ar:n[1]}));
const itm=id=>CAT.find(c=>c.id===id);
const LOW=100;
let seed=11;const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
const mkStock=()=>{const s={};WH.forEach(w=>{s[w]={};CAT.forEach(c=>{s[w][c.id]=rnd()<.18?Math.floor(rnd()*85)+5:Math.floor(rnd()*650)+130})});return s};
const nf=n=>Math.round(n).toLocaleString('en');
const MIN=60e3,HR=3600e3,DMS=24*HR;
function fmt(ms){ms=Math.max(0,ms);const u=t('du'),d=Math.floor(ms/DMS),h=Math.floor(ms%DMS/HR),m=Math.floor(ms%HR/MIN);if(d)return`${d}${u[0]} ${h}${u[1]}`;if(h)return`${h}${u[1]} ${m}${u[2]}`;return`${Math.max(1,m)}${u[2]}`}
const clock=ms=>{const d=new Date(ms);return String(d.getUTCHours()).padStart(2,'0')+':'+String(d.getUTCMinutes()).padStart(2,'0')};
const roadDur=P=>(P.len/45+.3)*HR;

/* ================= world (simulation) ================= */
class World{
  constructor(o){this.sim=Date.UTC(2026,10,3,9,40);this.speed=o.speed;this.stock=o.stock;this.decor=!!o.decor;this.list=[];this.nid=1;this.ref=24030;this.next=this.sim+6*MIN;this.events=[]}
  add(kind,from,to,items,ago,meta={}){
    let P,dur;
    if(kind==='road'){P=prep(roadLL(from,to).map(G));dur=roadDur(P)}
    else if(kind==='sea'){P=prep(SEALANE);dur=16*HR}
    else{P=prep(AIRLANE,true);dur=22*MIN}
    const s={id:this.nid++,code:(kind==='road'?'TRF-':'SHP-')+(this.ref++),kind,from,to,items,dep:this.sim-ago,dur,P,...meta};
    this.list.push(s);return s;
  }
  qty(s){return s.items.reduce((a,x)=>a+x.q,0)}
  tick(dt){
    if(!this.speed)return;
    this.sim+=dt*this.speed;
    for(const s of[...this.list]){if(this.sim-s.dep>=s.dur)this.arrive(s)}
    if(!this.decor&&this.sim>=this.next){this.spawn();this.next=this.sim+(5+rnd()*10)*MIN}
  }
  arrive(s){
    this.list=this.list.filter(x=>x!==s);
    if(this.decor){
      if(s.kind==='road')this.add('road',s.to,s.from,s.items,0);
      else if(s.kind==='sea')this.add('sea','CN','PORT',s.items,0);
      else this.add('air','CN','AIR',s.items,-25*MIN);
      return;
    }
    if(s.kind==='road'){s.items.forEach(x=>this.stock[s.to][x.id]+=x.q);this.events.push({type:'in',w:s.to,s})}
    else if(s.kind==='sea'){this.events.push({type:'ship',s});this.add('road','PORT','W2',s.items,0,{by:'Rana',via:'invoice',carrier:'LB-5'+(100+this.nid)});this.add('sea','CN','PORT',[{id:'i0',q:400},{id:'i16',q:200},{id:'i9',q:300}],0,{by:'Rana',via:'invoice'})}
    else{this.add('road','AIR',rnd()<.5?'W1':'W3',s.items,0,{by:'Rana',via:'Telegram'});this.add('air','CN','AIR',[{id:'i19',q:40},{id:'i10',q:120}],-28*MIN,{by:'Rana',via:'Telegram'})}
  }
  spawn(){
    if(this.list.filter(s=>s.kind==='road').length>=5)return;
    const from=WH[Math.floor(rnd()*3)];let to=WH[Math.floor(rnd()*3)];if(to===from)to=WH[(WH.indexOf(from)+1)%3];
    const pool=CAT.filter(c=>this.stock[from][c.id]>160);if(!pool.length)return;
    const n=1+Math.floor(rnd()*3),items=[];
    for(let i=0;i<n;i++){const c=pool[Math.floor(rnd()*pool.length)];if(items.find(x=>x.id===c.id))continue;const q=Math.max(10,Math.round(this.stock[from][c.id]*(.05+rnd()*.1)/10)*10);this.stock[from][c.id]-=q;items.push({id:c.id,q})}
    const ns=this.add('road',from,to,items,0,{by:['Hadi','Omar','Maya'][Math.floor(rnd()*3)],via:rnd()<.6?'Telegram':'App'});
    this.events.push({type:'out',w:from,s:ns});
  }
  state(s){const f=(this.sim-s.dep)/s.dur;return f<0||f>=1?null:f}
}

/* ================= palettes ================= */
const NIGHT={key:'n',night:true,T:1.7,grat:'rgba(121,192,222,.075)',gratTxt:'rgba(121,192,222,.42)',cont:'47,134,184',slabTop:'#102C4A',slabSide:'#07162A',slabEdge:'rgba(121,192,222,.55)',
 dots:['#24506F','#2C77A6','#4C9CCB','#79C0DE','#D5E3EC'],roadCase:'rgba(5,15,30,.9)',road:'rgba(201,216,228,.62)',lane:'#0895A6',air:'rgba(121,192,222,.6)',trail:'46,242,238',city:'rgba(201,216,228,.62)',
 trailer:['#FFFFFF','#E3ECF2','#A9BFD1'],cab:['#79C0DE','#2F86B8','#1F5E8C'],hull:['#3B6A8C','#1B416B','#112C4B'],deck:'#C9D8E4',plane:'#FFFFFF',planeEdge:'#79C0DE',shadow:'rgba(2,8,18,.5)',ring:'201,216,228',sel:'121,192,222'};
const DAY={key:'d',night:false,T:1.7,sea:'#DCEBF0',grat:'rgba(14,36,64,.06)',gratTxt:'rgba(44,89,116,.6)',cont:'47,134,184',slabTop:'#F8FBFC',slabSide:'#B9CDDB',slabEdge:'#FFFFFF',
 dots:['#E1EAF0','#C9D8E4','#A3C3D7','#79A9C6','#4F86AC'],roadCase:'#FFFFFF',road:'rgba(14,36,64,.72)',lane:'#0895A6',air:'rgba(92,117,145,.85)',trail:'8,149,166',city:'rgba(44,89,116,.85)',
 trailer:['#FFFFFF','#F4F8FA','#CBD8E3'],cab:['#1B416B','#0E2440','#16355A'],hull:['#4C6684','#2C5974','#1B416B'],deck:'#C9D8E4',plane:'#0E2440',planeEdge:'#FFFFFF',shadow:'rgba(14,36,64,.2)',ring:'8,149,166',sel:'8,149,166'};

/* ================= warehouse sprites (iso scene, pre-rendered) ================= */
const SC={R_HI:5,R_LO:1.6,ox:106,oy:26,w:198,h:140,ax:-7.8,ay:54.5};
const SPRITES={};
function markImage(){const cs=$$('#mark circle').map(c=>c.outerHTML).join('');const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><defs><filter id="mkGlow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5"/></filter></defs><style>.t{fill:#2EF2EE;stroke:#2EF2EE;stroke-width:.9}.l{fill:#79C0DE;stroke:#79C0DE;stroke-width:.9}.r{fill:#2F86B8;stroke:#2F86B8;stroke-width:.9}.c{fill:#FFFFFF}</style>${cs}</svg>`;return new Promise(res=>{const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)})}
function sceneCanvas(p,code,R,mark){
  const cv=document.createElement('canvas');cv.width=Math.ceil(SC.w*R);cv.height=Math.ceil(SC.h*R);
  const c=cv.getContext('2d');c.scale(R,R);c.translate(SC.ox,SC.oy);
  const P=(x,y,z=0)=>[(x-y)*.866,(x+y)*.5-z];
  const pathA=a=>{c.beginPath();a.forEach((q,i)=>{const s=P(...q);i?c.lineTo(s[0],s[1]):c.moveTo(s[0],s[1])});c.closePath()};
  const poly=(a,f,s)=>{pathA(a);c.fillStyle=f;c.fill();if(s){c.strokeStyle=s;c.lineWidth=.6;c.lineJoin='round';c.stroke()}};
  const line=(a,b,col,w=.6,dash)=>{const s=P(...a),e=P(...b);c.beginPath();c.moveTo(s[0],s[1]);c.lineTo(e[0],e[1]);c.strokeStyle=col;c.lineWidth=w;c.lineCap='round';c.setLineDash(dash||[]);c.stroke();c.setLineDash([])};
  const box=(x,y,z,w,d,h,col)=>{const x1=x+w,y1=y+d,z1=z+h;poly([[x,y,z1],[x1,y,z1],[x1,y1,z1],[x,y1,z1]],col[0]);poly([[x,y1,z],[x1,y1,z],[x1,y1,z1],[x,y1,z1]],col[1]);poly([[x1,y,z],[x1,y1,z],[x1,y1,z1],[x1,y,z1]],col[2])};
  const circ=(x,y,z,r,f)=>{const s=P(x,y,z);c.beginPath();c.arc(s[0],s[1],r,0,7);c.fillStyle=f;c.fill()};
  const pool=(x,y,r,col)=>{const s=P(x,y,0);const g=c.createRadialGradient(s[0],s[1],0,s[0],s[1],r);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');c.save();c.translate(s[0],s[1]);c.scale(1,.58);c.beginPath();c.arc(0,0,r,0,7);c.restore();c.fillStyle=g;c.fill()};
  const KR=['#E6CB9E','#CDA672','#B58E5A'];
  const carton=(x,y,z)=>{box(x,y,z,9,9,7,KR);poly([[x+2.5,y+9,z+2.5],[x+6.5,y+9,z+2.5],[x+6.5,y+9,z+5],[x+2.5,y+9,z+5]],'#0895A6');line([x+4.5,y,z+7],[x+4.5,y+9,z+7],'#B58E5A',.8)};
  const pallet=(x,y,n)=>{box(x,y,0,10,10,1.6,['#C9A77A','#A9875C','#9A7A52']);for(let i=0;i<n;i++)carton(x+.5,y+.5,1.6+i*7)};
  const tree=(x,y)=>{const b=P(x,y,0),k=P(x,y,14);c.beginPath();c.ellipse(b[0],b[1],5,2.4,0,0,7);c.fillStyle='rgba(6,18,34,.18)';c.fill();line([x,y,0],[x,y,8],p.night?'#3D6A86':'#2C5974',1.6);c.beginPath();c.arc(k[0],k[1],6.5,0,7);c.fillStyle=p.night?'#22706C':'#4FAE95';c.fill();c.beginPath();c.arc(k[0]-1.8,k[1]-2,3.4,0,7);c.fillStyle=p.night?'#3A9890':'#86D3B9';c.fill()};
  const lamp=(x,y)=>{if(p.night)pool(x,y+2,16,'rgba(213,236,245,.28)');line([x,y,0],[x,y,18],p.night?'#5D86A3':'#2C5974',1);circ(x,y,18,1.8,p.night?'#F2FBFF':'#BCE5E0')};
  const ftext=(x,y,z,str,size,fill,acc,dir)=>{const s=P(x,y,z);c.save();c.translate(s[0],s[1]);if(dir==='y')c.transform(.866,-.5,0,1,0,0);else c.transform(.866,.5,0,1,0,0);c.font=`600 ${size}px "Readex Pro", system-ui, sans-serif`;c.fillStyle=fill;c.fillText(str,0,0);if(acc){const w=c.measureText(str).width;c.fillStyle=acc;c.fillText('o',w,0)}c.restore()};
  const N=p.night;
  const col=N?{ground:'#1A3E63',edge:'#2C5974',apron:'#21507B',curb:'#2A5A84',road:'#0B1B30',roadLine:'rgba(201,216,228,.55)',side1:'#0C2340',side2:'#091B33',roof:'#3F8ABB',front:'#2C78AA',side:'#1F5E8C',top:'#63A9D4',rl:'#86C3E2',door:'#2C5974',doorL:'#3E6E8E',open:'#E8F6FB',sign:'#0E2440',win:'#E3F4FA',truckT:['#F4F8FA','#FFFFFF','#C9D8E4'],cab:['#5FA9D0','#2F86B8','#1F5E8C'],glass:'#E8F6FB'}
               :{ground:'#EAF2F4',edge:'#C9D8E4',apron:'#DCE6EE',curb:'#D3DEE7',road:'#4C6684',roadLine:'#FFFFFF',side1:'#B9CDDB',side2:'#A7BFD0',roof:'#5FA9D0',front:'#2F86B8',side:'#246A9A',top:'#8CCBE6',rl:'#A9DAEE',door:'#C9D8E4',doorL:'#A2B1C0',open:'#0E2440',sign:'#0E2440',win:'#BCE5F2',truckT:['#F4F8FA','#FFFFFF','#DCE6EE'],cab:['#1B416B','#0E2440','#16355A'],glass:'#BCE5E0'};
  // tile slab
  poly([[0,118,0],[100,118,0],[100,118,-3.5],[0,118,-3.5]],col.side1);
  poly([[100,0,0],[100,118,0],[100,118,-3.5],[100,0,-3.5]],col.side2);
  poly([[0,0,0],[100,0,0],[100,96,0],[0,96,0]],col.ground,col.edge);
  poly([[22,58,0],[68,58,0],[68,96,0],[22,96,0]],col.apron);
  poly([[0,96,0],[100,96,0],[100,100,0],[0,100,0]],col.curb);
  poly([[0,100,0],[100,100,0],[100,118,0],[0,118,0]],col.road);
  line([0,109,0],[100,109,0],col.roadLine,.9,[4,4]);
  tree(6,6);tree(96,5);tree(5,32);
  const bx0=18,bx1=78,by0=14,by1=58,wz=24,rz=34,ry=36;
  poly([[bx0,ry,rz],[bx1,ry,rz],[bx1,by0,wz],[bx0,by0,wz]],col.roof);
  poly([[bx0,by1,0],[bx1,by1,0],[bx1,by1,wz],[bx0,by1,wz]],col.front);
  poly([[bx1,by0,0],[bx1,by1,0],[bx1,by1,wz],[bx1,ry,rz],[bx1,by0,wz]],col.side);
  poly([[bx0,by1,wz],[bx1,by1,wz],[bx1,ry,rz],[bx0,ry,rz]],col.top);
  for(let x=bx0+5;x<bx1;x+=5)line([x,by1,wz],[x,ry,rz],col.rl,.6);
  line([bx0,ry,rz],[bx1,ry,rz],'#FFFFFF',.8);
  // side windows
  [[18,28],[42,54]].forEach(([a,b])=>{for(let y=a;y<b;y+=4.2)poly([[bx1,y,8],[bx1,y+2.6,8],[bx1,y+2.6,11],[bx1,y,11]],col.win)});
  [[24,34,false],[40,50,true],[56,66,false]].forEach(([a,b,open])=>{
    poly([[a,by1,0],[b,by1,0],[b,by1,13],[a,by1,13]],open?col.open:col.door);
    if(open){if(N)poly([[a,by1,0],[b,by1,0],[b+4,by1+16,0],[a-4,by1+16,0]],'rgba(232,246,251,.16)');carton(a+1,by1-10,0)}
    else[3,6,9,12].forEach(z=>line([a,by1,z],[b,by1,z],col.doorL,.5));
  });
  poly([[26,by1,15.5],[72,by1,15.5],[72,by1,22],[26,by1,22]],col.sign);
  ftext(33,by1,16.8,'stack',6.4,'#FFFFFF','#2EF2EE');
  ftext(bx1,52,4.2,code,4.8,'rgba(255,255,255,.88)',null,'y');
  if(mark){const g=P(bx1,ry,17);c.fillStyle='#0E2440';c.beginPath();c.roundRect?c.roundRect(g[0]-8,g[1]-8,16,16,4):c.rect(g[0]-8,g[1]-8,16,16);c.fill();c.drawImage(mark,g[0]-7,g[1]-7,14,14)}
  pallet(84,16,2);pallet(84,30,1);pallet(84,44,2);
  box(60,63,0,8,5,4.5,['#3BB3C2','#0895A6','#067C8A']);box(63,63,4.5,4,5,3,['#BCE5E0','#0E2440','#16355A']);
  line([59.5,63,0],[59.5,63,11],N?'#C9D8E4':'#0E2440',1.3);line([59.5,68,0],[59.5,68,11],N?'#C9D8E4':'#0E2440',1.3);carton(50.5,63,1.2);
  tree(8,86);tree(92,88);lamp(14,98);lamp(76,98);
  box(22,102,1.8,34,8,13,col.truckT);
  poly([[24,110,3.5],[54,110,3.5],[54,110,5],[24,110,5]],'#0895A6');
  ftext(26,110,7.4,'stack',6.2,'#0E2440','#0895A6');
  box(56,102,1.8,10,8,11,col.cab);poly([[66,103,7],[66,109,7],[66,109,11],[66,103,11]],col.glass);
  [[28,110],[50,110],[61,110]].forEach(([x,y])=>{const w=P(x,y,1.8);c.beginPath();c.arc(w[0],w[1],2.6,0,7);c.fillStyle='#0E2440';c.fill()});
  return cv;
}
async function buildSprites(){
  const mark=await markImage();
  for(const p of[NIGHT,DAY]){SPRITES[p.key]={};for(const w of WH){SPRITES[p.key][w]={hi:sceneCanvas(p,CODE[w],SC.R_HI,mark),lo:sceneCanvas(p,CODE[w],SC.R_LO,mark)}}}
}

/* ================= view (renderer) ================= */
const TAU=Math.PI*2;
class View{
  constructor(o){
    Object.assign(this,o);this.c=this.cv.getContext('2d');
    this.cam={x:0,y:0,z:4,ax:.5,ay:.5};this.tg={...this.cam};this.first=true;this.vis=false;
    this.hoverW=null;this.hoverV=null;this.sel=o.sel||null;this.route=null;this.routeF=0;this.rings=[];this.extra=null;this.pulse=null;
    this.els={};this.buildOv();
    new ResizeObserver(()=>{this.resize();this.onResize&&this.onResize()}).observe(this.cv);
    new IntersectionObserver(e=>{this.vis=e[0].isIntersecting},{rootMargin:'120px'}).observe(this.cv);
    this.resize();
    if(this.interactive)this.bindPointer();
  }
  resize(){const r=this.cv.getBoundingClientRect();this.dpr=Math.min(2,window.devicePixelRatio||1);this.w=Math.max(1,r.width);this.h=Math.max(1,r.height);this.cv.width=Math.round(this.w*this.dpr);this.cv.height=Math.round(this.h*this.dpr)}
  S(E,N,z=0){const c=this.cam;return[(IX*E-c.x)*c.z+this.w*c.ax,(-IY*N-z-c.y)*c.z+this.h*c.ay]}
  focus(E,N,z,Z,ax,ay){return{x:IX*E,y:-IY*N-z,z:Z,ax,ay}}
  fit(region,pad=.92){const bw=BND.x1-BND.x0,bh=BND.y1-BND.y0,Z=Math.min(region.w/bw,region.h/bh)*pad;return{x:(BND.x0+BND.x1)/2,y:(BND.y0+BND.y1)/2,z:Z,ax:(region.x+region.w/2)/this.w,ay:(region.y+region.h/2)/this.h}}
  set(t,jump){Object.assign(this.tg,t);if(jump||this.first||RM){Object.assign(this.cam,this.tg);this.first=false}}
  ease(dt){const k=1-Math.exp(-dt*3.4/1000);const c=this.cam,g=this.tg;c.x+=(g.x-c.x)*k;c.y+=(g.y-c.y)*k;c.ax+=(g.ax-c.ax)*k;c.ay+=(g.ay-c.ay)*k;c.z=Math.exp(Math.log(c.z)+(Math.log(g.z)-Math.log(c.z))*k)}
  wk(){return .07*Math.max(1,Math.min(7.5/this.cam.z,3))}
  vs(){return Math.max(1.35,9/this.cam.z)}
  buildOv(){
    const ov=this.ov;ov.innerHTML='';
    WH.forEach(w=>{const b=document.createElement('button');b.type='button';b.className='chip';b.dataset.w=w;b.innerHTML=`<span class="nm"><span class="cd"></span><span class="city"></span></span><span class="u"></span><span class="dot" hidden></span>`;
      b.addEventListener('click',e=>{e.stopPropagation();this.pick&&this.pick(w)});
      b.addEventListener('mouseenter',()=>{if(this.lensOn){this.hoverW=w;this.showLens(w)}});
      b.addEventListener('mouseleave',()=>{if(this.lensOn&&!this.pinned){this.hoverW=null;this.showLens(null)}});
      ov.appendChild(b);this.els['c'+w]=b});
    if(this.pois){[['PORT'],['AIR']].forEach(([k])=>{const d=document.createElement('div');d.className='poi';d.innerHTML=`<i></i><span></span>`;ov.appendChild(d);this.els['p'+k]=d})}
    if(this.lensOn){const l=document.createElement('div');l.className='lens';l.hidden=true;ov.appendChild(l);this.els.lens=l}
    this.tagPool={};
  }
  labels(){
    WH.forEach(w=>{const b=this.els['c'+w];b.querySelector('.cd').textContent=CODE[w];b.querySelector('.city').textContent=' · '+t(w)});
    ['PORT','AIR'].forEach(k=>{const d=this.els['p'+k];if(d)d.querySelector('span').textContent=t(k)});
  }
  tag(id){let e=this.tagPool[id];if(!e){e=document.createElement('div');e.className='vtag';e.innerHTML='<b></b><span class="more"></span>';this.ov.appendChild(e);this.tagPool[id]=e}e._seen=true;return e}
  place(el,x,y,ox='-50%',oy='-100%'){if(x<-200||y<-120||x>this.w+200||y>this.h+160){el.style.visibility='hidden';return}el.style.visibility='';el.style.transform=`translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(${ox},${oy})`}
  bindPointer(){
    const cv=this.cv;
    const hit=e=>{const r=cv.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;let best=null,bd=1e9;
      (this.lastVeh||[]).forEach(v=>{const d=Math.hypot(v.sx-x,v.sy-y);if(d<22&&d<bd){bd=d;best={v:v.s}}});
      if(best)return best;
      WH.forEach(w=>{const[E,N]=WP[w],z=elev(E,N),m=this.wk()*this.cam.z;const s=this.S(E,N,z);const cx=s[0]+10*m,cy=s[1]-14*m;const d=Math.hypot(cx-x,(cy-y)*1.3);if(d<62*m&&d<bd){bd=d;best={w}}});
      return best};
    cv.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const h=hit(e);cv.style.cursor=h?'pointer':'';const nv=h&&h.v?h.v.id:null;if(nv!==this.hoverV){this.hoverV=nv}
      const nw=h&&h.w?h.w:null;if(this.lensOn&&!this.pinned&&nw!==this.hoverW){this.hoverW=nw;this.showLens(nw)}else if(!this.lensOn)this.hoverW=nw});
    cv.addEventListener('pointerleave',()=>{this.hoverV=null;if(this.lensOn&&!this.pinned){this.hoverW=null;this.showLens(null)}else if(!this.lensOn)this.hoverW=null});
    cv.addEventListener('click',e=>{const h=hit(e);if(h&&h.w){this.pick&&this.pick(h.w)}else if(h&&h.v){this.hoverV=this.hoverV===h.v.id&&e.pointerType==='touch'?null:h.v.id}else if(this.lensOn){this.pinned=false;this.hoverW=null;this.showLens(null)}});
  }
  showLens(w){const l=this.els.lens;if(!l)return;if(!w){l.hidden=true;this.lensW=null;WH.forEach(k=>this.els['c'+k].classList.remove('sel'));return}
    this.lensW=w;l.hidden=false;WH.forEach(k=>this.els['c'+k].classList.toggle('sel',k===w));this.fillLens()}
  fillLens(){const w=this.lensW,l=this.els.lens;if(!w||!l)return;const st=this.world.stock[w],u=Object.values(st).reduce((a,b)=>a+b,0),pct=Math.min(100,Math.round(u/CAP[w]*100));
    const lows=CAT.filter(c=>st[c.id]<LOW).sort((a,b)=>st[a.id]-st[b.id]);const inb=this.world.list.filter(s=>s.to===w).length,out=this.world.list.filter(s=>s.from===w).length;
    l.innerHTML=`<div class="lz-code">${CODE[w]}</div><h4>${t(w)}</h4><div class="muted" style="color:var(--visor);font-size:11.5px">${nf(u)} / ${nf(CAP[w])} · ${pct}% ${t('cap')}</div><div class="bar"><i style="width:${pct}%"></i></div>
      <dl><div><dt>${t('lzUnits')}</dt><dd>${nf(u)}</dd></div><div><dt>${t('lzLow')}</dt><dd>${lows.length}</dd></div><div><dt>${t('lzIn')}</dt><dd>${inb}</dd></div><div><dt>${t('lzOut')}</dt><dd>${out}</dd></div></dl>
      ${lows.length?`<p class="lz-low">${t('lzLowest')} <b>${lows.slice(0,2).map(c=>`${c[lang]} (${st[c.id]})`).join(', ')}</b></p>`:''}`}

  /* ---------- drawing ---------- */
  draw(now){
    const c=this.c,p=this.pal,Z=this.cam.z;
    c.setTransform(this.dpr,0,0,this.dpr,0,0);c.clearRect(0,0,this.w,this.h);
    if(p.sea){c.fillStyle=p.sea;c.fillRect(0,0,this.w,this.h)}
    const T=p.T;
    // graticule
    c.lineWidth=1;c.strokeStyle=p.grat;c.font='500 10px "Readex Pro", system-ui, sans-serif';c.fillStyle=p.gratTxt;
    for(let la=32.5;la<=35.01;la+=.5){const a=this.S(...G([la,33.0]),-T),b=this.S(...G([la,37.2]),-T);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke();if(this.w>560){const q=this.S(...G([la,34.15]),-T);c.fillText(la.toFixed(1)+'°N',q[0]+4,q[1]-4)}}
    for(let lo=33.5;lo<=37.01;lo+=.5){const a=this.S(...G([32.0,lo]),-T),b=this.S(...G([35.4,lo]),-T);c.beginPath();c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()}
    // coast contours
    [[2.6,.32],[6,.2],[11,.11],[18,.06]].forEach(([dx,al])=>{c.beginPath();COAST.forEach(([E,N],i)=>{const s=this.S(E-dx,N-dx*.15,-T);i?c.lineTo(s[0],s[1]):c.moveTo(s[0],s[1])});c.strokeStyle=`rgba(${p.cont},${al})`;c.lineWidth=1;c.stroke()});
    // sea name
    if(this.w>=600){c.save();c.font=`500 ${Math.max(9,Math.min(13,2.6*Z))}px "Readex Pro", system-ui, sans-serif`;c.fillStyle=p.gratTxt;if(lang==='en'&&c.letterSpacing!==undefined)c.letterSpacing='3px';const ms=this.S(...G([33.55,34.7]),-T);c.textAlign='center';c.fillText(t('cities').sea,ms[0],ms[1]);c.restore()}
    // sea lane + air lane
    const off=RM?0:(now/90)%24;
    c.setLineDash([7,8]);c.lineDashOffset=-off;c.strokeStyle=p.lane;c.lineWidth=2;c.globalAlpha=.85;this.poly(SEALANE.map(q=>[q[0],q[1],-T+.2]));c.stroke();
    c.setLineDash([1.5,7]);c.lineCap='round';c.strokeStyle=p.air;c.lineWidth=2.2;this.poly(AIRLANE);c.stroke();c.setLineDash([]);c.lineCap='butt';c.globalAlpha=1;
    // slab
    const bot=LEB.map(q=>this.S(q[0],q[1],-T)),top=LEB.map(q=>this.S(q[0],q[1],0));
    if(p.night){const cx=this.S(70,95,0),R=Math.max(this.w,this.h)*.0+150*Z;const g=c.createRadialGradient(cx[0],cx[1],0,cx[0],cx[1],R);g.addColorStop(0,'rgba(47,134,184,.26)');g.addColorStop(.55,'rgba(47,134,184,.08)');g.addColorStop(1,'rgba(47,134,184,0)');c.fillStyle=g;c.fillRect(0,0,this.w,this.h)}
    c.fillStyle=p.slabSide;this.pathXY(bot);c.fill();
    for(let i=0;i<top.length;i++){const j=(i+1)%top.length;c.beginPath();c.moveTo(top[i][0],top[i][1]);c.lineTo(top[j][0],top[j][1]);c.lineTo(bot[j][0],bot[j][1]);c.lineTo(bot[i][0],bot[i][1]);c.closePath();c.fill()}
    c.fillStyle=p.slabTop;this.pathXY(top);c.fill();c.strokeStyle=p.slabEdge;c.lineWidth=1;c.stroke();
    // dots
    const r0=Math.min(2.7,Math.max(.85,.32*Z));
    for(let l=0;l<5;l++){const r=r0*(.82+l*.1);c.beginPath();for(const[E,N,h]of DOTS[l]){const s=this.S(E,N,h);if(s[0]<-6||s[1]<-6||s[0]>this.w+6||s[1]>this.h+6)continue;c.moveTo(s[0]+r,s[1]);c.arc(s[0],s[1],r,0,TAU)}c.fillStyle=p.dots[l];c.fill()}
    // roads
    const rw=Math.min(2.6,Math.max(1.1,.24*Z));
    c.lineJoin='round';c.lineCap='round';
    c.strokeStyle=p.roadCase;c.lineWidth=rw+2.4;ROADS.forEach(r=>{this.poly(r);c.stroke()});
    c.strokeStyle=p.road;c.lineWidth=rw;ROADS.forEach(r=>{this.poly(r);c.stroke()});
    // city labels
    if(Z<16){c.font=`500 ${Math.max(9.5,Math.min(12,2.2*Z))}px "Readex Pro", system-ui, sans-serif`;c.fillStyle=p.city;c.textAlign='center';CITIES.forEach(([k,ll])=>{const[E,N]=G(ll);const s=this.S(E,N,elev(E,N)+1.2);c.fillText(t('cities')[k],s[0],s[1])});c.textAlign='start'}
    // story route highlight
    if(this.route){const R=this.route;c.setLineDash([3,6]);c.lineDashOffset=-off;c.strokeStyle=`rgba(${p.trail},.55)`;c.lineWidth=2;this.poly(R.pts);c.stroke();c.setLineDash([]);
      if(this.routeF>0){const pts=[];for(let i=0;i<=60;i++){const a=along(R,this.routeF*i/60);pts.push([a.E,a.N,a.z])}c.strokeStyle=`rgba(${p.trail},.28)`;c.lineWidth=9;this.poly(pts);c.stroke();c.strokeStyle=`rgb(${p.trail})`;c.lineWidth=3;this.poly(pts);c.stroke()}}
    // rings
    this.rings=this.rings.filter(r=>now-r.t<1600);
    this.rings.forEach(r=>{const k=(now-r.t)/1600,[E,N]=WP[r.w],s=this.S(E,N,elev(E,N)),rad=(2+k*9)*Z;c.beginPath();c.ellipse(s[0],s[1],rad*IX,rad*IY,0,0,TAU);c.strokeStyle=`rgba(${p.ring},${(1-k)*.9})`;c.lineWidth=2;c.stroke()});
    if(this.pulse&&!RM){const k=((now/1700)%1),[E,N]=WP[this.pulse],s=this.S(E,N,elev(E,N));for(const kk of[k,(k+.5)%1]){const rad=(1.5+kk*8)*Z;c.beginPath();c.ellipse(s[0],s[1],rad*IX,rad*IY,0,0,TAU);c.strokeStyle=`rgba(${p.trail},${(1-kk)*.8})`;c.lineWidth=2;c.stroke()}}
    // objects
    const objs=[];
    WH.forEach(w=>{const[E,N]=WP[w];objs.push({N,draw:()=>this.drawWh(w,E,N)})});
    const vehs=[];
    this.world.list.forEach(s=>{const f=this.world.state(s);if(f===null)return;vehs.push({s,f})});
    if(this.extra&&this.extra.on)vehs.push({s:this.extra.s,f:this.extra.f});
    this.lastVeh=[];
    vehs.forEach(({s,f})=>{const a=along(s.P,f);const o={s,f,a};objs.push({N:a.N,draw:()=>this.drawVeh(o)});if(s.kind==='air')this.drawPlaneShadow(a)});
    objs.sort((a,b)=>b.N-a.N).forEach(o=>o.draw());
    // overlay chips + tags
    this.updOv(vehs);
  }
  pathXY(pts){const c=this.c;c.beginPath();pts.forEach((s,i)=>i?c.lineTo(s[0],s[1]):c.moveTo(s[0],s[1]));c.closePath()}
  poly(pts){const c=this.c;c.beginPath();pts.forEach((q,i)=>{const s=this.S(q[0],q[1],q[2]||0);i?c.lineTo(s[0],s[1]):c.moveTo(s[0],s[1])})}
  drawWh(w,E,N){
    const c=this.c,z=elev(E,N),s=this.S(E,N,z),m=this.wk()*this.cam.z,sp=SPRITES[this.pal.key]&&SPRITES[this.pal.key][w];
    const on=this.hoverW===w||this.sel===w||this.lensW===w;
    if(on){c.beginPath();c.ellipse(s[0]+10*m,s[1]+4*m,60*m,34*m,0,0,TAU);c.fillStyle=`rgba(${this.pal.sel},.16)`;c.fill();c.strokeStyle=`rgba(${this.pal.sel},.8)`;c.lineWidth=1.5;c.stroke()}
    if(!sp)return;const px=m*this.dpr,img=px<1.6?sp.lo:sp.hi,R=img===sp.lo?SC.R_LO:SC.R_HI,k=m/R;
    c.drawImage(img,s[0]-(SC.ax+SC.ox)*m,s[1]-(SC.ay+SC.oy)*m,img.width*k,img.height*k);
  }
  rbox(E,N,z0,L,W,H,hd,col){
    const c=this.c,co=Math.cos(hd),si=Math.sin(hd);
    const cr=[[L/2,W/2],[L/2,-W/2],[-L/2,-W/2],[-L/2,W/2]].map(([a,b])=>[E+a*co-b*si,N+a*si+b*co]);
    for(let i=0;i<4;i++){const a=cr[i],b=cr[(i+1)%4];const mx=(a[0]+b[0])/2-E,my=(a[1]+b[1])/2-N;if(my>=0)continue;
      const q=[this.S(a[0],a[1],z0),this.S(b[0],b[1],z0),this.S(b[0],b[1],z0+H),this.S(a[0],a[1],z0+H)];this.pathXY(q);c.fillStyle=mx<0?col[1]:col[2];c.fill()}
    this.pathXY(cr.map(q=>this.S(q[0],q[1],z0+H)));c.fillStyle=col[0];c.fill();
  }
  drawVeh(o){
    const{s,f,a}=o,c=this.c,p=this.pal,vs=this.vs();
    // glow trail
    const tl=Math.min(f,(s.kind==='road'?6:s.kind==='sea'?14:30)/s.P.len),pts=[];for(let i=0;i<=16;i++){const b=along(s.P,f-tl+tl*i/16);pts.push(this.S(b.E,b.N,s.kind==='sea'?-p.T+.2:b.z+(s.kind==='road'?.3:0)))}
    if(pts.length>1){const g=c.createLinearGradient(pts[0][0],pts[0][1],pts[16][0],pts[16][1]);g.addColorStop(0,`rgba(${p.trail},0)`);g.addColorStop(1,`rgba(${p.trail},.95)`);c.strokeStyle=g;c.lineCap='round';c.lineWidth=s.kind==='air'?2:3;c.beginPath();pts.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.stroke()}
    const hd=a.hd,co=Math.cos(hd),si=Math.sin(hd);
    let sx,sy;
    if(s.kind==='road'){
      const z=a.z+.1,ta=[a.E-co*.35*vs,a.N-si*.35*vs],cb=[a.E+co*.95*vs,a.N+si*.95*vs];
      const parts=[[ta,1.7*vs,.78*vs,.82*vs,p.trailer],[cb,.6*vs,.74*vs,.68*vs,p.cab]].sort((x,y)=>y[0][1]-x[0][1]);
      parts.forEach(([q,L,W,H,col])=>this.rbox(q[0],q[1],z+.12*vs,L,W,H,hd,col));
      [sx,sy]=this.S(a.E,a.N,z+1.1*vs);
    }else if(s.kind==='sea'){
      const z=-p.T+.15,k=vs*1.25;
      const hull=[[2.6,0],[1.8,.7],[-2.3,.7],[-2.5,0],[-2.3,-.7],[1.8,-.7]].map(([x,y])=>[a.E+(x*co-y*si)*k,a.N+(x*si+y*co)*k]);
      // wake
      c.strokeStyle=`rgba(${p.ring},.35)`;c.lineWidth=1;[[.7],[-.7]].forEach(([y])=>{const b0=this.S(a.E+(-2.4*co-y*si)*k,a.N+(-2.4*si+y*co)*k,z),b1=this.S(a.E+(-6*co-y*2.2*si)*k,a.N+(-6*si+y*2.2*co)*k,z);c.beginPath();c.moveTo(b0[0],b0[1]);c.lineTo(b1[0],b1[1]);c.stroke()});
      const H=.55*k;
      for(let i=0;i<hull.length;i++){const q0=hull[i],q1=hull[(i+1)%hull.length],ny=-(q1[0]-q0[0]);/* outward normal y for CCW */ const mxN=((q0[1]+q1[1])/2-a.N);if(mxN>=0&&ny>=0)continue;
        if(mxN>=0)continue;this.pathXY([this.S(q0[0],q0[1],z),this.S(q1[0],q1[1],z),this.S(q1[0],q1[1],z+H),this.S(q0[0],q0[1],z+H)]);c.fillStyle=((q0[0]+q1[0])/2-a.E)<0?p.hull[1]:p.hull[2];c.fill()}
      this.pathXY(hull.map(q=>this.S(q[0],q[1],z+H)));c.fillStyle=p.hull[0];c.fill();
      const CC=[['#2F86B8','#246A9A','#1C5880'],['#0895A6','#067C8A','#056874'],['#FFFFFF','#DCE6EE','#B9CDDB'],['#79C0DE','#5FA9D0','#4C93BA']];
      const slots=[];for(let i=0;i<4;i++)for(let j=0;j<2;j++)slots.push([1.2-i*.85,(j?.3:-.3),i,j]);
      slots.sort((u,v)=>{const nu=u[0]*si+u[1]*co,nv=v[0]*si+v[1]*co;return nv-nu});
      slots.forEach(([x,y,i,j])=>{this.rbox(a.E+(x*co-y*si)*k,a.N+(x*si+y*co)*k,z+H,.78*k,.55*k,.5*k,hd,CC[(i+j*2)%4])});
      this.rbox(a.E+(-1.95*co)*k,a.N+(-1.95*si)*k,z+H,.55*k,1.1*k,.95*k,hd,['#FFFFFF','#E3ECF2','#B9CDDB']);
      [sx,sy]=this.S(a.E,a.N,z+2.2*k);
    }else{
      const k=vs*.85,z=a.z;
      const shape=[[1.6,0],[1.25,.16],[.35,.16],[-.35,1.35],[-.65,1.35],[-.25,.16],[-1.05,.14],[-1.4,.6],[-1.6,.6],[-1.45,.08],[-1.6,0],[-1.45,-.08],[-1.6,-.6],[-1.4,-.6],[-1.05,-.14],[-.25,-.16],[-.65,-1.35],[-.35,-1.35],[.35,-.16],[1.25,-.16]];
      this.pathXY(shape.map(([x,y])=>this.S(a.E+(x*co-y*si)*k,a.N+(x*si+y*co)*k,z)));c.fillStyle=p.plane;c.fill();c.strokeStyle=p.planeEdge;c.lineWidth=1;c.stroke();
      [sx,sy]=this.S(a.E,a.N,z+1.2);
    }
    this.lastVeh.push({s,sx,sy:sy+8});
  }
  drawPlaneShadow(a){const c=this.c,p=this.pal,k=this.vs()*.85,co=Math.cos(a.hd),si=Math.sin(a.hd);const ground=inPoly([a.E,a.N],LEB)?elev(a.E,a.N):-p.T;
    const shape=[[1.6,0],[.35,.16],[-.35,1.35],[-.65,1.35],[-1.6,0],[-.65,-1.35],[-.35,-1.35],[.35,-.16]];
    this.pathXY(shape.map(([x,y])=>this.S(a.E+(x*co-y*si)*k,a.N+(x*si+y*co)*k,ground)));c.fillStyle=p.shadow;c.fill()}
  updOv(vehs){
    const m=this.wk()*this.cam.z,now=performance.now(),slow=now-(this.lastTxt||0)>300;if(slow)this.lastTxt=now;
    WH.forEach(w=>{const[E,N]=WP[w],z=elev(E,N),s=this.S(E,N,z),el=this.els['c'+w];this.place(el,s[0]+14*m,s[1]-64*m-4);
      if(slow){const u=this.unitsOf(w);const ue=el.querySelector('.u');const txt=nf(u);if(ue.textContent!==txt){if(ue.textContent){el.classList.remove('bump','drop');void el.offsetWidth;el.classList.add(u>(el._u||0)?'bump':'drop');clearTimeout(el._tm);el._tm=setTimeout(()=>el.classList.remove('bump','drop'),1400)}ue.textContent=txt;el._u=u}
        const lows=this.lowsOf(w),d=el.querySelector('.dot');d.hidden=!lows;d.textContent=lows}
      el.classList.toggle('sel',this.sel===w||this.lensW===w)});
    this.ov.classList.toggle('compact',this.w<600);['PORT','AIR'].forEach(k=>{const d=this.els['p'+k];if(!d)return;if(this.cam.z<7.5){d.style.visibility='hidden';return}const[E,N]=WP[k];const s=this.S(E,N,.2);this.place(d,s[0]-8,s[1],'-100%','-50%')});
    if(this.els.lens&&this.lensW){const[E,N]=WP[this.lensW],s=this.S(E,N,elev(E,N));let x=s[0]+14*m,y=s[1]-64*m-40;x=Math.max(130,Math.min(this.w-130,x));y=Math.max(250,y);this.place(this.els.lens,x,y);if(slow)this.fillLens()}
    Object.values(this.tagPool).forEach(e=>e._seen=false);
    if(this.tags!==false){
      (this.lastVeh||[]).forEach(v=>{if(this.tagFilter&&!this.tagFilter(v.s))return;if(this.w<600&&!this.tagAll)return;const e=this.tag(v.s.id);this.place(e,v.sx,v.sy-14);
        if(slow){const f=this.world.state(v.s)??(this.extra&&this.extra.s===v.s?this.extra.f:0);const rem=this.remOf?this.remOf(v.s):v.s.dep+v.s.dur-this.world.sim;
          e.querySelector('b').textContent=(v.s.kind==='air'&&f>.75?t('landing')+' · ':'')+fmt(rem);
          e.querySelector('.more').textContent=`${v.s.items.map(x=>`${x.q} × ${itm(x.id)[lang]}`).slice(0,2).join(', ')}${v.s.items.length>2?' +'+(v.s.items.length-2):''}`}
        e.classList.toggle('open',this.hoverV===v.s.id)})}
    Object.entries(this.tagPool).forEach(([id,e])=>{if(!e._seen){e.remove();delete this.tagPool[id]}});
  }
  unitsOf(w){return this.unitsFn?this.unitsFn(w):Object.values(this.world.stock[w]).reduce((a,b)=>a+b,0)}
  lowsOf(w){return this.lowsFn?this.lowsFn(w):CAT.filter(c=>this.world.stock[w][c.id]<LOW).length}
}

/* ================= worlds ================= */
const heroW=new World({speed:RM?0:120,stock:mkStock()});
heroW.add('road','W1','W3',[{id:'i1',q:60},{id:'i3',q:40},{id:'i14',q:30}],34*MIN,{by:'Hadi',via:'Telegram'});
heroW.add('road','W3','W2',[{id:'i3',q:80},{id:'i9',q:150}],70*MIN,{by:'Omar',via:'App'});
heroW.add('road','PORT','W1',[{id:'i2',q:600},{id:'i13',q:240}],6*MIN,{by:'Rana',via:'invoice'});
heroW.add('road','W2','W1',[{id:'i12',q:45},{id:'i6',q:120}],22*MIN,{by:'Maya',via:'App'});
heroW.add('sea','CN','PORT',[{id:'i0',q:600},{id:'i5',q:300},{id:'i12',q:180},{id:'i16',q:120}],7*HR,{by:'Rana',via:'invoice'});
heroW.add('air','CN','AIR',[{id:'i19',q:60},{id:'i7',q:90},{id:'i5',q:120}],9*MIN,{by:'Rana',via:'Telegram'});

const storyStock=mkStock();
const storyW=new World({speed:RM?0:90,stock:storyStock,decor:true});
storyW.add('road','W1','W3',[{id:'i4',q:120}],50*MIN);
storyW.add('road','W3','W1',[{id:'i7',q:60}],10*MIN);
storyW.add('sea','CN','PORT',[{id:'i2',q:900}],5*HR);
storyW.add('air','CN','AIR',[{id:'i19',q:40}],-6*MIN);
const SP=prep(SOUTH.map(G));const SP_ETA=roadDur(SP);
const storyTruck={on:false,f:0,s:{id:'story',code:'TRF-24018',kind:'road',from:'W1',to:'W2',items:[{id:'i0',q:40}],P:SP,dep:0,dur:SP_ETA}};
const STORY_BASE={W1:4820,W2:3960,W3:3214};const storyState={step:0,f:0};

/* ================= views ================= */
const storyView=new View({cv:$('#cvStory'),ov:$('#ovStory'),world:storyW,pal:NIGHT,pois:true});
storyView.extra=storyTruck;
storyView.tagFilter=s=>s===storyTruck.s&&storyTruck.f<.995;storyView.tagAll=true;
storyView.remOf=()=>(1-storyTruck.f)*SP_ETA;
storyView.unitsFn=w=>STORY_BASE[w]+(w==='W1'&&storyState.step>=2?-40:0)+(w==='W2'&&storyTruck.f>=.995&&storyState.step>=3?40:0);
storyView.lowsFn=w=>({W1:2,W2:storyTruck.f>=.995&&storyState.step>=3?3:4,W3:3})[w];

const appView=new View({cv:$('#cvApp'),ov:$('#ovApp'),world:heroW,pal:DAY,interactive:true,pois:true,sel:'W1'});
appView.pick=w=>{appSel=w;appView.sel=w;renderSide()};
appView.cam0=()=>{const W=appView.w,H=appView.h;return appView.fit({x:12,y:40,w:W-24,h:H-60},.96)};
appView.onResize=()=>appView.set(appView.cam0(),true);
let appSel='W1';

/* ================= story scroll ================= */
const stepEls=$$('.step');
function storyUpdate(){
  const vh=innerHeight,mob=innerWidth<=820,rtl=document.documentElement.dir==='rtl';
  let step=0,local=0;
  stepEls.forEach(el=>{const r=el.getBoundingClientRect(),s=+el.dataset.s;if(r.top<vh*.6){step=s;local=Math.max(0,Math.min(1,(vh*.6-r.top)/Math.max(1,r.height-vh*.35)))}});
  const jr=$('#how').getBoundingClientRect();const pastEnd=jr.bottom<vh*1.15;
  stepEls.forEach(el=>el.classList.toggle('on',+el.dataset.s===step&&step>0));
  storyState.step=step;
  const v=storyView,ax=mob?.5:(rtl?.36:.66),ay=mob?.24:.5,zk=mob?.72:1;
  let f=storyTruck.f;
  if(step<=2)f=0;else if(step===3)f=Math.min(1,local*1.15);else f=1;
  if(step===4||pastEnd)f=1;
  storyTruck.f=f;storyTruck.on=step>=1;
  v.route=step>=2?SP:null;v.routeF=step>=3?f:0;v.pulse=step===1?'W1':step===4?'W2':null;
  const W1=WP.W1,W2=WP.W2,mid=[(W1[0]+W2[0])/2,(W1[1]+W2[1])/2];
  let tgt;
  if(step===0||pastEnd){const W=v.w,H=v.h;tgt=v.fit(mob?{x:W*.1,y:H*.42,w:W*.86,h:H*.5}:(rtl?{x:-W*.02,y:70,w:W*.6,h:H-80}:{x:W*.42,y:70,w:W*.6,h:H-80}),1.04)}
  else if(step===1)tgt=v.focus(W1[0],W1[1],elev(...W1),17*zk,ax,ay);
  else if(step===2)tgt=v.focus(mid[0],mid[1],0,13.5*zk,ax,ay);
  else if(step===3){const a=along(SP,f);tgt=v.focus(a.E*.55+mid[0]*.45,a.N*.55+mid[1]*.45,0,14*zk,ax,ay)}
  else tgt=v.focus(W2[0],W2[1],elev(...W2),17*zk,ax,ay);
  v.set(tgt);
  // card values
  const rem=(1-f)*SP_ETA;$('#rideEta').firstChild.nodeValue=fmt(rem);
  const pct=(f*100).toFixed(1)+'%';$('#rideFill').style.width=pct;$('#rideDot').style.insetInlineStart=pct;
}
const depT=Date.UTC(2026,10,3,9,41);
function storyStatic(){$('#rcEta').textContent=fmt(SP_ETA);$('#rideArr').textContent=t('rideArr')(clock(depT+SP_ETA))}

/* ================= hero: notification toast ================= */
const TICO={ok:'i-check',go:'i-truck',ship:'i-ship',low:'i-alert'};
let toastI=0,heroVis=true;
function renderToast(){const m=t('toasts')[toastI],el=$('#toast'),ic=el.querySelector('.t-ic');ic.className='t-ic '+m.k;ic.innerHTML=`<svg><use href="#${TICO[m.k]}"/></svg>`;el.querySelector('b').textContent=m.t;el.querySelector('small').textContent=m.s}
new IntersectionObserver(e=>{heroVis=e[0].isIntersecting;const s=$('#heroArt svg');if(s&&s.pauseAnimations){if(heroVis&&!RM)s.unpauseAnimations();else s.pauseAnimations()}}).observe($('#heroArt'));
if(RM){const s=$('#heroArt svg');s&&s.pauseAnimations&&s.pauseAnimations()}
else setInterval(()=>{if(!heroVis||document.hidden)return;const el=$('#toast');el.classList.add('out');setTimeout(()=>{toastI=(toastI+1)%t('toasts').length;renderToast();el.classList.remove('out')},320)},4200);

/* ================= features: stock lookup ================= */
const totalOf=c=>WH.reduce((a,w)=>a+heroW.stock[w][c.id],0);
function renderTry(){$('#try').innerHTML=`<span>${t('tryL')}</span>`+t('tryQs').map(q=>`<button type="button" data-q="${q}">${q}</button>`).join('');$('#srch').placeholder=t('srchPh')}
$('#try').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$('#srch').value=b.dataset.q;srchRender()});
$('#srch').addEventListener('input',srchRender);
function srchRender(){
  const raw=$('#srch').value.trim(),q=raw.toLowerCase();
  const loc=q&&WH.find(w=>T.en[w].toLowerCase().startsWith(q)||T.ar[w].startsWith(raw)||CODE[w].toLowerCase()===q);
  let rows;
  if(loc)rows=[...CAT].sort((a,b)=>heroW.stock[loc][a.id]-heroW.stock[loc][b.id]).slice(0,4);
  else if(q)rows=CAT.filter(c=>c.en.toLowerCase().includes(q)||c.ar.includes(raw)||c.sku.toLowerCase().includes(q)).slice(0,4);
  else rows=['i1','i5','i2','i0'].map(itm);
  const box=$('#res');
  if(!rows.length){box.innerHTML=`<p class="res-empty">${t('srchNone')}</p>`;return}
  box.innerHTML=rows.map(c=>{
    const locs=WH.map(w=>{const v=heroW.stock[w][c.id];return`<span class="loc${loc===w?' hit':v<LOW?' low':''}">${CODE[w]} · ${nf(v)}</span>`}).join('');
    const right=loc?`${nf(heroW.stock[loc][c.id])}<small>${t('inWh')(CODE[loc])}</small>`:`${nf(totalOf(c))}<small>${t('total')}</small>`;
    return`<div class="res-row"><span class="res-ico"><svg viewBox="0 0 24 24"><path d="M12 2.5 3.5 7v10L12 21.5 20.5 17V7z"/><path d="M3.5 7 12 11.5 20.5 7M12 11.5v10"/></svg></span><div><b>${c[lang]}</b><small>${c.sku}</small><div class="locs">${locs}</div></div><div class="res-tot">${right}</div></div>`}).join('');
}

/* ================= features: map overview ================= */
let mwSel='W1';
function mwTabs(){$('#mtabs').innerHTML=WH.map(w=>`<button type="button" data-w="${w}" aria-pressed="${w===mwSel}"><svg viewBox="0 0 30 40" aria-hidden="true"><use href="#i-pin"/></svg>${CODE[w]} · ${t(w)}</button>`).join('')}
$('#mtabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){mwSel=b.dataset.w;mwTabs();mwRender()}});
function mwRender(){
  const box=$('#pinbox'),cv=$('#cvPin'),r=box.getBoundingClientRect();if(!r.width)return;
  const dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(r.width*dpr);cv.height=Math.round(r.height*dpr);
  const c=cv.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);c.clearRect(0,0,r.width,r.height);
  const rtl=document.documentElement.dir==='rtl',sp=SPRITES.n&&SPRITES.n[mwSel];
  if(sp){const img=sp.hi,s=Math.min(r.width*.86/img.width,(r.height-20)*.92/img.height),w=img.width*s,h=img.height*s;
    const x=(r.width-w)/2+(rtl?-1:1)*r.width*.1,y=r.height-h-6;c.drawImage(img,x,y,w,h);
    const px=x+(14+SC.ox)*SC.R_HI*s,py=y+(-14+SC.oy)*SC.R_HI*s;$('#mpin').style.transform=`translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`}
  const st=heroW.stock[mwSel],u=Object.values(st).reduce((a,b)=>a+b,0),lows=CAT.filter(x=>st[x.id]<LOW).length,pct=Math.min(100,Math.round(u/CAP[mwSel]*100));
  $('#mcard').innerHTML=`<small>${CODE[mwSel]}</small><b>${t('mwName')(mwSel)}<svg class="flip"><use href="#i-go"/></svg></b><p>${nf(u)} ${t('units')} · ${t('mwLow')(lows)}</p><div class="bar"><i style="width:${pct}%"></i></div><p style="margin-top:4px;font-size:11px">${t('mwCap')(pct)}</p>`;
}
new ResizeObserver(()=>mwRender()).observe($('#pinbox'));

/* ================= features: transfers + notifications ================= */
const notes=[];
function noteText(n){
  const nm=w=>CODE[w]?t(w):t(w);
  if(n.k==='ok')return[t('nDone'),`${t('nFrom')(nm(n.a),nm(n.b))} · ${t('nUnits')(nf(n.q))}`];
  if(n.k==='go')return[t('nStart'),`${t('nFrom')(nm(n.a),nm(n.b))} · ${t('nUnits')(nf(n.q))}`];
  if(n.k==='ship')return[t('nShip'),`${t('nUnits')(nf(n.q))} · ${n.code}`];
  return[t('nLow')(`${CODE[n.a]} ${t(n.a)}`),t('nLowSub')(n.q)];
}
function renderNotes(fresh){
  $('#nlist').innerHTML=notes.slice(0,3).map((n,i)=>{const[a,b]=noteText(n);return`<div class="note${fresh&&i===0?' in':''}"><span class="t-ic ${n.k}"><svg><use href="#${TICO[n.k]}"/></svg></span><span><b>${a}</b><small>${b}</small></span><time>${clock(n.time)}</time></div>`}).join('');
}
function pushNote(n){notes.unshift(n);if(notes.length>6)notes.length=6;renderNotes(true)}
function renderTransit(){
  const live=heroW.list.filter(s=>s.kind==='road'&&heroW.state(s)!==null).sort((a,b)=>(a.dep+a.dur)-(b.dep+b.dur));const s=live[0],el=$('#transit');
  if(!s){el.innerHTML=`<p class="tr-items">${t('trNone')}</p>`;return}
  const f=heroW.state(s),it=s.items.map(x=>`${x.q} × ${itm(x.id)[lang]}`);
  el.innerHTML=`<div class="tr-top"><span class="spill tr"><svg viewBox="0 0 26 16" width="16" height="10" fill="#0E2440" aria-hidden="true"><use href="#i-truck"/></svg>${t('trTitle')}</span><span class="tr-items">${s.code}</span></div>
    <div class="tr-route">${t(s.from)} <span class="flip" style="display:inline-block">→</span> ${t(s.to)}</div><div class="tr-items">${it[0]}${it.length>1?' +'+(it.length-1):''}</div>
    <div class="tr-eta">${fmt(s.dep+s.dur-heroW.sim)}<small>${t('trEta')}</small></div><div class="tr-bar"><i style="width:${(f*100).toFixed(1)}%"></i></div>`;
}

/* ================= features: insights chart ================= */
const CH={W:640,H:230,l:52,r:16,tp:12,b:30},CDAYS=14,CEND=Date.UTC(2026,10,3);
const chR=(()=>{let s=7;return()=>(s=s*16807%2147483647)/2147483647})();
const chDates=[...Array(CDAYS)].map((_,i)=>new Date(CEND-(CDAYS-1-i)*DMS));
const stockNow=()=>WH.reduce((a,w)=>a+Object.values(heroW.stock[w]).reduce((x,y)=>x+y,0),0);
const chStock=(()=>{const base=stockNow();let v=base*.885;const a=[];for(let i=0;i<CDAYS;i++){v+=(base-v)*.14+(chR()-.42)*base*.011;a.push(Math.round(v))}return a})();
const chMoves=chDates.map(d=>Math.round((d.getUTCDay()===0?8:22)+chR()*18));
let chTab='stock';
const fmtD=d=>lang==='ar'?`${d.getUTCDate()} ${t('months')[d.getUTCMonth()]}`:`${t('months')[d.getUTCMonth()]} ${d.getUTCDate()}`;
function niceStep(x){const p=Math.pow(10,Math.floor(Math.log10(x))),m=x/p;return(m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10)*p}
function drawChart(){
  const{W,H,l,r,tp,b}=CH,svg=$('#chSvg'),tip=$('#chTip'),INK='#4F6E86',GRID='#E8EFF4',HUE='#2F86B8';let s='';const pw=W-r-l,ph=H-tp-b;
  $$('#chTabs button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t===chTab));
  let hits=[];
  if(chTab==='stock'){
    const ser=chStock.slice();ser[CDAYS-1]=stockNow();
    let mn=Math.min(...ser),mx=Math.max(...ser);const st=niceStep((mx-mn)/3||1);mn=Math.floor(mn/st)*st;mx=Math.ceil(mx/st)*st;
    const X=i=>l+pw*i/(CDAYS-1),Y=v=>tp+ph*(1-(v-mn)/(mx-mn));
    for(let v=mn;v<=mx+1e-6;v+=st)s+=`<line x1="${l}" x2="${W-r}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" stroke="${GRID}"/><text x="${l-10}" y="${(Y(v)+4).toFixed(1)}" text-anchor="end">${nf(v)}</text>`;
    [0,6,13].forEach(i=>s+=`<text x="${X(i).toFixed(1)}" y="${H-8}" text-anchor="${i===0?'start':i===13?'end':'middle'}">${fmtD(chDates[i])}</text>`);
    const pts=ser.map((v,i)=>`${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    s+=`<defs><linearGradient id="chA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HUE}" stop-opacity=".22"/><stop offset="1" stop-color="${HUE}" stop-opacity="0"/></linearGradient></defs>`;
    s+=`<path d="M${pts.join('L')}L${X(CDAYS-1)},${tp+ph}L${l},${tp+ph}Z" fill="url(#chA)"/><path d="M${pts.join('L')}" fill="none" stroke="${HUE}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
    s+=`<line id="chX" x1="0" x2="0" y1="${tp}" y2="${tp+ph}" stroke="${INK}" stroke-dasharray="3 3" opacity="0"/><circle id="chDot" r="5" fill="${HUE}" stroke="#fff" stroke-width="2" opacity="0"/>`;
    s+=`<circle cx="${X(CDAYS-1)}" cy="${Y(ser[CDAYS-1])}" r="5" fill="${HUE}" stroke="#fff" stroke-width="2"/>`;
    hits=ser.map((v,i)=>({x:X(i),y:Y(v),html:`<b>${nf(v)}</b> ${t('units')}<br>${fmtD(chDates[i])}`}));
    const d=(ser[CDAYS-1]/ser[0]-1)*100;
    $('#chBig').textContent=nf(ser[CDAYS-1]);$('#chSub').textContent=t('chStock');$('#chDelta').textContent=`${d>=0?'+':'−'}${Math.abs(d).toFixed(1)}% ${t('chVs')}`;
    svg.setAttribute('aria-label',t('chStock'));
  }else if(chTab==='move'){
    const mx=Math.ceil(Math.max(...chMoves)/10)*10,band=pw/CDAYS,bw=band-6,Y=v=>tp+ph*(1-v/mx);
    for(let v=0;v<=mx;v+=mx/2)s+=`<line x1="${l}" x2="${W-r}" y1="${Y(v)}" y2="${Y(v)}" stroke="${GRID}"/><text x="${l-10}" y="${Y(v)+4}" text-anchor="end">${v}</text>`;
    chMoves.forEach((v,i)=>{const x=l+band*i+3,y=Y(v),h=tp+ph-y,rr=Math.min(4,h);s+=`<path class="chb" data-b="${i}" d="M${x},${tp+ph}V${y+rr}Q${x},${y} ${x+rr},${y}H${x+bw-rr}Q${x+bw},${y} ${x+bw},${y+rr}V${tp+ph}Z" fill="${HUE}"/>`;hits.push({x:x+bw/2,y,html:`<b>${v}</b> ${t('chMovesL')}<br>${fmtD(chDates[i])}`})});
    [0,6,13].forEach(i=>s+=`<text x="${(l+band*i+band/2).toFixed(1)}" y="${H-8}" text-anchor="middle">${fmtD(chDates[i])}</text>`);
    const tot=chMoves.reduce((a,b)=>a+b,0);
    $('#chBig').textContent=nf(tot);$('#chSub').textContent=t('chMove');$('#chDelta').textContent=t('chAvg')(Math.round(tot/CDAYS));
    svg.setAttribute('aria-label',t('chMove'));
  }else{
    const rows=WH.map(w=>({w,u:Object.values(heroW.stock[w]).reduce((a,b)=>a+b,0),cap:CAP[w]})),mx=Math.max(...rows.map(x=>x.cap)),L=150,bw=W-r-L-90,rowH=ph/3;
    rows.forEach((o,i)=>{const y=tp+rowH*i+rowH/2,cw=bw*o.cap/mx,fw=bw*o.u/mx;
      s+=`<text x="${l-44}" y="${y+4}" style="font-size:12.5px;fill:#0E2440;font-weight:600">${CODE[o.w]} · ${t(o.w)}</text>`;
      s+=`<rect x="${L}" y="${y-9}" width="${cw}" height="18" rx="4" fill="#EEF6F9"/><rect x="${L}" y="${y-9}" width="${fw}" height="18" rx="4" fill="${HUE}"/>`;
      s+=`<text x="${L+cw+10}" y="${y+4}" style="fill:#0E2440;font-weight:600">${nf(o.u)}</text><text x="${L+cw+10}" y="${y+18}" style="font-size:10px">/ ${nf(o.cap)}</text>`;
      hits.push({x:L+fw,y:y-9,html:`<b>${CODE[o.w]} ${t(o.w)}</b><br>${nf(o.u)} / ${nf(o.cap)} · ${Math.round(o.u/o.cap*100)}% ${t('chCapL')}`})});
    const tu=rows.reduce((a,o)=>a+o.u,0),tc=rows.reduce((a,o)=>a+o.cap,0);
    $('#chBig').textContent=nf(tu);$('#chSub').textContent=t('chLoc');$('#chDelta').textContent=t('chCap')(Math.round(tu/tc*100));
    svg.setAttribute('aria-label',t('chLoc'));
  }
  s+=`<rect id="chHit" x="${l}" y="${tp}" width="${pw}" height="${ph}" fill="transparent"/>`;
  svg.innerHTML=s;svg._hits=hits;tip.classList.remove('on');
}
(()=>{const svg=$('#chSvg'),tip=$('#chTip'),chart=$('#chart');
  const show=e=>{const hits=svg._hits||[];if(!hits.length)return;const r=svg.getBoundingClientRect(),cr=chart.getBoundingClientRect(),sx=(e.clientX-r.left)/r.width*CH.W,sy=(e.clientY-r.top)/r.height*CH.H;
    let best=hits[0],bd=1e9;hits.forEach(h=>{const d=chTab==='loc'?Math.abs(h.y+9-sy):Math.abs(h.x-sx);if(d<bd){bd=d;best=h}});
    tip.innerHTML=best.html;tip.style.left=(r.left-cr.left+best.x/CH.W*r.width)+'px';tip.style.top=(r.top-cr.top+best.y/CH.H*r.height)+'px';tip.classList.add('on');
    const xl=svg.querySelector('#chX'),dot=svg.querySelector('#chDot');if(xl){xl.setAttribute('x1',best.x);xl.setAttribute('x2',best.x);xl.setAttribute('opacity',.5);dot.setAttribute('cx',best.x);dot.setAttribute('cy',best.y);dot.setAttribute('opacity',1)}
    svg.querySelectorAll('.chb').forEach(b=>b.setAttribute('fill',b.dataset.b==hits.indexOf(best)?'#0E2440':'#2F86B8'))};
  const hide=()=>{tip.classList.remove('on');const xl=svg.querySelector('#chX');if(xl){xl.setAttribute('opacity',0);svg.querySelector('#chDot').setAttribute('opacity',0)}svg.querySelectorAll('.chb').forEach(b=>b.setAttribute('fill','#2F86B8'))};
  svg.addEventListener('pointermove',show);svg.addEventListener('pointerdown',show);svg.addEventListener('pointerleave',hide);
})();
$('#chTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){chTab=b.dataset.t;drawChart()}});

/* ================= contact form ================= */
// Every request is saved to the Stacko CRM (its own Supabase project) before the WhatsApp step.
// The publishable key is public by design: it can only call submit_website_lead, which validates,
// rate-limits and deduplicates. Saving never blocks the visitor; WhatsApp still works if it fails.
const CRM_URL='https://mtsjnwlokngvzelpgwkn.supabase.co/rest/v1/rpc/submit_website_lead',CRM_KEY='sb_publishable_OCtEFOi3iiJ1ZhRLfxtpPQ_pDETD8xd';
// Resolves true once the CRM accepted the lead. One retry on a network or 5xx failure; a 4xx
// (rate limit, invalid input) is final. A honeypot hit still answers ok, so bots see success.
async function saveLead(d){
  const q=new URLSearchParams(location.search),utm={};
  ['source','medium','campaign','term','content'].forEach(k=>{const v=q.get('utm_'+k);if(v)utm[k]=v.slice(0,100)});
  const payload={...d,lang,page:location.pathname,utm,website:$('#fWebsite').value};
  for(let i=0;i<2;i++){
    try{
      const r=await fetch(CRM_URL,{method:'POST',keepalive:true,headers:{apikey:CRM_KEY,'Content-Type':'application/json'},body:JSON.stringify({payload})});
      if(r.ok)return true;
      if(r.status<500)break;
    }catch(e){}
    if(!i)await new Promise(res=>setTimeout(res,1200));
  }
  return false;
}
(()=>{
  const form=$('#cform'),body=$('#fBody'),ok=$('#fOk');let lastMsg='';
  // The pricing page links here with ?plan=<plan name>; note it in the message so the CRM lead shows the plan.
  const plan=(new URLSearchParams(location.search).get('plan')||'').replace(/[<>]/g,'').trim().slice(0,40);
  if(plan&&!$('#fMsg').value)$('#fMsg').value=(lang==='ar'?'مهتم بخطة: ':'Interested in the plan: ')+plan;
  const ph=()=>{const p=t('fmPh');$('#fName').placeholder=p.name;$('#fCompany').placeholder=p.company;$('#fPhone').placeholder=p.phone;$('#fEmail').placeholder=p.email;$('#fMsg').placeholder=p.msg};
  window.__formPh=ph;
  const check=(wrap,inp,test)=>{const bad=!test(inp.value.trim());wrap.classList.toggle('bad',bad);inp.setAttribute('aria-invalid',bad);return!bad};
  ['fName','fPhone'].forEach(id=>$('#'+id).addEventListener('input',e=>{const w=e.target.closest('.f');if(w.classList.contains('bad'))check(w,e.target,v=>id==='fName'?v.length>1:v.replace(/\D/g,'').length>=7)}));
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const a=check($('#fwName'),$('#fName'),v=>v.length>1),b=check($('#fwPhone'),$('#fPhone'),v=>v.replace(/\D/g,'').length>=7);
    if(!a){$('#fName').focus();return}if(!b){$('#fPhone').focus();return}
    const d={name:$('#fName').value.trim(),company:$('#fCompany').value.trim(),phone:$('#fPhone').value.trim(),email:$('#fEmail').value.trim(),wh:(form.querySelector('input[name=wh]:checked')||{}).value||'-',sys:((form.querySelector('input[name=sys]:checked')||{}).nextElementSibling||{}).textContent||'-',msg:$('#fMsg').value.trim()};
    const warn=$('#fWarn');warn.hidden=true;
    saveLead({name:d.name,company:d.company,phone:d.phone,email:d.email,wh:d.wh,sys:(form.querySelector('input[name=sys]:checked')||{}).value,msg:d.msg}).then(saved=>{if(!saved){warn.hidden=false;console.warn('Stacko: lead was not saved to the CRM')}});
    lastMsg=t('fmText')(d);$('#fOkMsg').textContent=lastMsg;$('#fOkLink').href='https://wa.me/96171313917?text='+encodeURIComponent(lastMsg);
    body.hidden=true;ok.hidden=false;ok.focus();
  });
  $('#fEdit').addEventListener('click',()=>{ok.hidden=true;body.hidden=false;$('#fName').focus()});
  $('#fCopy').addEventListener('click',()=>{const btn=$('#fCopy'),done=()=>{btn.textContent=t('copied');setTimeout(()=>{btn.innerHTML=lang==='ar'?AR.fmCopyMsg:EN.fmCopyMsg},1600)};
    const sel=()=>{const r=document.createRange();r.selectNodeContents($('#fOkMsg'));const g=getSelection();g.removeAllRanges();g.addRange(r)};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(lastMsg).then(done,sel);else sel()});
})();

/* ================= product panel ================= */
function renderKpis(){
  $('#kUnits').textContent=nf(WH.reduce((a,w)=>a+Object.values(heroW.stock[w]).reduce((x,y)=>x+y,0),0));
  $('#kTransit').textContent=nf(heroW.list.filter(s=>heroW.state(s)!==null).reduce((a,s)=>a+heroW.qty(s),0));
  const c={sea:0,air:0,road:0};heroW.list.forEach(s=>{if(heroW.state(s)!==null)c[s.kind]++});$('#kShips').textContent=`${c.sea} · ${c.air} · ${c.road}`;
  $('#kLow').textContent=WH.reduce((a,w)=>a+CAT.filter(x=>heroW.stock[w][x.id]<LOW).length,0);
}
function renderSide(){
  $('#tabs').innerHTML=WH.map(w=>`<button type="button" data-w="${w}" class="${w===appSel?'on':''}" aria-pressed="${w===appSel}">${CODE[w]}</button>`).join('');
  const st=heroW.stock[appSel],u=Object.values(st).reduce((a,b)=>a+b,0),pct=Math.min(100,Math.round(u/CAP[appSel]*100));
  $('#whHead').innerHTML=`<div class="code">${CODE[appSel]}</div><h3>${t(appSel)}</h3><div class="muted">${nf(u)} / ${nf(CAP[appSel])} · ${pct}% ${t('cap')}</div>`;
  $('#capBar').style.width=pct+'%';
  const lows=CAT.filter(c=>st[c.id]<LOW).length,live=heroW.list.filter(s=>heroW.state(s)!==null);
  $('#stats').innerHTML=[[CAT.length,t('skus')],[lows,t('lowS')],[live.filter(s=>s.to===appSel).length,t('inb')],[live.filter(s=>s.from===appSel).length,t('outb')]].map(([v,l])=>`<div class="stat"><b>${v}</b><small>${l}</small></div>`).join('');
  $('#search').placeholder=t('search');
  renderItems();appView.sel=appSel;
}
function renderItems(){
  const q=$('#search').value.trim().toLowerCase(),st=heroW.stock[appSel];
  const rows=CAT.filter(c=>!q||c.en.toLowerCase().includes(q)||c.ar.includes(q)||c.sku.toLowerCase().includes(q)).sort((a,b)=>st[a.id]-st[b.id]);
  $('#items').innerHTML=rows.length?rows.map(c=>{const v=st[c.id],lo=v<LOW;return`<div class="row"><div><b>${c[lang]}</b><small>${c.sku}</small></div><span class="q">${nf(v)}</span><span class="pl ${lo?'low':'ok'}">${lo?t('low'):t('ok')}</span></div>`}).join(''):`<p class="empty">${t('noRes')}</p>`;
}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){appSel=b.dataset.w;renderSide()}});
$('#search').addEventListener('input',renderItems);

/* ================= ask stacko ================= */
let askQ=0;
function renderQs(){$('#qs').innerHTML=t('qs').map((q,i)=>`<button type="button" data-q="${i}" aria-pressed="${i===askQ}">${q}</button>`).join('')}
function answer(i){
  const qtxt=`<p class="q">${t('qs')[i]}</p>`;
  const live=heroW.list.filter(s=>heroW.state(s)!==null);
  if(i===0){const id='i1',per=WH.map(w=>[w,heroW.stock[w][id]]),tot=per.reduce((a,b)=>a+b[1],0),mx=Math.max(...per.map(x=>x[1]));
    const tr=live.reduce((a,s)=>a+s.items.filter(x=>x.id===id).reduce((p,x)=>p+x.q,0),0);
    return qtxt+`<div class="big">${nf(tot)}</div><div class="muted">${t('aTotal')(nf(tot),itm(id)[lang])}</div><ul>${per.map(([w,v])=>`<li><span>${CODE[w]} ${t(w)}</span><span class="b"><i style="width:${v/mx*100}%"></i></span><span>${nf(v)}</span></li>`).join('')}</ul><p class="foot">${tr?t('aTransit')(nf(tr)):t('aNoTransit')}</p>`}
  if(i===1){const st=heroW.stock.W2,lows=CAT.filter(c=>st[c.id]<LOW).sort((a,b)=>st[a.id]-st[b.id]);
    if(!lows.length)return qtxt+`<p>${t('aLowNone')}</p>`;
    return qtxt+`<div class="muted" style="font-weight:600;color:var(--abyss)">${t('aLow')(lows.length)}</div><ul>${lows.slice(0,4).map(c=>`<li><span>${c[lang]}</span><span class="b"><i style="width:${st[c.id]}%;background:var(--alert)"></i></span><span>${st[c.id]}</span></li>`).join('')}</ul><p class="foot">${t('aLowFoot')}</p>`}
  const nx=[...live].sort((a,b)=>(a.dep+a.dur)-(b.dep+b.dur)).slice(0,4);
  return qtxt+`<div class="muted" style="font-weight:600;color:var(--abyss)">${t('aNext')}</div><ul>${nx.map(s=>`<li><span>${s.code}</span><span style="color:var(--deep);font-size:12px">${nf(heroW.qty(s))} ${t('units')} ${lang==='ar'?'←':'→'} ${CODE[s.to]||t(s.to)}</span><span>${fmt(s.dep+s.dur-heroW.sim)}</span></li>`).join('')}</ul>`;
}
function ask(i,instant){askQ=i;renderQs();const a=$('#ans');if(instant||RM){a.innerHTML=answer(i);return}a.innerHTML=`<p class="q">${t('qs')[i]}</p><span class="typing"><i></i><i></i><i></i></span>`;clearTimeout(ask._t);ask._t=setTimeout(()=>{a.innerHTML=answer(i)},650)}
$('#qs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)ask(+b.dataset.q)});

/* ================= ribbon (any origin) ================= */
const ORIG=[
 {id:'tr',en:'Türkiye',ar:'تركيا',seaD:2,airH:2,sea:[['Port of Mersin','مرفأ مرسين',0],['Port of Beirut','مرفأ بيروت',1]],air:['Istanbul (IST)','إسطنبول (IST)']},
 {id:'it',en:'Italy',ar:'إيطاليا',seaD:6,airH:4,sea:[['Port of Genoa','مرفأ جنوى',0],['Strait of Messina','مضيق مسينا',.31],['Port of Beirut','مرفأ بيروت',1]],air:['Milan (MXP)','ميلانو (MXP)']},
 {id:'ae',en:'UAE',ar:'الإمارات',seaD:18,airH:4,sea:[['Jebel Ali','جبل علي',0],['Strait of Hormuz','مضيق هرمز',.06],['Bab el-Mandeb','باب المندب',.54],['Suez Canal','قناة السويس',.93],['Port of Beirut','مرفأ بيروت',1]],air:['Dubai (DXB)','دبي (DXB)']},
 {id:'us',en:'USA',ar:'الولايات المتحدة',seaD:20,airH:12,sea:[['Port of New York','مرفأ نيويورك',0],['Strait of Gibraltar','مضيق جبل طارق',.61],['Port of Beirut','مرفأ بيروت',1]],air:['New York (JFK)','نيويورك (JFK)']}
];
let rbMode='sea',rbOrig='ae';
const LEGX={a:50,b:680,c:815,d:950};
function rbY(x,mode){if(mode==='sea'){return x<=LEGX.b?128+7*Math.sin((x-LEGX.a)/(LEGX.b-LEGX.a)*Math.PI*7):128}return x<=LEGX.b?128-70*Math.sin(Math.PI*(x-LEGX.a)/(LEGX.b-LEGX.a)):128}
function renderOrigins(){$('#rbOrigin').innerHTML=`<span style="color:var(--dolphin);font-size:12px;font-weight:600;padding:0 8px;align-self:center">${t('rbFrom')}</span>`+ORIG.map(o=>`<button type="button" data-o="${o.id}" aria-pressed="${o.id===rbOrig}">${o[lang]}</button>`).join('')}
$('#rbOrigin').addEventListener('click',e=>{const b=e.target.closest('button');if(b){rbOrig=b.dataset.o;renderOrigins();renderRibbon()}});
function renderRibbon(){
  const o=ORIG.find(x=>x.id===rbOrig),L=lang==='ar'?1:0;
  const rtl=document.documentElement.dir==='rtl',X=x=>rtl?1000-x:x,v=+$('#rbRange').value/1000,mode=rbMode,N=mode==='sea'?o.seaD:o.airH;
  const pos=LEGX.a+v*(LEGX.d-LEGX.a);
  const pts=[];for(let x=LEGX.a;x<=LEGX.d;x+=4)pts.push([x,rbY(x,mode)]);
  const seg=(x0,x1)=>pts.filter(p=>p[0]>=x0&&p[0]<=x1).map(p=>`${X(p[0]).toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const done=pts.filter(p=>p[0]<=pos).map(p=>`${X(p[0]).toFixed(1)},${p[1].toFixed(1)}`).join(' ')+` ${X(pos).toFixed(1)},${rbY(pos,mode).toFixed(1)}`;
  let s='';
  const stp=Math.max(1,Math.ceil(N/6)),ticks=[];for(let k=0;k<N;k+=stp)ticks.push(k);ticks.push(N);
  ticks.forEach(k=>{const x=LEGX.a+(LEGX.b-LEGX.a)*k/N;s+=`<line x1="${X(x)}" y1="214" x2="${X(x)}" y2="220" stroke="rgba(121,192,222,.5)"/><text class="tick" x="${X(x)}" y="236" text-anchor="middle">${k===N?k+' '+(mode==='sea'?t('days'):t('hours')):k}</text>`});
  s+=`<line x1="${X(LEGX.a)}" y1="217" x2="${X(LEGX.d)}" y2="217" stroke="rgba(121,192,222,.18)"/>`;
  const mid=(a,b)=>X((a+b)/2);
  s+=`<text class="leg" x="${mid(LEGX.a,LEGX.b)}" y="196" text-anchor="middle">${mode==='sea'?t('legSea')(N):t('legAir')(N)}</text><text class="leg" x="${mid(LEGX.b,LEGX.c)}" y="196" text-anchor="middle">${mode==='sea'?t('legCus'):t('legCusA')}</text><text class="leg" x="${mid(LEGX.c,LEGX.d)}" y="196" text-anchor="middle">${t('legRoad')}</text>`;
  s+=`<polyline points="${seg(LEGX.a,LEGX.b)}" fill="none" stroke="${mode==='sea'?'#0895A6':'#79C0DE'}" stroke-width="2.4" stroke-dasharray="${mode==='sea'?'8 7':'1.5 7'}" stroke-linecap="round"/>`;
  s+=`<line x1="${X(LEGX.b)}" y1="128" x2="${X(LEGX.c)}" y2="128" stroke="#C9D8E4" stroke-opacity=".35" stroke-width="8" stroke-linecap="round"/>`;
  s+=`<line x1="${X(LEGX.c)}" y1="128" x2="${X(LEGX.d)}" y2="128" stroke="#C9D8E4" stroke-width="2.6" stroke-linecap="round"/>`;
  s+=`<polyline points="${done}" fill="none" stroke="#2EF2EE" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>`;
  const stops=mode==='sea'?o.sea.map(([en,ar,f])=>[LEGX.a+(LEGX.b-LEGX.a)*f,L?ar:en]):[[LEGX.a,o.air[L]],[LEGX.b,t('BEY')]];
  stops.forEach(([x,l],i)=>{const y=rbY(x,mode),up=mode==='air'?i>0:i%2===0,passed=pos>=x-1,last=i===stops.length-1;
    s+=`<circle cx="${X(x)}" cy="${y}" r="${i===0||last?6:4.5}" fill="${passed?'#2EF2EE':'#0E2440'}" stroke="${passed?'#2EF2EE':'#79C0DE'}" stroke-width="2"/>`;
    const ty=up?y-22:y+30;s+=`<text class="lbl" x="${X(x)+(i===0?(rtl?8:-8):0)}" y="${ty}" text-anchor="${i===0?'start':'middle'}">${l}</text>`});
  s+=`<circle cx="${X(LEGX.d)}" cy="128" r="6" fill="${pos>=LEGX.d-1?'#2EF2EE':'#0E2440'}" stroke="#C9D8E4" stroke-width="2"/><text class="lbl" x="${X(LEGX.d)}" y="104" text-anchor="end">${mode==='sea'?t('destSea'):t('destAir')}</text>`;
  const kind=pos<LEGX.c?(mode==='sea'?'i-ship':'i-plane'):'i-truck',my=rbY(pos,mode);
  s+=`<g transform="translate(${X(pos)} ${my})"><circle r="22" fill="rgba(46,242,238,.14)"/><circle r="15" fill="#FFFFFF"/><g transform="scale(${rtl?-1:1},1)"><svg x="-11" y="-7" width="22" height="14" viewBox="0 0 26 16" fill="#0E2440"><use href="#${kind}"/></svg></g></g>`;
  $('#rbSvg').innerHTML=s;
  $('#rbCode').innerHTML=mode==='sea'?t('rbCodeSea'):t('rbCodeAir');
  let st,lf;
  if(pos<LEGX.b){const fr=(pos-LEGX.a)/(LEGX.b-LEGX.a);
    if(mode==='sea'){let near=null;o.sea.forEach(([en,ar,f],i)=>{if(fr>=f&&i>0&&i<o.sea.length-1)near=L?ar:en});
      if(N>3){const d=Math.max(1,Math.round(fr*N));st=t('stSea')(t('dayN')(d),t('ofDays')(N),near);lf=t('seaLeftD')(Math.max(1,N-d))}
      else{const h=Math.max(1,Math.round(fr*N*24));st=t('stSea')(t('hourN')(h),t('ofHours')(N*24),near);lf=t('seaLeftH')(Math.max(1,N*24-h))}}
    else{const hh=fr*N,h=Math.floor(hh),m=Math.round((hh-h)*60)%60;st=t('stAir')(h,m,o.air[L]);lf=t('stAirL')(Math.max(1,Math.ceil(N-hh)))}}
  else if(pos<LEGX.c){const fr=(pos-LEGX.b)/(LEGX.c-LEGX.b);st=t('stCus')(mode==='sea'?t('PORT'):t('AIR'));lf=t('stCusL')(Math.max(1,Math.round((1-fr)*(mode==='sea'?48:24))))}
  else if(pos<LEGX.d-1){const fr=(pos-LEGX.c)/(LEGX.d-LEGX.c);st=t('stRoad')(mode==='sea'?t('destSea'):t('destAir'));lf=t('stRoadL')(Math.max(1,Math.round((1-fr)*(mode==='sea'?70:105))))}
  else{st=t('stDone')(mode==='sea'?t('destSea'):t('destAir'),mode==='sea'?'1,200':'270');lf=t('stDoneL')}
  $('#rbState').textContent=st;$('#rbLeft').textContent=lf;
}
$('#rbRange').addEventListener('input',renderRibbon);
['Sea','Air'].forEach(m=>$('#rb'+m).addEventListener('click',()=>{rbMode=m.toLowerCase();$('#rbSea').setAttribute('aria-pressed',rbMode==='sea');$('#rbAir').setAttribute('aria-pressed',rbMode==='air');renderRibbon()}));

/* ================= invoice: AI reads → a person reviews → approved (loops while visible) ================= */
const INV_K={read:'Read',review:'Draft',ok:'Ok'},INV_P=['read','review','ok'];
let invPh='ok',invVis=false,invT=0;
function invPhase(p){
  invPh=p;const sc=$('#shipc'),k=INV_K[p],at=INV_P.indexOf(p);
  sc.classList.remove('p-read','p-review','p-ok');sc.classList.add('p-'+p);
  $('#spState').textContent=t('iv'+k);$('#spFoot2').textContent=t('spF2'+k);
  $('#rvT').textContent=t('rvT'+k);$('#rvS').textContent=t('rvS'+k);$('#rvB').textContent=p==='ok'?'':t('rvBtn');
  $$('.inv-steps li').forEach(li=>{const i=INV_P.indexOf(li.dataset.p);li.classList.toggle('on',i===at);li.classList.toggle('done',i<at)});
}
function readInvoice(){
  const pp=$('#paper'),rows=$$('#ppRows tr'),out=$$('#spRows tr');
  pp.classList.remove('reading');void pp.offsetWidth;pp.classList.add('reading');
  rows.forEach((r,i)=>{setTimeout(()=>{r.classList.add('hit');out[i].classList.remove('flash');void out[i].offsetWidth;out[i].classList.add('flash');setTimeout(()=>r.classList.remove('hit'),700)},350+i*360)});
}
function invCycle(){
  clearTimeout(invT);if(!invVis||document.hidden)return;
  invPhase('read');readInvoice();
  invT=setTimeout(()=>{invPhase('review');invT=setTimeout(()=>{invPhase('ok');invT=setTimeout(invCycle,4200)},3000)},2400);
}
if(!RM)new IntersectionObserver(e=>{const v=e[0].isIntersecting;if(v&&!invVis){invVis=true;invCycle()}else if(!v){invVis=false;clearTimeout(invT)}},{threshold:.35}).observe($('#inv'));
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&invVis)invCycle()});

/* ================= roles and permissions ================= */
// one letter per action in T.acts: y allowed · s own sites only · d draft that needs approval · n no access
const RLV=['yyyyyyyy','ynnnnnyy','ssssdssn','sndnnnnn','yydnnyyn','ndnnnnnn','ynnydyyn','yndnnnnn','ynnnnyyn'];
let rlSel=2;// open on the warehouse manager: a mix of every permission level
function renderRoleCard(){
  const r=t('roles')[rlSel],lv=t('lv');
  $('#rlCard').innerHTML=`<div class="rl-top"><div><small>${r[1]}</small><h3>${r[0]}</h3></div><span class="via">${t('rlScope')}: ${r[3]}</span></div><p>${r[2]}</p><ul class="perm">${t('acts').map((a,k)=>{const c=RLV[rlSel][k];return`<li class="${c}"><span>${a}</span><span class="lv ${c}">${lv[c]}</span></li>`}).join('')}</ul>`;
}
function renderRoles(){
  $('#rlPick').innerHTML=t('roles').map((r,i)=>`<button type="button" data-r="${i}" aria-pressed="${i===rlSel}"><b>${r[0]}</b><small>${r[1]}</small></button>`).join('');
  renderRoleCard();
}
$('#rlPick').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;rlSel=+b.dataset.r;$$('#rlPick button').forEach(x=>x.setAttribute('aria-pressed',x===b));renderRoleCard()});

/* ================= language ================= */
function applyLang(l){
  lang=l;const h=document.documentElement;h.lang=l;h.dir=l==='ar'?'rtl':'ltr';
  $$('[data-i]').forEach(el=>{const k=el.dataset.i;el.innerHTML=l==='ar'?(AR[k]??EN[k]):EN[k]});
  [storyView,appView].forEach(v=>v.labels());
  storyStatic();renderSide();renderKpis();ask(askQ,true);renderOrigins();renderRibbon();storyUpdate();
  renderToast();renderTry();srchRender();mwTabs();mwRender();renderNotes(false);renderTransit();drawChart();window.__formPh&&window.__formPh();
  invPhase(invPh);renderRoles();
}

/* ================= copy + nav ================= */
$$('[data-copy]').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.copy,done=()=>{const o=b.textContent;b.textContent=t('copied');setTimeout(()=>b.textContent=o,1600)};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(v).then(done,()=>sel(b))}else sel(b);
  function sel(btn){const s=btn.parentElement.querySelector('span'),r=document.createRange();r.selectNodeContents(s);const g=getSelection();g.removeAllRanges();g.addRange(r)}}));
const nav=$('#nav');const onScroll=()=>{nav.classList.toggle('solid',scrollY>30);storyUpdate()};addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{storyUpdate();renderRibbon()});

/* ================= loop ================= */
let last=performance.now(),acc=0;
function loop(now){
  const dt=Math.min(64,now-last);last=now;
  heroW.tick(dt);storyW.tick(dt);
  heroW.events.splice(0).forEach(ev=>{
    if(ev.type==='in'){appView.rings.push({w:ev.w,t:now});pushNote({k:'ok',a:ev.s.from,b:ev.s.to,q:heroW.qty(ev.s),time:heroW.sim})}
    else if(ev.type==='out'&&ev.s)pushNote({k:'go',a:ev.s.from,b:ev.s.to,q:heroW.qty(ev.s),time:heroW.sim});
    else if(ev.type==='ship')pushNote({k:'ship',q:heroW.qty(ev.s),code:ev.s.code,time:heroW.sim});
  });
  [storyView,appView].forEach(v=>{if(v.vis){v.ease(dt);v.draw(now)}});
  acc+=dt;if(acc>500){acc=0;renderKpis();if(appView.vis)renderSide();renderTransit()}
  requestAnimationFrame(loop);
}

/* ================= boot ================= */
appView.set(appView.cam0(),true);
storyView.set(storyView.fit({x:storyView.w*.44,y:80,w:storyView.w*.52,h:storyView.h-140},.95),true);
notes.push({k:'ok',a:'W1',b:'W3',q:120,time:heroW.sim-12*MIN},{k:'ship',q:1200,code:'SHP-24017',time:heroW.sim-41*MIN},{k:'low',a:'W2',q:3,time:heroW.sim-66*MIN});
renderQs();
applyLang(lang);
const fontsReady=document.fonts&&document.fonts.ready?Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2500))]):Promise.resolve();
fontsReady.then(buildSprites).then(()=>{[storyView,appView].forEach(v=>v.labels());mwRender()});
requestAnimationFrame(loop);
})();
