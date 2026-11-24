/** Section heading split into word masks for `useAgentReveal`; the last `gold` words are gold. */
export default function AgentHeading({ text, gold = 1, dark = false, className = "" }: { text: string; gold?: number; dark?: boolean; className?: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <h2 aria-label={text} className={`text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.15] ${dark ? "text-white" : "text-[#050E30]"} ${className}`}>
      {words.map((w, i) => (
        <span key={i} aria-hidden>
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <span data-a-word className={`inline-block will-change-transform motion-safe:[transform:translateY(118%)] ${i >= words.length - gold ? (dark ? "text-[#D4AF37]" : "text-[#ab8d2b]") : ""}`}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </h2>
  );
}
