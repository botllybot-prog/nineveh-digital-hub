import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { transactions, timeline, type Status } from "@/lib/mock-data";
import { Search, Filter, Plus, Clock, CheckCircle2, AlertCircle, Hourglass } from "lucide-react";

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

function TransactionsPage() {
  const [selected, setSelected] = useState(transactions[9]);

  return (
    <>
      <TopBar title="تتبع المعاملات" />
      <div className="p-6 space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="ابحث برقم المعاملة أو العنوان..."
              className="w-full h-10 rounded-lg border border-input bg-card pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="h-10 px-4 rounded-lg border border-input bg-card text-sm flex items-center gap-2 hover:bg-secondary transition">
            <Filter className="h-4 w-4" /> تصفية
          </button>
          <button className="h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold shadow-elegant flex items-center gap-2">
            <Plus className="h-4 w-4" /> معاملة جديدة
          </button>
        </div>

        <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold">رقم المعاملة</th>
                  <th className="px-4 py-3 font-semibold">العنوان</th>
                  <th className="px-4 py-3 font-semibold">القسم الحالي</th>
                  <th className="px-4 py-3 font-semibold">الحالة</th>
                  <th className="px-4 py-3 font-semibold">تاريخ الإنشاء</th>
                  <th className="px-4 py-3 font-semibold">آخر تحديث</th>
                  <th className="px-4 py-3 font-semibold">نسبة الإنجاز</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelected(t)}
                    className={`border-t border-border hover:bg-secondary/40 cursor-pointer transition ${
                      selected.id === t.id ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-primary font-semibold">{t.id}</td>
                    <td className="px-4 py-3 max-w-xs truncate">{t.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.dept}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{t.created}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{t.updated}</td>
                    <td className="px-4 py-3 w-40">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-gradient-primary" style={{ width: `${t.progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold w-9 text-left">{t.progress}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl bg-card border border-border shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold">المسار الإداري للمعاملة</h3>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="font-mono text-primary">{selected.id}</span> — {selected.title}
              </p>
            </div>
            <StatusBadge status={selected.status} />
          </div>

          <div className="relative pr-6 border-r-2 border-dashed border-border space-y-6">
            {timeline.map((step, i) => (
              <div key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div
                  className={`absolute -right-[34px] top-1 h-5 w-5 rounded-full border-4 border-background ${
                    i === timeline.length - 1 ? "bg-accent animate-pulse" : "bg-primary"
                  }`}
                />
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
      </div>
    </>
  );
}
