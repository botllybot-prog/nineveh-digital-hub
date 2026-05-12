import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { archive, departments } from "@/lib/mock-data";
import { Search, Eye, Download, Printer, FileText, X, QrCode } from "lucide-react";

export const Route = createFileRoute("/_app/archive")({
  head: () => ({ meta: [{ title: "الأرشفة الإلكترونية - محافظة نينوى" }] }),
  component: ArchivePage,
});

function ArchivePage() {
  const [preview, setPreview] = useState<typeof archive[number] | null>(null);

  return (
    <>
      <TopBar title="الأرشفة الإلكترونية" />
      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="rounded-xl bg-card border border-border shadow-card p-5 grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="بحث عن وثيقة..."
              className="w-full h-10 rounded-lg border border-input bg-background pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
            <option>كل الأقسام</option>
            {departments.map((d) => <option key={d}>{d}</option>)}
          </select>
          <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
            <option>كل الأنواع</option>
            <option>كتاب رسمي</option>
            <option>أمر إداري</option>
            <option>تعميم</option>
            <option>محضر</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {archive.map((doc, i) => (
            <div
              key={doc.id}
              className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elegant hover:-translate-y-1 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span
                  className={`text-[11px] px-2 py-1 rounded-full border ${
                    doc.status === "نشط"
                      ? "bg-success/15 text-success border-success/30"
                      : "bg-secondary text-muted-foreground border-border"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
              <div className="text-[11px] font-mono text-primary mb-1">{doc.id}</div>
              <h3 className="font-semibold text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">{doc.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground border-t border-border pt-3">
                <div><span className="block text-[10px]">القسم</span><span className="text-foreground">{doc.dept}</span></div>
                <div><span className="block text-[10px]">التاريخ</span><span className="text-foreground">{doc.date}</span></div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <button onClick={() => setPreview(doc)} className="h-9 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> عرض
                </button>
                <button className="h-9 rounded-lg border border-input bg-background text-xs flex items-center justify-center gap-1 hover:bg-secondary">
                  <Download className="h-3.5 w-3.5" /> تحميل
                </button>
                <button className="h-9 rounded-lg border border-input bg-background text-xs flex items-center justify-center gap-1 hover:bg-secondary">
                  <Printer className="h-3.5 w-3.5" /> طباعة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up" onClick={() => setPreview(null)}>
          <div className="bg-card rounded-2xl shadow-elegant max-w-3xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">معاينة الوثيقة الرسمية</h3>
              <button onClick={() => setPreview(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-background border border-border rounded-xl p-6 min-h-[320px]">
                <div className="text-center border-b border-border pb-3 mb-3">
                  <div className="text-[11px] text-muted-foreground">جمهورية العراق</div>
                  <div className="font-bold text-sm">محافظة نينوى - {preview.dept}</div>
                </div>
                <div className="text-xs text-muted-foreground flex justify-between mb-3">
                  <span>الرقم: {preview.id}</span>
                  <span>التاريخ: {preview.date}</span>
                </div>
                <h4 className="font-bold text-center mb-4">{preview.title}</h4>
                <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                  <p>السادة الموقرون / المحترمون</p>
                  <p>تحية طيبة... استناداً إلى التعليمات النافذة وبناءً على الصلاحيات المخولة لنا، تقرر ما يلي:</p>
                  <p>• اعتماد ما ورد في الكتاب أعلاه ومتابعة تنفيذه ضمن الجدول الزمني المحدد.</p>
                  <p>• إشعار الجهات المعنية باتخاذ الإجراءات اللازمة.</p>
                  <p className="text-left mt-6">للتفضل بالاطلاع والتوقيع</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-background border border-border rounded-xl p-4 text-center">
                  <div className="bg-foreground aspect-square rounded-lg p-2 mb-2 grid grid-cols-8 grid-rows-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className={Math.random() > 0.5 ? "bg-card" : "bg-foreground"} />
                    ))}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                    <QrCode className="h-3 w-3" /> رمز التحقق
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <button className="h-9 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5"><Download className="h-3.5 w-3.5" />تحميل PDF</button>
                  <button className="h-9 rounded-lg border border-input text-xs flex items-center justify-center gap-1.5 hover:bg-secondary"><Printer className="h-3.5 w-3.5" />طباعة</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
