import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollStore } from "../utils/store";
import { useTransitionStore } from "../utils/transitionStore";

const demoProjects = [
  { id: "1", slug: "fieldwork", title: "Fieldwork Analysis", client: "Nike Running", date: "2026", img: "https://images.unsplash.com/photo-1552674605-e71fac9804eb?q=80&w=1200&auto=format&fit=crop" },
  { id: "2", slug: "narrative", title: "Narrative Research", client: "Tracksmith", date: "2026", img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop" },
  { id: "3", slug: "speed", title: "Speed Mechanics", client: "District Vision", date: "2025", img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop" },
  { id: "4", slug: "production", title: "Creative Production", client: "Asics", date: "2025", img: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop" }
];

export default function ProjectWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewMode = useScrollStore((state) => state.viewMode);
  const startTransition = useTransitionStore((state) => state.startTransition);
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // GSAP Entrance Animation for Dividers and Text
  useGSAP(() => {
    if (viewMode !== "list") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-divider-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power3.inOut", stagger: 0.1 }
      );
      gsap.fromTo(
        ".project-text-inner",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05, delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [viewMode]);

  const handleProjectClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    startTransition(slug, rect);
    // In a real app, you would route to the project page after the morph animation completes
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 1. FIXED HOVER POSTER (Visible only in List Mode on Desktop) */}
      <div 
        className={`fixed top-1/2 -translate-y-1/2 right-[10%] w-[35vw] aspect-[4/5] z-0 pointer-events-none overflow-hidden transition-opacity duration-500 hidden md:block ${viewMode === 'list' && hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}
      >
        {demoProjects.map((proj, idx) => (
          <img
            key={proj.id}
            src={proj.img}
            alt={proj.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${hoveredIndex === idx ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
          />
        ))}
      </div>

      {/* 2. THE GRID/LIST RENDERER */}
      <div className={`relative z-10 ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-8" : "flex flex-col"}`}>
        {demoProjects.map((project, idx) => {
          const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

          if (viewMode === "grid") {
            return (
              <a 
                key={project.id}
                href={`/projects/${project.slug}`}
                onClick={(e) => handleProjectClick(e, project.slug)}
                className="group cursor-pointer flex flex-col gap-4"
              >
                <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-100 relative">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="grid grid-cols-[1fr_auto] items-start">
                  <h4 className="text-xl font-medium uppercase tracking-tight">{project.title}</h4>
                  <div className="text-right">
                    <p className="text-sm text-neutral-400 font-mono">{project.date}</p>
                    <p className="text-sm text-neutral-500 uppercase font-mono">{project.client}</p>
                  </div>
                </div>
              </a>
            );
          }

          // LIST VIEW
          return (
            <a
              key={project.id}
              href={`/projects/${project.slug}`}
              onClick={(e) => handleProjectClick(e, project.slug)}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group cursor-pointer py-8 md:py-12 transition-opacity duration-300"
              style={{ opacity: isDimmed ? 0.3 : 1 }}
            >
              {/* Top Divider */}
              <div className="absolute top-0 left-0 right-0 h-[1px] flex items-center">
                <span className="w-1 h-1 bg-neutral-300 block"></span>
                <span className="project-divider-line flex-1 h-[1px] bg-neutral-200 origin-center"></span>
                <span className="w-1 h-1 bg-neutral-300 block"></span>
              </div>

              <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_24%_8rem_4rem] gap-x-6 items-center overflow-hidden">
                <h3 className="col-span-3 md:col-span-1 text-3xl md:text-5xl uppercase font-medium tracking-tight">
                  <span className="project-text-inner block will-change-transform">{project.title}</span>
                </h3>
                <p className="text-sm md:text-base text-neutral-500 font-mono uppercase mt-2 md:mt-0">
                  <span className="project-text-inner block will-change-transform">{project.client}</span>
                </p>
                <p className="text-sm md:text-base text-neutral-400 font-mono hidden md:block text-center">
                  <span className="project-text-inner block will-change-transform">{project.date}</span>
                </p>
                <p className="text-sm md:text-base text-neutral-400 font-mono hidden md:block text-right">
                  <span className="project-text-inner block will-change-transform">/{String(idx + 1).padStart(3, '0')}</span>
                </p>
              </div>

              {/* Bottom Divider (Only on last item) */}
              {idx === demoProjects.length - 1 && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] flex items-center">
                  <span className="w-1 h-1 bg-neutral-300 block"></span>
                  <span className="project-divider-line flex-1 h-[1px] bg-neutral-200 origin-center"></span>
                  <span className="w-1 h-1 bg-neutral-300 block"></span>
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}