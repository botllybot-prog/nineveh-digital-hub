import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { departments, timeline, type Status } from "@/lib/mock-data";
import {
  statuses,
  today,
  type Transaction,
  useEditableData,
} from "@/lib/editable-data";
import {
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Hourglass,
  Save,
  Trash2,
  X,
  Pencil,
} from "lucide-react";

export const Route = createFileRoute("/_app/transactions")({
  head: () => ({ meta: [{ title: "تتبع المعاملات - محافظة نينوى" }] }),
  component: TransactionsPage,
});

const statusStyle: Record<Status, { cls: string; icon: typeof Clock }> = {
  "قيد الإنجاز": { cls: "bg-info/15 text-info border-info/30", icon: Clock },
  "منجزة": { cls: "bg-success/15 text-success border-success/30", icon: CheckCircle2 },
  "متأخرة": { cls: "bg-destructive/15 text-destructive border-destructive/30", icon: AlertCircle },
  "بانتظار الموافقة": { cls: "bg-warning/20 text-warning-foreground border-warning/40", icon: Hourglass },
};

function StatusBadge({ status }: { status: Status }) {
  const s = statusStyle[status];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${s.cls}`}>
      <Icon className="h-3 w-3" />
      {status}
    </span>
  );
}

const blankTransaction = (): Transaction => ({
  id: `TX-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
  title: "",
  dept: departments[0],
  status: "قيد الإنجاز",
  created: today(),
  updated: today(),
  progress: 0,
});

function TransactionsPage() {
  const { data, upsertTransaction, deleteTransaction } = useEditableData();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "الكل">("الكل");
  const [showFilters, setShowFilters] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [selectedId, setSelectedId] = useState(data.transactions[0]?.id ?? "");

  const filtered = useMemo(
    () =>
      data.transactions.filter((item) => {
        const matchesQuery = `${item.id} ${item.title} ${item.dept}`.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = statusFilter === "الكل" || item.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [data.transactions, query, statusFilter],
  );

  const selected = data.transactions.find((item) => item.id === selectedId) ?? filtered[0];

  const save = () => {
    if (!editing || !editing.title.trim()) return;
    upsertTransaction({ ...editing, updated: today(), progress: Number(editing.progress) });
    setSelectedId(editing.id);
    setEditing(null);
  };

  return (
    <>
      <TopBar title="تتبع المعاملات" />
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث برقم المعاملة أو العنوان..."
              className="w-full h-10 rounded-lg border border-input bg-card pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button onClick={() => setShowFilters((value) => !value)} className="h-10 px-4 rounded-lg border border-input bg-card text-sm flex items-center gap-2 hover:bg-secondary transition">
            <Filter className="h-4 w-4" /> تصفية
          </button>
          <button onClick={() => setEditing(blankTransaction())} className="h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant flex items-center gap-2">
            <Plus className="h-4 w-4" /> معاملة جديدة
          </button>
        </div>

        {showFilters && (
          <div className="rounded-xl bg-card border border-border shadow-card p-4 flex flex-wrap gap-3">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as Status | "الكل")} className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
              <option>الكل</option>
              {statuses.map((status) => <option key={status}>{status}</option>)}
            </select>
            <button onClick={() => { setQuery(""); setStatusFilter("الكل"); }} className="h-10 px-4 rounded-lg border border-input text-sm hover:bg-secondary">مسح الفلاتر</button>
          </div>
        )}

        <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold">رقم المعاملة</th>
                  <th className="px-4 py-3 font-semibold">العنوان</th>
                  <th className="px-4 py-3 font-semibold">القسم الحالي</th>
                  <th className="px-4 py-3 font-semibold">الحالة</th>
                  <th className="px-4 py-3 font-semibold">آخر تحديث</th>
                  <th className="px-4 py-3 font-semibold">الإنجاز</th>
                  <th className="px-4 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} onClick={() => setSelectedId(item.id)} className={`border-t border-border hover:bg-secondary/40 cursor-pointer transition ${selected?.id === item.id ? "bg-primary/5" : ""}`}>
                    <td className="px-4 py-3 font-mono text-xs text-primary font-semibold">{item.id}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{item.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.dept}</td>
                    <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{item.updated}</td>
                    <td className="px-4 py-3 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gradient-primary" style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold w-9 text-left">{item.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={(event) => { event.stopPropagation(); setEditing(item); }} className="h-8 w-8 rounded-lg border border-input hover:bg-secondary flex items-center justify-center" aria-label="تعديل">
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={(event) => { event.stopPropagation(); deleteTransaction(item.id); }} className="h-8 w-8 rounded-lg border border-input text-destructive hover:bg-destructive/10 flex items-center justify-center" aria-label="حذف">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selected && (
          <div className="rounded-xl bg-card border border-border shadow-card p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold">المسار الإداري للمعاملة</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="font-mono text-primary">{selected.id}</span> - {selected.title}
                </p>
              </div>
              <StatusBadge status={selected.status} />
            </div>
            <div className="relative pr-6 border-r-2 border-dashed border-border space-y-6">
              {timeline.map((step, i) => (
                <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className={`absolute -right-[34px] top-1 h-5 w-5 rounded-full border-4 border-background ${i === timeline.length - 1 ? "bg-accent animate-pulse" : "bg-primary"}`} />
                  <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-sm">{step.dept}</div>
                      <div className="text-xs text-muted-foreground">{step.date}</div>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{data.transactions.some((item) => item.id === editing.id) ? "تعديل معاملة" : "معاملة جديدة"}</h3>
              <button onClick={() => setEditing(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm space-y-1 md:col-span-2">العنوان
                <input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" />
              </label>
              <label className="text-sm space-y-1">القسم
                <select value={editing.dept} onChange={(event) => setEditing({ ...editing, dept: event.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3">
                  {departments.map((dept) => <option key={dept}>{dept}</option>)}
                </select>
              </label>
              <label className="text-sm space-y-1">الحالة
                <select value={editing.status} onChange={(event) => setEditing({ ...editing, status: event.target.value as Status })} className="w-full h-10 rounded-lg border border-input bg-background px-3">
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
              <label className="text-sm space-y-1">نسبة الإنجاز
                <input type="number" min="0" max="100" value={editing.progress} onChange={(event) => setEditing({ ...editing, progress: Number(event.target.value) })} className="w-full h-10 rounded-lg border border-input bg-background px-3" />
              </label>
              <label className="text-sm space-y-1">تاريخ الإنشاء
                <input type="date" value={editing.created} onChange={(event) => setEditing({ ...editing, created: event.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" />
              </label>
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
