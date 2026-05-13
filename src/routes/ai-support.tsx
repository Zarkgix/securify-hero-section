import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/ai-support")({
  head: () => ({ meta: [{ title: "ai support — stadie-park" }] }),
  component: AiSupportPage,
});

type Msg = { role: "user" | "assistant"; text: string };

function AiSupportPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "hi, i'm your local stadie-park assistant. ask me about queue priorities, payments, or parking." },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: input },
      { role: "assistant", text: "(local llm not yet wired — backend will plug in here)" },
    ]);
    setInput("");
  };

  return (
    <PageShell title="ai support" description="local llm assistant — privacy-first explanations">
      <div className="bg-neutral-900/90 backdrop-blur rounded-3xl border border-white/10 flex flex-col h-[60vh]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  m.role === "user"
                    ? "bg-white text-black rounded-2xl rounded-br-sm px-4 py-3 text-sm max-w-[75%]"
                    : "bg-transparent border border-white/15 text-white rounded-2xl rounded-bl-sm px-4 py-3 text-sm max-w-[75%]"
                }
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="ask anything..."
            className="flex-1 bg-neutral-800 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40"
          />
          <button
            onClick={send}
            className="bg-white text-black text-sm rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
          >
            send
          </button>
        </div>
      </div>
    </PageShell>
  );
}
