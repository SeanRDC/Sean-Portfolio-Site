import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TiltCard from "../components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

// Centralized project data tailored to your builds
const projectData: Record<string, any> = {
  "beaded-by-unknown": {
    title: "Beaded by Unknown",
    subtitle: "From imagination to a full digital storefront.",
    meta: ["Full-Stack", "2026", "Web Platform"],
    overview:
      "What began as a simple hobby originating from imagination required a robust digital home. I designed and developed a comprehensive e-commerce platform featuring a custom bracelet builder and a points-based loyalty engine to reward returning customers.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    features: [
      "Custom Bracelet Builder",
      "Points-Based Loyalty Engine",
      "Seamless Checkout",
    ],
    goals: [
      "Translate a physical hobby into a digital experience",
      "Increase customer retention",
    ],
    achievements: [
      "Successfully launched full-stack platform",
      "High engagement on builder tool",
    ],
  },
  "pixel-ecommerce": {
    title: "Pixel E-Commerce",
    subtitle: "A scalable MERN stack storefront.",
    meta: ["Developer", "2026", "Web Application"],
    overview:
      "A full-stack e-commerce architecture built from the ground up. The focus was on secure architecture, implementing JWT authentication, strict MongoDB schemas, and an intuitive admin dashboard with a menu editor system.",
    tech: ["React", "Express", "Node.js", "MongoDB", "JWT Auth"],
    features: [
      "Admin Dashboard",
      "Menu Editor System",
      "Secure Cart State",
      "Pop-up Error UI",
    ],
    goals: [
      "Master MERN architecture",
      "Build secure auth flows without standard alerts",
    ],
    achievements: [
      "Zero-alert UI design (pure pop-ups)",
      "Robust database schema mapping",
    ],
  },
  "flower-catalogue": {
    title: "Flower Catalogue",
    subtitle: "Immersive visual directory.",
    meta: ["UI/UX Designer", "2025", "Figma / React"],
    overview:
      "A lush, immersive visual directory utilizing fluid typography and dynamic data mapping to showcase botanical collections.",
    tech: ["Figma", "React", "GSAP", "Tailwind CSS"],
    features: [
      "Fluid Typography",
      "Dynamic Data Mapping",
      "Parallax Image Galleries",
    ],
    goals: [
      "Push visual interaction boundaries",
      "Optimize high-res image loading",
    ],
    achievements: [
      "Seamless 60fps scroll performance",
      "Award-winning layout design",
    ],
  },
  "debut-invitation": {
    title: "Debut Invitation",
    subtitle: "Personalized event experience.",
    meta: ["Front-End", "2026", "Web Experience"],
    overview:
      "A personalized digital invitation experience featuring elegant motion design and interactive RSVP handling.",
    tech: ["React", "GSAP", "Vite", "Tailwind CSS"],
    features: ["Motion Graphics", "Interactive RSVP", "Timeline Reveal"],
    goals: [
      "Create an elegant digital keepsake",
      "Simplify guest list management",
    ],
    achievements: [
      "Perfect lighthouse performance score",
      "Zero-friction user journey",
    ],
  },
};

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectData[id] : null;

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useGSAP(
    () => {
      if (!project) return;

      // 1. Hero Reveal (simulating the end of the morph)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-slab",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 },
      )
        .fromTo(
          ".hero-chip",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
          "-=0.6",
        )
        .fromTo(
          ".overview-text",
          { filter: "blur(10px)", opacity: 0, y: 20 },
          { filter: "blur(0px)", opacity: 1, y: 0, duration: 1, stagger: 0.1 },
          "-=0.4",
        );

      // 2. Details Grid 2x2 Diagonal Stagger
      const cells = gsap.utils.toArray<HTMLElement>(".grid-cell");
      gsap.fromTo(
        cells,
        { filter: "blur(14px)", opacity: 0, scale: 0.95 },
        {
          filter: "blur(0px)",
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: { amount: 0.3, from: "start" },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: heroRef, dependencies: [project] },
  );

  if (!project)
    return (
      <div className="flex min-h-screen items-center justify-center">
        Project Not Found
      </div>
    );

  return (
    <article ref={heroRef} className="pb-32">
      {/* 5.1 Project Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-panel-deep flex items-end p-6 md:p-14">
        {/* Abstract background gradient to simulate the visual */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/20 to-void/90" />

        <div className="hero-slab relative z-10 glass glass-edge w-full max-w-4xl rounded-[32px] p-8 md:p-12">
          <div className="mb-6 flex flex-wrap gap-3">
            {project.meta.map((m: string) => (
              <span
                key={m}
                className="hero-chip glass px-4 py-2 rounded-pill text-xs font-semibold uppercase tracking-widest text-ink-muted"
              >
                {m}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-cyan font-medium">{project.subtitle}</p>
        </div>
      </section>

      {/* 5.2 Project Overview */}
      <section className="mx-auto max-w-4xl px-6 py-24 md:px-10">
        <p className="overview-text text-2xl md:text-3xl leading-relaxed tracking-tight text-ink-muted">
          {project.overview}
        </p>

        {/* 5.4 Primary Project Links */}
        <div className="mt-12 flex gap-4">
          <button
            data-cursor
            className="overview-text rounded-pill bg-ink px-8 py-4 text-[15px] font-semibold text-void transition-transform hover:scale-[1.03]"
          >
            View Prototype →
          </button>
          <button
            data-cursor
            className="overview-text glass glass-edge rounded-pill px-8 py-4 text-[15px] font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Live Website
          </button>
        </div>
      </section>

      {/* 5.5 Details Grid */}
      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6">
          <TiltCard className="grid-cell glass glass-edge rounded-[24px] p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-violet mb-6">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span
                  key={t}
                  className="glass px-3 py-1.5 rounded-md text-sm text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </TiltCard>

          <TiltCard className="grid-cell glass glass-edge rounded-[24px] p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-cyan mb-6">
              Features
            </h3>
            <ul className="flex flex-col gap-3">
              {project.features.map((f: string) => (
                <li key={f} className="text-ink-muted flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
                  {f}
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard className="grid-cell glass glass-edge rounded-[24px] p-8">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-rose mb-6">
              Goals
            </h3>
            <ul className="flex flex-col gap-3">
              {project.goals.map((g: string) => (
                <li key={g} className="text-ink-muted flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                  {g}
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard className="grid-cell glass glass-edge rounded-[24px] p-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
            <h3 className="relative z-10 text-sm font-semibold uppercase tracking-widest text-ink mb-6">
              Key Achievements
            </h3>
            <ul className="relative z-10 flex flex-col gap-3">
              {project.achievements.map((a: string) => (
                <li
                  key={a}
                  className="text-ink flex items-center gap-3 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                  {a}
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>

        {/* 5.6 Next Project Loop */}
        <div className="mt-20 flex justify-center">
          <Link
            to="/work"
            data-cursor
            className="glass glass-edge px-8 py-4 rounded-pill text-ink hover:text-cyan transition-colors font-medium flex items-center gap-2"
          >
            ← Back to Showcase
          </Link>
        </div>
      </section>
    </article>
  );
}
