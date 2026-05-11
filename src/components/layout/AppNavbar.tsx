import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

const navLinks = [
  { to: "/dashboard", label: "dashboard" },
  { to: "/queue", label: "queue" },
  { to: "/parking", label: "parking" },
  { to: "/ai-support", label: "ai support" },
] as const;

export function AppNavbar({ cta = "get started", ctaTo = "/login" }: { cta?: string; ctaTo?: string }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-6 flex items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
        <Logo />
        <span className="text-white text-sm font-normal tracking-tight">securify</span>
      </Link>

      <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
            activeProps={{ className: "text-white bg-white/10 transition-colors text-sm px-5 py-2 rounded-full" }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        to={ctaTo}
        className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
      >
        {cta}
      </Link>
    </nav>
  );
}
