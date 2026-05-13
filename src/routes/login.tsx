import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "sign in — stadie-park" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur rounded-3xl p-8 border border-white/10">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <Logo />
          <span className="text-white text-sm tracking-tight">stadie-park</span>
        </Link>

        <h1 className="hero-title text-white font-medium text-4xl mb-2 lowercase">welcome back</h1>
        <p className="text-white/60 text-sm mb-8">sign in to manage stadium traffic</p>

        <form className="space-y-4">
          <div>
            <label className="text-xs text-white/70 lowercase">email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full bg-neutral-800 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
            />
          </div>
          <div>
            <label className="text-xs text-white/70 lowercase">password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full bg-neutral-800 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
            />
          </div>

          <button
            type="button"
            className="w-full bg-white text-black text-sm rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors mt-2"
          >
            sign in
          </button>
        </form>

        <p className="text-white/60 text-xs mt-6 text-center">
          no account?{" "}
          <Link to="/register" className="text-white hover:text-white transition-colors underline underline-offset-4">
            create one
          </Link>
        </p>
      </div>
    </div>
  );
}
