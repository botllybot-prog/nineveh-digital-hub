export const departments = [
  "ديوان المحافظة",
  "الموارد البشرية",
  "المالية",
  "الخدمات البلدية",
  "الصحة",
  "التربية",
  "الإعمار",
  "الأمن",
];

export const kpis = {
  total: 12480,
  done: 8654,
  late: 312,
  archived: 5421,
  employees: 2840,
  completionRate: 78,
};

export const transactionsByDept = [
  { dept: "ديوان المحافظة", value: 320 },
  { dept: "الموارد البشرية", value: 210 },
  { dept: "المالية", value: 290 },
  { dept: "الخدمات البلدية", value: 410 },
  { dept: "الصحة", value: 180 },
  { dept: "التربية", value: 260 },
  { dept: "الإعمار", value: 350 },
];

export const monthlyCompletion = [
  { month: "كانون2", value: 62 },
  { month: "شباط", value: 68 },
  { month: "آذار", value: 71 },
  { month: "نيسان", value: 74 },
  { month: "أيار", value: 70 },
  { month: "حزيران", value: 78 },
  { month: "تموز", value: 82 },
  { month: "آب", value: 85 },
];

export const lateByDept = [
  { dept: "ديوان المحافظة", value: 24 },
  { dept: "الموارد البشرية", value: 12 },
  { dept: "المالية", value: 38 },
  { dept: "الخدمات البلدية", value: 56 },
  { dept: "الصحة", value: 18 },
  { dept: "التربية", value: 22 },
  { dept: "الإعمار", value: 41 },
];

export type Status = "قيد الإنجاز" | "منجزة" | "متأخرة" | "بانتظار الموافقة";

export const transactions = [
  { id: "TX-2025-01042", title: "طلب تخصيص مالي لمشروع تأهيل شارع الكورنيش", dept: "المالية", status: "قيد الإنجاز" as Status, created: "2025-04-12", updated: "2025-05-01", progress: 65 },
  { id: "TX-2025-01051", title: "كتاب رسمي لتعيين موظفين جدد في دائرة الصحة", dept: "الموارد البشرية", status: "بانتظار الموافقة" as Status, created: "2025-04-18", updated: "2025-05-03", progress: 40 },
  { id: "TX-2025-01067", title: "صيانة طرق منطقة الزهور", dept: "الخدمات البلدية", status: "منجزة" as Status, created: "2025-03-22", updated: "2025-04-28", progress: 100 },
  { id: "TX-2025-01089", title: "توريد مستلزمات طبية لمستشفى الموصل العام", dept: "الصحة", status: "متأخرة" as Status, created: "2025-02-10", updated: "2025-04-02", progress: 35 },
  { id: "TX-2025-01102", title: "إعادة تأهيل مدارس قضاء تلكيف", dept: "التربية", status: "قيد الإنجاز" as Status, created: "2025-04-25", updated: "2025-05-05", progress: 55 },
  { id: "TX-2025-01115", title: "مشروع إعمار جسر الحرية", dept: "الإعمار", status: "قيد الإنجاز" as Status, created: "2025-03-30", updated: "2025-05-04", progress: 72 },
  { id: "TX-2025-01128", title: "تنظيم دورات تدريبية للموظفين", dept: "الموارد البشرية", status: "منجزة" as Status, created: "2025-03-05", updated: "2025-04-15", progress: 100 },
  { id: "TX-2025-01133", title: "تعزيز الحماية الأمنية لمداخل المدينة", dept: "الأمن", status: "بانتظار الموافقة" as Status, created: "2025-04-29", updated: "2025-05-06", progress: 25 },
  { id: "TX-2025-01140", title: "صرف مستحقات المتعاقدين", dept: "المالية", status: "متأخرة" as Status, created: "2025-02-22", updated: "2025-04-10", progress: 50 },
  { id: "TX-2025-01154", title: "تطوير منظومة الأرشفة الإلكترونية", dept: "ديوان المحافظة", status: "قيد الإنجاز" as Status, created: "2025-04-02", updated: "2025-05-06", progress: 80 },
];

