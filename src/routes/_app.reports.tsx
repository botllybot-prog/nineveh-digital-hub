import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { transactionsByDept, monthlyCompletion } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { Download, FileBarChart } from "lucide-react";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({ meta: [{ title: "التقارير - محافظة نينوى" }] }),
  component: ReportsPage,
});

const reports = [
  { title: "تقرير المعاملات الشهري", date: "أيار 2025", size: "2.4 MB" },
  { title: "تقرير الإنجاز الفصلي", date: "Q1 2025", size: "5.1 MB" },
  { title: "تقرير أداء الدوائر", date: "نيسان 2025", size: "3.2 MB" },
  { title: "تقرير الأرشفة الإلكترونية", date: "أيار 2025", size: "1.8 MB" },
];

function downloadReport(report: (typeof reports)[number]) {
  const rows = [
    ["التقرير", report.title],
    ["الفترة", report.date],
    ["الحجم التقديري", report.size],
    [],
    ["القسم", "عدد المعاملات"],
    ...transactionsByDept.map((item) => [item.dept, item.value.toString()]),
  ];
  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${report.title}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function ReportsPage() {
  return (
    <>
      <TopBar title="التقارير والإحصائيات" />
      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="rounded-xl bg-card border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">توزيع المعاملات حسب الأقسام</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={transactionsByDept} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 180)" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="dept" type="category" tick={{ fontSize: 11 }} width={110} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="oklch(0.45 0.1 175)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl bg-card border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">منحنى الإنجاز السنوي</h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyCompletion}>
                <defs><linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.72 0.13 75)" stopOpacity={0.6} /><stop offset="100%" stopColor="oklch(0.72 0.13 75)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 180)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="value" stroke="oklch(0.72 0.13 75)" strokeWidth={2.5} fill="url(#areaFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border"><h3 className="font-bold">التقارير الجاهزة</h3></div>
          <div className="divide-y divide-border">
            {reports.map((report) => (
              <div key={report.title} className="px-5 py-4 flex items-center gap-4 hover:bg-secondary/40 transition">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant"><FileBarChart className="h-5 w-5 text-primary-foreground" /></div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{report.title}</div>
                  <div className="text-xs text-muted-foreground">{report.date} - {report.size}</div>
                </div>
                <button onClick={() => downloadReport(report)} className="h-9 px-4 rounded-lg bg-gradient-primary text-primary-foreground text-xs font-semibold flex items-center gap-2 shadow-elegant"><Download className="h-3.5 w-3.5" /> تحميل</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
