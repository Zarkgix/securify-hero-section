import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";

const navLinks = [
  { to: "/", label: "home" },
  { to: "/login", label: "log in" },
  { to: "/ai-support", label: "ai support" },
  { to: "/about", label: "about" },
  { to: "/dashboard", label: "dashboard" },
] as const;

export function AppNavbar({ cta = "get started", ctaTo = "/login" }: { cta?: string; ctaTo?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 md:px-10 pt-6 flex items-center justify-between gap-3">
      <Link to="/" className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full pl-4 pr-5 py-3 border border-white/10">
        <Logo />
        <span className="text-white text-sm font-normal tracking-tight">stadie-park</span>
      </Link>

      <div className="hidden md:flex items-center gap-1 bg-white/10 backdrop-blur rounded-full px-3 py-2 border border-white/10">
        {navLinks.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="text-neutral-200 hover:text-white transition-colors text-sm px-4 py-2 rounded-full"
            activeOptions={{ exact: l.to === "/" }}
            activeProps={{ className: "text-white bg-white/15 transition-colors text-sm px-4 py-2 rounded-full" }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:block">
        <Link
          to={ctaTo}
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
        >
          {cta}
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        type="button"
        aria-label="toggle menu"
        onClick={() => setOpen((o) => !o)}
        className="md:hidden bg-white/10 backdrop-blur border border-white/10 rounded-full h-11 w-11 flex items-center justify-center text-white"
      >
        <span className="sr-only">menu</span>
        <div className="flex flex-col gap-1">
          <span className="block h-px w-5 bg-white" />
          <span className="block h-px w-5 bg-white" />
          <span className="block h-px w-5 bg-white" />
        </div>
      </button>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-full mt-3 right-4 left-4 bg-neutral-900/95 backdrop-blur rounded-3xl border border-white/10 p-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="text-neutral-200 hover:text-white text-sm px-4 py-3 rounded-2xl hover:bg-white/5"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-white bg-white/10 text-sm px-4 py-3 rounded-2xl" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={ctaTo}
            onClick={() => setOpen(false)}
            className="mt-2 bg-white text-black text-sm rounded-full px-6 py-3 text-center hover:bg-neutral-200 transition-colors"
          >
            {cta}
          </Link>
        </div>
      )}
    </nav>
  );
}
