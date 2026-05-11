import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "securify — protect your data" },
      { name: "description", content: "Adaptive priority scheduling and contactless access for smart stadium ecosystems." },
      { property: "og:title", content: "securify — protect your data" },
      { property: "og:description", content: "Adaptive priority scheduling for heterogeneous vehicular traffic in smart stadiums." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
      />

      <nav className="absolute top-0 left-0 right-0 z-20 px-6 md:px-10 pt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
          <Logo />
          <span className="text-white text-sm font-normal tracking-tight">securify</span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
          <a href="#platform" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">platform</a>
          <a href="#solutions" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">solutions</a>
          <a href="#company" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">company</a>
          <a href="#support" className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full">support</a>
        </div>

        <Link
          to="/login"
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
        >
          get started
        </Link>
      </nav>

      <div className="relative h-full w-full">
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">protect</h1>
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">your</h1>
        <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">data</h1>

        <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
          we can guarding your data with utmost care, empowering you with privacy everywhere
        </p>

        <div className="absolute right-6 md:right-24 top-[14%]">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
            <div className="text-4xl md:text-5xl font-medium tracking-tight">+65k</div>
          </div>
          <div className="text-xs md:text-sm text-white/70 mt-1 text-right">startups use</div>
        </div>

        <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
          <div className="flex items-center gap-3">
            <div className="text-4xl md:text-5xl font-medium tracking-tight">+1.5b</div>
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
          </div>
          <div className="text-xs md:text-sm text-white/70 mt-1">gb data was protected</div>
        </div>

        <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20">
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            <div className="text-4xl md:text-5xl font-medium tracking-tight">+300k</div>
          </div>
          <div className="text-xs md:text-sm text-white/70 mt-1 text-right">downloads</div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
