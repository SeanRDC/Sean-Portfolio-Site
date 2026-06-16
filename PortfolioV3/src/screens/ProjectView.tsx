import React, { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";

export default function ProjectView() {
  const { slug } = useParams();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ensure we start at the top of the new page
    window.scrollTo(0, 0); 
    
    // 2. Subtle reverse-scale entry animation as the transition layer fades
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { scale: 1.05, filter: "blur(4px)" },
        { scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    }
  }, [slug]);

  return (
    <main className="w-full min-h-screen bg-white text-black relative z-20">
      {/* Cinematic Project Hero */}
      <div className="w-full h-[65vh] md:h-[80vh] bg-neutral-900 flex items-center justify-center flex-col relative overflow-hidden">
         <div ref={heroRef} className="absolute inset-0 w-full h-full will-change-transform">
           <img 
             src={`https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2000&auto=format&fit=crop`} 
             className="w-full h-full object-cover opacity-60" 
             alt="Hero"
           />
         </div>
         <h1 className="text-[clamp(3rem,8vw,10rem)] font-medium tracking-tight uppercase relative z-10 text-white">
           {slug?.replace("-", " ")}
         </h1>
         <p className="mt-4 font-mono text-white/60 uppercase tracking-[0.2em] relative z-10 text-sm">
           Case Study / 2026
         </p>
      </div>

      {/* Detail Content */}
      <div className="px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-12 bg-white text-black">
         <div className="md:col-span-4">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-8">// The Brief</h2>
         </div>
         <div className="md:col-span-8 text-2xl md:text-4xl font-medium leading-[1.1] tracking-[-0.01em]">
            <p>Developing a comprehensive narrative and field research framework to redefine modern athleticism and creative production.</p>
            <div className="mt-16">
               <Link to="/" className="text-sm font-mono uppercase tracking-[0.1em] border-b border-black pb-1 hover:text-neutral-500 transition-colors">
                 Return to index
               </Link>
            </div>
         </div>
      </div>
    </main>
  );
}