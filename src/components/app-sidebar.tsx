import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Archive,
  Users,
  Bell,
  BarChart3,
  Settings,
  LogOut,
  Building2,
} from "lucide-react";
import logo from "@/assets/nineveh-logo.png";

const items = [
  { title: "الرئيسية", url: "/dashboard", icon: LayoutDashboard },
  { title: "تتبع المعاملات", url: "/transactions", icon: FileText },
  { title: "الأرشفة", url: "/archive", icon: Archive },
  { title: "الموارد البشرية", url: "/hr", icon: Users },
  { title: "الإشعارات", url: "/notifications", icon: Bell },
  { title: "التقارير", url: "/reports", icon: BarChart3 },
  { title: "الإعدادات", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground border-l border-sidebar-border">
      <div className="px-5 py-5 border-b border-sidebar-border flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gradient-gold flex items-center justify-center shadow-elegant">
          <Building2 className="h-6 w-6 text-sidebar-primary-foreground" />
        </div>
        <div>
          <div className="text-sm font-bold leading-tight">محافظة نينوى</div>
          <div className="text-[11px] text-sidebar-foreground/70">منصة التحول الرقمي</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant font-semibold"
                  : "text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/85 hover:bg-sidebar-accent transition"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Link>
        <div className="mt-3 flex items-center gap-2 px-2 opacity-80">
          <img src={logo} alt="" className="h-8 w-8" loading="lazy" />
          <div className="text-[10px] text-sidebar-foreground/60 leading-tight">
            جمهورية العراق
            <br />© 2025 محافظة نينوى
          </div>
        </div>
      </div>
    </aside>
  );
}
