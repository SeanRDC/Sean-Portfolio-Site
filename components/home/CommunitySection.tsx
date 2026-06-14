import { Users } from "lucide-react";
import Reveal from "../Reveal";

const googleDots = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];

export default function CommunitySection() {
  return (
    <section className="relative px-6 py-20 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="glass glass-edge relative overflow-hidden rounded-[28px] p-9 md:p-14">
            {/* floating google brand orbs */}
            <div className="pointer-events-none absolute right-8 top-8 flex gap-3 md:right-14">
              {googleDots.map((c, i) => (
                <span
                  key={c}
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ background: c, boxShadow: `0 0 14px ${c}`, opacity: 0.9, animation: `float-orb ${3 + i * 0.4}s ease-in-out ${i * 0.2}s infinite` }}
                />
              ))}
            </div>

            <div className="flex flex-col items-start gap-5">
              <div className="glass flex items-center gap-2.5 rounded-pill px-4 py-2">
                <Users className="h-4 w-4 text-ink-muted" strokeWidth={1.75} />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">Community</span>
              </div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
                Active member of <span style={{ color: "var(--cyan)" }}>GDGoC</span>.
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
                Part of the Google Developer Groups on Campus — collaborating on workshops,
                hack nights, and design jams, and helping other builders ship their first real products.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
