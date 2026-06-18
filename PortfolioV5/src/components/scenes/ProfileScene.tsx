import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import StoneCanvas from "../StoneCanvas";

gsap.registerPlugin(ScrollTrigger);

const COPY =
  "It started with pure curiosity — a kid staring at a terminal just to make the machine respond. That passion became a discipline: studying the deep theoretical foundations of computer science, and building the digital architecture that shapes our future.";
const WORDS = COPY.split(" ");

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

export default function ProfileScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => setProgress(self.progress),
      });
    },
    { scope: sectionRef },
  );

  const reveal = clamp01((progress - 0.04) / 0.22);
  const inset = (1 - reveal) * 100;

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative h-[260vh] bg-paper"
    >
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-12 md:px-10">
          {/* portrait plate */}
          <div className="md:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-md overflow-hidden border border-line">
              <div
                className="absolute inset-0"
                style={{
                  clipPath: `inset(${inset}% 0 0 0)`,
                  transition: "clip-path 0.05s linear",
                }}
              >
                <img
                  src="/sean-profile.webp"
                  alt="Sean"
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(19,18,16,0.18) 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <span className="t-label text-[12px] uppercase tracking-[0.2em] text-ink">
                    sean
                  </span>
                  <span className="font-mono-x text-[10px] uppercase text-ink-dim">
                    Portrait / 2024
                  </span>
                </div>
              </div>
              <div className="pointer-events-none absolute left-4 top-4 font-mono-x text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                01 - Profile
              </div>
            </div>
          </div>

          {/* word-by-word intro */}
          <div className="md:col-span-7 md:pl-6">
            <div className="mb-8 flex items-center gap-4">
              <span className="font-mono-x text-[11px] uppercase tracking-[0.4em] text-ink-soft">
                The Introduction
              </span>
              <span className="h-px flex-1 bg-line" />
            </div>
            <p className="t-display max-w-2xl text-[clamp(24px,3.4vw,46px)] leading-[1.12]">
              {WORDS.map((w, i) => {
                const start = 0.08 + (i / WORDS.length) * 0.74;
                const wp = clamp01((progress - start) / 0.05);
                return (
                  <span
                    key={i}
                    style={{
                      color: `rgba(19,18,16,${0.14 + wp * 0.86})`,
                      transition: "color 0.1s linear",
                    }}
                  >
                    {w}{" "}
                  </span>
                );
              })}
            </p>
            <div
              className="mt-12 flex flex-wrap gap-x-10 gap-y-4"
              style={{ opacity: clamp01((progress - 0.8) / 0.12) }}
            >
              {[
                ["03+", "Years building"],
                ["MERN", "Full-stack core"],
                ["20+", "Certificates"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="t-sub text-[26px] text-ink">{k}</div>
                  <div className="font-mono-x text-[11px] uppercase tracking-wider text-ink-dim">
                    {v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