export const timeline = [
  { dept: "ديوان المحافظة", date: "2025-04-02", note: "تم استلام المعاملة وتسجيلها رسمياً" },
  { dept: "اللجنة الفنية", date: "2025-04-08", note: "تمت دراسة الجدوى الفنية والموافقة المبدئية" },
  { dept: "المالية", date: "2025-04-18", note: "تخصيص الميزانية ومراجعة الكلفة" },
  { dept: "الإعمار", date: "2025-04-28", note: "إعداد العقد والمواصفات الفنية" },
  { dept: "ديوان المحافظة", date: "2025-05-06", note: "بانتظار توقيع السيد المحافظ" },
];

export const archive = Array.from({ length: 9 }, (_, i) => ({
  id: `AR-2025-${1000 + i}`,
  title: [
    "أمر إداري بتشكيل لجنة متابعة المشاريع",
    "كتاب توصية بترقية موظفي الدرجة السادسة",
    "تعميم خاص بمواعيد الدوام الرسمي",
    "محضر اجتماع مجلس المحافظة",
    "كتاب موافقة على صرف منحة الطلبة",
    "تقرير سنوي لأداء الدوائر الخدمية",
    "أمر بشراء أجهزة حاسوب للدوائر",
    "كتاب رسمي لاستقبال وفد رسمي",
    "تعميم بإجراءات السلامة في المباني",
  ][i],
  dept: departments[i % departments.length],
  date: `2025-0${(i % 5) + 1}-${10 + i}`,
  status: i % 3 === 0 ? "نشط" : "مؤرشف",
  type: ["كتاب رسمي", "أمر إداري", "تعميم", "محضر"][i % 4],
}));

export const employees = [
  { name: "أحمد ياسين العبيدي", dept: "ديوان المحافظة", role: "مدير قسم", status: "حاضر", leaves: 2, hired: "2012-03-15" },
  { name: "نور محمد الجبوري", dept: "الموارد البشرية", role: "موظفة إدارية", status: "حاضرة", leaves: 4, hired: "2018-09-01" },
  { name: "علي حسن النعيمي", dept: "المالية", role: "محاسب أول", status: "إجازة", leaves: 7, hired: "2010-06-20" },
  { name: "سارة عبدالله الطائي", dept: "الصحة", role: "مسؤولة شعبة", status: "حاضرة", leaves: 3, hired: "2016-11-12" },
  { name: "محمد خالد الموصلي", dept: "الإعمار", role: "مهندس مدني", status: "حاضر", leaves: 1, hired: "2019-02-25" },
  { name: "ليلى سعيد العزاوي", dept: "التربية", role: "مشرفة تربوية", status: "حاضرة", leaves: 5, hired: "2014-08-08" },
  { name: "عمر فاضل الحديدي", dept: "الخدمات البلدية", role: "رئيس وحدة", status: "غائب", leaves: 0, hired: "2009-05-04" },
  { name: "هدى كريم الراوي", dept: "الأمن", role: "ضابطة ارتباط", status: "حاضرة", leaves: 2, hired: "2020-01-19" },
];

export const hrKpis = {
  employees: 2840,
  attendance: 2412,
  activeLeaves: 184,
  alerts: 12,
};

export const notifications = [
  { id: 1, title: "10 معاملات متأخرة في دائرة الخدمات البلدية", time: "قبل 5 دقائق", level: "عاجل" },
  { id: 2, title: "كتاب رسمي بانتظار موافقة المحافظ", time: "قبل 30 دقيقة", level: "مهم" },
  { id: 3, title: "تنبيه: 3 ملفات لم يتم أرشفتها بعد", time: "قبل ساعة", level: "تحذير" },
  { id: 4, title: "طلب إجازة جديد من الموظف علي حسن", time: "قبل ساعتين", level: "معلومة" },
  { id: 5, title: "اكتمال أرشفة 240 وثيقة لشهر نيسان", time: "اليوم", level: "معلومة" },
  { id: 6, title: "تأخر صرف المستحقات في دائرة المالية", time: "أمس", level: "عاجل" },
];
