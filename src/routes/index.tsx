import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, User, Lock, ArrowLeft } from "lucide-react";
import bg from "@/assets/login-bg.jpg";
import logo from "@/assets/nineveh-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول - منصة التحول الرقمي لمحافظة نينوى" },
      { name: "description", content: "بوابة الدخول الرسمية لمنصة التحول الرقمي لمحافظة نينوى" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate({ from: "/" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-10 overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.18_0.03_180/0.7)_100%)]" />

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Branding */}
        <div className="text-primary-foreground space-y-6 animate-fade-up text-center md:text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" /> منصة حكومية رسمية
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            منصة التحول الرقمي
            <br />
            <span className="text-gradient-gold">لمحافظة نينوى</span>
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-md mx-auto md:mx-0">
            بوابة موحدة لإدارة المعاملات والأرشفة الإلكترونية ومتابعة الأداء
            بشكل آمن وفوري عبر جميع الدوائر الحكومية.
          </p>
          <div className="flex items-center gap-6 justify-center md:justify-start text-xs text-white/70">
            <div>
              <div className="text-2xl font-bold text-accent">+12K</div>
              معاملة شهرياً
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">2,840</div>
              موظف فعّال
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">99.8%</div>
              جاهزية النظام
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-elegant p-8 border border-white/20 animate-fade-up">
          <div className="flex flex-col items-center mb-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant mb-3">
              <img src={logo} alt="شعار المحافظة" className="h-14 w-14" />
            </div>
            <h2 className="text-xl font-bold">تسجيل الدخول</h2>
            <p className="text-xs text-muted-foreground mt-1">
              يرجى إدخال بيانات الاعتماد الرسمية
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  defaultValue="governor.nineveh"
                  className="w-full h-11 rounded-lg border border-input bg-background pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  defaultValue="••••••••"
                  className="w-full h-11 rounded-lg border border-input bg-background pr-10 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" defaultChecked className="rounded" /> تذكرني
              </label>
              <a className="text-primary hover:underline cursor-pointer">نسيت كلمة المرور؟</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-gradient-primary text-primary-foreground font-semibold shadow-elegant hover:opacity-95 active:scale-[0.99] transition flex items-center justify-center gap-2"
            >
              {loading ? "...جاري الدخول" : (
                <>
                  دخول إلى المنصة
                  <ArrowLeft className="h-4 w-4" />
                </>
              )}
            </button>
            <Link to="/dashboard" className="block text-center text-xs text-muted-foreground hover:text-primary mt-2">
              معاينة المنصة كزائر
            </Link>
          </form>

          <div className="mt-6 pt-4 border-t border-border text-[11px] text-muted-foreground text-center">
            جميع الحقوق محفوظة © 2025 - حكومة جمهورية العراق
          </div>
        </div>
      </div>
    </div>
  );
}
