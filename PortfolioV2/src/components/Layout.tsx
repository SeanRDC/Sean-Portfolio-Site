import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeshBackground from "./MeshBackground";
import GlassCursor from "./GlassCursor";
import Dock from "./Dock";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{ lerp: 0.08, wheelMultiplier: 1, syncTouch: true }}
    >
      <div className="relative min-h-screen">
        <MeshBackground />
        <GlassCursor />
        <Dock />
        <main className="relative">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
}
