import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import MainLayout from "./layouts/MainLayout";
import HomeView from "./screens/HomeView";
import ProjectView from "./screens/ProjectView";
import TransitionLayer from "./components/TransitionLayer";
import Preloader from "./components/Preloader"; // <-- No curly braces
import { useLoaderStore } from "./utils/loaderStore";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const isComplete = useLoaderStore((state) => state.isComplete);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <Router>
      {!isComplete && <Preloader />} {/* <-- Matches component name */}
      <TransitionLayer />
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/projects/:slug" element={<ProjectView />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
