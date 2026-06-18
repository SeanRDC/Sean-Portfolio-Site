const SOCIAL = [
  { label: "GitHub", handle: "github.com/sean", href: "#" },
  { label: "LinkedIn", handle: "in/sean-eng", href: "#" },
  { label: "Email", handle: "sean@studio.dev", href: "mailto:sean@studio.dev" },
];

export default function FinaleScene() {
  return (
    <section id="finale" className="relative bg-void">
      {/* colossal type — ~80% viewport */}
      <div className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4">
        <div className="font-mono-x mb-6 text-[11px] uppercase tracking-[0.5em] text-fg-dim">
          Available — Q2 2026
        </div>
        <h2 className="t-colossal text-center text-[clamp(64px,21vw,460px)] leading-[0.78] text-fg">
          LET'S
        </h2>
        <h2
          className="t-colossal text-center text-[clamp(64px,21vw,460px)] leading-[0.78]"
          style={{ WebkitTextStroke: "1.5px var(--fg)", color: "transparent" }}
        >
          TALK
        </h2>
        <a
          href="mailto:sean@studio.dev"
          className="group mt-10 inline-flex items-center gap-3 border border-line-bright px-7 py-3.5 transition-colors hover:bg-fg"
        >
          <span className="t-label text-[13px] uppercase tracking-[0.25em] text-fg transition-colors group-hover:text-void">
            Start a conversation
          </span>
          <span className="font-mono-x text-signal transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </div>

      {/* grid footer */}
      <footer className="border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {SOCIAL.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              className="group flex items-center justify-between border-line px-6 py-7 transition-colors hover:bg-basalt-700 md:px-8 md:py-9 [&:not(:last-child)]:border-b md:[&:not(:last-child)]:border-b-0 md:[&:not(:last-child)]:border-r"
            >
              <div>
                <div className="font-mono-x text-[10px] uppercase tracking-[0.3em] text-fg-faint">
                  0{i + 1}
                </div>
                <div className="t-sub mt-2 text-[20px] uppercase text-fg">
                  {s.label}
                </div>
                <div className="mt-1 font-mono-x text-[12px] text-fg-dim">
                  {s.handle}
                </div>
              </div>
              <span className="font-mono-x text-fg-faint transition-all group-hover:translate-x-1 group-hover:text-signal">
                ↗
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line px-6 py-6 text-fg-faint md:flex-row md:px-8">
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em]">
            sean — Developer &amp; Engineer
          </span>
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em]">
            Built in WebGL · MMXXVI
          </span>
          <span className="font-mono-x text-[10px] uppercase tracking-[0.3em]">
            End of reel ●
          </span>
        </div>
        {/* fade to pure black */}
        <div
          className="h-40 w-full"
          style={{
            background: "linear-gradient(to bottom, transparent, #000)",
          }}
        />
      </footer>
    </section>
  );
}
