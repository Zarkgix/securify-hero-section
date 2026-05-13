import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "register vehicle — stadie-park" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <PageShell title="register vehicle" description="add an arriving vehicle to the priority queue">
      <form className="grid md:grid-cols-2 gap-4 max-w-2xl">
        {[
          { label: "plate number", placeholder: "kca 123x" },
          { label: "vehicle type", placeholder: "ambulance / vip / bus / private" },
          { label: "urgency level (1-10)", placeholder: "5" },
          { label: "arrival time", placeholder: "auto" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs text-white/70 lowercase">{f.label}</label>
            <input
              placeholder={f.placeholder}
              className="mt-1 w-full bg-neutral-900/90 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
            />
          </div>
        ))}
        <div className="md:col-span-2 flex gap-3 mt-2">
          <button type="button" className="bg-white text-black text-sm rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors">
            add to queue
          </button>
          <Link to="/queue" className="text-white/70 hover:text-white transition-colors text-sm self-center">
            view queue →
          </Link>
        </div>
      </form>
    </PageShell>
  );
}
