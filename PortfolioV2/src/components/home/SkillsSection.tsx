import { Palette, Wrench, Compass } from "lucide-react";
import Reveal from "../Reveal";
import TiltCard from "../TiltCard";

const cards = [
  {
    icon: Palette,
    title: "Skills & Design",
    items: ["UX / UI Design", "Design Systems", "Prototyping", "Interaction Design", "Responsive Web"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["Figma", "React & Tailwind", "TypeScript", "GSAP", "Workflow Automation"],
  },
  {
    icon: Compass,
    title: "Approach",
    statement:
      "Start with the problem, not the pixels. Design the system, automate the repetition, and sweat the details users feel but never name.",
  },
];

export default function SkillsSection() {
  return (
    <section className="relative px-6 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-14">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">What I bring</span>
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">Skills, tools & approach</h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 100}>
                <TiltCard className="glass glass-edge h-full rounded-[24px] p-7">
                  <div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-[14px]"
                    style={{ background: "var(--glass-fill-strong)", border: "1px solid var(--edge-light)" }}
                  >
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-ink">{c.title}</h3>

                  {c.items ? (
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {c.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-[15px] text-ink-muted">
                          <span className="h-1 w-1 rounded-full" style={{ background: "var(--cyan)" }} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-5 text-[15px] leading-relaxed text-ink-muted">{c.statement}</p>
                  )}
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
