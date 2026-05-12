import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { useEditableData } from "@/lib/editable-data";
import { Building2, Bell, Lock, Globe, Palette, Save, X } from "lucide-react";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "الإعدادات - محافظة نينوى" }] }),
  component: SettingsPage,
});

const sections = [
  { key: "institution", icon: Building2, title: "بيانات المؤسسة", desc: "اسم المحافظة، الشعار، التفاصيل الرسمية" },
  { key: "notifications", icon: Bell, title: "تفضيلات الإشعارات", desc: "تحكم في أنواع التنبيهات الواردة" },
  { key: "security", icon: Lock, title: "الأمان والصلاحيات", desc: "إدارة المستخدمين، الأدوار، وكلمات المرور" },
  { key: "locale", icon: Globe, title: "اللغة والمنطقة", desc: "العربية - بغداد (UTC+3)" },
  { key: "appearance", icon: Palette, title: "المظهر", desc: "الوضع الفاتح، حجم الخط، ألوان النظام" },
];

function SettingsPage() {
  const { data, updateSetting } = useEditableData();
  const [editing, setEditing] = useState<{ key: string; title: string; value: string } | null>(null);

  return (
    <>
      <TopBar title="الإعدادات" />
      <div className="p-6 space-y-4 max-w-3xl">
        {sections.map((section, i) => (
          <div key={section.key} className="rounded-xl bg-card border border-border shadow-card p-5 flex items-center gap-4 hover:shadow-elegant transition-all animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-elegant">
              <section.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-bold">{section.title}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{data.settings[section.key] || section.desc}</div>
            </div>
            <button onClick={() => setEditing({ key: section.key, title: section.title, value: data.settings[section.key] || "" })} className="h-9 px-4 rounded-lg border border-input text-sm hover:bg-secondary">تعديل</button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">{editing.title}</h3>
              <button onClick={() => setEditing(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <textarea value={editing.value} onChange={(event) => setEditing({ ...editing, value: event.target.value })} className="w-full min-h-28 rounded-lg border border-input bg-background p-3 text-sm" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="h-10 px-4 rounded-lg border border-input hover:bg-secondary">إلغاء</button>
              <button onClick={() => { updateSetting(editing.key, editing.value); setEditing(null); }} className="h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground font-semibold flex items-center gap-2"><Save className="h-4 w-4" /> حفظ</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
