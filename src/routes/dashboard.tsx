import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { StatBlock } from "@/components/ui-ext/StatBlock";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "operations dashboard — stadie-park" }] }),
  component: DashboardPage,
});

type Zone = { id: string; name: string; capacity: number; occupied: number };

const zones: Zone[] = [
  { id: "A", name: "zone a · north gate", capacity: 120, occupied: 48 },
  { id: "B", name: "zone b · vip", capacity: 60, occupied: 41 },
  { id: "C", name: "zone c · east stand", capacity: 200, occupied: 178 },
  { id: "D", name: "zone d · buses", capacity: 40, occupied: 22 },
  { id: "E", name: "zone e · emergency", capacity: 20, occupied: 4 },
  { id: "F", name: "zone f · overflow", capacity: 300, occupied: 96 },
  { id: "G", name: "zone g · staff", capacity: 80, occupied: 71 },
  { id: "H", name: "zone h · south gate", capacity: 150, occupied: 132 },
];

const arrivalQueue = [
  { plate: "kca 001a", category: "ambulance", urgency: 10, score: 98, eta: "0:42" },
  { plate: "kbz 555v", category: "vvip", urgency: 9, score: 86, eta: "1:10" },
  { plate: "ktw 220p", category: "bus", urgency: 6, score: 64, eta: "3:24" },
  { plate: "kdj 901m", category: "private", urgency: 3, score: 42, eta: "5:08" },
  { plate: "khq 778w", category: "service", urgency: 4, score: 38, eta: "5:55" },
];

const alerts = [
  { time: "19:42:11", text: "ambulance kca 001a — preempted to zone e · slot e-03" },
  { time: "19:38:02", text: "vvip convoy kbz 555v — escorted to zone b · slot b-12" },
];

const history = [
  { time: "19:42:11", plate: "kca 001a", zone: "e-03", action: "preempt", actor: "aps engine" },
  { time: "19:40:55", plate: "knb 442t", zone: "f-88", action: "allocate", actor: "aps engine" },
  { time: "19:39:30", plate: "kxe 117r", zone: "a-21", action: "manual override", actor: "attendant 04" },
  { time: "19:38:02", plate: "kbz 555v", zone: "b-12", action: "allocate", actor: "aps engine" },
  { time: "19:36:18", plate: "ktw 220p", zone: "d-09", action: "allocate", actor: "aps engine" },
];

function pct(z: Zone) {
  return Math.round((z.occupied / z.capacity) * 100);
}
function tone(p: number) {
  if (p < 60) return { bg: "bg-emerald-500/15", text: "text-emerald-300", dot: "bg-emerald-400", label: "low" };
  if (p <= 85) return { bg: "bg-amber-500/15", text: "text-amber-300", dot: "bg-amber-400", label: "moderate" };
  return { bg: "bg-red-500/15", text: "text-red-300", dot: "bg-red-400", label: "critical" };
}

function DashboardPage() {
  const totalCap = zones.reduce((a, z) => a + z.capacity, 0);
  const totalOcc = zones.reduce((a, z) => a + z.occupied, 0);
  const overall = Math.round((totalOcc / totalCap) * 100);

  return (
    <PageShell title="operations dashboard" description="live zone occupancy, arrival queue, and allocation audit trail">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatBlock value={`${overall}%`} label="overall occupancy" divider="right" />
        <StatBlock value={`${arrivalQueue.length}`} label="vehicles in queue" divider="right" />
        <StatBlock value={`${alerts.length}`} label="active preemptions" divider="right" />
        <StatBlock value={`${history.length}`} label="allocations · last hr" divider="right" />
      </div>

      {/* Zone occupancy grid */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm text-white/70 lowercase">zone occupancy</h2>
          <div className="flex gap-4 text-[11px] text-white/60">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400" />under 60%</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400" />60–85%</span>
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-red-400" />above 85%</span>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {zones.map((z) => {
            const p = pct(z);
            const t = tone(p);
            return (
              <div
                key={z.id}
                className={`rounded-2xl border border-white/10 ${t.bg} backdrop-blur p-4 flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/70">{z.name}</span>
                  <span className={`h-2 w-2 rounded-full ${t.dot}`} />
                </div>
                <div className="flex items-end justify-between">
                  <div className={`text-3xl font-medium ${t.text}`}>{p}%</div>
                  <div className="text-[11px] text-white/60">{z.occupied}/{z.capacity}</div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className={`h-full ${t.dot}`} style={{ width: `${p}%` }} />
                </div>
                <div className={`text-[10px] uppercase tracking-wider ${t.text}`}>{t.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Arrival queue */}
        <div className="bg-neutral-900/90 backdrop-blur rounded-3xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-white/70 lowercase">real-time arrival queue</h2>
            <Link to="/queue" className="text-xs text-white/60 hover:text-white">view all →</Link>
          </div>
          <ul className="divide-y divide-white/5">
            {arrivalQueue.map((v) => (
              <li key={v.plate} className="py-3 flex items-center justify-between gap-3 text-sm">
                <div className="flex flex-col">
                  <span className="text-white">{v.plate}</span>
                  <span className="text-[11px] text-white/50">{v.category} · eta {v.eta}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-white/60">u{v.urgency}</span>
                  <span className="text-white font-medium tabular-nums">{v.score}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency preemption alerts */}
        <div className="bg-red-500/5 backdrop-blur rounded-3xl p-6 border border-red-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm text-red-300 lowercase flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
              emergency preemption alerts
            </h2>
            <span className="text-[11px] text-white/50">{alerts.length} active</span>
          </div>
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.time} className="flex gap-3 text-sm">
                <span className="text-[11px] text-white/50 tabular-nums pt-0.5">{a.time}</span>
                <span className="text-white/90">{a.text}</span>
              </li>
            ))}
            {alerts.length === 0 && (
              <li className="text-sm text-white/50">no active preemptions</li>
            )}
          </ul>
        </div>
      </div>

      {/* Allocation history / audit trail */}
      <div className="bg-neutral-900/90 backdrop-blur rounded-3xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-sm text-white/70 lowercase">allocation history · audit trail</h2>
          <Link to="/reports" className="text-xs text-white/60 hover:text-white">open reports →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[560px]">
            <thead className="text-white/50 text-xs lowercase">
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-3 font-normal">time</th>
                <th className="text-left px-6 py-3 font-normal">plate</th>
                <th className="text-left px-6 py-3 font-normal">zone · slot</th>
                <th className="text-left px-6 py-3 font-normal">action</th>
                <th className="text-left px-6 py-3 font-normal">actor</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.time} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-3 text-white/70 tabular-nums">{h.time}</td>
                  <td className="px-6 py-3 text-white">{h.plate}</td>
                  <td className="px-6 py-3 text-white/80">{h.zone}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[11px] px-2 py-1 rounded-full ${
                      h.action === "preempt"
                        ? "bg-red-500/15 text-red-300"
                        : h.action === "manual override"
                        ? "bg-amber-500/15 text-amber-300"
                        : "bg-white/10 text-white/80"
                    }`}>
                      {h.action}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-white/60">{h.actor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/register" className="bg-white text-black text-sm rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors">
          register arriving vehicle
        </Link>
        <Link to="/parking" className="border border-white/20 text-white text-sm rounded-full px-6 py-3 hover:bg-white/5 transition-colors">
          view parking grid
        </Link>
      </div>
    </PageShell>
  );
}
