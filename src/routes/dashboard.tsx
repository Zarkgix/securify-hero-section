import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { StatBlock } from "@/components/ui-ext/StatBlock";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "dashboard — securify" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <PageShell title="dashboard" description="real-time stadium traffic overview">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <StatBlock value="+248" label="vehicles in queue" divider="right" />
        <StatBlock value="+12" label="emergency priority" divider="right" />
        <StatBlock value="74%" label="parking occupancy" divider="right" />
        <StatBlock value="+1.5b" label="gb data secured" divider="right" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-900/90 backdrop-blur rounded-3xl p-6 border border-white/10">
          <div className="text-sm text-white/70 lowercase mb-4">live priority queue</div>
          <ul className="space-y-3">
            {[
              ["ambulance · kca 001a", "score 98"],
              ["vip convoy · kbz 555v", "score 86"],
              ["shuttle bus · ktw 220p", "score 64"],
              ["private car · kdj 901m", "score 42"],
            ].map(([name, score]) => (
              <li key={name} className="flex items-center justify-between text-sm">
                <span className="text-white">{name}</span>
                <span className="text-white/60">{score}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-neutral-900/90 backdrop-blur rounded-3xl p-6 border border-white/10">
          <div className="text-sm text-white/70 lowercase mb-4">parking zones</div>
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded ${i % 3 === 0 ? "bg-white/10" : "bg-white"}`}
              />
            ))}
          </div>
          <div className="flex gap-4 text-xs text-white/60 mt-4">
            <span><span className="inline-block h-2 w-2 bg-white rounded-sm mr-2" />free</span>
            <span><span className="inline-block h-2 w-2 bg-white/10 rounded-sm mr-2" />occupied</span>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
