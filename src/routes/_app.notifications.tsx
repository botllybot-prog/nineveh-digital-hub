import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TopBar } from "@/components/top-bar";
import { useEditableData, type NotificationItem } from "@/lib/editable-data";
import { AlertTriangle, Bell, Info, AlertCircle, Check, X } from "lucide-react";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({ meta: [{ title: "مركز الإشعارات - محافظة نينوى" }] }),
  component: NotificationsPage,
});

const levelMap: Record<string, { cls: string; icon: typeof Bell }> = {
  عاجل: { cls: "bg-destructive/15 text-destructive border-destructive/30", icon: AlertCircle },
  مهم: { cls: "bg-warning/20 text-warning-foreground border-warning/40", icon: AlertTriangle },
  تحذير: { cls: "bg-accent/20 text-accent-foreground border-accent/40", icon: AlertTriangle },
  معلومة: { cls: "bg-info/15 text-info border-info/30", icon: Info },
};

function NotificationsPage() {
  const { data, markNotificationsRead, updateNotification } = useEditableData();
  const [details, setDetails] = useState<NotificationItem | null>(null);

  return (
    <>
      <TopBar title="مركز الإشعارات" />
      <div className="p-6 space-y-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">الإشعارات والتنبيهات</h2>
            <p className="text-xs text-muted-foreground mt-1">جميع التنبيهات الفورية من جميع الدوائر</p>
          </div>
          <button onClick={markNotificationsRead} className="h-9 px-4 rounded-lg border border-input bg-card text-sm flex items-center gap-2 hover:bg-secondary">
            <Check className="h-4 w-4" /> تعليم الكل كمقروء
          </button>
        </div>

        <div className="space-y-3">
          {data.notifications.map((item, i) => {
            const lvl = levelMap[item.level] ?? levelMap["معلومة"];
            const Icon = lvl.icon;
            return (
              <div key={item.id} className={`rounded-xl bg-card border shadow-card p-4 flex items-start gap-4 hover:shadow-elegant transition-all animate-fade-up ${item.read ? "border-border opacity-70" : "border-primary/30"}`} style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`h-11 w-11 rounded-lg border flex items-center justify-center shrink-0 ${lvl.cls}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full border font-semibold ${lvl.cls}`}>{item.level}</span>
                    <span className="text-[11px] text-muted-foreground">{item.time}</span>
                    {!item.read && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
                <button onClick={() => { updateNotification(item.id, { read: true }); setDetails(item); }} className="text-xs text-primary hover:underline shrink-0">عرض التفاصيل</button>
              </div>
            );
          })}
        </div>
      </div>

      {details && (
        <div className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-elegant max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold">تفاصيل الإشعار</h3>
              <button onClick={() => setDetails(null)} className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center"><X className="h-4 w-4" /></button>
            </div>
            <div className="text-xs text-muted-foreground">{details.level} - {details.time}</div>
            <p className="text-sm leading-relaxed">{details.title}</p>
            <button onClick={() => setDetails(null)} className="h-10 px-4 rounded-lg bg-gradient-primary text-primary-foreground font-semibold">تم</button>
          </div>
        </div>
      )}
    </>
  );
}
