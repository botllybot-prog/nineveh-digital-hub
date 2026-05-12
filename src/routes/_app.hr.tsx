import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { departments, hrKpis } from "@/lib/mock-data";
import { today, type Employee, useEditableData } from "@/lib/editable-data";
import { Users, UserCheck, CalendarDays, AlertTriangle, Plus, Pencil, Trash2, Save, X } from "lucide-react";

export const Route = createFileRoute("/_app/hr")({
  head: () => ({ meta: [{ title: "الموارد البشرية - محافظة نينوى" }] }),
  component: HRPage,
});

function blankEmployee(): Employee {
  return { name: "", dept: departments[0], role: "", status: "حاضر", leaves: 0, hired: today() };
}

function HRPage() {
  const { data, upsertEmployee, deleteEmployee } = useEditableData();
  const [editing, setEditing] = useState<Employee | null>(null);
  const cards = [
    { label: "عدد الموظفين", value: hrKpis.employees.toLocaleString("ar-EG"), icon: Users, color: "from-primary to-primary-glow" },
    { label: "الحضور اليومي", value: hrKpis.attendance.toLocaleString("ar-EG"), icon: UserCheck, color: "from-success to-success" },
    { label: "الإجازات النشطة", value: hrKpis.activeLeaves.toLocaleString("ar-EG"), icon: CalendarDays, color: "from-info to-info" },
    { label: "التنبيهات الإدارية", value: hrKpis.alerts.toLocaleString("ar-EG"), icon: AlertTriangle, color: "from-destructive to-destructive" },
  ];

  const save = () => {
    if (!editing || !editing.name.trim()) return;
    upsertEmployee({ ...editing, leaves: Number(editing.leaves) });
    setEditing(null);
  };

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
            <div>
              <h3 className="font-bold">قائمة الموظفين</h3>
              <span className="text-xs text-muted-foreground">عرض {data.employees.length} من {hrKpis.employees}</span>
            </div>
            <button onClick={() => setEditing(blankEmployee())} className="h-9 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-sm font-semibold flex items-center gap-2"><Plus className="h-4 w-4" /> موظف جديد</button>
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
                  <th className="px-4 py-3 font-semibold">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((employee) => (
                  <tr key={employee.name} className="border-t border-border hover:bg-secondary/40 transition">
                    <td className="px-4 py-3 font-medium">{employee.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{employee.dept}</td>
                    <td className="px-4 py-3">{employee.role}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[11px] px-2 py-1 rounded-full border font-semibold ${employee.status === "إجازة" ? "bg-warning/20 text-warning-foreground border-warning/40" : employee.status === "غائب" ? "bg-destructive/15 text-destructive border-destructive/30" : "bg-success/15 text-success border-success/30"}`}>{employee.status}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{employee.leaves} يوم</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">{employee.hired}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(employee)} className="h-8 w-8 rounded-lg border border-input hover:bg-secondary flex items-center justify-center"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => deleteEmployee(employee.name)} className="h-8 w-8 rounded-lg border border-input text-destructive hover:bg-destructive/10 flex items-center justify-center"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">بيانات الموظف</h3>
              <button onClick={() => setEditing(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="text-sm space-y-1">الاسم<input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
              <label className="text-sm space-y-1">القسم<select value={editing.dept} onChange={(e) => setEditing({ ...editing, dept: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3">{departments.map((item) => <option key={item}>{item}</option>)}</select></label>
              <label className="text-sm space-y-1">المنصب<input value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
              <label className="text-sm space-y-1">الحالة<select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3"><option>حاضر</option><option>حاضرة</option><option>إجازة</option><option>غائب</option></select></label>
              <label className="text-sm space-y-1">الإجازات<input type="number" value={editing.leaves} onChange={(e) => setEditing({ ...editing, leaves: Number(e.target.value) })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
              <label className="text-sm space-y-1">تاريخ التعيين<input type="date" value={editing.hired} onChange={(e) => setEditing({ ...editing, hired: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3" /></label>
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
