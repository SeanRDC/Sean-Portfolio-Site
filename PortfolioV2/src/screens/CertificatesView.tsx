import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import TiltCard from "../components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  {
    issuer: "Google / Coursera",
    name: "Google UX Design Professional Certificate",
    accent: "var(--violet)",
  },
  {
    issuer: "freeCodeCamp",
    name: "Responsive Web Design Certification",
    accent: "var(--cyan)",
  },
  {
    issuer: "Cisco Networking Academy",
    name: "Introduction to Networks",
    accent: "var(--rose)",
  },
  {
    issuer: "freeCodeCamp",
    name: "HTML & JS Essentials",
    accent: "var(--violet)",
  },
  {
    issuer: "freeCodeCamp",
    name: "Relational Databases",
    accent: "var(--cyan)",
  },
];

export default function CertificatesView() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const plates = gsap.utils.toArray<HTMLElement>(".cert-plate");

      plates.forEach((plate) => {
        gsap.fromTo(
          plate,
          {
            rotationX: 14,
            rotationY: 8,
            y: 40,
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          {
            rotationX: 0,
            rotationY: 0,
            y: 0,
            boxShadow: "var(--shadow-float)",
            ease: "none",
            scrollTrigger: {
              trigger: plate,
              start: "top 85%",
              end: "center center",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: gridRef },
  );

  return (
    <section className="min-h-screen px-6 pt-32 md:px-10">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-20 text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Credentials
          </span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">
            Proof of the craft
          </h1>
          <p className="mx-auto mt-4 max-w-md text-ink-muted">
            Courses completed and skills certified.
          </p>
        </Reveal>

        <div
          ref={gridRef}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 pb-32"
        >
          {credentials.map((cert, i) => (
            <TiltCard
              key={i}
              className="cert-plate glass glass-edge h-64 rounded-[24px] p-8 flex flex-col justify-between group"
            >
              <div className="relative z-10">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                  style={{ color: cert.accent }}
                >
                  {cert.issuer}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink leading-tight">
                  {cert.name}
                </h3>
              </div>

              <div
                className="absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen"
                style={{
                  background: `radial-gradient(circle at 50% 100%, ${cert.accent}40, transparent 60%)`,
                }}
              />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
