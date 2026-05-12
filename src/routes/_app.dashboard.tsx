import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Archive,
  Users,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { kpis, transactionsByDept, monthlyCompletion, lateByDept } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [{ title: "لوحة المحافظ - محافظة نينوى" }],
  }),
  component: DashboardPage,
});

const kpiCards = [
  { label: "عدد المعاملات الكلي", value: kpis.total.toLocaleString("ar-EG"), icon: FileText, color: "from-primary to-primary-glow", trend: "+12%" },
  { label: "المعاملات المنجزة", value: kpis.done.toLocaleString("ar-EG"), icon: CheckCircle2, color: "from-success to-success", trend: "+8%" },
  { label: "المعاملات المتأخرة", value: kpis.late.toLocaleString("ar-EG"), icon: AlertTriangle, color: "from-destructive to-destructive", trend: "-3%" },
  { label: "الكتب المؤرشفة", value: kpis.archived.toLocaleString("ar-EG"), icon: Archive, color: "from-info to-info", trend: "+15%" },
  { label: "عدد الموظفين", value: kpis.employees.toLocaleString("ar-EG"), icon: Users, color: "from-accent to-accent", trend: "+1%" },
  { label: "نسبة الإنجاز", value: kpis.completionRate + "%", icon: TrendingUp, color: "from-primary to-primary-glow", trend: "+5%" },
];

const COLORS = ["oklch(0.45 0.1 175)", "oklch(0.62 0.15 155)", "oklch(0.72 0.13 75)", "oklch(0.6 0.13 240)", "oklch(0.58 0.22 25)", "oklch(0.5 0.1 200)", "oklch(0.55 0.12 130)"];

function DashboardPage() {
  return (
    <>
      <TopBar title="لوحة المحافظ" />
      <div className="p-6 space-y-6">
        {/* Welcome */}
        <div className="rounded-2xl bg-gradient-hero text-primary-foreground p-6 shadow-elegant relative overflow-hidden animate-fade-up">
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="text-xs text-accent mb-1">{new Date().toLocaleDateString("ar-IQ", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
            <h2 className="text-2xl md:text-3xl font-bold">مرحباً بكم في لوحة متابعة المحافظ</h2>
            <p className="text-white/80 mt-2 text-sm max-w-2xl">
              نظرة شاملة وفورية على أداء جميع دوائر محافظة نينوى، حالة المعاملات،
              نسب الإنجاز، والإشعارات الحرجة.
            </p>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiCards.map((k, i) => (
            <div
              key={k.label}
              className="rounded-xl bg-card border border-border shadow-card p-4 hover:shadow-elegant hover:-translate-y-0.5 transition-all animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${k.color} flex items-center justify-center mb-3 shadow-elegant`}>
                <k.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="text-[11px] text-muted-foreground mb-1">{k.label}</div>
              <div className="text-2xl font-bold">{k.value}</div>
              <div className="text-[11px] text-success mt-1">{k.trend} مقارنة بالشهر الماضي</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 rounded-xl bg-card border border-border shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">معاملات حسب الأقسام</h3>
              <span className="text-xs text-muted-foreground">آخر 30 يوم</span>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={transactionsByDept}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 180)" />
                <XAxis dataKey="dept" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="value" fill="oklch(0.45 0.1 175)" radius={[6, 6, 0, 0]} name="المعاملات" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl bg-card border border-border shadow-card p-5">
            <h3 className="font-bold mb-4">المعاملات المتأخرة</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={lateByDept} dataKey="value" nameKey="dept" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {lateByDept.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl bg-card border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">نسبة الإنجاز الشهرية</h3>
            <span className="text-xs text-muted-foreground">2025</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={monthlyCompletion}>
              <defs>
                <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.45 0.1 175)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="oklch(0.45 0.1 175)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 180)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="%" />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="value" stroke="oklch(0.45 0.1 175)" strokeWidth={3} dot={{ r: 5, fill: "oklch(0.72 0.13 75)" }} name="الإنجاز %" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
