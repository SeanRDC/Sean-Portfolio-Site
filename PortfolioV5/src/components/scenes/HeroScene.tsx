import BasaltCanvas from "../BasaltCanvas";
import { useScrollProgress } from "../../lib/useScrollProgress";
export default function HeroScene() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const eased = progress * progress;
  const scale = 1 + eased * 7.5;
  const shellFade =
    progress < 0.62 ? 1 : Math.max(0, 1 - (progress - 0.62) / 0.34);
  const nameFade = 1 - Math.min(progress / 0.4, 1);
  const sFont = "min(86vh, 94vw)";

  return (
    <section id="title" ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-void">
        {/* The monolith + carved S — this layer dollies in */}
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            opacity: shellFade,
            transformOrigin: "50% 47%",
            willChange: "transform",
          }}
        >
          <BasaltCanvas
            className="block h-full w-full"
            seed={0.42}
            tone={0.06}
            flow={1.0}
            interactive
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* recessed shadow of the carve */}
            <span
              className="t-colossal select-none"
              style={{
                fontSize: sFont,
                color: "#000",
                mixBlendMode: "multiply",
                opacity: 0.92,
                filter: "blur(2px)",
              }}
            >
              S
            </span>
            {/* lower-lip highlight catching light */}
            <span
              className="t-colossal absolute select-none"
              style={{
                fontSize: sFont,
                color: "transparent",
                mixBlendMode: "screen",
                textShadow: "0 4px 3px rgba(255,255,255,0.13)",
              }}
            >
              S
            </span>
          </div>
          {/* aperture vignette pulling the eye to center */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 47%, transparent 18%, rgba(0,0,0,0.65) 78%)",
            }}
          />
        </div>

        {/* Framed identity — held flat in the aperture, fades first */}
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: nameFade }}
        >
          <div className="font-mono-x mb-5 text-[11px] uppercase tracking-[0.55em] text-fg-dim">
            Portfolio — MMXXVI
          </div>
          <h1 className="t-colossal text-center text-[clamp(56px,15vw,260px)] text-fg">
            sean
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <span className="h-px w-10 bg-line-bright" />
            <span className="t-label text-[12px] uppercase tracking-[0.3em] text-fg-dim sm:text-[15px]">
              Developer <span className="text-signal">&amp;</span> Engineer
            </span>
            <span className="h-px w-10 bg-line-bright" />
          </div>
        </div>

        {/* HUD furniture */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-24 font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint">
            <div>SCENE 01 / TITLE</div>
            <div>APERTURE — S</div>
            <div className="text-fg-dim">WEBGL · BASALT.frag</div>
          </div>
          <div className="absolute right-6 top-24 text-right font-mono-x text-[10px] uppercase leading-relaxed text-fg-faint">
            <div>LAT 22.5726</div>
            <div>LON 88.3639</div>
            <div className="text-fg-dim">ISO 800 · 24FPS</div>
          </div>
          <div
            className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3"
            style={{ opacity: nameFade }}
          >
            <span className="font-mono-x text-[10px] uppercase tracking-[0.4em] text-fg-dim">
              Scroll to enter
            </span>
            <span className="h-4 w-px bg-line-bright" />
            <span className="font-mono-x text-[10px] text-signal">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
