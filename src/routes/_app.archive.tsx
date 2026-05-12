import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { departments } from "@/lib/mock-data";
import { today, type ArchiveDocument, useEditableData } from "@/lib/editable-data";
import { Search, Eye, Download, Printer, FileText, X, QrCode, Plus, Save, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_app/archive")({
  head: () => ({ meta: [{ title: "الأرشفة الإلكترونية - محافظة نينوى" }] }),
  component: ArchivePage,
});

const documentTypes = ["كتاب رسمي", "أمر إداري", "تعميم", "محضر"];

function blankDocument(): ArchiveDocument {
  return {
    id: `AR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 8999)}`,
    title: "",
    dept: departments[0],
    date: today(),
    status: "نشط",
    type: documentTypes[0],
  };
}

function downloadDocument(doc: ArchiveDocument) {
  const blob = new Blob([
    `محافظة نينوى\nالرقم: ${doc.id}\nالتاريخ: ${doc.date}\nالقسم: ${doc.dept}\nالنوع: ${doc.type}\n\n${doc.title}\n`,
  ], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${doc.id}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function ArchivePage() {
  const { data, upsertArchive, deleteArchive } = useEditableData();
  const [preview, setPreview] = useState<ArchiveDocument | null>(null);
  const [editing, setEditing] = useState<ArchiveDocument | null>(null);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("كل الأقسام");
  const [type, setType] = useState("كل الأنواع");

  const documents = useMemo(
    () =>
      data.archive.filter((doc) => {
        const matchesQuery = `${doc.id} ${doc.title} ${doc.dept} ${doc.type}`.toLowerCase().includes(query.toLowerCase());
        const matchesDept = dept === "كل الأقسام" || doc.dept === dept;
        const matchesType = type === "كل الأنواع" || doc.type === type;
        return matchesQuery && matchesDept && matchesType;
      }),
    [data.archive, query, dept, type],
  );

  const save = () => {
    if (!editing || !editing.title.trim()) return;
    upsertArchive(editing);
    setEditing(null);
  };

  return (
    <>
      <TopBar title="الأرشفة الإلكترونية" />
      <div className="p-6 space-y-6">
        <div className="rounded-xl bg-card border border-border shadow-card p-5 grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2 relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث عن وثيقة..." className="w-full h-10 rounded-lg border border-input bg-background pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={dept} onChange={(event) => setDept(event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
            <option>كل الأقسام</option>
            {departments.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={type} onChange={(event) => setType(event.target.value)} className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
            <option>كل الأنواع</option>
            {documentTypes.map((item) => <option key={item}>{item}</option>)}
          </select>
          <button onClick={() => setEditing(blankDocument())} className="h-10 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 shadow-elegant">
            <Plus className="h-4 w-4" /> وثيقة جديدة
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, i) => (
            <div key={doc.id} className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elegant hover:-translate-y-1 transition-all animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className={`text-[11px] px-2 py-1 rounded-full border ${doc.status === "نشط" ? "bg-success/15 text-success border-success/30" : "bg-secondary text-muted-foreground border-border"}`}>{doc.status}</span>
              </div>
              <div className="text-[11px] font-mono text-primary mb-1">{doc.id}</div>
              <h3 className="font-semibold text-sm leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">{doc.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-muted-foreground border-t border-border pt-3">
                <div><span className="block text-[10px]">القسم</span><span className="text-foreground">{doc.dept}</span></div>
                <div><span className="block text-[10px]">التاريخ</span><span className="text-foreground">{doc.date}</span></div>
              </div>
              <div className="grid grid-cols-5 gap-2 mt-4">
                <button onClick={() => setPreview(doc)} className="h-9 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1"><Eye className="h-3.5 w-3.5" />عرض</button>
                <button onClick={() => downloadDocument(doc)} className="h-9 rounded-lg border border-input bg-background text-xs flex items-center justify-center hover:bg-secondary"><Download className="h-3.5 w-3.5" /></button>
                <button onClick={() => window.print()} className="h-9 rounded-lg border border-input bg-background text-xs flex items-center justify-center hover:bg-secondary"><Printer className="h-3.5 w-3.5" /></button>
                <button onClick={() => setEditing(doc)} className="h-9 rounded-lg border border-input bg-background text-xs flex items-center justify-center hover:bg-secondary"><Pencil className="h-3.5 w-3.5" /></button>
                <button onClick={() => deleteArchive(doc.id)} className="h-9 rounded-lg border border-input text-destructive text-xs flex items-center justify-center hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-up" onClick={() => setPreview(null)}>
          <div className="bg-card rounded-2xl shadow-elegant max-w-3xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">معاينة الوثيقة الرسمية</h3>
              <button onClick={() => setPreview(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
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
                <p className="text-sm leading-relaxed text-muted-foreground">تم إنشاء هذه الوثيقة داخل منصة التحول الرقمي، ويمكن تعديل بياناتها أو تحميلها أو طباعتها من الأزرار المخصصة.</p>
              </div>
              <div className="space-y-3">
                <div className="bg-background border border-border rounded-xl p-4 text-center">
                  <div className="bg-foreground aspect-square rounded-lg p-2 mb-2 grid grid-cols-8 grid-rows-8 gap-0.5">
                    {Array.from({ length: 64 }).map((_, i) => <div key={i} className={(i + preview.id.length) % 3 === 0 ? "bg-card" : "bg-foreground"} />)}
                  </div>
                  <div className="text-[10px] text-muted-foreground flex items-center justify-center gap-1"><QrCode className="h-3 w-3" /> رمز التحقق</div>
                </div>
                <button onClick={() => downloadDocument(preview)} className="w-full h-9 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-1.5"><Download className="h-3.5 w-3.5" />تحميل</button>
                <button onClick={() => window.print()} className="w-full h-9 rounded-lg border border-input text-xs flex items-center justify-center gap-1.5 hover:bg-secondary"><Printer className="h-3.5 w-3.5" />طباعة</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">بيانات الوثيقة</h3>
              <button onClick={() => setEditing(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm space-y-1 md:col-span-2">العنوان<input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
              <label className="text-sm space-y-1">القسم<select value={editing.dept} onChange={(e) => setEditing({ ...editing, dept: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3">{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-sm space-y-1">النوع<select value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3">{documentTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-sm space-y-1">الحالة<select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3"><option>نشط</option><option>مؤرشف</option></select></label>
              <label className="text-sm space-y-1">التاريخ<input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="h-10 px-4 rounded-lg border border-input hover:bg-secondary">إلغاء</button>
              <button onClick={save} className="h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground font-semibold flex items-center gap-2"><Save className="h-4 w-4" /> حفظ</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
