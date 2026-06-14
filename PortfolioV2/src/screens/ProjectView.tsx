import { useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import GalleryFrame from "../components/project/GalleryFrame";
import { getProject, getNeighbors } from "../data/projects";

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = getProject(id);
  const { prev, next } = getNeighbors(id);

  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroRef.current || !contentRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      heroRef.current,
      { scale: 1.04, filter: "blur(12px)", opacity: 0 },
      { scale: 1, filter: "blur(0px)", opacity: 1, duration: 0.9 },
    )
      .fromTo(
        contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9 },
        "-=0.6",
      )
      .fromTo(
        ".hero-cta-btns",
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.4",
      );
  }, [id]);

  if (!project)
    return (
      <div className="flex h-screen items-center justify-center font-display text-xl">
        Project not found.
      </div>
    );

  const meta = [
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Platform", value: project.platform },
  ];

  const cells = [
    { label: "Technologies", items: project.technologies, chips: true },
    { label: "Features", items: project.features },
    { label: "Goals", items: project.goals },
    { label: "Key Achievements", items: project.achievements, glow: true },
  ];

  return (
    <div className="px-6 pb-32 pt-28 md:px-10">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb Back Link */}
        <Link
          to="/work"
          data-cursor
          className="mb-7 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Selected Work
        </Link>

        {/* GSAP Hero */}
        <div
          ref={heroRef}
          className="relative overflow-hidden rounded-[28px]"
          style={{
            height: "70vh",
            background: project.cover,
            backgroundSize: "cover",
            backgroundPosition: "center",
            border: "1px solid var(--edge-light)",
            boxShadow:
              "var(--shadow-lift), inset 0 1px 0 rgba(255,255,255,0.32)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-5 md:flex-row md:items-end md:justify-between md:p-7">
            <div
              ref={contentRef}
              className="glass-strong glass-edge max-w-2xl rounded-[22px] p-6 md:p-8"
            >
              <h1 className="font-display text-4xl font-semibold leading-[1] tracking-tightest text-ink md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-lg text-ink-muted">{project.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {meta.map((m) => (
                  <span
                    key={m.label}
                    className="glass flex items-center gap-1.5 rounded-pill px-3.5 py-2 text-xs font-medium text-ink"
                  >
                    <span className="text-ink-faint">{m.label}</span> {m.value}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-cta-btns flex flex-shrink-0 flex-col gap-3">
              <a
                data-cursor
                href={project.prototypeUrl}
                className="group inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-[15px] font-semibold transition-transform duration-300 hover:scale-[1.03]"
                style={{
                  background: "var(--solid-bg)",
                  color: "var(--solid-fg)",
                  boxShadow: "var(--solid-shadow)",
                }}
              >
                View Prototype{" "}
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
              <a
                data-cursor
                href={project.liveUrl}
                className="glass glass-edge inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-[15px] font-semibold text-ink transition-transform duration-300 hover:scale-[1.03]"
              >
                Live Website{" "}
                <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </div>

        {/* Overview */}
        <Reveal delay={100} className="mt-24">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.16em] text-ink-muted">
            Overview
          </span>
          <div className="max-w-3xl">
            {project.overview.map((para, i) => (
              <p
                key={i}
                className={`text-xl leading-relaxed ${i === 0 ? "text-ink" : "text-ink-muted"} ${i > 0 ? "mt-6" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Gallery Component */}
        {project.gallery && project.gallery.length > 0 && (
          <Reveal delay={200}>
            <GalleryFrame images={project.gallery} />
          </Reveal>
        )}

        {/* Details Grid (Tech, Features, Goals, Achievements) */}
        <section className="py-24">
          <div className="grid gap-5 md:grid-cols-2">
            {cells.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <div
                  className="glass glass-edge h-full rounded-[22px] p-7"
                  style={
                    c.glow
                      ? {
                          boxShadow:
                            "var(--shadow-glass), inset 0 1px 0 rgba(255,255,255,0.32), 0 0 40px rgba(123,92,255,0.22)",
                        }
                      : undefined
                  }
                >
                  <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {c.label}
                  </h3>
                  {c.chips ? (
                    <div className="flex flex-wrap gap-2">
                      {c.items.map((it) => (
                        <span
                          key={it}
                          className="glass rounded-pill px-3.5 py-2 text-sm font-medium text-ink"
                        >
                          {it}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-3">
                      {c.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-start gap-2.5 text-[15px] text-ink"
                        >
                          <span
                            className="mt-2 h-1 w-1 flex-shrink-0 rounded-full"
                            style={{
                              background: c.glow
                                ? "var(--violet)"
                                : "var(--cyan)",
                            }}
                          />
                          {it}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {prev && (
              <button
                data-cursor
                onClick={() => navigate(`/project/${prev.id}`)}
                className="glass glass-edge group flex items-center gap-4 rounded-[22px] p-5 text-left transition-transform duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft
                  className="h-5 w-5 flex-shrink-0 text-ink-muted transition-transform group-hover:-translate-x-1"
                  strokeWidth={1.75}
                />
                <div>
                  <span className="text-xs uppercase tracking-[0.12em] text-ink-faint">
                    Previous
                  </span>
                  <p className="font-display text-lg font-semibold tracking-tight text-ink">
                    {prev.title}
                  </p>
                </div>
              </button>
            )}
            {next && (
              <button
                data-cursor
                onClick={() => navigate(`/project/${next.id}`)}
                className="glass glass-edge group flex items-center justify-end gap-4 rounded-[22px] p-5 text-right transition-transform duration-300 hover:-translate-y-0.5 sm:col-start-2"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.12em] text-ink-faint">
                    Next
                  </span>
                  <p className="font-display text-lg font-semibold tracking-tight text-ink">
                    {next.title}
                  </p>
                </div>
                <ArrowRight
                  className="h-5 w-5 flex-shrink-0 text-ink-muted transition-transform group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
