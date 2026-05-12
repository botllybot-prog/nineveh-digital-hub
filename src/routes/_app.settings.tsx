import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { Building2, Bell, Lock, Globe, Palette } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "الإعدادات - محافظة نينوى" }] }),
  component: SettingsPage,
});

const sections = [
  { icon: Building2, title: "بيانات المؤسسة", desc: "اسم المحافظة، الشعار، التفاصيل الرسمية" },
  { icon: Bell, title: "تفضيلات الإشعارات", desc: "تحكم في أنواع التنبيهات الواردة" },
  { icon: Lock, title: "الأمان والصلاحيات", desc: "إدارة المستخدمين، الأدوار، وكلمات المرور" },
  { icon: Globe, title: "اللغة والمنطقة", desc: "العربية - بغداد (UTC+3)" },
  { icon: Palette, title: "المظهر", desc: "الوضع الفاتح، حجم الخط، ألوان النظام" },
];

function SettingsPage() {
  return (
    <>
      <TopBar title="الإعدادات" />
      <div className="p-6 space-y-4 max-w-3xl">
        {sections.map((s, i) => (
          <div key={s.title} className="rounded-xl bg-card border border-border shadow-card p-5 flex items-center gap-4 hover:shadow-elegant transition-all animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
              <s.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-bold">{s.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
            </div>
            <button className="h-9 px-4 rounded-lg border border-input text-sm hover:bg-secondary">تعديل</button>
          </div>
        ))}
      </div>
    </>
  );
}
