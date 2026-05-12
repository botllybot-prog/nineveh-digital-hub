import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { employees, hrKpis } from "@/lib/mock-data";
import { Users, UserCheck, CalendarDays, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_app/hr")({
  head: () => ({ meta: [{ title: "الموارد البشرية - محافظة نينوى" }] }),
  component: HRPage,
});

const cards = [
  { label: "عدد الموظفين", value: hrKpis.employees.toLocaleString("ar-EG"), icon: Users, color: "from-primary to-primary-glow" },
  { label: "الحضور اليومي", value: hrKpis.attendance.toLocaleString("ar-EG"), icon: UserCheck, color: "from-success to-success" },
  { label: "الإجازات النشطة", value: hrKpis.activeLeaves.toLocaleString("ar-EG"), icon: CalendarDays, color: "from-info to-info" },
  { label: "التنبيهات الإدارية", value: hrKpis.alerts.toLocaleString("ar-EG"), icon: AlertTriangle, color: "from-destructive to-destructive" },
];

function HRPage() {
  return (
    <>
      <TopBar title="الموارد البشرية" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <div key={c.label} className="rounded-xl bg-card border border-border shadow-card p-5 hover:shadow-elegant transition-all animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center mb-3 shadow-elegant`}>
                <c.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-xs text-muted-foreground">{c.label}</div>
              <div className="text-2xl font-bold mt-1">{c.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-bold">قائمة الموظفين</h3>
            <span className="text-xs text-muted-foreground">عرض {employees.length} من {hrKpis.employees}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs">
                <tr className="text-right">
                  <th className="px-4 py-3 font-semibold">الاسم</th>
                  <th className="px-4 py-3 font-semibold">القسم</th>
                  <th className="px-4 py-3 font-semibold">المنصب</th>
                  <th className="px-4 py-3 font-semibold">الحالة</th>
                  <th className="px-4 py-3 font-semibold">الإجازات</th>
                  <th className="px-4 py-3 font-semibold">تاريخ التعيين</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.name} className="border-t border-border hover:bg-secondary/40 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {e.name.split(" ")[0][0]}
                        </div>
                        <span className="font-medium">{e.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{e.dept}</td>
                    <td className="px-4 py-3">{e.role}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-1 rounded-full border font-semibold ${
                        e.status === "إجازة" ? "bg-warning/20 text-warning-foreground border-warning/40"
                        : e.status === "غائب" ? "bg-destructive/15 text-destructive border-destructive/30"
                        : "bg-success/15 text-success border-success/30"
                      }`}>{e.status}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{e.leaves} يوم</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{e.hired}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
