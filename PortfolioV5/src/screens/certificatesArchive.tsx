import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import { TILES } from "../data/certificates";
import type { Tile } from "../data/certificates";

gsap.registerPlugin(ScrollTrigger);

export default function CertificatesArchive() {
  const containerRef = useRef<HTMLDivElement>(null);

  const row1 = TILES.slice(0, 6);
  const row2 = TILES.slice(6, 12);
  const row3 = TILES.slice(12, 18);

  const row1Items = [...row1, ...row1];
  const row2Items = [...row2, ...row2];
  const row3Items = [...row3, ...row3];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".scroll-left", { xPercent: -50, ease: "none" }, 0);

      tl.fromTo(
        ".scroll-right",
        { xPercent: -50 },
        { xPercent: 0, ease: "none" },
        0,
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-paper font-mono-x text-ink overflow-hidden"
    >
      {/* ── THE SPLIT LAYOUT GRID ── */}
      <div className="grid h-full w-full grid-cols-1 lg:grid-cols-[340px_1fr]">
        <aside className="relative z-20 flex h-full w-full flex-col justify-between border-r border-line bg-paper px-8 py-10">
          <div className="space-y-12">
            <Link
              to="/"
              className="group flex w-fit items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink"
            >
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="2"
                  d="M19 12H5M12 19l-7-7 7-7"
                />
              </svg>
              Back to Sequence
            </Link>

            <div className="[&_p]:mb-5 [&_p]:text-[9px] [&_p]:uppercase [&_p]:leading-relaxed [&_p]:tracking-[0.15em] [&_p]:text-ink-dim">
              <p className="font-bold text-ink">
                More than credentials-these are milestones:
              </p>
              <p>
                Professional certifications, academic milestones, technical
                achievements.
              </p>
              <p>Basic or professional.</p>
            </div>
          </div>

          <div className="flex flex-col -ml-1">
            <h1 className="t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink">
              Archive
            </h1>
            <h1 className="t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink/80">
              Archive
            </h1>
            <h1 className="t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink/60">
              Archive
            </h1>
            <h1 className="t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink/40">
              Archive
            </h1>
            <h1 className="t-display text-[48px] uppercase leading-[0.85] tracking-tight text-ink/20">
              Archive
            </h1>
          </div>
        </aside>

        <section className="relative flex h-full w-full flex-col justify-center gap-8 overflow-hidden bg-paper/50 py-10 pl-8">
          <div className="scroll-left flex w-max gap-8">
            {row1Items.map((t, i) => (
              <ArchiveCard key={`r1-${i}`} tile={t} index={i} />
            ))}
          </div>

          <div className="scroll-right flex w-max gap-8">
            {row2Items.map((t, i) => (
              <ArchiveCard key={`r2-${i}`} tile={t} index={i} />
            ))}
          </div>

          <div className="scroll-left flex w-max gap-8">
            {row3Items.map((t, i) => (
              <ArchiveCard key={`r3-${i}`} tile={t} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ArchiveCard({ tile, index }: { tile: Tile; index: number }) {
  return (
    <a
      href={tile.link || "#"}
      target={tile.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group block shrink-0 w-[240px] md:w-[280px] cursor-pointer"
    >
      <div
        className="relative mb-4 aspect-[4/3] w-full overflow-hidden border border-line bg-ink"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-paper/30 bg-gradient-to-b from-ink/60 to-transparent px-4 py-3 opacity-80 transition-opacity duration-500 group-hover:opacity-100">
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-paper drop-shadow-md">
            View Credential
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="h-3 w-3 text-paper drop-shadow-md transition-transform duration-500 group-hover:rotate-45"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth="2"
              d="M5 19L19 5M5 5h14v14"
            />
          </svg>
        </div>

        <img
          src={tile.image}
          alt={tile.label}
          draggable={false}
          decoding="async"
          fetchPriority={index < 4 ? "high" : "auto"}
          loading={index < 4 ? "eager" : "lazy"}
          className="h-full w-full object-cover opacity-80 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
      </div>

      {/* ── DATA FOOTER ── */}
      <div className="flex items-start justify-between border-t border-line pt-3 transition-colors duration-500 group-hover:border-ink">
        <div className="pr-4">
          <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-ink-dim transition-colors duration-500 group-hover:text-ink/80">
            {tile.meta}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink transition-transform duration-500 group-hover:translate-x-1">
            {tile.label}
          </div>
        </div>
        <div className="shrink-0 border border-line px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-ink-dim transition-colors duration-500 group-hover:border-ink group-hover:text-ink hover:bg-ink hover:text-paper">
          {tile.kind}
        </div>
      </div>
    </a>
  );
}
