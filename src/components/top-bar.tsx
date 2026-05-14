import { createContext, useContext, type ReactNode } from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";

const TopBarContext = createContext<{ onMenuClick?: () => void }>({});

export function TopBarProvider({
  children,
  onMenuClick,
}: {
  children: ReactNode;
  onMenuClick?: () => void;
}) {
  return <TopBarContext.Provider value={{ onMenuClick }}>{children}</TopBarContext.Provider>;
}

export function TopBar({ title }: { title: string }) {
  const { onMenuClick } = useContext(TopBarContext);

  return (
    <header className="min-h-16 bg-card/80 backdrop-blur border-b border-border flex items-center gap-3 px-3 sm:px-6 sticky top-0 z-10">
      <button
        type="button"
        onClick={onMenuClick}
        className="md:hidden h-10 w-10 rounded-lg border border-input bg-background flex items-center justify-center hover:bg-secondary"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="min-w-0">
        <h1 className="text-base sm:text-lg font-bold text-foreground truncate">{title}</h1>
        <p className="text-[11px] sm:text-xs text-muted-foreground truncate">منصة التحول الرقمي - محافظة نينوى</p>
      </div>

      <div className="flex-1 max-w-md mx-auto hidden lg:block">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="البحث عن معاملة، موظف، أو وثيقة..."
            className="w-full h-10 rounded-lg bg-secondary/60 border border-border pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="mr-auto flex items-center gap-2 sm:gap-3">
        <Link to="/notifications" className="relative p-2 rounded-lg hover:bg-secondary transition">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="absolute top-1 left-1 h-2 w-2 rounded-full bg-destructive animate-pulse" />
        </Link>
        <div className="flex items-center gap-2 sm:pr-3 sm:border-r sm:border-border">
          <div className="h-9 w-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            م ن
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-sm font-semibold leading-tight">السيد المحافظ</div>
            <div className="text-[11px] text-muted-foreground">مكتب المحافظ</div>
          </div>
          <ChevronDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
