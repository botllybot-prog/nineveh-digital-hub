import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/top-bar";
import { notifications } from "@/lib/mock-data";
import { AlertTriangle, Bell, Info, AlertCircle, Check } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "مركز الإشعارات - محافظة نينوى" }] }),
  component: NotificationsPage,
});

const levelMap: Record<string, { cls: string; icon: typeof Bell }> = {
  "عاجل": { cls: "bg-destructive/15 text-destructive border-destructive/30", icon: AlertCircle },
  "مهم": { cls: "bg-warning/20 text-warning-foreground border-warning/40", icon: AlertTriangle },
  "تحذير": { cls: "bg-accent/20 text-accent-foreground border-accent/40", icon: AlertTriangle },
  "معلومة": { cls: "bg-info/15 text-info border-info/30", icon: Info },
};

function NotificationsPage() {
  return (
    <>
      <TopBar title="مركز الإشعارات" />
      <div className="p-6 space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">الإشعارات والتنبيهات</h2>
            <p className="text-xs text-muted-foreground mt-1">جميع التنبيهات الفورية من جميع الدوائر</p>
          </div>
          <button className="h-9 px-4 rounded-lg border border-input bg-card text-sm flex items-center gap-2 hover:bg-secondary">
            <Check className="h-4 w-4" /> تعليم الكل كمقروء
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n, i) => {
            const lvl = levelMap[n.level];
            const Icon = lvl.icon;
            return (
              <div key={n.id} className="rounded-xl bg-card border border-border shadow-card p-4 flex items-start gap-4 hover:shadow-elegant transition-all animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`h-11 w-11 rounded-lg border flex items-center justify-center shrink-0 ${lvl.cls}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${lvl.cls}`}>{n.level}</span>
                    <span className="text-[11px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-sm font-medium">{n.title}</p>
                </div>
                <button className="text-xs text-primary hover:underline shrink-0">عرض التفاصيل</button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
